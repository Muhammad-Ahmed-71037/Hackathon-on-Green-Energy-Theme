import { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getLeaderboardByCity, addToLeaderboard } from '../lib/leaderboardApi';
import { useAuth } from '../context/AuthContext';

const DEMO_DATA = [
  { id: 'demo1', name: 'Ali', city: 'karachi', score: 82 },
  { id: 'demo2', name: 'Sara', city: 'lahore', score: 76 },
  { id: 'demo3', name: 'Ahmed', city: 'islamabad', score: 71 },
];

export default function LeaderboardMini({ city, currentScore, resultId }) {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadLeaderboard();
  }, [city]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getLeaderboardByCity(city, 5);
      if (data && data.length > 0) {
        setLeaders(data);
      } else {
        setLeaders(DEMO_DATA);
      }
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      setLeaders(DEMO_DATA);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToLeaderboard = async () => {
    if (!user) {
      alert('Please log in to add yourself to the leaderboard.');
      return;
    }

    if (!resultId) {
      alert('Please save your plan first by calculating your solar potential.');
      return;
    }

    try {
      await addToLeaderboard(user, resultId, { ecoScore: currentScore }, city);
      alert('Successfully added to leaderboard!');
      await loadLeaderboard();
    } catch (error) {
      console.error('Error adding to leaderboard:', error);
      alert('Failed to add to leaderboard. Please try again.');
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Trophy className="text-yellow-400" size={20} />
        <h3 className="text-lg font-bold text-white">Top Performers</h3>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-4">Loading...</div>
      ) : leaders.length === 0 ? (
        <div className="text-center text-slate-400 py-4">No entries yet</div>
      ) : (
        <div className="space-y-2 mb-4">
          {leaders.map((leader, idx) => (
            <div
              key={leader.id}
              className="flex items-center justify-between bg-white/5 rounded-lg p-3"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-bold text-emerald-400">
                  #{idx + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{leader.name}</p>
                  <p className="text-xs text-slate-400">{leader.city}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-emerald-400">
                {leader.score}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <button
          onClick={handleAddToLeaderboard}
          className="w-full py-2 text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium rounded-lg transition-colors"
        >
          Add Me to Leaderboard
        </button>
        <Link
          to="/leaderboard"
          className="block w-full py-2 text-sm text-center text-slate-400 hover:text-white transition-colors"
        >
          View Full Leaderboard
        </Link>
      </div>
    </div>
  );
}
