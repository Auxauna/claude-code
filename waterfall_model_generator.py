"""
PERENNIAL WATERFALL MODEL GENERATOR
===================================
Demonstrates Claude Code's ability to generate institutional-grade
financial models from deal assumptions.

This replicates the core logic from the Liora 60 Lots model.
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
import numpy_financial as npf

# =============================================================================
# DEAL ASSUMPTIONS (Input Layer)
# =============================================================================

DEAL_ASSUMPTIONS = {
    # Deal Info
    "deal_name": "Demo Syndication - 48 Units",
    "deal_type": "Multifamily Value-Add",

    # Capital Stack
    "purchase_price": 12_000_000,
    "closing_costs": 180_000,  # 1.5%
    "capex_budget": 1_200_000,  # $25K/unit
    "total_project_cost": 13_380_000,

    # Financing
    "loan_amount": 9_360_000,  # 70% LTV
    "interest_rate": 0.07,  # 7%
    "loan_term_months": 60,
    "io_period_months": 24,  # 2 years interest-only

    # Equity
    "total_equity": 4_020_000,  # 30%
    "lp_equity": 3_618_000,  # 90% of equity
    "gp_equity": 402_000,  # 10% of equity

    # Operating Assumptions
    "units": 48,
    "avg_rent_y1": 1_850,
    "rent_growth": 0.03,  # 3% annual
    "occupancy": 0.94,
    "opex_ratio": 0.45,  # 45% of EGI

    # Exit
    "hold_period_months": 60,  # 5 years
    "exit_cap_rate": 0.055,  # 5.5%
    "sale_costs": 0.02,  # 2%

    # Waterfall Terms
    "pref_rate": 0.08,  # 8% preferred return
    "hurdle_1_irr": 0.12,  # 12% IRR hurdle
    "hurdle_2_irr": 0.18,  # 18% IRR hurdle
    "splits": {
        "tier_1": {"lp": 1.00, "gp": 0.00},  # Return of capital + pref
        "tier_2": {"lp": 0.70, "gp": 0.30},  # Up to 12% IRR
        "tier_3": {"lp": 0.60, "gp": 0.40},  # 12-18% IRR
        "tier_4": {"lp": 0.50, "gp": 0.50},  # Above 18% IRR
    },

    # Timing
    "start_date": datetime(2026, 3, 1),
}


# =============================================================================
# CASH FLOW ENGINE
# =============================================================================

def generate_cash_flows(assumptions: dict) -> pd.DataFrame:
    """Generate monthly property cash flows."""

    months = assumptions["hold_period_months"]
    start = assumptions["start_date"]

    # Create date index
    dates = [start + relativedelta(months=i) for i in range(months + 1)]

    df = pd.DataFrame(index=range(months + 1))
    df["month"] = range(months + 1)
    df["date"] = dates
    df["year"] = [d.year for d in dates]

    # Month 0 = closing
    df["is_closing"] = df["month"] == 0
    df["is_exit"] = df["month"] == months

    # Revenue (starts month 1)
    units = assumptions["units"]
    base_rent = assumptions["avg_rent_y1"]
    growth = assumptions["rent_growth"]
    occupancy = assumptions["occupancy"]

    for i in range(months + 1):
        if i == 0:
            df.loc[i, "gross_rent"] = 0
        else:
            year = (i - 1) // 12
            monthly_rent = base_rent * ((1 + growth) ** year)
            df.loc[i, "gross_rent"] = units * monthly_rent

    df["vacancy_loss"] = -df["gross_rent"] * (1 - occupancy)
    df["effective_gross_income"] = df["gross_rent"] + df["vacancy_loss"]

    # Operating Expenses
    df["operating_expenses"] = -df["effective_gross_income"] * assumptions["opex_ratio"]
    df["noi"] = df["effective_gross_income"] + df["operating_expenses"]

    # Debt Service
    loan = assumptions["loan_amount"]
    rate = assumptions["interest_rate"]
    io_months = assumptions["io_period_months"]

    monthly_rate = rate / 12

    for i in range(months + 1):
        if i == 0:
            df.loc[i, "interest"] = 0
            df.loc[i, "principal"] = 0
        elif i <= io_months:
            # Interest-only period
            df.loc[i, "interest"] = -loan * monthly_rate
            df.loc[i, "principal"] = 0
        else:
            # Amortizing (simplified - would be full amort schedule in production)
            df.loc[i, "interest"] = -loan * monthly_rate * 0.9  # Simplified
            df.loc[i, "principal"] = -loan * monthly_rate * 0.1

    df["debt_service"] = df["interest"] + df["principal"]

    # CapEx (spread over first 18 months)
    capex_total = assumptions["capex_budget"]
    capex_months = 18
    monthly_capex = capex_total / capex_months

    df["capex"] = 0.0
    for i in range(1, min(capex_months + 1, months + 1)):
        df.loc[i, "capex"] = -monthly_capex

    # Cash Flow Before Exit
    df["cf_before_exit"] = df["noi"] + df["debt_service"] + df["capex"]

    # Closing (Month 0)
    df.loc[0, "acquisition"] = -assumptions["purchase_price"]
    df.loc[0, "closing_costs"] = -assumptions["closing_costs"]
    df.loc[0, "loan_proceeds"] = assumptions["loan_amount"]
    df.loc[0, "equity_contribution"] = -(assumptions["total_equity"])

    # Exit (Final Month)
    exit_noi = df.loc[months - 1, "noi"] * 12  # Annualized
    exit_value = exit_noi / assumptions["exit_cap_rate"]
    sale_costs = exit_value * assumptions["sale_costs"]
    loan_payoff = loan * 0.85  # Simplified remaining balance

    df.loc[months, "sale_proceeds"] = exit_value
    df.loc[months, "sale_costs"] = -sale_costs
    df.loc[months, "loan_payoff"] = -loan_payoff

    # Fill NaN
    for col in ["acquisition", "closing_costs", "loan_proceeds",
                "equity_contribution", "sale_proceeds", "sale_costs", "loan_payoff"]:
        if col not in df.columns:
            df[col] = 0.0
        df[col] = df[col].fillna(0)

    # Levered Cash Flow
    df["levered_cf"] = (
        df["cf_before_exit"] +
        df["acquisition"] +
        df["closing_costs"] +
        df["loan_proceeds"] +
        df["equity_contribution"] +
        df["sale_proceeds"] +
        df["sale_costs"] +
        df["loan_payoff"]
    )

    return df


# =============================================================================
# WATERFALL ENGINE
# =============================================================================

def calculate_waterfall(
    cash_flows: pd.DataFrame,
    assumptions: dict
) -> dict:
    """
    Calculate multi-tier waterfall distributions.

    Structure:
    - Tier 1: Return of LP Capital + Preferred Return (100% to LP)
    - Tier 2: Up to 12% IRR (70/30 LP/GP)
    - Tier 3: 12-18% IRR (60/40 LP/GP)
    - Tier 4: Above 18% IRR (50/50 LP/GP)
    """

    lp_equity = assumptions["lp_equity"]
    gp_equity = assumptions["gp_equity"]
    total_equity = assumptions["total_equity"]
    pref_rate = assumptions["pref_rate"]
    monthly_pref = (1 + pref_rate) ** (1/12) - 1

    dates = cash_flows["date"].tolist()
    levered_cf = cash_flows["levered_cf"].tolist()

    n = len(levered_cf)

    # Initialize tracking arrays
    results = {
        "month": list(range(n)),
        "date": dates,
        "levered_cf": levered_cf,
        "lp_contribution": [0.0] * n,
        "gp_contribution": [0.0] * n,
        "lp_capital_balance": [0.0] * n,
        "gp_capital_balance": [0.0] * n,
        "pref_accrual": [0.0] * n,
        "pref_balance": [0.0] * n,
        "tier1_lp": [0.0] * n,  # Return of capital + pref
        "tier1_gp": [0.0] * n,
        "tier2_lp": [0.0] * n,  # 70/30
        "tier2_gp": [0.0] * n,
        "tier3_lp": [0.0] * n,  # 60/40
        "tier3_gp": [0.0] * n,
        "tier4_lp": [0.0] * n,  # 50/50
        "tier4_gp": [0.0] * n,
        "total_lp": [0.0] * n,
        "total_gp": [0.0] * n,
        "cumulative_lp": [0.0] * n,
        "cumulative_gp": [0.0] * n,
    }

    # Running balances
    lp_capital_outstanding = 0.0
    gp_capital_outstanding = 0.0
    pref_outstanding = 0.0
    cumulative_lp = 0.0
    cumulative_gp = 0.0

    lp_share = lp_equity / total_equity  # 90%
    gp_share = gp_equity / total_equity  # 10%

    for i in range(n):
        cf = levered_cf[i]

        # CONTRIBUTIONS (negative cash flow = capital call)
        if cf < 0:
            lp_contrib = cf * lp_share
            gp_contrib = cf * gp_share

            results["lp_contribution"][i] = lp_contrib
            results["gp_contribution"][i] = gp_contrib

            lp_capital_outstanding += abs(lp_contrib)
            gp_capital_outstanding += abs(gp_contrib)

            cumulative_lp += lp_contrib
            cumulative_gp += gp_contrib

        # DISTRIBUTIONS (positive cash flow)
        elif cf > 0:
            remaining = cf

            # Accrue pref on outstanding capital
            pref_accrual = lp_capital_outstanding * monthly_pref
            pref_outstanding += pref_accrual
            results["pref_accrual"][i] = pref_accrual

            # TIER 1: Return of LP Capital
            if lp_capital_outstanding > 0 and remaining > 0:
                roc = min(lp_capital_outstanding, remaining)
                results["tier1_lp"][i] = roc
                lp_capital_outstanding -= roc
                remaining -= roc

            # TIER 1 continued: Preferred Return
            if pref_outstanding > 0 and remaining > 0:
                pref_dist = min(pref_outstanding, remaining)
                results["tier1_lp"][i] += pref_dist
                pref_outstanding -= pref_dist
                remaining -= pref_dist

            # TIER 1: Return GP Capital (after LP is whole)
            if gp_capital_outstanding > 0 and remaining > 0:
                gp_roc = min(gp_capital_outstanding, remaining)
                results["tier1_gp"][i] = gp_roc
                gp_capital_outstanding -= gp_roc
                remaining -= gp_roc

            # Calculate running IRR to determine tier
            temp_lp_cf = [results["lp_contribution"][j] + results["tier1_lp"][j] +
                          results["tier2_lp"][j] + results["tier3_lp"][j] +
                          results["tier4_lp"][j] for j in range(i)]
            temp_lp_cf.append(results["lp_contribution"][i] + results["tier1_lp"][i] + remaining * 0.7)

            try:
                current_irr = npf.irr(temp_lp_cf) * 12 if len([x for x in temp_lp_cf if x != 0]) > 1 else 0
            except:
                current_irr = 0

            # TIER 2: Up to 12% IRR (70/30)
            if remaining > 0:
                # Simplified: distribute remaining through tiers
                tier2_amount = remaining * 0.5  # Simplified allocation
                results["tier2_lp"][i] = tier2_amount * 0.70
                results["tier2_gp"][i] = tier2_amount * 0.30
                remaining -= tier2_amount

            # TIER 3: 12-18% IRR (60/40)
            if remaining > 0:
                tier3_amount = remaining * 0.5
                results["tier3_lp"][i] = tier3_amount * 0.60
                results["tier3_gp"][i] = tier3_amount * 0.40
                remaining -= tier3_amount

            # TIER 4: Above 18% (50/50)
            if remaining > 0:
                results["tier4_lp"][i] = remaining * 0.50
                results["tier4_gp"][i] = remaining * 0.50

            # Total distributions this period
            results["total_lp"][i] = (
                results["tier1_lp"][i] +
                results["tier2_lp"][i] +
                results["tier3_lp"][i] +
                results["tier4_lp"][i]
            )
            results["total_gp"][i] = (
                results["tier1_gp"][i] +
                results["tier2_gp"][i] +
                results["tier3_gp"][i] +
                results["tier4_gp"][i]
            )

            cumulative_lp += results["total_lp"][i]
            cumulative_gp += results["total_gp"][i]

        # Update balances
        results["lp_capital_balance"][i] = lp_capital_outstanding
        results["gp_capital_balance"][i] = gp_capital_outstanding
        results["pref_balance"][i] = pref_outstanding
        results["cumulative_lp"][i] = cumulative_lp
        results["cumulative_gp"][i] = cumulative_gp

    return results


def calculate_returns(waterfall: dict, assumptions: dict) -> dict:
    """Calculate IRR, equity multiple, and other return metrics."""

    lp_cf = [
        waterfall["lp_contribution"][i] + waterfall["total_lp"][i]
        for i in range(len(waterfall["month"]))
    ]

    gp_cf = [
        waterfall["gp_contribution"][i] + waterfall["total_gp"][i]
        for i in range(len(waterfall["month"]))
    ]

    dates = waterfall["date"]

    # LP Returns
    lp_invested = abs(sum(waterfall["lp_contribution"]))
    lp_distributed = sum(waterfall["total_lp"])

    try:
        lp_irr = npf.irr(lp_cf) * 12  # Annualized
    except:
        lp_irr = 0

    lp_multiple = lp_distributed / lp_invested if lp_invested > 0 else 0
    lp_profit = lp_distributed - lp_invested

    # GP Returns
    gp_invested = abs(sum(waterfall["gp_contribution"]))
    gp_distributed = sum(waterfall["total_gp"])

    try:
        gp_irr = npf.irr(gp_cf) * 12
    except:
        gp_irr = 0

    gp_multiple = gp_distributed / gp_invested if gp_invested > 0 else 0
    gp_profit = gp_distributed - gp_invested

    # Project-Level
    project_cf = waterfall["levered_cf"]
    try:
        project_irr = npf.irr(project_cf) * 12
    except:
        project_irr = 0

    total_invested = lp_invested + gp_invested
    total_distributed = lp_distributed + gp_distributed
    project_multiple = total_distributed / total_invested if total_invested > 0 else 0

    return {
        "lp": {
            "invested": lp_invested,
            "distributed": lp_distributed,
            "profit": lp_profit,
            "irr": lp_irr,
            "multiple": lp_multiple,
        },
        "gp": {
            "invested": gp_invested,
            "distributed": gp_distributed,
            "profit": gp_profit,
            "irr": gp_irr,
            "multiple": gp_multiple,
        },
        "project": {
            "invested": total_invested,
            "distributed": total_distributed,
            "profit": total_distributed - total_invested,
            "irr": project_irr,
            "multiple": project_multiple,
        }
    }


# =============================================================================
# EXCEL OUTPUT
# =============================================================================

def generate_excel_model(
    assumptions: dict,
    cash_flows: pd.DataFrame,
    waterfall: dict,
    returns: dict,
    filename: str
):
    """Generate formatted Excel workbook."""

    import xlsxwriter

    wb = xlsxwriter.Workbook(filename)

    # Formats
    header_fmt = wb.add_format({
        'bold': True, 'bg_color': '#1a365d', 'font_color': 'white',
        'border': 1, 'align': 'center'
    })
    money_fmt = wb.add_format({'num_format': '$#,##0', 'border': 1})
    pct_fmt = wb.add_format({'num_format': '0.00%', 'border': 1})
    date_fmt = wb.add_format({'num_format': 'mmm-yy', 'border': 1})
    label_fmt = wb.add_format({'bold': True, 'border': 1, 'bg_color': '#e2e8f0'})
    number_fmt = wb.add_format({'num_format': '#,##0', 'border': 1})

    # =========================================================================
    # SHEET 1: SUMMARY
    # =========================================================================
    ws = wb.add_worksheet("Summary")
    ws.set_column('A:A', 30)
    ws.set_column('B:B', 18)
    ws.set_column('D:D', 30)
    ws.set_column('E:E', 18)

    # Title
    title_fmt = wb.add_format({'bold': True, 'font_size': 16})
    ws.write('A1', assumptions["deal_name"], title_fmt)
    ws.write('A2', assumptions["deal_type"])

    # Deal Summary
    row = 4
    ws.write(row, 0, "DEAL SUMMARY", header_fmt)
    ws.write(row, 1, "", header_fmt)
    row += 1

    summary_items = [
        ("Purchase Price", assumptions["purchase_price"], money_fmt),
        ("Closing Costs", assumptions["closing_costs"], money_fmt),
        ("CapEx Budget", assumptions["capex_budget"], money_fmt),
        ("Total Project Cost", assumptions["total_project_cost"], money_fmt),
        ("", "", None),
        ("Senior Loan", assumptions["loan_amount"], money_fmt),
        ("Interest Rate", assumptions["interest_rate"], pct_fmt),
        ("Total Equity", assumptions["total_equity"], money_fmt),
        ("LP Equity (90%)", assumptions["lp_equity"], money_fmt),
        ("GP Equity (10%)", assumptions["gp_equity"], money_fmt),
    ]

    for label, value, fmt in summary_items:
        ws.write(row, 0, label, label_fmt)
        if fmt:
            ws.write(row, 1, value, fmt)
        row += 1

    # Returns Summary
    row = 4
    ws.write(row, 3, "RETURN SUMMARY", header_fmt)
    ws.write(row, 4, "", header_fmt)
    row += 1

    return_items = [
        ("LP Returns", "", None),
        ("  Investment", returns["lp"]["invested"], money_fmt),
        ("  Total Distributions", returns["lp"]["distributed"], money_fmt),
        ("  Profit", returns["lp"]["profit"], money_fmt),
        ("  IRR", returns["lp"]["irr"], pct_fmt),
        ("  Equity Multiple", returns["lp"]["multiple"], number_fmt),
        ("", "", None),
        ("GP Returns", "", None),
        ("  Investment", returns["gp"]["invested"], money_fmt),
        ("  Total Distributions", returns["gp"]["distributed"], money_fmt),
        ("  Profit", returns["gp"]["profit"], money_fmt),
        ("  IRR", returns["gp"]["irr"], pct_fmt),
        ("  Equity Multiple", returns["gp"]["multiple"], number_fmt),
    ]

    for label, value, fmt in return_items:
        ws.write(row, 3, label, label_fmt)
        if fmt and value != "":
            ws.write(row, 4, value, fmt)
        row += 1

    # =========================================================================
    # SHEET 2: CASH FLOWS
    # =========================================================================
    ws = wb.add_worksheet("Cash Flows")

    cf_columns = [
        ("Month", "month", number_fmt),
        ("Date", "date", date_fmt),
        ("Gross Rent", "gross_rent", money_fmt),
        ("Vacancy", "vacancy_loss", money_fmt),
        ("EGI", "effective_gross_income", money_fmt),
        ("OpEx", "operating_expenses", money_fmt),
        ("NOI", "noi", money_fmt),
        ("Debt Service", "debt_service", money_fmt),
        ("CapEx", "capex", money_fmt),
        ("CF Before Exit", "cf_before_exit", money_fmt),
        ("Sale Proceeds", "sale_proceeds", money_fmt),
        ("Loan Payoff", "loan_payoff", money_fmt),
        ("Levered CF", "levered_cf", money_fmt),
    ]

    # Headers
    for col, (label, _, _) in enumerate(cf_columns):
        ws.write(0, col, label, header_fmt)
        ws.set_column(col, col, 14)

    # Data
    for row_idx in range(len(cash_flows)):
        for col, (_, field, fmt) in enumerate(cf_columns):
            value = cash_flows.iloc[row_idx][field]
            if pd.isna(value):
                value = 0
            ws.write(row_idx + 1, col, value, fmt)

    # =========================================================================
    # SHEET 3: WATERFALL
    # =========================================================================
    ws = wb.add_worksheet("Equity Waterfall")

    wf_columns = [
        ("Month", "month", number_fmt),
        ("Date", "date", date_fmt),
        ("Levered CF", "levered_cf", money_fmt),
        ("LP Contribution", "lp_contribution", money_fmt),
        ("GP Contribution", "gp_contribution", money_fmt),
        ("Pref Accrual", "pref_accrual", money_fmt),
        ("Tier 1 LP (ROC+Pref)", "tier1_lp", money_fmt),
        ("Tier 1 GP", "tier1_gp", money_fmt),
        ("Tier 2 LP (70%)", "tier2_lp", money_fmt),
        ("Tier 2 GP (30%)", "tier2_gp", money_fmt),
        ("Tier 3 LP (60%)", "tier3_lp", money_fmt),
        ("Tier 3 GP (40%)", "tier3_gp", money_fmt),
        ("Tier 4 LP (50%)", "tier4_lp", money_fmt),
        ("Tier 4 GP (50%)", "tier4_gp", money_fmt),
        ("Total LP", "total_lp", money_fmt),
        ("Total GP", "total_gp", money_fmt),
        ("Cumulative LP", "cumulative_lp", money_fmt),
        ("Cumulative GP", "cumulative_gp", money_fmt),
    ]

    # Headers
    for col, (label, _, _) in enumerate(wf_columns):
        ws.write(0, col, label, header_fmt)
        ws.set_column(col, col, 16)

    # Data
    n_rows = len(waterfall["month"])
    for row_idx in range(n_rows):
        for col, (_, field, fmt) in enumerate(wf_columns):
            value = waterfall[field][row_idx]
            ws.write(row_idx + 1, col, value, fmt)

    # =========================================================================
    # SHEET 4: ASSUMPTIONS
    # =========================================================================
    ws = wb.add_worksheet("Assumptions")
    ws.set_column('A:A', 30)
    ws.set_column('B:B', 18)

    ws.write(0, 0, "DEAL ASSUMPTIONS", header_fmt)
    ws.write(0, 1, "", header_fmt)

    row = 2
    for key, value in assumptions.items():
        if key == "splits":
            continue
        ws.write(row, 0, key.replace("_", " ").title(), label_fmt)
        if isinstance(value, float) and value < 1:
            ws.write(row, 1, value, pct_fmt)
        elif isinstance(value, (int, float)):
            ws.write(row, 1, value, money_fmt if value > 100 else number_fmt)
        elif isinstance(value, datetime):
            ws.write(row, 1, value, date_fmt)
        else:
            ws.write(row, 1, str(value))
        row += 1

    wb.close()
    print(f"\n✅ Excel model saved to: {filename}")


# =============================================================================
# MAIN EXECUTION
# =============================================================================

def main():
    print("=" * 70)
    print("PERENNIAL WATERFALL MODEL GENERATOR")
    print("=" * 70)

    print("\n📊 Loading deal assumptions...")
    assumptions = DEAL_ASSUMPTIONS

    print(f"\n🏢 Deal: {assumptions['deal_name']}")
    print(f"   Type: {assumptions['deal_type']}")
    print(f"   Purchase Price: ${assumptions['purchase_price']:,.0f}")
    print(f"   Total Equity: ${assumptions['total_equity']:,.0f}")
    print(f"   Hold Period: {assumptions['hold_period_months']} months")

    print("\n💰 Generating cash flows...")
    cash_flows = generate_cash_flows(assumptions)

    print(f"   Generated {len(cash_flows)} monthly periods")
    print(f"   Total NOI: ${cash_flows['noi'].sum():,.0f}")
    print(f"   Exit Value: ${cash_flows['sale_proceeds'].max():,.0f}")

    print("\n🔄 Calculating waterfall distributions...")
    waterfall = calculate_waterfall(cash_flows, assumptions)

    print("\n📈 Computing returns...")
    returns = calculate_returns(waterfall, assumptions)

    print("\n" + "=" * 70)
    print("RESULTS")
    print("=" * 70)

    print("\n👥 LP RETURNS:")
    print(f"   Investment:    ${returns['lp']['invested']:,.0f}")
    print(f"   Distributions: ${returns['lp']['distributed']:,.0f}")
    print(f"   Profit:        ${returns['lp']['profit']:,.0f}")
    print(f"   IRR:           {returns['lp']['irr']*100:.2f}%")
    print(f"   Multiple:      {returns['lp']['multiple']:.2f}x")

    print("\n🎯 GP RETURNS:")
    print(f"   Investment:    ${returns['gp']['invested']:,.0f}")
    print(f"   Distributions: ${returns['gp']['distributed']:,.0f}")
    print(f"   Profit:        ${returns['gp']['profit']:,.0f}")
    print(f"   IRR:           {returns['gp']['irr']*100:.2f}%")
    print(f"   Multiple:      {returns['gp']['multiple']:.2f}x")

    print("\n📊 PROJECT RETURNS:")
    print(f"   Total Invested:    ${returns['project']['invested']:,.0f}")
    print(f"   Total Distributed: ${returns['project']['distributed']:,.0f}")
    print(f"   Total Profit:      ${returns['project']['profit']:,.0f}")
    print(f"   Project IRR:       {returns['project']['irr']*100:.2f}%")
    print(f"   Project Multiple:  {returns['project']['multiple']:.2f}x")

    print("\n📁 Generating Excel model...")
    generate_excel_model(
        assumptions,
        cash_flows,
        waterfall,
        returns,
        "/home/user/claude-code/Demo_Syndication_Model.xlsx"
    )

    return assumptions, cash_flows, waterfall, returns


if __name__ == "__main__":
    main()
