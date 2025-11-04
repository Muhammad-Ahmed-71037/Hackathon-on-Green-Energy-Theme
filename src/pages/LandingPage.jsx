import LandingHero from '../components/LandingHero';
import LandingHowItWorks from '../components/LandingHowItWorks';
import LandingFeatures from '../components/LandingFeatures';
import LandingImpact from '../components/LandingImpact';
import LandingContact from '../components/LandingContact';
import { useLocale, labels } from '../context/LocaleContext';

export default function LandingPage() {
  const { locale } = useLocale();
  return (
    <>
      <LandingHero />
      <LandingHowItWorks />
      <LandingFeatures />
      <LandingImpact />
      <LandingContact />

      <footer className="bg-slate-950/50 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 text-sm">{labels.footerLine1[locale]}</p>
          <p className="text-slate-500 text-xs mt-2">{labels.footerLine2[locale]}</p>
        </div>
      </footer>
    </>
  );
}
