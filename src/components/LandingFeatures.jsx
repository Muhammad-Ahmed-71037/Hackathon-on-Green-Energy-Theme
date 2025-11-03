import { CheckCircle2, Sparkles, FileText, Globe, Users, TrendingUp } from 'lucide-react';

export default function LandingFeatures() {
  const features = [
    {
      icon: CheckCircle2,
      title: 'Solar Decision Engine',
      description:
        'Strong Match / Borderline / Not Ideal verdict with simple Roman Urdu explanations. No technical jargon.',
      color: 'emerald',
    },
    {
      icon: Sparkles,
      title: 'AI Energy Coach',
      description:
        'Personalised tips on when to run AC, laundry, and heavy loads to match solar hours and cut waste.',
      color: 'blue',
    },
    {
      icon: FileText,
      title: 'Paperless Proposal',
      description:
        'Smart Solar Report and Copy WhatsApp Summary replace handwritten notes and multi-page Excel proposals.',
      color: 'purple',
    },
    {
      icon: Globe,
      title: 'Urdu + English Friendly',
      description:
        'Form labels and helper text in simple English and Roman Urdu so anyone can use it.',
      color: 'amber',
    },
    {
      icon: Users,
      title: 'For Home / Shop / School',
      description:
        "Persona toggle (Home / Shop / School) so the advice fits the user's context.",
      color: 'teal',
    },
    {
      icon: TrendingUp,
      title: 'Community Impact',
      description:
        'Shows how 1,000 homes like yours can save crores of rupees and thousands of tons of CO₂ every year.',
      color: 'emerald',
    },
  ];

  return (
    <section id="features" className="bg-gradient-to-b from-slate-900 to-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why EcoSync?</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Built for Pakistan's energy reality, designed for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105 group"
              >
                <div className={`inline-flex p-3 bg-${feature.color}-500/20 rounded-lg mb-4`}>
                  <Icon className={`text-${feature.color}-400`} size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-4">
            All features available in the live demo below — no signup required
          </p>
        </div>
      </div>
    </section>
  );
}
