# EcoSync User Flow Documentation

## Complete Demo Flow (Guest-First Experience)

### Step-by-Step User Journey

#### 1. **Landing on EcoSync**
```
User opens app → Sees two-column layout:
├── Left: "Energy Input" form (or "Bijli Ka Data" in Urdu)
└── Right: "AI Energy Coach" placeholder
```

**Initial State:**
- Form is pre-filled with sensible defaults:
  - City: Karachi
  - Monthly Units: 450 kWh
  - Heavy Appliance Hours: 4 hours/day
  - Daytime Usage: 35%
  - Budget: 0 Rs (no limit)
  - Net-Metering: OFF
- AI Coach shows: "Click Calculate to get personalized energy optimization tips"
- No results displayed yet

#### 2. **User Reviews/Adjusts Inputs**
```
User can modify:
├── City dropdown (6 Pakistani cities)
├── Monthly Units (number input)
├── Heavy Appliance Hours (number input)
├── Daytime Usage % (slider, shows current value)
├── Budget (slider, shows Rs amount)
└── Net-Metering (toggle switch)
```

**Helper Text:**
- "If you don't know exact values, keep the defaults — EcoSync will still estimate your solar potential."
- (Urdu: "Agar exact numbers nahi pata to defaults rehne dein — EcoSync phir bhi aap ke liye solar ka andaaza nikal dega.")

#### 3. **User Clicks Calculate**
```
On Calculate button click:
├── Runs computeSolarPlan(inputs) → generates outputs
├── Displays 6 KPI cards (with count-up animation)
├── Shows Eco Efficiency Score (0-100) with color-coded badge
├── Generates 3-5 AI tips based on inputs + outputs
├── Shows Top Performers mini leaderboard (3 entries)
└── Displays Grid vs Solar cost comparison chart
```

**Outputs Displayed:**
1. **System Size** (kW)
2. **Monthly Generation** (kWh)
3. **Monthly Savings** (Rs)
4. **Payback Period** (years)
5. **5-Year ROI** (%)
6. **CO₂ Avoided** (kg/year)

#### 4. **Real-Time "What-If" Scenarios**
```
After first calculation:
User adjusts Budget slider or Net-Metering toggle
  ↓
App automatically recalculates (no need to click Calculate again)
  ↓
All outputs update in real-time:
├── KPI cards refresh
├── Eco Score updates
├── AI tips regenerate
├── Chart redraws
└── Leaderboard updates with new score
```

**Automatic Recalculation Triggers:**
- Budget slider changes
- Net-Metering toggle
- City selection
- Monthly Units input
- Heavy Hours input
- Daytime Usage slider

#### 5. **AI Energy Coach Tips**
```
Based on user behavior, shows personalized tips:

IF daytimeUsagePct < 40:
  → "Shift Usage to Solar Hours"
     Move laundry/ironing to 11 AM–3 PM

IF heavyHours > 4:
  → "Reduce Heavy Appliance Runtime"
     Set AC to 26°C, use ceiling fans

IF paybackYears > 4:
  → "Optimize System Size"
     Right-size or enable net-metering

IF ecoScore >= 80:
  → "Excellent Efficiency!"
     Keep up the good work

IF ecoScore < 60:
  → "Boost Your Eco Score"
     Increase daytime usage, reduce AC hours

ALWAYS:
  → "Panel Maintenance"
     Clean panels monthly for 3-5% efficiency gain
```

#### 6. **Eco Efficiency Score Badge**
```
Color-coded scoring:
├── 0-59:  Red/Amber    → "Needs Improvement"
├── 60-79: Yellow       → "Good"
└── 80-100: Emerald Green → "Excellent!"
```

#### 7. **Grid vs Solar Chart**
```
X-axis: M1 to M12 (12 months)
Y-axis: Cost in Rs

Two lines:
├── Red Line (Grid Cost):
│   baselineMonthlyBillRs (constant)
│
└── Green Line (Solar Cost):
    baselineMonthlyBillRs - monthlySavingsRs (clamped to >= 0)

Updates automatically when outputs change
```

#### 8. **Top Performers Mini Leaderboard**
```
Shows 3 demo entries:
1. Ali – Karachi – 82
2. Sara – Lahore – 76
3. Ahmed – Islamabad – 71

Buttons:
├── "Add Me to Leaderboard" → Shows toast:
│   "In the full version, this will add your EcoScore to the leaderboard."
└── "View Full Leaderboard" → Navigate to /leaderboard page
```

#### 9. **Full Leaderboard Page**
```
Access: Click navbar "Leaderboard" link or mini card button

Features:
├── City filter dropdown (All Cities + 6 cities)
├── Shows 8 demo entries
├── Filters list by selected city
├── Displays rank medals (🏆 Gold, 🥈 Silver, 🥉 Bronze)
└── Empty state: "No entries yet. Be the first to join!"

Demo Data:
1. Ali – Karachi – 82
2. Sara – Lahore – 76
3. Ahmed – Islamabad – 71
4. Fatima – Karachi – 68
5. Hassan – Multan – 65
6. Aisha – Peshawar – 62
7. Usman – Lahore – 58
8. Zara – Quetta – 55
```

