import { FileText, Cpu, Share2 } from 'lucide-react';

export default function LandingHowItWorks() {
  const steps = [
    {
      number: '1',
      icon: FileText,
      title: 'Enter your bill',
      description:
        'Select your city, monthly units, and 2–3 simple details like heavy appliance hours and daytime usage.',
    },
    {
      number: '2',
      icon: Cpu,
      title: 'Get your smart solar plan',
      description:
        'EcoSync calculates recommended system size, savings, payback, EcoScore, and AI tips in under 30 seconds.',
    },
    {
      number: '3',
      icon: Share2,
      title: 'Share in one tap',
      description:
        'Copy a WhatsApp-ready summary or print a smart solar report for your installer, bank, or NGO.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How EcoSync Works</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From bill to solar plan in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <div className="absolute -top-4 left-8 w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {step.number}
                </div>

                <div className="mt-6 mb-4">
                  <div className="inline-flex p-3 bg-emerald-500/20 rounded-lg mb-4">
                    <Icon className="text-emerald-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{step.description}</p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
