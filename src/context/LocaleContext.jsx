import { createContext, useContext, useState } from 'react';

const LocaleContext = createContext();

export const labels = {
  energyInput: { en: 'Energy Input', ur: 'Bijli Ka Data' },
  city: { en: 'City', ur: 'Shehar' },
  monthlyUnits: { en: 'Monthly Units (kWh)', ur: 'Mahinay ke Units (kWh)' },
  heavyHours: { en: 'Heavy Appliance Hours/Day', ur: 'Bhari Machines ke Ghantay / din' },
  daytimeUsage: { en: 'Daytime Usage %', ur: 'Din ke Waqt ka Istemaal (%)' },
  budget: { en: 'Budget (PKR)', ur: 'Budget (Rs)' },
  netMetering: { en: 'Net-Metering', ur: 'Net-Metering' },
  calculate: { en: 'Calculate', ur: 'Hisab Lagao' },
  assumptions: { en: 'Assumptions', ur: 'Farz' },
  helperText: {
    en: "If you don't know exact values, keep the defaults — EcoSync will still estimate your solar potential.",
    ur: "Agar exact numbers nahi pata to defaults rehne dein — EcoSync phir bhi aap ke liye solar ka andaaza nikal dega."
  },
  systemSize: { en: 'System Size', ur: 'System ka Size' },
  monthlyGen: { en: 'Monthly Generation', ur: 'Mahana Paidawar' },
  savings: { en: 'Monthly Savings', ur: 'Mahana Bachat' },
  payback: { en: 'Payback Period', ur: 'Wapsi ka Waqt' },
  roi: { en: '5-Year ROI', ur: '5-Sala ROI' },
  co2: { en: 'CO₂ Avoided/Year', ur: 'CO₂ Bachao/Sal' },
  ecoScore: { en: 'Eco Efficiency Score', ur: 'Eco Efficiency Score' },
  leaderboard: { en: 'Leaderboard', ur: 'Leaderboard' },
  login: { en: 'Login', ur: 'Login' },
  logout: { en: 'Logout', ur: 'Logout' },
  aiCoach: { en: 'AI Energy Coach', ur: 'AI Energy Mashwara' },
  tips: { en: 'Optimization Tips', ur: 'Behtar Banao' },
  clickCalculate: {
    en: 'Click',
    ur: 'Click karein'
  },
  toGetTips: {
    en: 'to get personalized energy optimization tips',
    ur: 'personalized energy tips ke liye'
  },
};

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('en');

  const toggleLocale = () => {
    setLocale((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
