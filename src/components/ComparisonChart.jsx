import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ComparisonChart({ outputs }) {
  const data = Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    grid: outputs.baselineMonthlyBillRs,
    solar: Math.max(0, outputs.baselineMonthlyBillRs - outputs.monthlySavingsRs),
  }));

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        Grid vs Solar — Monthly Cost
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="grid"
            stroke="#ef4444"
            strokeWidth={2}
            name="Grid Cost (Rs)"
          />
          <Line
            type="monotone"
            dataKey="solar"
            stroke="#10b981"
            strokeWidth={2}
            name="Solar Cost (Rs)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
