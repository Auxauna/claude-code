# CLAUDE.md - Perennial Agentic Infrastructure Project

## Project Overview

This repo contains the development of **agentic AI infrastructure for Perennial**, a real estate syndication advisory firm. The goal is to productize financial modeling, investor reporting, and fund administration as AI-powered SaaS deliverables.

**Key Stakeholders:**
- Technical founder (you) - Building the AI infrastructure
- Perennial founder - Domain expertise in syndication operations, Blue Heron relationship
- Blue Heron - $370M/year luxury home developer running syndications

## The Business Model

Perennial helps real estate syndicators with:
1. **Raise Kits** - PPM, pitch deck, data room for capital raises
2. **Investor Reporting** - Monthly/quarterly LP reports
3. **FP&A** - Financial planning, budget vs. actuals
4. **IR Advisory** - Investor relations support

The tech layer automates and scales these services using agentic AI.

---

## Target ICP

**Primary: Emerging Syndicator**
- AUM: $5M-$75M (sweet spot $15M-$50M)
- Deal size: $3M-$15M equity raises
- 15-75 LPs per deal
- 2-5 deals per year
- Team: 1-5 people
- Communities: BiggerPockets, GoBundance, Left Field Investors

**Pain Points:**
1. Investor reporting takes 8-12 hours/month
2. Raise prep costs $25-40K and takes 6-8 weeks
3. Distribution calculations in Excel break constantly
4. No single source of truth across tools
5. Can't scale without hiring full-time IR

---

## Key Files in This Repo

### Reference Materials
- `Blue Heron Sponsor Overview_11.2024.pdf` - Blue Heron's sponsor deck, shows deal structure
- `Business Plan_ Advisory and Syndication Growth.pdf` - Perennial's dual-engine business plan
- `Perennial One Sheet_2025 (2).pdf` - Current service offerings
- `Sample Investor Report_06.2025_Redacted.pdf` - What "good" investor reporting looks like

### The Model to Reverse Engineer
- `Liora 60 Lots - Anchor LOI - Underwriting Model_12.12.25_v22.xlsx` - **THE KEY FILE**
  - 21 sheets, 16,000+ columns in waterfall
  - Dual-entity structure (LandCo + BuildCo)
  - 5-tier waterfall with monthly compound accrual
  - 6 floor plans with price/sqft optimization
  - 40+ model validation checks
  - This represents institutional-grade modeling expertise

### Analysis & Strategy
- `PERENNIAL_AGENTIC_INFRASTRUCTURE_REPORT.md` - Full market research, competitive analysis, product stack
- `LIORA_MODEL_ANALYSIS.md` - Deep dive on what makes the Liora model sophisticated
- `scratchpad.md` - Implementation plan and working notes

### Code
- `waterfall_model_generator.py` - WIP Python waterfall calculator

---

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      PERENNIAL PLATFORM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   MODELING ENGINE                         │  │
│  │  Python + pandas + openpyxl + numpy-financial            │  │
│  │  • Parse existing Excel models                           │  │
│  │  • Extract assumptions, cash flows, waterfalls           │  │
│  │  • Generate new models from templates                    │  │
│  │  • Run sensitivity analysis                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   REPORTING ENGINE                        │  │
│  │  • Narrative generation (Claude API)                     │  │
│  │  • Chart generation (plotly/matplotlib)                  │  │
│  │  • PDF assembly (weasyprint)                             │  │
│  │  • PowerPoint generation (python-pptx)                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   VALIDATION ENGINE                       │  │
│  │  • Model integrity checks                                │  │
│  │  • "Smell test" ranges (IRR 12-25%, multiple 1.5-2.5x)  │  │
│  │  • Assumption sanity checks                              │  │
│  │  • Sources = Uses balance                                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Required Python Dependencies

```bash
# Excel handling
pip install openpyxl xlrd xlsxwriter pandas

# Financial calculations
pip install numpy-financial scipy

# Visualization
pip install plotly kaleido matplotlib seaborn

# Report generation
pip install weasyprint reportlab python-pptx

# Data validation
pip install pandera

# Utilities
pip install python-dateutil
```

