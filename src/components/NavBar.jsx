import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocale, labels } from '../context/LocaleContext';
import { User, LogOut } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

export default function NavBar() {
  const { user, logout } = useAuth();
  const { locale, toggleLocale } = useLocale();
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const dropdownRef = useRef(null)

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      background: '#0f172a',
      color: 'white'
    });

    if (result.isConfirmed) {
      logout();
      setShowDropdown(false);
      Swal.fire({
        title: 'Logged Out!',
        text: 'You have been successfully logged out.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#10b981',
        background: '#0f172a',
        color: 'white'
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-2 cursor-pointer">
            <div className="text-2xl font-bold">
              <span className="text-emerald-400">Eco</span>
              <span className="text-white">Sync</span>
            </div>
            <div className="hidden sm:block text-xs text-slate-400 ml-2">
              AI Energy Optimizer
            </div>
          </button>

          <div className="flex items-center space-x-2 md:space-x-4">
            {isHomePage && (
              <>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="hidden md:block px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="hidden md:block px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  How it Works
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="hidden md:block px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('impact')}
                  className="hidden md:block px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Impact
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hidden md:block px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Contact
                </button>
                <button
                  onClick={() => scrollToSection('app-demo')}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
                >
                  Open App
                </button>
              </>
            )}

            {!isHomePage && (
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors"
              >
                Home
              </Link>
            )}

            <button
              onClick={toggleLocale}
              className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {locale === 'en' ? 'UR' : 'EN'}
            </button>

            <Link
              to="/leaderboard"
              className="hidden md:block px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {labels.leaderboard[locale]}
            </Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
                    {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-lg shadow-xl">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm text-white truncate">
                        {user.displayName || user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-white/5 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>{labels.logout[locale]}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-colors flex items-center space-x-2"
              >
                <User size={16} />
                <span>{labels.login[locale]}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}