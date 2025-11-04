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
  // Landing page labels
  heroTitlePart1: {
    en: 'Turn your electricity bill into a',
    ur: 'Apne bijli bill ko ek'
  },
  heroHighlight: { en: 'solar plan', ur: 'solar plan' },
  heroFull: {
    en: 'Turn your electricity bill into a solar plan in 30 seconds.',
    ur: 'Apne bijli bill ko kam karein sirf 30 seconds mein ek solar plan ke saath.'
  },
  heroSubtitle: {
    en: "EcoSync helps homes, shops, and schools in Pakistan see if solar is really worth it — using a simple, Urdu-friendly AI dashboard.",
    ur: "EcoSync madad karta hai gharon, dukanon aur schools ko Pakistan mein dekhne ke liye ke solar faida mand hai — seedha, Roman Urdu friendly AI dashboard ke saath."
  },
  startCalculating: { en: 'Start Calculating →', ur: 'Hisab Shuru Karein →' },
  howItWorksButton: { en: 'How it works', ur: 'Yeh kaise kaam karta hai' },
  landingHowHeading: { en: 'How EcoSync Works', ur: 'EcoSync Kaam Kaise Karta Hai' },
  landingHowSub: { en: 'From bill to solar plan in three simple steps', ur: 'Bill se solar plan tak, sirf 3 seedhay qadam' },
  // How it works steps
  howStep1Title: { en: 'Enter your bill', ur: 'Apna bill daalein' },
  howStep1Desc: {
    en: 'Select your city, monthly units, and 2–3 simple details like heavy appliance hours and daytime usage.',
    ur: 'Apna shehar, mahana units, aur 2-3 asaan sawalat jese heavy appliance hours aur daytime usage darj karein.'
  },
  howStep2Title: { en: 'Get your smart solar plan', ur: 'Apna smart solar plan hasil karein' },
  howStep2Desc: {
    en: 'EcoSync calculates recommended system size, savings, payback, EcoScore, and AI tips in under 30 seconds.',
    ur: 'EcoSync recommended system size, savings, payback, EcoScore, aur AI tips 30 seconds ke andar batata hai.'
  },
  howStep3Title: { en: 'Share in one tap', ur: 'Ek tap mein share karein' },
  howStep3Desc: {
    en: 'Copy a WhatsApp-ready summary or print a smart solar report for your installer, bank, or NGO.',
    ur: 'WhatsApp-ready summary copy karein ya installer/bank/NGO ke liye print-ready report nikalein.'
  },
  landingFeaturesHeading: { en: 'Why EcoSync?', ur: 'Kyun EcoSync?' },
  landingFeaturesSub: { en: "Built for Pakistan's energy reality, designed for everyone", ur: 'Pakistan ke haalaat ke mutabiq, sab ke liye design kia gaya' },
  // Feature tiles
  feature1Title: { en: 'Solar Decision Engine', ur: 'Solar Decision Engine' },
  feature1Desc: {
    en: 'Strong Match / Borderline / Not Ideal verdict with simple Roman Urdu explanations. No technical jargon.',
    ur: 'Strong Match / Borderline / Not Ideal faisla, seedhi Roman Urdu explanation ke saath. Technical bolchal se pare.'
  },
  feature2Title: { en: 'AI Energy Coach', ur: 'AI Energy Mashwara' },
  feature2Desc: {
    en: 'Personalised tips on when to run AC, laundry, and heavy loads to match solar hours and cut waste.',
    ur: 'AI tips batata hai kab AC, laundry aur heavy load chalana behtareen hai taake solar ka faida mile.'
  },
  feature3Title: { en: 'Paperless Proposal', ur: 'Paperless Proposal' },
  feature3Desc: {
    en: 'Smart Solar Report and Copy WhatsApp Summary replace handwritten notes and multi-page Excel proposals.',
    ur: 'Smart Solar Report aur WhatsApp summary handwritten notes aur lambi Excel proposals ko replace karta hai.'
  },
  feature4Title: { en: 'Urdu + English Friendly', ur: 'Urdu + English Friendly' },
  feature4Desc: {
    en: 'Form labels and helper text in simple English and Roman Urdu so anyone can use it.',
    ur: 'Form labels aur helper text simple English aur Roman Urdu mein, taake har koi use kar sake.'
  },
  feature5Title: { en: 'For Home / Shop / School', ur: 'Ghar / Dukan / School ke liye' },
  feature5Desc: {
    en: "Persona toggle (Home / Shop / School) so the advice fits the user's context.",
    ur: 'Persona toggle (Home / Shop / School) taake mashwara context ke mutabiq ho.'
  },
  feature6Title: { en: 'Community Impact', ur: 'Community Impact' },
  feature6Desc: {
    en: 'Shows how 1,000 homes like yours can save crores of rupees and thousands of tons of CO₂ every year.',
    ur: 'Dikhata hai ke 1000 ghar aap jese kitna paisa aur CO2 bacha sakte hain har saal.'
  },
  // Impact section
  impactHeading: { en: 'From one home to a greener city', ur: 'Ek ghar se greener shehar tak' },
  impactSub: {
    en: 'EcoSync can be used by individuals to check if solar is worth it, by installers to generate quick standardised proposals, and by schools/NGOs to model impact across hundreds of homes.',
    ur: 'EcoSync ko individuals apni solar viability dekhne ke liye istemal kar sakte hain, installers quick proposals ke liye, aur schools/NGOs scale impact model kar sakte hain.'
  },
  impactIf1000Heading: { en: 'If 1,000 homes like yours switch to solar...', ur: 'Agar 1000 ghar aap jese solar lein...' },
  impactSavingsTitle: { en: 'Total Yearly Savings', ur: 'Kul Saalana Bachat' },
  impactSavingsValue: { en: 'Rs 135,000,000', ur: 'Rs 135,000,000' },
  impactSavingsSub: { en: "That's 13.5 crore rupees saved on electricity bills every year", ur: 'Yani 13.5 crore rupay har saal bijli ke bills par bachte hain' },
  impactCo2Title: { en: 'Total CO₂ Reduction', ur: 'Kul CO₂ Kami' },
  impactCo2Value: { en: '7,440 tons', ur: '7,440 tons' },
  impactCo2Sub: { en: 'Equivalent to planting ~334,800 trees per year', ur: 'Takriban 334,800 darakht har saal ke barabar' },
  impactScaleText: { en: 'Scale matters: This shows how one household\'s decision can scale up to a city-level impact. Your choice today inspires neighbors, reduces grid load, and builds a cleaner Pakistan.', ur: 'Scale zaroori hai: Yeh dikhata hai ke aik ghar ka faisla shehar tak asar rakh sakta hai. Aapka faisla dusron ko inspire karta hai, grid load kam karta hai, aur Pakistan ko saaf banata hai.' },
  scrollToDemoText: { en: 'Scroll down to try EcoSync live with your own bill', ur: 'Neeche scroll karke apne bill ke saath EcoSync try karein' },
  contactHeading: { en: 'Contact Us', ur: 'Hum se Rabta Karein' },
  contactSub: { en: "For pilots, collaborations, or feedback, reach out and we'll get back to you.", ur: 'Pilots, collaborations, ya feedback ke liye rabta karein, hum jawab denge.' },
  sendMessage: { en: 'Send Message', ur: 'Paigham bhejein' },
  contactThanksTitle: { en: 'Thanks for reaching out!', ur: 'Rabtay ka shukriya!' },
  contactThanksBody: { en: "This is a demo contact form for the hackathon. In production, we'd get back to you shortly.", ur: 'Yeh demo contact form hai. Production mein hum jald rabta karenge.' },
  placeholderName: { en: 'Your name', ur: 'Aap ka naam' },
  placeholderEmail: { en: 'your@email.com', ur: 'aap@email.com' },
  placeholderMessage: { en: 'How can we help?', ur: 'Hum madad kaise kar sakte hain?' },
  fullNameLabel: { en: 'Full Name', ur: 'Pura Naam' },
  emailLabel: { en: 'Email Address', ur: 'Email Address' },
  messageLabel: { en: 'Message', ur: 'Paigham' },
  footerLine1: { en: 'EcoSync — AI-Powered Smart Energy Optimization (Hackathon MVP)', ur: 'EcoSync — AI Se Chalne Wala Smart Energy Optimization (Hackathon MVP)' },
  footerLine2: { en: 'Values are estimates; assumptions are configurable.', ur: 'Qeematain andaaze hain; farz ko badla ja sakta hai.' },
  // Verdict / Decision card
  verdictSectionTitle: { en: 'Solar Decision', ur: 'Solar Faisla' },
  verdictStrongTitle: { en: 'Strong Match ✅', ur: 'Mazboot Mutabiqat ✅' },
  verdictBorderlineTitle: { en: 'Borderline 🤔', ur: 'Beech Ka Faisla 🤔' },
  verdictNotIdealTitle: { en: 'Not Ideal ❌', ur: 'Munasib Nahi ❌' },
  personaHome: { en: 'home', ur: 'aap ke ghar' },
  personaShop: { en: 'shop', ur: 'aap ki dukaan' },
  personaSchool: { en: 'school', ur: 'aap ke school' },
  verdictStrongExplanation: {
    en: 'Your bill and payback show solar is a strong fit for {place}. Expect payback within 3–5 years.',
    ur: 'Aapka bill aur payback dekh kar lagta hai ke solar {place} ke liye strong fit hai. 3–5 saal ke andar investment wapas aa sakti hai.'
  },
  verdictBorderlineExplanation: {
    en: 'Payback is a bit long, but if you value green impact or expect future bill increases, consider solar for {place}.',
    ur: 'Payback thora lamba hai, lekin agar aap green impact ya future bill increase soch rahe hain to solar {place} ke liye consider kar sakte hain.'
  },
  verdictNotIdealExplanation: {
    en: "Right now your bill is low so payback is long; focus on efficiency improvements first.",
    ur: 'Is waqt aapka bill itna kam hai ke solar ka payback bohot lamba aa raha hai. Abhi ke liye habits improve karna better hai.'
  },
  // Small labels used in verdict card stats
  systemSizeLabel: { en: 'System Size', ur: 'System ka Size' },
  monthlySavingLabel: { en: 'Monthly Saving', ur: 'Mahana Bachat' },
  ecoScoreLabel: { en: 'Eco Score', ur: 'Eco Score' },
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
