import { useEffect, useState } from 'react';
import { Zap, TrendingUp, DollarSign, Calendar, Percent, Leaf } from 'lucide-react';
import { useLocale, labels } from '../context/LocaleContext';

function CountUp({ end, duration = 1000, decimals = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  const formattedValue = decimals === 0
    ? Math.round(count).toLocaleString('en-PK')
    : count.toFixed(decimals);

  return <>{formattedValue}</>;
}

export default function ResultsCards({ outputs }) {
  const { locale } = useLocale();

  const cards = [
    {
      icon: Zap,
      label: labels.systemSize[locale],
      value: outputs.systemKW,
      unit: 'kW',
      color: 'emerald',
      decimals: 2,
    },
    {
      icon: TrendingUp,
      label: labels.monthlyGen[locale],
      value: outputs.monthlyGenKWh,
      unit: 'kWh',
      color: 'blue',
      decimals: 0,
    },
    {
      icon: DollarSign,
      label: labels.savings[locale],
      value: outputs.monthlySavingsRs,
      unit: 'Rs',
      color: 'green',
      decimals: 0,
    },
    {
      icon: Calendar,
      label: labels.payback[locale],
      value: outputs.paybackYears,
      unit: 'years',
      color: 'amber',
      decimals: 1,
    },
    {
      icon: Percent,
      label: labels.roi[locale],
      value: outputs.roi5yr,
      unit: '%',
      color: 'purple',
      decimals: 1,
    },
    {
      icon: Leaf,
      label: labels.co2[locale],
      value: outputs.co2AvoidedKgYear,
      unit: 'kg',
      color: 'teal',
      decimals: 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isRoi = card.label === labels.roi[locale];
        const showBreakeven = isRoi && card.value < 0 && card.value > -10;

        return (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`p-2 bg-${card.color}-500/20 rounded-lg`}>
                <Icon className={`text-${card.color}-400`} size={20} />
              </div>
              <h3 className="text-sm font-medium text-slate-400">{card.label}</h3>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-white">
                <CountUp end={card.value} decimals={card.decimals} />
              </span>
              <span className="text-sm text-slate-400">{card.unit}</span>
            </div>
            {showBreakeven && (
              <p className="text-xs text-slate-500 mt-2">(near break-even)</p>
            )}
            {isRoi && (
              <p className="text-xs text-slate-500 mt-2">
                Payback ≈ {outputs.paybackYears.toFixed(1)} years
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
