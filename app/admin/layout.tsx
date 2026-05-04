"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem('laneway-admin-auth');
    if (auth !== 'valid') {
      router.push('/admin-auth');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('laneway-admin-auth');
    router.push('/admin-auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] to-black">
      {/* Header */}
      <div className="bg-glass-card border-b border-border/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-black font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-pumice text-sm">Laneway Content Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gold/90 hover:bg-gold text-black font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {children}
      </div>
    </div>
  );
}


