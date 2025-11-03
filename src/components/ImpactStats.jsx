import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Leaf, Trees, Fuel, BadgeDollarSign } from 'lucide-react';

export default function ImpactStats() {
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({
    monthlySavingsRs: 0,
    monthlyCO2Kg: 0,
    avgEcoScore: 0,
    count: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const q = query(collection(db, 'results'), orderBy('createdAt', 'desc'), limit(50));
        const snap = await getDocs(q);
        let sumSavings = 0;
        let sumCO2Month = 0;
        let sumScore = 0;
        let n = 0;
        snap.forEach((doc) => {
          const d = doc.data();
          if (d?.outputs) {
            sumSavings += d.outputs.monthlySavingsRs || 0;
            // outputs.co2AvoidedKgYear is yearly; convert to monthly
            sumCO2Month += (d.outputs.co2AvoidedKgYear || 0) / 12;
            sumScore += d.outputs.ecoScore || 0;
            n += 1;
          }
        });
        setTotals({
          monthlySavingsRs: Math.round(sumSavings),
          monthlyCO2Kg: Math.round(sumCO2Month),
          avgEcoScore: n ? Math.round(sumScore / n) : 0,
          count: n,
        });
      } catch (e) {
        console.error('Failed to fetch impact stats', e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const treesPerKgYear = 21; // ~21 kg CO2/year per mature tree
  const treesEquivalent = Math.round((totals.monthlyCO2Kg * 12) / treesPerKgYear);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
      {/* Savings Ticker */}
      <div className="mb-6 rounded-xl p-4 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20">
        <div className="flex items-center gap-3">
          <BadgeDollarSign className="text-emerald-400" />
          <p className="text-white font-semibold">
            EcoSync users saved Rs {totals.monthlySavingsRs.toLocaleString()} this month
          </p>
        </div>
        <p className="text-slate-400 text-xs mt-1">
          Based on last {totals.count} calculations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="text-emerald-400" />
            <h4 className="text-white font-semibold">CO₂ Avoided</h4>
          </div>
          <p className="text-2xl font-bold text-white">{totals.monthlyCO2Kg.toLocaleString()} kg/mo</p>
          <p className="text-xs text-slate-400 mt-1">vs grid electricity baseline</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Trees className="text-emerald-400" />
            <h4 className="text-white font-semibold">Trees Equivalent</h4>
          </div>
          <p className="text-2xl font-bold text-white">{treesEquivalent.toLocaleString()}</p>
          <p className="text-xs text-slate-400 mt-1">Annualized equivalence</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Fuel className="text-emerald-400" />
            <h4 className="text-white font-semibold">Avg Eco Score</h4>
          </div>
          <p className="text-2xl font-bold text-white">{totals.avgEcoScore}/100</p>
          <p className="text-xs text-slate-400 mt-1">Community efficiency</p>
        </div>
      </div>
    </div>
  );
}
