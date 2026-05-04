"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase, FileText, Edit3, Users } from 'lucide-react';

interface AdminCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  href: string;
  description: string;
  color: string;
}

function AdminCard({ title, count, icon, href, description, color }: AdminCardProps) {
  return (
    <Link href={href} className="group">
      <div className="glass-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
        <div className="flex items-center justify-between mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${color} shadow-lg`}>
            <div className="text-white">{icon}</div>
          </div>
          <div className="text-3xl font-bold text-gold bg-gradient-to-r from-gold/20 to-transparent px-4 py-2 rounded-xl">
            {count}
          </div>
        </div>
        <h3 className="text-xl font-bold text-snow mb-3">{title}</h3>
        <p className="text-pumice mb-6 leading-relaxed">{description}</p>
        <div className="flex items-center gap-2 text-gold group-hover:text-gold-light transition-colors">
          <span>Manage</span>
          <Edit3 className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    caseStudies: 0,
    blogs: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load stats
    const jobs = JSON.parse(localStorage.getItem('laneway-jobs') || '[]');
    const caseStudies = JSON.parse(localStorage.getItem('laneway-case-studies') || '[]');
    
    setStats({
      jobs: jobs.filter((j: any) => j.status === 'active').length,
      caseStudies: caseStudies.filter((c: any) => c.status === 'active').length,
      blogs: 0 // Fetch from backend if needed
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center">
        <div className="text-gold text-2xl animate-pulse">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-black to-[#0A0A0A] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gold via-yellow-400 to-orange-400 bg-clip-text text-transparent mb-6 leading-tight">
            Admin Dashboard
          </h1>
          <p className="text-xl md:text-2xl text-pumice max-w-2xl mx-auto leading-relaxed">
            Manage Jobs, Case Studies, and Blogs. Real-time sync across your site.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <AdminCard
            title="Jobs"
            count={stats.jobs}
            icon={<Briefcase className="w-8 h-8" />}
            href="/admin/jobs"
            description="Create, edit, and manage job postings. Track active listings and applicant status."
            color="from-emerald-500 to-teal-600"
          />
          <AdminCard
            title="Case Studies"
            count={stats.caseStudies}
            icon={<FileText className="w-8 h-8" />}
            href="/admin/case-studies"
            description="Showcase client success stories. Filter by category and track active projects."
            color="from-purple-500 to-indigo-600"
          />
          <AdminCard
            title="Blogs"
            count={stats.blogs}
            icon={<Users className="w-8 h-8" />}
            href="/admin/blogs"
            description="Manage blog posts, publishing status, and content. Backend synced."
            color="from-blue-500 to-cyan-600"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-glass-card p-8 rounded-3xl mb-12">
          <div className="text-center">
            <div className="text-4xl font-black text-gold mb-2">{stats.jobs + stats.caseStudies + stats.blogs}</div>
            <div className="text-pumice uppercase tracking-wide text-sm font-semibold">Total Content</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
              {stats.jobs}
            </div>
            <div className="text-pumice uppercase tracking-wide text-sm font-semibold">Active Jobs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
              {stats.caseStudies}
            </div>
            <div className="text-pumice uppercase tracking-wide text-sm font-semibold">Case Studies</div>
          </div>
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-glass-card p-8 rounded-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-gradient-to-b from-gold to-orange-500 rounded-full" />
            <h2 className="text-2xl font-bold text-snow">Recent Activity</h2>
          </div>
          <div className="space-y-4 text-pumice">
            <div className="flex items-center gap-3 p-4 bg-card rounded-2xl hover:bg-card/50 transition-colors">
              <div className="w-2 h-10 bg-emerald-400 rounded-full" />
              <div>
                <div className="font-semibold text-snow">New job posted</div>
                <div className="text-sm opacity-75">Frontend Developer • 2 mins ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-card rounded-2xl hover:bg-card/50 transition-colors">
              <div className="w-2 h-10 bg-purple-400 rounded-full" />
              <div>
                <div className="font-semibold text-snow">Case study updated</div>
                <div className="text-sm opacity-75">Currice project • 1 hour ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

