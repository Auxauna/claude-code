# Scratchpad - Perennial Implementation Plan

## Current Status
**Date:** January 2026
**Phase:** Model Reverse Engineering
**Branch:** `claude/clear-repo-restart-2YrAI`

---

## Implementation Roadmap

### Phase 1: Complete Model Reverse Engineering ⬅️ CURRENT
**Goal:** Fully understand and document the Liora model structure

#### Tasks
- [ ] Extract complete schema of all 21 sheets
- [ ] Document every formula in the waterfall (Equity Waterfall sheet)
- [ ] Map the data flow between sheets
- [ ] Identify all input assumptions and their locations
- [ ] Document the validation checks and their formulas
- [ ] Create a JSON schema representing the model structure

#### Deliverables
- `model_schema.json` - Complete schema definition
- `formula_map.md` - All key formulas documented
- `data_flow_diagram.md` - How sheets connect

---

### Phase 2: Build Model Parser
**Goal:** Parse ANY underwriting model into structured data

#### Tasks
- [ ] Build Excel parser that identifies sheet types automatically
- [ ] Extract assumptions into standardized format
- [ ] Extract cash flows into time-series dataframe
- [ ] Extract waterfall structure and terms
- [ ] Validate parsed model against schema
- [ ] Handle different model formats/structures

#### Code Structure
```
/src
  /parser
    excel_parser.py      # Main parser
    sheet_detector.py    # Identify sheet types
    assumption_extractor.py
    cashflow_extractor.py
    waterfall_extractor.py
  /schema
    model_schema.json
    validation_rules.json
```

---

### Phase 3: Mock Deal Generator
**Goal:** Generate a realistic customer deal model from assumptions

#### Mock Deal: "Sunrise 32 Units - Phoenix Multifamily"
```yaml
deal_name: "Sunrise Apartments"
deal_type: "Multifamily Value-Add"
location: "Phoenix, AZ"
units: 32
purchase_price: 8500000
closing_costs: 127500  # 1.5%
capex_budget: 640000   # $20K/unit
total_project_cost: 9267500

financing:
  loan_amount: 6375000  # 75% LTC
  interest_rate: 0.0725
  term_months: 60
  io_months: 24

equity:
  total: 2892500
  lp_percent: 0.90
  gp_percent: 0.10

operations:
  avg_rent_current: 1350
  avg_rent_stabilized: 1650
  rent_growth: 0.03
  occupancy: 0.93
  opex_ratio: 0.42

exit:
  hold_months: 60
  exit_cap: 0.0525
  sale_costs: 0.02

waterfall:
  pref_rate: 0.08
  tiers:
    - {hurdle: 0, lp: 1.0, gp: 0.0}      # ROC + Pref
    - {hurdle: 0.12, lp: 0.70, gp: 0.30} # To 12% IRR
    - {hurdle: 0.18, lp: 0.50, gp: 0.50} # Above 18%
```

#### Tasks
- [ ] Define mock deal assumptions (above)
- [ ] Generate monthly cash flows
- [ ] Calculate waterfall distributions
- [ ] Compute IRR, multiple, cash-on-cash
- [ ] Output to formatted Excel
- [ ] Generate investor summary PDF
- [ ] Run sensitivity analysis

---

### Phase 4: Investor Report Generator
**Goal:** Auto-generate LP reports from model data

#### Report Structure (Blue Heron Standard)
1. Cover Page (branded)
2. Executive Summary (3 bullets)
3. Key Updates
4. Investment Structure Visual
5. Financial Performance (actuals vs budget)
6. Timeline/Milestones
7. Appendix

#### Tasks
- [ ] Build report template (HTML/CSS for weasyprint)
- [ ] Create chart generators (plotly)
- [ ] Build narrative generator (uses Claude API)
- [ ] Assemble PDF from components
- [ ] Add branding customization

---

### Phase 5: Scenario Analysis Engine
**Goal:** Run sensitivities and stress tests

#### Scenarios to Model
- Exit cap rate: ±25bps, ±50bps, ±75bps
- Construction costs: ±5%, ±10%, ±15%
- Rent growth: 0%, 2%, 3%, 4%, 5%
- Hold period: 3yr, 5yr, 7yr
- Interest rates: ±50bps, ±100bps

#### Output
- Sensitivity tables
- Tornado charts
- Break-even analysis
- Scenario comparison matrix

---

## Tooling Setup

### Python Environment
```bash
# Create virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate

# Install all dependencies
pip install \
  openpyxl xlrd xlsxwriter pandas \
  numpy-financial scipy \
  plotly kaleido matplotlib seaborn \
  weasyprint reportlab python-pptx \
  pandera python-dateutil pyyaml
```

