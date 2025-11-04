import { CheckCircle2, Sparkles, FileText, Globe, Users, TrendingUp } from 'lucide-react';
import { useLocale, labels } from '../context/LocaleContext';

export default function LandingFeatures() {
  const { locale } = useLocale();
  const features = [
    {
      icon: CheckCircle2,
      title: labels.feature1Title[locale],
      description: labels.feature1Desc[locale],
      color: 'emerald',
    },
    {
      icon: Sparkles,
      title: labels.feature2Title[locale],
      description: labels.feature2Desc[locale],
      color: 'blue',
    },
    {
      icon: FileText,
      title: labels.feature3Title[locale],
      description: labels.feature3Desc[locale],
      color: 'purple',
    },
    {
      icon: Globe,
      title: labels.feature4Title[locale],
      description: labels.feature4Desc[locale],
      color: 'amber',
    },
    {
      icon: Users,
      title: labels.feature5Title[locale],
      description: labels.feature5Desc[locale],
      color: 'teal',
    },
    {
      icon: TrendingUp,
      title: labels.feature6Title[locale],
      description: labels.feature6Desc[locale],
      color: 'emerald',
    },
  ];

  return (
    <section id="features" className="bg-gradient-to-b from-slate-900 to-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{labels.landingFeaturesHeading[locale]}</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">{labels.landingFeaturesSub[locale]}</p>
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
