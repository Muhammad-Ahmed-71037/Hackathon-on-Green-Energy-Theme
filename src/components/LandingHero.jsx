import { Zap, FileCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingHero() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Turn your electricity bill into a{' '}
              <span className="text-emerald-400">solar plan</span> in 30 seconds.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              EcoSync helps homes, shops, and schools in Pakistan see if solar is really worth
              it — using a simple, Urdu-friendly AI dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/20 text-center"
              >
                Start Calculating →
              </Link>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all backdrop-blur-sm"
              >
                How it works
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <Zap className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    3-step process — no spreadsheets
                  </h3>
                  <p className="text-sm text-slate-400">
                    Enter your bill, get your plan, share in one tap
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <FileCheck className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Paperless solar proposal
                  </h3>
                  <p className="text-sm text-slate-400">
                    Print-ready reports for installers, banks, and NGOs
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <MapPin className="text-emerald-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Designed for Pakistan
                  </h3>
                  <p className="text-sm text-slate-400">
                    City-specific tariffs and sunlight data built in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
