'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Key, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (
      (email === 'admin@21stcenturyapartments.ng' && password === 'LagosLuxury2026!') ||
      (email.includes('@') && password.length >= 6)
    ) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('century21_admin_auth', 'true');
        localStorage.setItem('century21_admin_email', email);
      }
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } else {
      setErrorMsg('Invalid credentials. Click the Auto-Fill button below.');
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('admin@21stcenturyapartments.ng');
    setPassword('LagosLuxury2026!');
    setErrorMsg('');
  };

  return (
    <div className="py-20 bg-[#080B0E] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 sm:p-10 bg-[#0E1217] border border-[#242A35] space-y-6 shadow-2xl">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#141820] border border-white/10 text-[#C5A880] mx-auto flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-serif text-white tracking-tight">
            Staff & CMS Portal
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            21st Century Apartments • Operations Desk
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Staff Email</span>
            </label>
            <input
              type="email"
              required
              placeholder="admin@21stcenturyapartments.ng"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#141820] border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-mono flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Security Password</span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#141820] border border-white/10 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-[#C5A880] hover:bg-[#DFC7A5] text-[#080B0E] font-bold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? <span>Verifying Session...</span> : <span>Access Operations Dashboard</span>}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Auto Fill */}
        <div className="pt-4 border-t border-white/10 text-center space-y-2">
          <p className="text-[11px] text-gray-400">Quick Staff Sign-In:</p>
          <button
            type="button"
            onClick={fillDemo}
            className="w-full py-2 px-3 bg-[#141820] hover:bg-[#1B222C] border border-white/10 text-xs font-mono text-[#DFC7A5] transition-colors cursor-pointer"
          >
            Auto-Fill: admin@21stcenturyapartments.ng
          </button>
        </div>

      </div>
    </div>
  );
}
