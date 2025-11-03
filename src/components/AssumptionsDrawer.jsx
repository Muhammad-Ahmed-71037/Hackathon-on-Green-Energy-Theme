import { useState, useEffect } from 'react';
import { getCityDefaults } from '../lib/cities';
import { X } from 'lucide-react';

export default function AssumptionsDrawer({ city, onClose }) {
  const defaults = getCityDefaults(city);
  const [assumptions, setAssumptions] = useState({
    H: defaults.H,
    tariffRsPerKWh: defaults.tariffRsPerKWh,
    costPerKW: defaults.costPerKW,
  });

  useEffect(() => {
    const newDefaults = getCityDefaults(city);
    setAssumptions({
      H: newDefaults.H,
      tariffRsPerKWh: newDefaults.tariffRsPerKWh,
      costPerKW: newDefaults.costPerKW,
    });
  }, [city]);

  const resetDefaults = () => {
    const newDefaults = getCityDefaults(city);
    setAssumptions({
      H: newDefaults.H,
      tariffRsPerKWh: newDefaults.tariffRsPerKWh,
      costPerKW: newDefaults.costPerKW,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Assumptions / Farz</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Solar Irradiance (H) - kWh/m²/day
            </label>
            <input
              type="number"
              value={assumptions.H}
              onChange={(e) =>
                setAssumptions((prev) => ({ ...prev, H: Number(e.target.value) }))
              }
              className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Electricity Tariff (Rs/kWh)
            </label>
            <input
              type="number"
              value={assumptions.tariffRsPerKWh}
              onChange={(e) =>
                setAssumptions((prev) => ({
                  ...prev,
                  tariffRsPerKWh: Number(e.target.value),
                }))
              }
              className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              System Cost (Rs per kW)
            </label>
            <input
              type="number"
              value={assumptions.costPerKW}
              onChange={(e) =>
                setAssumptions((prev) => ({
                  ...prev,
                  costPerKW: Number(e.target.value),
                }))
              }
              className="w-full px-4 py-2.5 bg-slate-800 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={resetDefaults}
            className="w-full py-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Reset to Defaults
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Note: These values are editable for testing purposes. Modified values are
          not saved.
        </p>
      </div>
    </div>
  );
}
