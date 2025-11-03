import { useState } from 'react';
import { CITIES } from '../lib/cities';
import { useLocale, labels } from '../context/LocaleContext';
import AssumptionsDrawer from './AssumptionsDrawer';

export default function InputForm({ inputs, setInputs, onCalculate }) {
  const { locale } = useLocale();
  const [showAssumptions, setShowAssumptions] = useState(false);

  const handleChange = (field, value) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">{labels.energyInput[locale]}</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {labels.city[locale]}
          </label>
          <select
            value={inputs.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {Object.entries(CITIES).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {labels.monthlyUnits[locale]}
          </label>
          <input
            type="number"
            value={inputs.monthlyUnits}
            onChange={(e) => handleChange('monthlyUnits', Number(e.target.value))}
            className="w-full px-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {labels.heavyHours[locale]}
          </label>
          <input
            type="number"
            value={inputs.heavyHours}
            onChange={(e) => handleChange('heavyHours', Number(e.target.value))}
            className="w-full px-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            min="0"
            max="24"
          />
          <p className="text-xs text-slate-400 mt-1 italic">
            AC, washing machine, iron mila kar roz kitne ghantay chalte hain (andaaza)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {labels.daytimeUsage[locale]}: {inputs.daytimeUsagePct}%
          </label>
          <input
            type="range"
            value={inputs.daytimeUsagePct}
            onChange={(e) => handleChange('daytimeUsagePct', Number(e.target.value))}
            className="w-full accent-emerald-500"
            min="0"
            max="100"
          />
          <p className="text-xs text-slate-400 mt-1 italic">
            Din ke time (10am–5pm) kitna load chalta hai — agar nahi pata, 30–40 rakh dein
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {labels.budget[locale]}: Rs {inputs.budget.toLocaleString()}
          </label>
          <input
            type="range"
            value={inputs.budget}
            onChange={(e) => handleChange('budget', Number(e.target.value))}
            className="w-full accent-emerald-500"
            min="0"
            max="2000000"
            step="50000"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-slate-300">
            {labels.netMetering[locale]}
          </label>
          <button
            onClick={() => handleChange('netMetering', !inputs.netMetering)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              inputs.netMetering ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                inputs.netMetering ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <p className="text-xs text-slate-400 italic mt-4">
          {labels.helperText[locale]}
        </p>

        <button
          onClick={onCalculate}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors mt-4"
        >
          {labels.calculate[locale]}
        </button>

        <button
          onClick={() => setShowAssumptions(true)}
          className="w-full py-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          {labels.assumptions[locale]} / Farz
        </button>
      </div>

      {showAssumptions && (
        <AssumptionsDrawer
          city={inputs.city}
          onClose={() => setShowAssumptions(false)}
        />
      )}
    </div>
  );
}
