import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

export default function VerdictCard({ outputs }) {
  const [selectedPersona, setSelectedPersona] = useState('home');

  const getVerdict = () => {
    const { paybackYears } = outputs;

    if (paybackYears < 4) {
      return {
        type: 'strong',
        title: 'Strong Match ✅',
        color: 'emerald',
        icon: CheckCircle2,
      };
    } else if (paybackYears <= 7) {
      return {
        type: 'borderline',
        title: 'Borderline 🤔',
        color: 'yellow',
        icon: AlertCircle,
      };
    } else {
      return {
        type: 'notIdeal',
        title: 'Not Ideal ❌',
        color: 'red',
        icon: XCircle,
      };
    }
  };

  const getExplanation = (verdictType) => {
    const personaText = {
      home: 'aap ke ghar',
      shop: 'aap ki dukaan',
      school: 'aap ke school',
    };

    const place = personaText[selectedPersona];

    if (verdictType === 'strong') {
      return `Aapka bill aur payback dekh kar lagta hai ke solar ${place} ke liye strong fit hai. 3–5 saal ke andar investment wapas aa sakti hai.`;
    } else if (verdictType === 'borderline') {
      return `Payback thora lamba hai, lekin agar aap green impact ya future bill increase soch rahe hain to solar ${place} ke liye consider kar sakte hain.`;
    } else {
      return `Is waqt aapka bill itna kam hai ke solar ka payback bohot lamba aa raha hai. Abhi ke liye habits improve karna better hai.`;
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
        <h2 className="text-2xl font-bold text-white">Solar Decision</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSelectedPersona('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedPersona === 'home'
                ? 'bg-emerald-500 text-white'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setSelectedPersona('shop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedPersona === 'shop'
                ? 'bg-emerald-500 text-white'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            Shop
          </button>
          <button
            onClick={() => setSelectedPersona('school')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedPersona === 'school'
                ? 'bg-emerald-500 text-white'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            School
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
          <div className="text-sm text-slate-400 mb-1">System Size</div>
          <div className="text-lg font-bold text-white">
            {outputs.systemKW.toFixed(1)} kW
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-sm text-slate-400 mb-1">Monthly Saving</div>
          <div className="text-lg font-bold text-emerald-400">
            Rs {outputs.monthlySavingsRs.toLocaleString('en-PK')}
          </div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <div className="text-sm text-slate-400 mb-1">Eco Score</div>
          <div className="text-lg font-bold text-white">
            {outputs.ecoScore}/100
          </div>
        </div>
      </div>
    </div>
  );
}
