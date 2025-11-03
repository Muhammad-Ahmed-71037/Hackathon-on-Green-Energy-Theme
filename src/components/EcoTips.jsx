import { Lightbulb } from 'lucide-react';
import { useLocale, labels } from '../context/LocaleContext';

export default function EcoTips({ tips }) {
  const { locale } = useLocale();

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="text-emerald-400" size={24} />
        <h2 className="text-2xl font-bold text-white">{labels.aiCoach[locale]}</h2>
      </div>

      {tips.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <Lightbulb className="mx-auto mb-4 opacity-50" size={48} />
          <p className="text-sm">
            {labels.clickCalculate[locale]} <span className="text-emerald-400 font-semibold">{labels.calculate[locale]}</span> {labels.toGetTips[locale]}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-sm font-semibold text-emerald-400 mb-1">
                {tip.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{tip.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
