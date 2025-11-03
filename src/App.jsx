import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LocaleProvider } from './context/LocaleContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import LeaderboardPage from './pages/LeaderboardPage';
import ResultPage from './pages/ResultPage';
import LoginPage from './pages/LoginPage';

function AppContent() {
  const location = useLocation();
  const hideNavBar = location.pathname === '/login';

  return (
    <>
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/r/:id" element={<ResultPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <LocaleProvider>
          <AppContent />
        </LocaleProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
