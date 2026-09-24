import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle,
  Loader2,
  LockKeyhole,
  Check,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';

export default function AdminLoginPage() {
  const { login, isLoggedIn } = useInquiry();
  const navigate = useNavigate();

  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already authenticated, redirect straight to the admin dashboard
  if (isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!adminId.trim() || !password) {
      setErrorMessage('Please enter both Admin Identifier and Password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(adminId.trim(), password);
      if (res.success) {
        navigate('/admin', { replace: true });
      } else {
        setErrorMessage(res.message || 'Invalid administrative credentials. Please verify and try again.');
      }
    } catch {
      setErrorMessage('Authentication service temporarily unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-[#0d041a] text-white relative overflow-hidden px-4 sm:px-6">
      {/* Background Ambient Glows & Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none"></div>
      <div className="bg-glow-orb w-[550px] h-[550px] bg-purple-700/20 -top-24 -left-24 pointer-events-none"></div>
      <div className="bg-glow-orb w-[550px] h-[550px] bg-amber-500/15 -bottom-24 -right-24 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Top return link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#b8a7dc] hover:text-amber-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Public Website</span>
          </Link>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-[10px] font-mono font-bold text-amber-300">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>CRM v2.4</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="glass-card p-6 sm:p-9 rounded-3xl border border-amber-400/30 bg-[#160829]/90 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl relative">
          {/* Brand & Security Header */}
          <div className="text-center mb-8">
            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/95 border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5)] p-1.5 mb-4 group hover:scale-105 transition-transform">
              <img
                src="/logo.png"
                alt="Global Enterprises Logo"
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-[10px] font-mono font-extrabold uppercase tracking-widest mb-2.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Administrative Portal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
              Sign In to Admin CRM
            </h1>
            <p className="text-xs text-[#b8a7dc] mt-2 max-w-sm mx-auto leading-relaxed">
              Authorized personnel only. Access inquiries, pipeline deals, customer leads, and administrative tools.
            </p>
          </div>

          {/* Error Notification */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-2xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-start gap-3 shadow-lg animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <div className="leading-relaxed font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label 
                htmlFor="admin-login-id" 
                className="block text-xs font-semibold text-gray-200 mb-2"
              >
                Admin Identifier / Email / Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="admin-login-id"
                  type="text"
                  required
                  autoFocus
                  autoComplete="username"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="admin or admin@theglobal.com"
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#0d0318] border border-white/15 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all shadow-inner"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label 
                  htmlFor="admin-login-password" 
                  className="block text-xs font-semibold text-gray-200"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your administrative password"
                  className="w-full pl-10 pr-11 py-3.5 rounded-xl bg-[#0d0318] border border-white/15 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label 
                onClick={(e) => {
                  e.preventDefault();
                  setRememberMe(!rememberMe);
                }}
                className="flex items-center gap-2.5 cursor-pointer text-gray-300 hover:text-white select-none group"
              >
                <div 
                  className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all duration-200 ${
                    rememberMe 
                      ? 'bg-amber-400 border-amber-300 text-[#10061e] shadow-[0_0_12px_rgba(245,158,11,0.5)]' 
                      : 'bg-[#0f041d] border-white/30 text-transparent group-hover:border-amber-400/60'
                  }`}
                >
                  <Check className={`w-3 h-3 stroke-[3] transition-transform ${rememberMe ? 'scale-100' : 'scale-0'}`} />
                </div>
                <span className="font-medium text-xs text-[#d1c4e9] group-hover:text-white transition-colors">
                  Remember this device session
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3.5 sm:py-4 rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#10061e]" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to CRM Portal</span>
                  <ArrowRight className="w-4 h-4 text-[#10061e]" />
                </>
              )}
            </button>
          </form>

          {/* Card Footnote */}
          <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-gray-400 text-center">
            <LockKeyhole className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>End-to-end encrypted 256-bit administrative session</span>
          </div>
        </div>

        {/* Security Notice */}
        <p className="text-center text-[11px] text-[#7d6b97] mt-6">
          Access is monitored and restricted to authorized Global Enterprises personnel.
        </p>
      </div>
    </div>
  );
}
