import { getCityDefaults } from './cities';

const PR = 0.75;
const PANEL_WATT = 550;
const PANEL_KW = 0.55;

export function computeSolarPlan(inputs, overrides = {}) {
  const {
    city,
    monthlyUnits,
    heavyHours,
    daytimeUsagePct,
    budget = 0,
    netMetering = false,
  } = inputs;

  const cityDefaults = getCityDefaults(city);
  const H = overrides.H ?? cityDefaults.H;
  const tariffRsPerKWh = overrides.tariffRsPerKWh ?? cityDefaults.tariffRsPerKWh;
  const costPerKW = overrides.costPerKW ?? cityDefaults.costPerKW;

  const avgDailyUse = monthlyUnits / 30;
  let baseSystemKW = avgDailyUse / (H * PR);

  let systemKW = baseSystemKW;
  if (budget > 0) {
    const maxSystemKWByBudget = budget / costPerKW;
    systemKW = Math.min(systemKW, maxSystemKWByBudget);
  }

  systemKW = Math.max(1, Math.min(systemKW, 50));

  const panelCount = Math.ceil(systemKW / PANEL_KW);
  const monthlyGenKWh = Math.round(systemKW * H * PR * 30);

  const baselineMonthlyBillRs = Math.round(monthlyUnits * tariffRsPerKWh);

  let baseSavingsKWh = Math.min(monthlyUnits, monthlyGenKWh);
  let monthlySavingsRs = baseSavingsKWh * tariffRsPerKWh;

  if (netMetering && monthlyGenKWh > monthlyUnits) {
    const surplus = monthlyGenKWh - monthlyUnits;
    monthlySavingsRs += surplus * tariffRsPerKWh * 0.75;
  }

  monthlySavingsRs = Math.round(monthlySavingsRs);

  const capexRs = Math.round(systemKW * costPerKW);
  const annualSavings = monthlySavingsRs * 12;
  const paybackYears = annualSavings > 0 ? capexRs / annualSavings : 999;

  const roi5yr = capexRs > 0 ? ((monthlySavingsRs * 60) - capexRs) / capexRs : 0;

  const co2AvoidedKgYear = Math.round(monthlyGenKWh * 12 * 0.62);

  let ecoScore = 50;
  if (daytimeUsagePct >= 50) ecoScore += 15;
  if (heavyHours <= 3) ecoScore += 10;
  if (monthlyGenKWh >= 0.7 * monthlyUnits) ecoScore += 10;
  ecoScore = Math.max(0, Math.min(100, ecoScore));

  return {
    systemKW: parseFloat(systemKW.toFixed(2)),
    panelCount,
    monthlyGenKWh,
    monthlySavingsRs,
    baselineMonthlyBillRs,
    capexRs,
    paybackYears: parseFloat(paybackYears.toFixed(1)),
    roi5yr: parseFloat((roi5yr * 100).toFixed(1)),
    co2AvoidedKgYear,
    ecoScore,
  };
}