#### 10. **Login Flow (Hackathon MVP)**
```
User clicks "Login" in navbar
  ↓
Navigates to /login page (full-screen)
  ↓
Shows beautiful split-screen design:

LEFT SIDE:
├── "Join the Energy Revolution"
├── 4 feature cards:
│   ├── Smart Analysis (Zap icon)
│   ├── Save Money (TrendingUp icon)
│   ├── Leaderboard (Users icon)
│   └── Go Green (Leaf icon)
└── Security badges

RIGHT SIDE:
├── "Welcome Back" headline
├── Google OAuth button (disabled)
├── Email/Password inputs (disabled)
├── Info box: "Hackathon MVP - Guest Mode"
│   "In the full version, you'll be able to sign in with Google..."
├── "Continue as Guest" button → Returns to dashboard
└── Terms & Privacy links

NavBar is hidden on /login page
```

**Login UX Notes:**
- NO mandatory login
- NO broken functionality
- Clear explanation of guest mode
- Professional "coming soon" design
- Easy return to dashboard

#### 11. **Language Toggle**
```
Click EN/UR button in navbar:
├── "Energy Input" ↔ "Bijli Ka Data"
├── "AI Energy Coach" ↔ "AI Energy Mashwara"
├── All form labels translate
└── Helper text translates

Current support: English + Roman Urdu
```

#### 12. **Assumptions Drawer**
```
Click "Assumptions / Farz" button in form
  ↓
Opens modal showing city-specific constants:
├── Solar Irradiance (H) - kWh/m²/day
├── Electricity Tariff - Rs/kWh
└── System Cost - Rs per kW

User can edit for testing
"Reset to Defaults" button restores original values
```

---

## Key Calculation Logic

### Solar System Sizing
```javascript
avgDailyUse = monthlyUnits / 30
baseSystemKW = avgDailyUse / (H × PR)

// H = city-specific solar irradiance
// PR = performance ratio (0.75)

if (budget > 0) {
  systemKW = min(baseSystemKW, budget / costPerKW)
}

systemKW = clamp(systemKW, 1, 50)  // 1-50 kW range
```

### Monthly Generation
```javascript
monthlyGenKWh = systemKW × H × PR × 30
```

### Savings Calculation
```javascript
baseSavingsKWh = min(monthlyUnits, monthlyGenKWh)
monthlySavingsRs = baseSavingsKWh × tariffRsPerKWh

if (netMetering && monthlyGenKWh > monthlyUnits) {
  surplus = monthlyGenKWh - monthlyUnits
  monthlySavingsRs += surplus × tariffRsPerKWh × 0.75  // 75% export rate
}
```

### Financial Metrics
```javascript
capexRs = systemKW × costPerKW
annualSavings = monthlySavingsRs × 12
paybackYears = capexRs / annualSavings
roi5yr = ((monthlySavingsRs × 60) - capexRs) / capexRs × 100
```

### Environmental Impact
```javascript
co2AvoidedKgYear = monthlyGenKWh × 12 × 0.62  // kg CO₂ per kWh
```

### Eco Score Algorithm
```javascript
score = 50  // base score

if (daytimeUsagePct >= 50) score += 15
if (heavyHours <= 3) score += 10
if (monthlyGenKWh >= 0.7 × monthlyUnits) score += 10

score = clamp(score, 0, 100)
```

---

## City-Specific Data

| City | H (kWh/m²/day) | Tariff (Rs/kWh) | Cost/kW (Rs) |
|------|----------------|-----------------|--------------|
| Karachi | 5.2 | 25 | 180,000 |
| Lahore | 5.0 | 26 | 175,000 |
| Islamabad | 4.8 | 24 | 185,000 |
| Quetta | 5.5 | 23 | 190,000 |
| Peshawar | 4.9 | 24 | 180,000 |
| Multan | 5.3 | 25 | 175,000 |

---

## Flow Summary

```
1. User lands → Sees form + AI coach placeholder
2. User fills/keeps defaults → Has meaningful starting values
3. User clicks Calculate → All results appear (KPIs, score, tips, chart)
4. User adjusts sliders → Results auto-update in real-time
5. User explores tips → Gets personalized optimization advice
6. User views chart → Understands cost savings visually
7. User checks leaderboard → Sees community engagement
8. User clicks Login → Sees professional "coming soon" page
9. User continues as guest → Returns to dashboard
10. Entire flow works without authentication
```

**No Broken Flows • No Forced Login • No Empty States**

The app is a complete, functional demo that showcases solar optimization with real calculations, AI insights, and a premium UX.
