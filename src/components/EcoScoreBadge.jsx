import { useLocale, labels } from '../context/LocaleContext';

export default function EcoScoreBadge({ score }) {
  const { locale } = useLocale();

  const getColor = () => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10';
    if (score >= 60) return 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10';
    return 'text-red-400 border-red-500/50 bg-red-500/10';
  };

  const getMessage = () => {
    if (score >= 80) return 'Excellent!';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg flex flex-col items-center justify-center">
      <h3 className="text-sm font-medium text-slate-400 mb-4">
        {labels.ecoScore[locale]}
      </h3>
      <div
        className={`relative w-32 h-32 rounded-full border-4 ${getColor()} flex items-center justify-center`}
      >
        <div className="text-center">
          <div className="text-4xl font-bold">{score}</div>
          <div className="text-xs opacity-80">/ 100</div>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-300">{getMessage()}</p>
    </div>
  );
}
