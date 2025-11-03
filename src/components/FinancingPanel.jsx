import { Banknote, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { calculateLoanOptions, getSubsidyEligibility } from '../lib/financing';

export default function FinancingPanel({ outputs }) {
  if (!outputs) return null;

  const options = calculateLoanOptions(outputs.capexRs, outputs).slice(0, 4);
  const subsidy = getSubsidyEligibility(outputs.systemKW);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Bank Financing Options</h2>
          <p className="text-slate-400">Compare EMI with your monthly solar savings — if EMI &lt; savings, it's a win.</p>
        </div>
        <Banknote className="text-emerald-400" size={32} />
      </div>

      {/* Subsidy Notice */}
      <div className={`mb-6 rounded-xl p-4 border ${subsidy.eligible ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
        <div className="flex items-start gap-3">
          <ShieldCheck className={subsidy.eligible ? 'text-emerald-400' : 'text-yellow-400'} size={18} />
          <div>
            <p className="text-sm text-white font-semibold">Government Green Energy Subsidy</p>
            <p className="text-xs text-slate-300 mt-1">{subsidy.reason}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((opt, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{opt.logo}</span>
                <h3 className="text-white font-semibold">{opt.bank}</h3>
              </div>
              {opt.emiVsSavings && (
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-full flex items-center gap-1">
                  <CheckCircle2 size={14} /> EMI &lt; Savings
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-slate-400">EMI</div>
              <div className="text-white font-medium text-right">Rs {opt.emi.toLocaleString()}</div>
              <div className="text-slate-400">Tenure</div>
              <div className="text-white text-right">{opt.tenure} years</div>
              <div className="text-slate-400">Down Payment</div>
              <div className="text-white text-right">Rs {opt.downPayment.toLocaleString()}</div>
              <div className="text-slate-400">Subsidy</div>
              <div className="text-emerald-300 text-right">Rs {opt.subsidyAmount.toLocaleString()}</div>
            </div>
            {opt.emiVsSavings && (
              <div className="mt-3 text-xs text-emerald-300">After EMI, net monthly savings ≈ Rs {opt.netMonthlySavings.toLocaleString()}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
