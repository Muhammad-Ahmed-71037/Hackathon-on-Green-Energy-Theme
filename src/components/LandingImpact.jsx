import { TrendingUp, Leaf, ArrowDown } from 'lucide-react';
import { useLocale, labels } from '../context/LocaleContext';

export default function LandingImpact() {
  const { locale } = useLocale();
  const scrollToDemo = () => {
    document.getElementById('app-demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="impact" className="bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{labels.impactHeading[locale]}</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">{labels.impactSub[locale]}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-xl border-2 border-emerald-500/30 rounded-3xl p-8 md:p-12 mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{labels.impactIf1000Heading[locale]}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <TrendingUp className="text-emerald-400" size={32} />
                </div>
                <h4 className="text-lg font-semibold text-slate-300">{labels.impactSavingsTitle[locale]}</h4>
              </div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">{labels.impactSavingsValue[locale]}</div>
              <p className="text-sm text-slate-400">{labels.impactSavingsSub[locale]}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <Leaf className="text-emerald-400" size={32} />
                </div>
                <h4 className="text-lg font-semibold text-slate-300">{labels.impactCo2Title[locale]}</h4>
              </div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">{labels.impactCo2Value[locale]}</div>
              <p className="text-sm text-slate-400">{labels.impactCo2Sub[locale]}</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/5">
            <p className="text-slate-300 leading-relaxed text-center">{labels.impactScaleText[locale]}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={scrollToDemo}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20"
          >
            <span>{labels.scrollToDemoText[locale]}</span>
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
