import { Users, TrendingUp, Leaf } from 'lucide-react';

export default function CommunityImpactCard({ outputs }) {
  const yearlySavingForOne = outputs.monthlySavingsRs * 12;
  const yearlySavingForThousand = yearlySavingForOne * 1000;
  const totalCO2ForThousand_kg = outputs.co2AvoidedKgYear * 1000;
  const totalCO2ForThousand_tons = totalCO2ForThousand_kg / 1000;

  return (
    <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center space-x-2 mb-4">
        <Users className="text-emerald-400" size={24} />
        <h2 className="text-xl font-bold text-white">Community Impact</h2>
      </div>

      <p className="text-slate-300 mb-6 leading-relaxed">
        If <span className="text-emerald-400 font-bold">1,000 homes</span> like yours switch to
        solar...
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <TrendingUp className="text-emerald-400" size={20} />
            </div>
            <h3 className="text-sm font-medium text-slate-400">Total Yearly Savings</h3>
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            Rs {yearlySavingForThousand.toLocaleString('en-PK')}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            That's {(yearlySavingForThousand / 1000000).toFixed(1)} million rupees saved per year!
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Leaf className="text-emerald-400" size={20} />
            </div>
            <h3 className="text-sm font-medium text-slate-400">Total CO₂ Reduction</h3>
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            {totalCO2ForThousand_tons.toLocaleString('en-PK')} tons
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Equivalent to planting ~{Math.round(totalCO2ForThousand_tons * 45).toLocaleString('en-PK')} trees per year
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/5">
        <p className="text-xs text-slate-400 leading-relaxed">
          <span className="text-emerald-400 font-semibold">Scale matters:</span> This shows how
          one household's decision can scale up to a city-level impact. Your choice today
          inspires neighbors, reduces grid load, and builds a cleaner Pakistan.
        </p>
      </div>
    </div>
  );
}
