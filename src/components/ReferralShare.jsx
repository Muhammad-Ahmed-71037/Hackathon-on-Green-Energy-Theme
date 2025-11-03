import { Share2, Link2 } from 'lucide-react';

export default function ReferralShare({ resultId, outputs, inputs }) {
  const appUrl = window.location.origin;
  const link = resultId ? `${appUrl}/r/${resultId}` : `${appUrl}/dashboard`;

  const shareWhatsApp = async () => {
    const msg = `🌞 EcoSync — Solar Plan
📍 City: ${inputs?.city || ''}
🔋 System: ${outputs?.systemKW || ''} kW
💰 Monthly Savings: Rs ${outputs?.monthlySavingsRs?.toLocaleString()}
⏱️ Payback: ${outputs?.paybackYears} years

Check your plan: ${link}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      alert('Link copied!');
    } catch (e) {}
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
      <h3 className="text-white font-semibold mb-3">Share Your Result</h3>
      <div className="flex gap-2">
        <button
          onClick={shareWhatsApp}
          className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          <Share2 size={16} /> WhatsApp
        </button>
        <button
          onClick={copyLink}
          className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg flex items-center justify-center gap-2 transition-all"
        >
          <Link2 size={16} /> Copy Link
        </button>
      </div>
      <p className="text-xs text-slate-400 mt-3">Invite friends to try EcoSync and compare eco scores.</p>
    </div>
  );
}
