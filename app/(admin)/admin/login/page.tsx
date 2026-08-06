'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, Layers, BarChart2, PieChart, TrendingUp, Loader2, AlertCircle, LogIn } from 'lucide-react';

function LoginPageContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const searchParams = useSearchParams();
  const nextPath = searchParams.get('next') || '/admin';

  // If already logged in, go straight to the dashboard
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          window.location.href = '/admin';
        }
      })
      .catch(() => {})
      .finally(() => setCheckingSession(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid email or password');
        setLoading(false);
        return;
      }
      window.location.href = nextPath.startsWith('/admin') ? nextPath : '/admin';
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F9FE]">
        <Loader2 className="h-8 w-8 text-orange-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white font-sans text-zinc-900">
      {/* Left Side: Brand & Illustration Panel */}
      <div className="hidden lg:flex flex-col justify-between bg-[#F8F9FE] p-12 lg:p-16 border-r border-zinc-100 relative overflow-hidden">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-md shadow-orange-600/30">
            <Layers className="h-6 w-6" />
          </div>
          <span className="font-serif text-2xl font-black text-zinc-950 tracking-tight">
            Titan Growth Hub
          </span>
        </div>

        {/* Welcome Text & Illustration Graphic Container */}
        <div className="max-w-md mx-auto my-auto py-12 space-y-8 text-center">
          <div className="space-y-3">
            <h1 className="font-serif text-4xl font-extrabold text-zinc-950 tracking-tight flex items-center justify-center gap-2">
              <span>Welcome Back</span>
              <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-sm text-zinc-800 font-medium leading-relaxed">
              Sign in to access your Titan Growth Hub dashboard and manage your SEO performance.
            </p>
          </div>

          {/* SVG/HTML Dashboard Mockup Illustration */}
          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xl shadow-orange-900/5">
            {/* Window Controls */}
            <div className="flex items-center gap-1.5 border-b border-zinc-100 pb-3 mb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>

            {/* Inner Mockup Layout */}
            <div className="space-y-4">
              {/* Header Bar */}
              <div className="h-3 w-3/4 rounded-full bg-orange-600/80" />

              {/* Skeleton Lines */}
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-zinc-100" />
                <div className="h-2 w-5/6 rounded-full bg-zinc-100" />
              </div>

              {/* Chart Mockup Area */}
              <div className="grid grid-cols-12 gap-3 pt-2">
                <div className="col-span-7 rounded-xl border border-orange-100 bg-orange-50/30 p-3 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="h-2 w-10 rounded bg-orange-200" />
                    <TrendingUp className="h-3.5 w-3.5 text-orange-600" />
                  </div>
                  {/* Wave Chart Line */}
                  <svg className="w-full h-12 text-orange-600" viewBox="0 0 100 40">
                    <path
                      d="M 0 30 Q 25 5, 50 20 T 100 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="col-span-5 rounded-xl border border-zinc-100 bg-zinc-50 p-3 flex flex-col items-center justify-center gap-2">
                  <PieChart className="h-8 w-8 text-orange-500" />
                  <div className="h-1.5 w-12 rounded bg-zinc-200" />
                </div>
              </div>
            </div>

            {/* Plant Pot Graphic Element on left */}
            <div className="absolute -left-6 -bottom-2 flex items-end opacity-90">
              <div className="h-10 w-8 rounded-b-xl border border-zinc-200 bg-white shadow-sm flex items-center justify-center">
                <span className="text-xs">🪴</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="text-xs font-semibold text-zinc-700">
          © 2025 Titan Growth Hub. All rights reserved.
        </div>
      </div>

      {/* Right Side: Centered Admin Login Form Card */}
      <div className="flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white">
        <div className="w-full max-w-md space-y-8 rounded-3xl border border-zinc-200/70 bg-white p-8 sm:p-10 shadow-xl shadow-zinc-900/5">
          {/* Avatar Icon & Title */}
          <div className="text-center space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100/70 text-orange-600">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-zinc-950">
                Admin Login
              </h2>
              <p className="text-xs text-zinc-800 font-medium mt-1">
                Please enter your credentials to continue
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-serif font-bold text-zinc-900 block">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-700" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/30 pl-10 pr-4 py-3 text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:border-orange-600 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-serif font-bold text-zinc-900 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-700" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/30 pl-10 pr-10 py-3 text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:border-orange-600 focus:bg-white focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-zinc-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-zinc-600 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-orange-600 focus:ring-orange-500"
                />
                <span>Remember me</span>
              </label>
              <a
                href="#"
                className="font-semibold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-600">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-600 py-3 text-xs font-extrabold text-white shadow-lg shadow-orange-600/25 transition-all hover:bg-orange-700 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="inline-flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="w-full border-t border-zinc-100" />
            <span className="absolute bg-white px-3 text-[11px] font-semibold text-zinc-700 uppercase tracking-wider">
              or
            </span>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            disabled
            className="w-full flex items-center justify-center gap-2.5 rounded-xl border border-zinc-200 bg-white py-3 text-xs font-bold text-zinc-700 shadow-sm cursor-not-allowed"
            title="Sign in with Google is not enabled yet"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Contact Admin Link */}
          <p className="text-center text-xs text-zinc-800 font-medium pt-2">
            Don't have an account?{' '}
            <a href="#" className="font-bold text-orange-600 hover:underline">
              Contact administrator
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F9FE]">
          <Loader2 className="h-8 w-8 text-orange-600 animate-spin" />
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
