import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getResultById } from '../lib/resultsApi';
import ResultsCards from '../components/ResultsCards';
import EcoScoreBadge from '../components/EcoScoreBadge';
import ComparisonChart from '../components/ComparisonChart';
import { ArrowLeft } from 'lucide-react';

export default function ResultPage() {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadResult();
  }, [id]);

  const loadResult = async () => {
    try {
      setLoading(true);
      const data = await getResultById(id);
      if (!data) {
        setError('Result not found');
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error('Failed to load result:', err);
      setError('Failed to load result');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">{error || 'Result not found'}</div>
          <Link
            to="/"
            className="text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Saved Result</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Name:</span>
              <span className="text-white ml-2">{result.name}</span>
            </div>
            <div>
              <span className="text-slate-400">City:</span>
              <span className="text-white ml-2">{result.city}</span>
            </div>
            <div>
              <span className="text-slate-400">Monthly Units:</span>
              <span className="text-white ml-2">{result.monthly_units} kWh</span>
            </div>
            <div>
              <span className="text-slate-400">Net Metering:</span>
              <span className="text-white ml-2">
                {result.net_metering ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <ResultsCards outputs={result.outputs} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <EcoScoreBadge score={result.outputs.ecoScore} />
        </div>

        <ComparisonChart outputs={result.outputs} />
      </div>
    </div>
  );
}
