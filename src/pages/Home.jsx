import { useState, useEffect } from 'react';
import { FileText, Share2 } from 'lucide-react';
import LandingHero from '../components/LandingHero';
import LandingHowItWorks from '../components/LandingHowItWorks';
import LandingFeatures from '../components/LandingFeatures';
import LandingImpact from '../components/LandingImpact';
import LandingContact from '../components/LandingContact';
import InputForm from '../components/InputForm';
import ResultsCards from '../components/ResultsCards';
import EcoScoreBadge from '../components/EcoScoreBadge';
import EcoTips from '../components/EcoTips';
import ComparisonChart from '../components/ComparisonChart';
import LeaderboardMini from '../components/LeaderboardMini';
import VerdictCard from '../components/VerdictCard';
import SmartReportModal from '../components/SmartReportModal';
import CommunityImpactCard from '../components/CommunityImpactCard';
import GuestLimitModal from '../components/GuestLimitModal';
import { computeSolarPlan } from '../lib/solar';
import { getOptimizationTips } from '../lib/tips';
import { saveResult } from '../lib/resultsApi';
import { useAuth } from '../context/AuthContext';
import { CITIES } from '../lib/cities';

export default function Home() {
  const { user } = useAuth();
  const [inputs, setInputs] = useState({
    city: 'karachi',
    monthlyUnits: 450,
    heavyHours: 4,
    daytimeUsagePct: 35,
    budget: 0,
    netMetering: false,
  });

  const [outputs, setOutputs] = useState(null);
  const [tips, setTips] = useState([]);
  const [resultId, setResultId] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showGuestLimitModal, setShowGuestLimitModal] = useState(false);
  const [guestCalculationCount, setGuestCalculationCount] = useState(0);

  const GUEST_CALCULATION_LIMIT = 3;

  useEffect(() => {
    if (hasCalculated) {
      const result = computeSolarPlan(inputs);
      setOutputs(result);
      const generatedTips = getOptimizationTips(inputs, result);
      setTips(generatedTips);
    }
  }, [inputs.budget, inputs.netMetering, inputs.city, inputs.monthlyUnits, inputs.heavyHours, inputs.daytimeUsagePct, hasCalculated]);

  // Load guest calculation count on mount
  useEffect(() => {
    if (user && user.isAnonymous) {
      const guestKey = `guest_calculations_${user.uid}`;
      const count = parseInt(localStorage.getItem(guestKey) || '0', 10);
      setGuestCalculationCount(count);
    }
  }, [user]);

  const handleCalculate = async () => {
    // Check if user is anonymous (guest) and has reached the limit
    if (user && user.isAnonymous) {
      const guestKey = `guest_calculations_${user.uid}`;
      const currentCount = parseInt(localStorage.getItem(guestKey) || '0', 10);
      
      if (currentCount >= GUEST_CALCULATION_LIMIT) {
        setShowGuestLimitModal(true);
        return;
      }
      
      // Increment the count
      const newCount = currentCount + 1;
      localStorage.setItem(guestKey, newCount.toString());
      setGuestCalculationCount(newCount);
    }

    setHasCalculated(true);
    const result = computeSolarPlan(inputs);
    setOutputs(result);
    const generatedTips = getOptimizationTips(inputs, result);
    setTips(generatedTips);

    if (user && !user.isAnonymous) {
      try {
        const id = await saveResult(user, inputs, result);
        setResultId(id);
      } catch (error) {
        console.error('Failed to save result:', error);
      }
    }
  };

  const handleCopyWhatsApp = async () => {
    const getVerdict = () => {
      if (outputs.paybackYears < 4) return 'Strong Match ✅';
      if (outputs.paybackYears <= 7) return 'Borderline 🤔';
      return 'Not Ideal ❌';
    };

    const getRoiText = () => {
      const roi = outputs.roi5yr;
      if (roi < 0 && roi > -10) return `~${roi.toFixed(1)}% (near break-even)`;
      return `${roi.toFixed(1)}%`;
    };

    const summary = `🌞 EcoSync Solar Plan:

City: ${CITIES[inputs.city]?.name || inputs.city}
Monthly units: ${inputs.monthlyUnits.toLocaleString('en-PK')} kWh
Recommended system: ${outputs.systemKW.toFixed(1)} kW
Expected monthly saving: Rs ${outputs.monthlySavingsRs.toLocaleString('en-PK')}
Estimated payback: ${outputs.paybackYears.toFixed(1)} years
5-year ROI: ${getRoiText()}
EcoScore: ${outputs.ecoScore} / 100

Verdict: ${getVerdict()}

Generated via EcoSync (AI Energy Optimizer)
🔗 ecosync.app`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <>
      <LandingHero />
      <LandingHowItWorks />
      <LandingFeatures />
      <LandingImpact />
      <LandingContact />

      {/* <section id="app-demo" className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Live Demo</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Enter your own bill data below and see your solar plan in real time
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <InputForm inputs={inputs} setInputs={setInputs} onCalculate={handleCalculate} />
            <EcoTips tips={tips} />
          </div>

        {outputs && (
          <>
            <div className="mb-8">
              <VerdictCard outputs={outputs} />
            </div>

            <div className="mb-8">
              <ResultsCards outputs={outputs} />
            </div>

            <div className="mb-8 flex flex-wrap gap-4">
              <button
                onClick={() => setShowReport(true)}
                className="flex-1 min-w-[250px] px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <FileText size={20} />
                <span>Smart Solar Report (Print)</span>
              </button>
              <button
                onClick={handleCopyWhatsApp}
                className="flex-1 min-w-[250px] px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-lg"
              >
                <Share2 size={20} />
                <span>{copySuccess ? '✓ Copied!' : 'Copy WhatsApp Summary'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <EcoScoreBadge score={outputs.ecoScore} />
              <div className="lg:col-span-2">
                <LeaderboardMini
                  city={inputs.city}
                  currentScore={outputs.ecoScore}
                  resultId={resultId}
                />
              </div>
            </div>

            <div className="mb-8">
              <CommunityImpactCard outputs={outputs} />
            </div>

            <ComparisonChart outputs={outputs} />
          </>
        )}
        </div>
      </section> */}

      <footer className="bg-slate-950/50 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400 text-sm">
            EcoSync — AI-Powered Smart Energy Optimization (Hackathon MVP)
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Values are estimates; assumptions are configurable.
          </p>
        </div>
      </footer>

      {showReport && (
        <SmartReportModal
          inputs={inputs}
          outputs={outputs}
          tips={tips}
          onClose={() => setShowReport(false)}
        />
      )}
    </>
  );
}
