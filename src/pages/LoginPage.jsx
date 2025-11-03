import { Link, useNavigate } from 'react-router-dom';
import { Zap, Leaf, TrendingUp, ArrowRight, Shield, Users, BarChart3, Mail, Lock, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithEmail, signUpWithEmail, loginAnonymously } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const showSuccessAlert = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: 'success',
      confirmButtonText: 'Continue',
      confirmButtonColor: '#10b981',
      background: '#0f172a',
      color: 'white'
    });
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      showSuccessAlert('Welcome!', 'You have successfully signed in with Google.');
      navigate('/');
    } catch (error) {
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginAnonymously();
      showSuccessAlert('Welcome Guest!', 'You are now signed in as a guest. Enjoy 3 free calculations!');
      navigate('/');
    } catch (error) {
      setError(error.message || 'Failed to continue as guest');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!formData.displayName.trim()) {
          setError('Please enter your name');
          setLoading(false);
          return;
        }
        await signUpWithEmail(formData.email, formData.password, formData.displayName);
        showSuccessAlert('Account Created!', 'Your account has been successfully created. Welcome to EcoSync!');
      } else {
        await loginWithEmail(formData.email, formData.password);
        showSuccessAlert('Welcome Back!', 'You have successfully signed in to your account.');
      }
      navigate('/');
    } catch (error) {
      let errorMessage = 'Authentication failed';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use. Try signing in instead.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setFormData({
      email: '',
      password: '',
      displayName: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col justify-center space-y-8">
            <Link to="/" className="inline-flex items-center space-x-2 group">
              <div className="text-3xl font-bold">
                <span className="text-emerald-400">Eco</span>
                <span className="text-white">Sync</span>
              </div>
              <div className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                ← Back
              </div>
            </Link>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Join the Energy
                <span className="block text-emerald-400">Revolution</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                Optimize your energy consumption, reduce costs, and contribute to a
                sustainable future with AI-powered insights.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-3">
                  <Zap className="text-emerald-400" size={20} />
                </div>
                <h3 className="text-white font-semibold mb-1">Smart Analysis</h3>
                <p className="text-sm text-slate-400">
                  AI-powered recommendations tailored to your usage
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="text-emerald-400" size={20} />
                </div>
                <h3 className="text-white font-semibold mb-1">Save Money</h3>
                <p className="text-sm text-slate-400">
                  Calculate your potential savings and ROI instantly
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-3">
                  <Users className="text-emerald-400" size={20} />
                </div>
                <h3 className="text-white font-semibold mb-1">Leaderboard</h3>
                <p className="text-sm text-slate-400">
                  Compete with others for the best eco efficiency score
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-3">
                  <Leaf className="text-emerald-400" size={20} />
                </div>
                <h3 className="text-white font-semibold mb-1">Go Green</h3>
                <p className="text-sm text-slate-400">
                  Track your CO₂ reduction and environmental impact
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Shield size={16} className="text-emerald-400" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart3 size={16} className="text-emerald-400" />
                <span>Real-time Analytics</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {isSignUp ? 'Sign up to get started' : 'Sign in to access your dashboard'}
                  </p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <p className="text-sm text-red-400 text-center">{error}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-4 px-6 bg-white hover:bg-gray-100 border border-white/20 rounded-xl text-gray-900 font-medium transition-all flex items-center justify-center space-x-3 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-4 bg-slate-900 text-slate-500">
                        OR
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleEmailAuth} className="space-y-3">
                    {isSignUp && (
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text"
                          name="displayName"
                          placeholder="Full Name"
                          value={formData.displayName}
                          onChange={handleInputChange}
                          required={isSignUp}
                          disabled={loading}
                          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      </div>
                    )}
                    
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={6}
                        disabled={loading}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 px-6 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-semibold transition-all flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}</span>
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </form>

                  <button
                    onClick={toggleMode}
                    disabled={loading}
                    className="w-full text-center text-sm text-slate-400 hover:text-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                  </button>
                </div>

                <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <p className="text-sm text-emerald-300 text-center mb-2 font-medium">
                    🎉 Full Authentication Available
                  </p>
                  <p className="text-xs text-slate-400 text-center leading-relaxed">
                    Sign in with Google or create an account with email to save and track your energy plans across sessions!
                  </p>
                </div>

                <button
                  onClick={handleGuestLogin}
                  disabled={loading}
                  className="mt-6 w-full py-3 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-all flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Continue as Guest (3 free calculations)</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <p className="mt-6 text-center text-xs text-slate-500">
                  By continuing, you agree to our{' '}
                  <button className="text-emerald-400 hover:text-emerald-300">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button className="text-emerald-400 hover:text-emerald-300">
                    Privacy Policy
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-20" />
    </div>
  );
}