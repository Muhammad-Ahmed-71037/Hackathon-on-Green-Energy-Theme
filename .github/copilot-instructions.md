# EcoSync AI Coding Agent Instructions

## Project Overview
EcoSync is a **Pakistani solar calculator SaaS** that helps households and small businesses estimate solar system requirements, savings, and ROI. Built as a hackathon MVP with fundable features, targeting both educated and uneducated users through bilingual support (English/Roman Urdu).

## Architecture

### Tech Stack
- **Frontend**: React 18 + Vite + TypeScript (`.jsx` files, not `.tsx`)
- **Styling**: Tailwind CSS with **glassmorphism design system** (`bg-white/5 backdrop-blur-xl border border-white/10`)
- **Backend**: Firebase (Auth + Firestore) - **recently migrated from Supabase**
- **Routing**: React Router DOM v7
- **Charts**: Recharts
- **Icons**: Lucide React

### Key Design Patterns

#### 1. Context-Based Architecture
- `AuthContext` (`src/context/AuthContext.jsx`): Manages Firebase auth (Google OAuth, email/password, anonymous guests)
- `LocaleContext` (`src/context/LocaleContext.jsx`): Handles English ↔ Urdu toggle with `labels` object
- Both wrap `<App>` in `main.tsx`: `<AuthProvider><LocaleProvider><App /></LocaleProvider></AuthProvider>`

#### 2. Core Calculation Engine
**`src/lib/solar.js`** - `computeSolarPlan(inputs, overrides)`:
- Main business logic for solar calculations
- Uses Pakistan-specific defaults from `src/lib/cities.js` (solar irradiance `H`, tariff `Rs/kWh`, cost `Rs/kW`)
- Returns: `systemKW`, `panelCount`, `monthlyGenKWh`, `monthlySavingsRs`, `capexRs`, `paybackYears`, `roi5yr`, `co2AvoidedKgYear`, `ecoScore`
- **Critical**: Eco score algorithm (0-100) considers daytime usage %, heavy appliance hours, and generation coverage

#### 3. Pakistan-Specific Constants
**`src/lib/cities.js`**: 6 cities (Karachi, Lahore, Islamabad, Quetta, Peshawar, Multan) with:
- `H`: Peak sun hours (e.g., Quetta 5.5, Islamabad 4.8)
- `tariffRsPerKWh`: Electricity rate (Rs 23-26)
- `costPerKW`: Solar system cost (Rs 175k-190k)

#### 4. Firebase Integration
**`src/lib/firebase.js`**:
- Exports: `auth`, `db`, `ts` (serverTimestamp)
- Functions: `loginWithGoogle()`, `loginWithEmail()`, `signUpWithEmail()`, `loginAnonymously()`, `logout()`
- **Security Note**: Firebase config is hardcoded in file (not best practice, but functional for MVP)

**`src/lib/resultsApi.js`**:
- `saveResult(user, inputs, outputs)`: Stores calculations in `results` collection
- `getResultById(id)`: Fetches saved result (used for shareable `/r/:id` URLs)
- `getUserResults(uid)`: Gets user's calculation history

**`src/lib/leaderboardApi.js`**:
- `addToLeaderboard(user, resultId, outputs, city)`: Stores eco scores
- `getLeaderboardByCity(city, limitN)`: Returns top performers per city

#### 5. Guest User Flow
- Anonymous auth with **3-calculation limit** enforced via `localStorage` key: `guest_calculations_${uid}`
- `<GuestLimitModal>` prompts login after limit
- Limits managed in `Home.jsx` `handleCalculate()` function

### Page Structure
- **`/` (Home)**: Landing hero + calculator form + results + leaderboard mini
- **`/leaderboard`**: Full city-based leaderboard with filtering
- **`/r/:id`**: Shareable result page (loads saved calculations)
- **`/login`**: Multi-auth page (Google, email/password, guest mode)

### Component Patterns

#### Glassmorphism Styling
**All cards use consistent pattern**:
```jsx
className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg"
```
For interactive elements: `hover:bg-white/10 transition-colors`

#### Bilingual Labels
Access labels via `useLocale()` hook:
```jsx
const { locale } = useLocale();
// Usage: labels.calculate[locale] → "Calculate" or "Hisab Lagao"
```
**Critical**: Roman Urdu uses simple conversational language, not formal Urdu script. Target is accessibility for all literacy levels.

