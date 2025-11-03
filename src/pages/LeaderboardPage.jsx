import { useEffect, useState } from 'react';
import { Trophy, Award, Medal } from 'lucide-react';
import { getLeaderboardByCity } from '../lib/leaderboardApi';
import { CITIES } from '../lib/cities';

const DEMO_DATA = [
  { id: 'demo1', name: 'Ali', city: 'karachi', score: 82 },
  { id: 'demo2', name: 'Sara', city: 'lahore', score: 76 },
  { id: 'demo3', name: 'Ahmed', city: 'islamabad', score: 71 },
  { id: 'demo4', name: 'Fatima', city: 'karachi', score: 68 },
  { id: 'demo5', name: 'Hassan', city: 'multan', score: 65 },
  { id: 'demo6', name: 'Aisha', city: 'peshawar', score: 62 },
  { id: 'demo7', name: 'Usman', city: 'lahore', score: 58 },
  { id: 'demo8', name: 'Zara', city: 'quetta', score: 55 },
];

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('all');

  useEffect(() => {
    loadLeaderboard();
  }, [selectedCity]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getLeaderboardByCity(selectedCity, 50);

      let displayData = data && data.length > 0 ? data : DEMO_DATA;

      if (selectedCity !== 'all') {
        displayData = displayData.filter(leader => leader.city === selectedCity);
      }

      setLeaders(displayData);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      let displayData = DEMO_DATA;
      if (selectedCity !== 'all') {
        displayData = displayData.filter(leader => leader.city === selectedCity);
      }
      setLeaders(displayData);
    } finally {
      setLoading(false);
    }
  };

  const getMedalIcon = (rank) => {
    if (rank === 1) return <Trophy className="text-yellow-400" size={24} />;
    if (rank === 2) return <Award className="text-slate-300" size={24} />;
    if (rank === 3) return <Medal className="text-amber-600" size={24} />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-slate-400">Top performers by Eco Efficiency Score</p>
        </div>

        <div className="mb-8">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full md:w-64 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="all">All Cities</option>
            {Object.entries(CITIES).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center text-slate-400 py-12">Loading...</div>
        ) : leaders.length === 0 ? (
          <div className="text-center text-slate-400 py-12">
            No entries yet. Be the first to join!
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            <div className="divide-y divide-white/10">
              {leaders.map((leader, idx) => (
                <div
                  key={leader.id}
                  className="flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-6 flex-1">
                    <div className="w-12 text-center">
                      {getMedalIcon(idx + 1) || (
                        <span className="text-xl font-bold text-slate-400">
                          #{idx + 1}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-white">
                        {leader.name}
                      </p>
                      <p className="text-sm text-slate-400">
                        {CITIES[leader.city]?.name || leader.city}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-400">
                      {leader.score}
                    </div>
                    <div className="text-xs text-slate-400">Score</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
