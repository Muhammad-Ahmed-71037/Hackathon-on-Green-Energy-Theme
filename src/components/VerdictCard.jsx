import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useLocale, labels } from '../context/LocaleContext';

export default function VerdictCard({ outputs }) {
  const [selectedPersona, setSelectedPersona] = useState('home');
  const { locale } = useLocale();

  const getVerdict = () => {
    const { paybackYears } = outputs;

    if (paybackYears < 4) {
      return {
        type: 'strong',
        title: labels.verdictStrongTitle[locale],
        color: 'emerald',
        icon: CheckCircle2,
      };
    } else if (paybackYears <= 7) {
      return {
        type: 'borderline',
        title: labels.verdictBorderlineTitle[locale],
        color: 'yellow',
        icon: AlertCircle,
      };
    } else {
      return {
        type: 'notIdeal',
        title: labels.verdictNotIdealTitle[locale],
        color: 'red',
        icon: XCircle,
      };
    }
  };

  const getExplanation = (verdictType) => {
    const personaText = {
      home: labels.personaHome[locale],
      shop: labels.personaShop[locale],
      school: labels.personaSchool[locale],
    };

    const place = personaText[selectedPersona];

    if (verdictType === 'strong') {
      return labels.verdictStrongExplanation[locale].replace('{place}', place);
    } else if (verdictType === 'borderline') {
      return labels.verdictBorderlineExplanation[locale].replace('{place}', place);
    } else {
      return labels.verdictNotIdealExplanation[locale];
    }
  };

  const verdict = getVerdict();
  const Icon = verdict.icon;

  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      iconBg: 'bg-emerald-500/20',
    },
    yellow: {
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      iconBg: 'bg-yellow-500/20',
    },
    red: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      text: 'text-red-400',
      iconBg: 'bg-red-500/20',
    },
  };

  const colors = colorClasses[verdict.color];


  return (
    <div className={`bg-white/5 backdrop-blur-xl border-2 ${colors.border} rounded-2xl p-6 shadow-xl`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{labels.verdictSectionTitle[locale]}</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedPersona('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedPersona === 'home'
                ? 'bg-emerald-500 text-white'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
            >
            {labels.personaHome[locale]}
          </button>
          <button
            onClick={() => setSelectedPersona('shop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedPersona === 'shop'
                ? 'bg-emerald-500 text-white'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
            >
            {labels.personaShop[locale]}
          </button>
          <button
            onClick={() => setSelectedPersona('school')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedPersona === 'school'
                ? 'bg-emerald-500 text-white'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
            >
            {labels.personaSchool[locale]}
          </button>
        </div>
      </div>

      <div className={`${colors.bg} border ${colors.border} rounded-xl p-6`}>
        <div className="flex items-center space-x-4 mb-4">
          <div className={`${colors.iconBg} p-3 rounded-full`}>
            <Icon className={colors.text} size={32} />
          </div>
          <div>
            <h3 className={`text-3xl font-bold ${colors.text}`}>
              {verdict.title}
            </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Payback Period: {outputs.paybackYears.toFixed(1)} years
                </p>
          </div>
        </div>

            <p className="text-slate-300 leading-relaxed">
              {getExplanation(verdict.type)}
            </p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm text-slate-400 mb-1">{labels.systemSizeLabel[locale]}</div>
          <div className="text-lg font-bold text-white">
            {outputs.systemKW.toFixed(1)} kW
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm text-slate-400 mb-1">{labels.monthlySavingLabel[locale]}</div>
          <div className="text-lg font-bold text-emerald-400">
            Rs {outputs.monthlySavingsRs.toLocaleString('en-PK')}
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm text-slate-400 mb-1">{labels.ecoScoreLabel[locale]}</div>
          <div className="text-lg font-bold text-white">
            {outputs.ecoScore}/100
          </div>
        </div>
      </div>
    </div>
  );
}
