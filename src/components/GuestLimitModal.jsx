import { X, Zap, TrendingUp, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function GuestLimitModal({ onClose, calculationCount }) {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/login');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="text-slate-400 hover:text-white" size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full mb-4">
            <Lock className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Guest Limit Reached
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            You've used all <span className="text-emerald-400 font-semibold">{calculationCount} free calculations</span> as a guest
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start space-x-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <Zap className="text-emerald-400 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h3 className="text-white font-semibold text-sm">Unlimited Calculations</h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Calculate as many times as you want
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <TrendingUp className="text-emerald-400 mt-0.5 flex-shrink-0" size={20} />
            <div>
              <h3 className="text-white font-semibold text-sm">Save Your Results</h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Track your progress and compare plans
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSignUp}
            className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-500/25"
          >
            Sign Up for Free
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-medium rounded-xl transition-colors"
          >
            Maybe Later
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          No credit card required • Takes less than 30 seconds
        </p>
      </div>
    </div>
  );
}
