import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocale, labels } from '../context/LocaleContext';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function NavBar() {
  const { user, logout } = useAuth();
  const { locale, toggleLocale } = useLocale();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

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
      navigate('/');
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
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold">
              <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">Eco</span>
              <span className="text-white">Sync</span>
            </div>
            <div className="hidden sm:block text-xs text-slate-400 ml-2">
              AI Energy Optimizer
            </div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLocale}
              className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10"
            >
              {locale === 'en' ? 'UR' : 'EN'}
            </button>

            {user ? (
              <>
                {/* Dashboard Button */}
                <Link
                  to="/dashboard"
                  className="hidden md:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-all"
                >
                  <LayoutDashboard size={16} />
                  <span>Dashboard</span>
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                      {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="hidden md:block text-sm text-white font-medium">
                      {user.displayName || user.email?.split('@')[0] || 'User'}
                    </span>
                  </button>

                  {showDropdown && (
                    <>
                      {/* Backdrop */}
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowDropdown(false)}
                      />
                      
                      {/* Dropdown */}
                      <div className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden">
                        <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent">
                          <p className="text-sm text-white font-semibold truncate">
                            {user.displayName || 'User'}
                          </p>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {user.email || 'Guest User'}
                          </p>
                        </div>
                        
                        <div className="py-2">
                          <Link
                            to="/dashboard"
                            onClick={() => setShowDropdown(false)}
                            className="md:hidden w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-white/5 flex items-center space-x-3 transition-colors"
                          >
                            <LayoutDashboard size={16} />
                            <span>Dashboard</span>
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center space-x-3 transition-colors"
                          >
                            <LogOut size={16} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10"
                >
                  Login
                </Link>
                
                {/* Sign Up Button - Premium Style */}
                <Link
                  to="/login"
                  className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-lg transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}