### File Structure
```
/home/user/claude-code/
├── CLAUDE.md                    # Project context (this file)
├── scratchpad.md               # Implementation plan
├── README.md
│
├── /reference/                  # Reference materials
│   ├── Blue Heron Sponsor Overview_11.2024.pdf
│   ├── Business Plan.pdf
│   ├── Perennial One Sheet.pdf
│   ├── Sample Investor Report.pdf
│   └── Liora Model.xlsx         # THE KEY FILE
│
├── /src/                        # Source code
│   ├── /parser/                 # Model parsing
│   ├── /generator/              # Model generation
│   ├── /reports/                # Report generation
│   ├── /analysis/               # Scenario analysis
│   └── /utils/                  # Shared utilities
│
├── /templates/                  # Report templates
│   ├── investor_report.html
│   ├── pitch_deck.pptx
│   └── styles.css
│
├── /output/                     # Generated files
│   ├── /models/
│   ├── /reports/
│   └── /analysis/
│
└── /tests/                      # Test files
    └── test_waterfall.py
```

---

## Working Notes

### Liora Model - Key Discoveries

**Dual Entity Structure:**
- LandCo: Land acquisition + horizontal development
- BuildCo: Vertical construction
- Separate financing for each
- Separate waterfalls (Land Equity Waterfall vs main Equity Waterfall)
- Blue Heron keeps 100% of BuildCo profits

**Waterfall Mechanics:**
- Monthly periods (not annual)
- Compound accrual: `=(1+annual_rate)^(1/12)-1`
- 5 tiers with different splits
- JV ON/OFF toggle for scenario modeling
- Pref accrues even when no distributions

**Validation Checks:**
- 40+ checks across Model Checks sheet
- Sources = Uses balance
- Revenue ties to cost
- Cash flow reconciliation
- Waterfall distribution totals

**Hidden Sophistication:**
- Options revenue (42% of lot sales)
- Price participation (20%)
- Phase-based construction timing
- Draw schedules (not just loan amounts)
- 6 floor plans with $/sqft curves

---

## Questions Still Needing Answers

### From Domain Expert (Perennial Founder)

1. **Smell Test Ranges:**
   - LP IRR: What's attractive but believable? (Guess: 12-20%)
   - Equity Multiple: What's "good" for 5yr? (Guess: 1.7-2.2x)
   - GP Promote: What % of total profit is fair? (Guess: 20-35%)

2. **Sensitivity Rankings:**
   - Exit cap rate impact (probably #1)
   - Construction cost impact
   - Sales pace / absorption
   - Interest rate impact
   - Rent/price growth

3. **Failure Modes:**
   - What kills deals?
   - What assumptions are usually wrong?
   - What's NOT in the model that should be?

---

## Mock Deal: Sunrise 32 Units

### Deal Narrative
A 32-unit garden-style apartment complex in Phoenix, AZ. Built in 1985, currently under-managed with below-market rents. Sponsor plans value-add renovation ($20K/unit) to bring rents from $1,350 to $1,650 over 18 months.

### Expected Returns (to calculate)
- Target LP IRR: 15-18%
- Target LP Multiple: 1.8-2.0x
- Target Cash-on-Cash Y1: 4-6%
- Hold Period: 5 years
- Exit Cap: 5.25%

### Why This Deal
- Realistic size for emerging syndicator ICP
- Typical value-add business plan
- Phoenix is active market
- Numbers should pencil to reasonable returns
- Simple enough to model, complex enough to be realistic

---

## Next Actions

When resuming work:

1. **Run dependency install:**
   ```bash
   pip install openpyxl xlrd xlsxwriter pandas numpy-financial scipy plotly kaleido matplotlib seaborn weasyprint reportlab python-pptx pandera python-dateutil pyyaml
   ```

2. **Start with Liora deep parse:**
   ```python
   # Extract full schema from Liora model
   python3 -c "
   from openpyxl import load_workbook
   wb = load_workbook('Liora 60 Lots - Anchor LOI - Underwriting Model_12.12.25_v22.xlsx')
   for sheet in wb.sheetnames:
       ws = wb[sheet]
       print(f'{sheet}: {ws.max_row} rows x {ws.max_column} cols')
   "
   ```

3. **Build the mock deal generator** - Start with Sunrise 32 Units

4. **Generate first investor report** - Use Blue Heron sample as template

---

## Session Log

### Session 1 (Current)
- Analyzed Liora model structure
- Identified 7 areas of modeling sophistication
- Created waterfall_model_generator.py (WIP)
- Documented competitive landscape
- Created CLAUDE.md and scratchpad.md

### Next Session Goals
- Complete Liora model schema extraction
- Fix waterfall_model_generator.py
- Generate Sunrise 32 Units mock deal
- Create investor summary PDF

---

*Last Updated: January 2026*
