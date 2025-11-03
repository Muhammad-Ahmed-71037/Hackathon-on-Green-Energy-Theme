import { X, Printer } from 'lucide-react';
import { CITIES } from '../lib/cities';

export default function SmartReportModal({ inputs, outputs, tips, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  const getVerdict = () => {
    const { paybackYears } = outputs;
    if (paybackYears < 4) return 'Strong Match ✅';
    if (paybackYears <= 7) return 'Borderline 🤔';
    return 'Not Ideal ❌';
  };

  const getRoiText = () => {
    const roi = outputs.roi5yr;
    if (roi < 0 && roi > -10) {
      return `${roi.toFixed(1)}% (near break-even)`;
    }
    return `${roi.toFixed(1)}%`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto print:max-h-none print:overflow-visible">
        <div className="sticky top-0 bg-slate-900 border-b border-white/10 p-4 flex items-center justify-between print:hidden">
          <h2 className="text-xl font-bold text-white">Smart Solar Report</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium flex items-center space-x-2 transition-colors"
            >
              <Printer size={18} />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="text-slate-400" size={24} />
            </button>
          </div>
        </div>

        <div className="p-8 print:p-12">
          <div className="text-center mb-8 print:mb-12">
            <h1 className="text-4xl font-bold text-emerald-400 mb-2">
              EcoSync Solar Plan
            </h1>
            <p className="text-slate-400">AI-Powered Energy Optimization Report</p>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 print:border-slate-300">
              <h3 className="text-lg font-bold text-white mb-4">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-400">City</div>
                  <div className="text-white font-medium">
                    {CITIES[inputs.city]?.name || inputs.city}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Monthly Consumption</div>
                  <div className="text-white font-medium">
                    {inputs.monthlyUnits.toLocaleString('en-PK')} kWh
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Heavy Appliance Hours/Day</div>
                  <div className="text-white font-medium">{inputs.heavyHours} hours</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Daytime Usage</div>
                  <div className="text-white font-medium">{inputs.daytimeUsagePct}%</div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-500/10 border-2 border-emerald-500/30 rounded-xl p-6 print:border-emerald-500">
              <h3 className="text-lg font-bold text-emerald-400 mb-4">Solar Decision</h3>
              <div className="text-2xl font-bold text-white mb-2">{getVerdict()}</div>
              <div className="text-slate-300">
                Based on your consumption pattern and local conditions
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 print:border-slate-300">
              <h3 className="text-lg font-bold text-white mb-4">Recommended Solar System</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-slate-400 mb-1">System Size</div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {outputs.systemKW.toFixed(2)} kW
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Monthly Generation</div>
                  <div className="text-2xl font-bold text-white">
                    {outputs.monthlyGenKWh.toLocaleString('en-PK')} kWh
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Monthly Savings</div>
                  <div className="text-2xl font-bold text-emerald-400">
                    Rs {outputs.monthlySavingsRs.toLocaleString('en-PK')}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Payback Period</div>
                  <div className="text-2xl font-bold text-white">
                    {outputs.paybackYears.toFixed(1)} years
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">5-Year ROI</div>
                  <div className="text-2xl font-bold text-white">{getRoiText()}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Eco Score</div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {outputs.ecoScore}/100
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 print:border-slate-300">
              <h3 className="text-lg font-bold text-white mb-4">AI Energy Coach Recommendations</h3>
              <div className="space-y-3">
                {tips.slice(0, 3).map((tip, idx) => (
                  <div key={idx} className="border-l-2 border-emerald-500 pl-4">
                    <div className="text-sm font-semibold text-emerald-400 mb-1">
                      {tip.title}
                    </div>
                    <div className="text-sm text-slate-300">{tip.body}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 print:border-slate-300 print:break-before-page">
              <h3 className="text-lg font-bold text-white mb-4">
                For Installer / Bank / Financing
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Recommended system type:</strong> Grid-tied solar with
                    {inputs.netMetering ? ' net-metering' : 'out net-metering'}
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Approximate CAPEX:</strong> Rs{' '}
                    {(outputs.systemKW * CITIES[inputs.city].costPerKW).toLocaleString('en-PK')}
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Expected monthly saving:</strong> Rs{' '}
                    {outputs.monthlySavingsRs.toLocaleString('en-PK')}
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Estimated payback period:</strong> {outputs.paybackYears.toFixed(1)}{' '}
                    years
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>CO₂ reduction:</strong>{' '}
                    {(outputs.co2AvoidedKgYear / 1000).toFixed(2)} tons/year
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  <span>
                    <strong>Solar irradiance (city avg):</strong> {CITIES[inputs.city].H}{' '}
                    kWh/m²/day
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-slate-500 print:border-slate-300">
            <p>
              Generated by <span className="text-emerald-400 font-semibold">EcoSync</span> —
              replaces manual paper proposals
            </p>
            <p className="mt-1">AI-Powered Smart Energy Optimization Platform</p>
          </div>
        </div>
      </div>
    </div>
  );
}
