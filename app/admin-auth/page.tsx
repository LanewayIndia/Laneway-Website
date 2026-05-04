"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminAuth() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (username === 'Gp001' && password === 'Gp001') {
      // Store in localStorage (or cookies)
      localStorage.setItem('laneway-admin-auth', 'valid');
      router.push('/admin');
    } else {
      setError('Invalid username or password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] to-black px-4 py-12">
      <div className="max-w-md w-full bg-glass-card backdrop-blur-xl p-8 sm:p-12 rounded-3xl border border-border/30 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent mb-4">
            Admin Login
          </h1>
          <p className="text-pumice text-lg">Enter credentials to access dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-snow text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-snow placeholder-pumice focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
              placeholder="Gp001"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-snow text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-snow placeholder-pumice focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
              placeholder="Gp001"
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-bold py-4 px-6 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Enter Admin Panel'}
          </button>
        </form>

      </div>
    </div>
  );
}