---

## The Liora Model - Key Insights

### Structure (21 Sheets)
1. **Assumptions** - Deal inputs, pricing, timing
2. **Top Sheet** - Executive summary
3. **Closing & Investor Summary** - Capital stack, returns by investor
4. **S&U** - Sources & Uses
5. **Consolidated CF** - 150 columns of monthly cash flows
6. **Profit Summary** - P&L by phase
7. **Consolidated Pro Forma** - Combined financials
8. **LandCo Pro Forma** - Land entity standalone
9. **BuildCo Pro Forma** - Build entity standalone
10. **Equity Waterfall** - 16,376 columns, 5-tier monthly accrual
11. **Lot Assumptions** - Per-lot detail
12. **Land Assumptions** - Development costs/timing
13. **Land CF** - Land cash flows
14. **Land Revenue** - Lot sales schedule
15. **Land Equity Waterfall** - Separate waterfall for land JV
16. **HomeBuild CF** - Construction cash flows
17. **HomeBuild Assumptions** - Per-home costs
18. **Homebuild Revenue** - Home sales schedule
19. **Homebuild Costs** - Construction costs
20. **Model Checks** - 40+ validation rules

### Key Formulas to Understand
```
Monthly Pref Rate: =(1+C11)^(1/12)-1
Pref Accrual: =((1+$E63)^(12/12)-1)*I62
Return of Capital: =MAX(0,MIN(-SUM(I52:I53),I39*$E$11))
Levered IRR: =XIRR(I39:DY39,I25:DY25)
```

### Deal Metrics (Liora)
- Total Project: $160M
- Senior Debt: $55.6M (90%)
- Preferred Equity (Athos): $6M at 16% pref
- LP IRR: 15.97%
- LP Multiple: 1.62x
- GP (Blue Heron) Profit: $18.1M

---

## Questions to Answer (Need Domain Input)

### Smell Test Ranges
- What IRR range is attractive but believable for LPs?
- What equity multiple is "good" for a 5-year hold?
- What GP promote % of total profit is "fair"?

### Sensitivity Drivers
- Which assumptions have biggest IRR impact?
- What's the realistic range for each?
- Exit cap rate ±50bps = ?
- Construction costs ±10% = ?

### Failure Modes
- What assumptions are typically wrong?
- What do models miss that kills deals?

---

## Commands to Run

```bash
# Install dependencies
pip install openpyxl xlrd xlsxwriter pandas numpy-financial scipy plotly kaleido matplotlib seaborn weasyprint reportlab python-pptx pandera python-dateutil

# Analyze the Liora model
python3 -c "
from openpyxl import load_workbook
wb = load_workbook('Liora 60 Lots - Anchor LOI - Underwriting Model_12.12.25_v22.xlsx', data_only=True)
print('Sheets:', wb.sheetnames)
"

# Run the waterfall generator (WIP)
python3 waterfall_model_generator.py
```

---

## Next Steps

See `scratchpad.md` for detailed implementation plan.

1. **Phase 1**: Reverse engineer Liora model completely
2. **Phase 2**: Build model parser that extracts structure from any UW model
3. **Phase 3**: Create mock deal and generate full model from assumptions
4. **Phase 4**: Generate investor report from model outputs
5. **Phase 5**: Build scenario analysis engine

---

## Git Workflow

```bash
# Current branch
git checkout claude/clear-repo-restart-2YrAI

# Push changes
git push -u origin claude/clear-repo-restart-2YrAI
```

---

## Prompt to Start New Session

Use this when starting Claude Code on this repo:

```
I'm working on Perennial - an agentic AI platform for real estate syndicators.

Key context:
- Read CLAUDE.md for full project context
- Read scratchpad.md for current implementation plan
- The Liora Excel model is the reference for institutional-grade modeling
- Goal: Reverse engineer the model, then build a mock example for a realistic customer

Current focus: [describe what you want to work on]
```