#### Verdict System (`VerdictCard.jsx`)
Traffic-light decision logic:
- ✅ **Strong Match** (green): `paybackYears < 4`
- 🤔 **Borderline** (yellow): `paybackYears 4-7`
- ❌ **Not Ideal** (red): `paybackYears > 7`

Includes **persona chips** (Home/Shop/School) that adjust explanation text contextually.

#### Smart Report Modal (`SmartReportModal.jsx`)
Generates professional PDF-ready summary for:
- Solar installers (system specs)
- Banks (financial metrics for loans)
- Customers (ROI, savings, top 3 tips)

Uses WhatsApp sharing with pre-formatted message.

## Development Workflows

### Setup & Run
```bash
npm install
npm run dev          # Starts Vite dev server (default: localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run typecheck    # TypeScript validation (no emit)
```

### Environment Variables
Required in `.env` (not tracked in git):
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Testing Calculations
Default test inputs (pre-filled in form):
- City: Karachi (H=5.2, tariff=Rs25/kWh)
- Monthly: 450 kWh
- Heavy hours: 4hrs/day
- Daytime usage: 35%
- Budget: 0 (unlimited)
- Net-metering: OFF

Expected output: ~3.5kW system, Rs 180k capex, ~4-5 year payback

## Critical Conventions

### File Naming
- React components: PascalCase `.jsx` (e.g., `InputForm.jsx`)
- Libraries/utilities: camelCase `.js` (e.g., `solar.js`, `tips.js`)
- **No `.tsx` files** - project uses JSX despite TypeScript config presence

### State Management
- **No global state library** (Redux/Zustand) - uses Context API only
- Results page refetches from Firestore (no client-side cache)
- Input form uses local state that syncs on calculate

### Error Handling
- Firebase errors caught in `try/catch`, logged to console
- No user-facing error toasts currently (uses `console.error`)
- `SweetAlert2` available (`sweetalert2` package) but not heavily used

### Real-time Updates
- `useEffect` in `Home.jsx` recalculates when `budget`, `netMetering`, or `city` changes **only if user has clicked Calculate once** (guarded by `hasCalculated` state)
- This allows sliders to update results live without re-clicking Calculate

## Common Tasks

### Adding a New City
1. Update `src/lib/cities.js` → `CITIES` object with new city data (H, tariff, cost)
2. Update `InputForm.jsx` city dropdown options
3. Test with new city's solar irradiance values

### Modifying Eco Score Algorithm
Edit `src/lib/solar.js` → `computeSolarPlan()` function → eco score section (lines ~60-65)
Current factors:
- +15 for daytime usage ≥50%
- +10 for heavy hours ≤3
- +10 for generation coverage ≥70%

### Adding New AI Tips
Edit `src/lib/tips.js` → `getOptimizationTips(inputs, outputs)`
Tips are condition-based (if/else logic). Always return array of `{ title, body }` objects.

### Firebase Firestore Schema
**`results` collection**:
```javascript
{
  createdBy: string (user.uid),
  name: string (displayName or email),
  city: string,
  monthlyUnits: number,
  heavyHours: number,
  daytimeUsagePct: number,
  budget: number,
  netMetering: boolean,
  outputs: object (computed results),
  createdAt: timestamp
}
```

**`leaderboard` collection**:
```javascript
{
  userId: string,
  name: string,
  city: string,
  ecoScore: number,
  monthlyUnits: number,
  systemKW: number,
  createdAt: timestamp
}
```

## Migration Context
**Recently migrated from Supabase to Firebase** (see `FIREBASE_MIGRATION.md`):
- All `src/lib/supabase.js` references removed
- Replaced Supabase queries with Firestore operations
- User properties changed: `user.id` → `user.uid`, `user.user_metadata.full_name` → `user.displayName`
- If encountering Supabase imports, they should be updated to Firebase equivalents

## Important Reminders
- **Glassmorphism is non-negotiable** - maintains premium dark UI consistency
- **Roman Urdu must be conversational** - avoid formal Urdu script or English transliteration
- **Guest limits are localStorage-based** - clearing browser data resets count (intentional MVP behavior)
- **No server-side rendering** - pure SPA, all calculations client-side
- **Pakistan-centric** - all currency in Rs, all cities Pakistani, solar data localized
