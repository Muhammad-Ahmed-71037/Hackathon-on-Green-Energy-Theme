import { useState, useEffect } from 'react';
import { FileText, Share2 } from 'lucide-react';
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
import InstallerMarketplace from '../components/InstallerMarketplace';
// Financing and Impact components (new)
import FinancingPanel from '../components/FinancingPanel';
import ImpactStats from '../components/ImpactStats';
import ReferralShare from '../components/ReferralShare';
import { computeSolarPlan } from '../lib/solar';
import { getOptimizationTips } from '../lib/tips';
import { saveResult } from '../lib/resultsApi';
import { useAuth } from '../context/AuthContext';
import { CITIES } from '../lib/cities';

export default function Dashboard() {
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
  const [tipsSource, setTipsSource] = useState('rules'); // 'rules' | 'ai'
  const [aiLoading, setAiLoading] = useState(false);
  const [resultId, setResultId] = useState(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showGuestLimitModal, setShowGuestLimitModal] = useState(false);
  const [guestCalculationCount, setGuestCalculationCount] = useState(0);

  const GUEST_CALCULATION_LIMIT = 3;

  useEffect(() => {
    if (hasCalculated) {
      // ALWAYS recalculate outputs immediately (fast, local computation)
      const result = computeSolarPlan(inputs);
      setOutputs(result);
      const generatedTips = getOptimizationTips(inputs, result);
      setTips(generatedTips);
      setTipsSource('rules');
      
      // DEBOUNCE AI API calls - wait 2 seconds after user stops sliding
      setAiLoading(true);
      const aiDebounceTimer = setTimeout(() => {
        console.log('🎯 Debounce complete - fetching AI tips...');
        // Try AI tips if configured (non-blocking with timeout)
        const aiTimeout = setTimeout(() => {
          setAiLoading(false);
        }, 10000); // 10 second timeout
        
        import('../lib/aiCoach').then(async (m) => {
          try {
            const ai = await m.generateAiTips(inputs, result);
            if (ai && ai.length) {
              setTips(ai);
              setTipsSource('ai');
            }
          } catch (e) {
            console.log('AI tips not available, using rules');
          } finally {
            clearTimeout(aiTimeout);
            setAiLoading(false);
          }
        }).catch(() => {
          clearTimeout(aiTimeout);
          setAiLoading(false);
        });
      }, 2000); // Wait 2 seconds after last slider change

      // Cleanup: cancel pending AI calls if user changes slider again
      return () => {
        clearTimeout(aiDebounceTimer);
      };
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
    setTipsSource('rules');
    setAiLoading(true);

    // Try AI tips (non-blocking with timeout)
    const aiTimeout = setTimeout(() => {
      setAiLoading(false);
    }, 10000);
    
    try {
      const { generateAiTips } = await import('../lib/aiCoach');
      const ai = await generateAiTips(inputs, result);
      if (ai && ai.length) {
        setTips(ai);
        setTipsSource('ai');
      }
    } catch (e) {
      console.log('AI tips not available:', e.message);
    } finally {
      clearTimeout(aiTimeout);
      setAiLoading(false);
    }

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

    const cityName = CITIES[inputs.city].name;
    const message = `🌞 *EcoSync Solar Calculator Result*

📍 City: ${cityName}
⚡ Monthly Consumption: ${inputs.monthlyUnits} kWh

*Solar Decision:* ${getVerdict()}
🔋 System Size: ${outputs.systemKW} kW
💰 Monthly Savings: Rs ${outputs.monthlySavingsRs.toLocaleString()}
⏱️ Payback: ${outputs.paybackYears} years
📊 5-Year ROI: ${outputs.roi5yr}%
🌱 Eco Score: ${outputs.ecoScore}/100

*Top 3 Tips:*
${tips.slice(0, 3).map((tip, i) => `${i + 1}. ${tip.title}`).join('\n')}

Calculate your solar potential: [Your App Link]`;

    try {
      await navigator.clipboard.writeText(message);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Solar Calculator Dashboard
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Enter your electricity usage data and get personalized solar recommendations
            </p>
            {user && user.isAnonymous && (
              <p className="text-sm text-emerald-400 mt-2">
                Guest Mode: {GUEST_CALCULATION_LIMIT - guestCalculationCount} calculations remaining
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <InputForm inputs={inputs} setInputs={setInputs} onCalculate={handleCalculate} />
            <EcoTips tips={tips} source={tipsSource} loading={aiLoading} />
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

              {/* Call-to-actions */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#installers" className="px-5 py-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl text-center transition-all font-semibold">
                  Get 3 Installer Quotes →
                </a>
                <a href="#financing" className="px-5 py-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl text-center transition-all font-semibold">
                  See Bank Financing Options →
                </a>
              </div>

              {/* Financing Options */}
              <section id="financing" className="mt-12">
                <FinancingPanel outputs={outputs} />
              </section>

              {/* Installer Marketplace */}
              <section id="installers" className="mt-12">
                <InstallerMarketplace city={inputs.city} outputs={outputs} />
              </section>

              {/* Referral share and community impact stats */}
              <section className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <ImpactStats />
                </div>
                <div>
                  <ReferralShare resultId={resultId} outputs={outputs} inputs={inputs} />
                </div>
              </section>
            </>
          )}
        </div>
      </section>

      {showReport && (
        <SmartReportModal
          inputs={inputs}
          outputs={outputs}
          tips={tips}
          onClose={() => setShowReport(false)}
        />
      )}

      {showGuestLimitModal && (
        <GuestLimitModal onClose={() => setShowGuestLimitModal(false)} />
      )}
    </>
  );
}
