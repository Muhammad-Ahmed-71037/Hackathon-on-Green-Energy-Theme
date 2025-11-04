import { useState } from 'react';
import { Send } from 'lucide-react';
import { useLocale, labels } from '../context/LocaleContext';
import { saveContactMessage } from '../lib/contactApi';

export default function LandingContact() {
  const { locale } = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Save to Firestore
      await saveContactMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to save contact message', err);
      // still show thank you but log error; optionally show toast later
      setSubmitted(true);
    } finally {
      setLoading(false);
      // auto-hide submission state after 3s
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="bg-gradient-to-b from-slate-950 to-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{labels.contactHeading[locale]}</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">{labels.contactSub[locale]}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="inline-flex p-4 bg-emerald-500/20 rounded-full mb-4">
                <Send className="text-emerald-400" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{labels.contactThanksTitle[locale]}</h3>
              <p className="text-slate-400">{labels.contactThanksBody[locale]}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">{labels.fullNameLabel[locale]}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder={labels.placeholderName[locale]}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">{labels.emailLabel[locale]}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder={labels.placeholderEmail[locale]}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">{labels.messageLabel[locale]}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  placeholder={labels.placeholderMessage[locale]}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                aria-busy={loading}
                className={`w-full px-8 py-4 ${loading ? 'bg-emerald-400/70 cursor-wait' : 'bg-emerald-500 hover:bg-emerald-600'} text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2`}
              >
                <Send size={20} />
                <span>{loading ? (locale === 'ur' ? 'Bhej rahe hain...' : 'Sending...') : labels.sendMessage[locale]}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
