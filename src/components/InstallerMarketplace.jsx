import { Star, Phone, MessageCircle, CheckCircle, Award, Clock } from 'lucide-react';
import { getInstallersByCity, calculateLeadValue } from '../lib/installers';
import { useLocale } from '../context/LocaleContext';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function InstallerMarketplace({ city, outputs, onRequestQuote }) {
  const { locale } = useLocale();
  const installers = getInstallersByCity(city);
  const [loadingId, setLoadingId] = useState(null);

  const getVerdict = () => {
    if (outputs.paybackYears < 4) return 'strong';
    if (outputs.paybackYears <= 7) return 'borderline';
    return 'weak';
  };

  const verdict = getVerdict();
  const leadValue = calculateLeadValue(verdict);

  const handleContactInstaller = async (installer, method) => {
    setLoadingId(installer.id);

    const message = `Hi ${installer.name}! I got my solar calculation from EcoSync:
    
📍 City: ${city}
🔋 System Size: ${outputs.systemKW} kW
💰 Budget: Rs ${outputs.capexRs.toLocaleString()}
⚡ Monthly Savings: Rs ${outputs.monthlySavingsRs.toLocaleString()}
🌱 Eco Score: ${outputs.ecoScore}/100

I'm interested in getting a quote. Can we discuss?`;

    if (method === 'whatsapp') {
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${installer.whatsapp}?text=${encodedMessage}`, '_blank');
    } else if (method === 'call') {
      window.location.href = `tel:${installer.phone}`;
    }

    setTimeout(() => {
      setLoadingId(null);
      Swal.fire({
        title: 'Lead Sent! 🎉',
        html: `<p class="text-slate-300">Your request has been sent to <strong>${installer.name}</strong>.</p>
               <p class="text-slate-400 text-sm mt-2">They typically respond within ${installer.avgResponseTime}.</p>
               <p class="text-emerald-400 text-xs mt-4">💰 EcoSync earns Rs ${leadValue} from this referral</p>`,
        icon: 'success',
        confirmButtonText: 'Got it!',
        confirmButtonColor: '#10b981',
        background: '#0f172a',
        color: 'white',
      });
      
      if (onRequestQuote) {
        onRequestQuote(installer, leadValue);
      }
    }, 1000);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {locale === 'en' ? 'Verified Solar Installers' : 'Tasdeeq Shuda Solar Companies'}
          </h2>
          <p className="text-slate-400">
            {locale === 'en' 
              ? 'Get instant quotes from top-rated installers in your city' 
              : 'Apne shehar ki behtereen companies se turant quote hasil karein'}
          </p>
        </div>
        <Award className="text-emerald-400" size={32} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {installers.map((installer) => (
          <div
            key={installer.id}
            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">{installer.name}</h3>
                  {installer.verified && (
                    <CheckCircle className="text-emerald-400" size={18} />
                  )}
                  {installer.greenCertified && (
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">
                      Green Certified
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-yellow-400" size={14} />
                    <span className="font-semibold">{installer.rating}</span>
                    <span className="text-slate-400">({installer.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>Responds in {installer.avgResponseTime}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-slate-400">Specialization:</span>
                    <span className="text-white ml-2">{installer.specialization}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Completed:</span>
                    <span className="text-emerald-400 ml-2 font-semibold">
                      {installer.installationsCompleted}+ projects
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-slate-400">Price Range:</span>
                    <span className="text-white ml-2">{installer.priceRange}</span>
                  </div>
                </div>
              </div>

              <div className="flex md:flex-col gap-2">
                <button
                  onClick={() => handleContactInstaller(installer, 'whatsapp')}
                  disabled={loadingId === installer.id}
                  className="flex-1 md:w-40 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  {loadingId === installer.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <MessageCircle size={16} />
                      <span className="text-sm">WhatsApp</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleContactInstaller(installer, 'call')}
                  disabled={loadingId === installer.id}
                  className="flex-1 md:w-40 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Phone size={16} />
                  <span className="text-sm">Call Now</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-lg p-4">
        <p className="text-sm text-slate-300">
          💡 <strong className="text-white">Pro Tip:</strong> Contact 2-3 installers to compare quotes. 
          {locale === 'en' 
            ? ' All installers are verified and have completed 400+ projects.'
            : ' Sab companies tasdeeq shuda hain aur 400+ projects complete kar chuki hain.'}
        </p>
      </div>
    </div>
  );
}
