'use client';

import React from 'react';
import { FileText, Briefcase, TrendingUp, AlertTriangle, ChevronRight } from 'lucide-react';

interface StatCardsProps {
  stats?: {
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    totalServices: number;
    publishedServices: number;
    draftServices: number;
    avgSeoScore: number;
    pagesWithIssues: number;
  };
  loading?: boolean;
}

export default function StatCards({ stats, loading }: StatCardsProps) {
  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-2xl bg-zinc-200" />
              <div className="space-y-2 text-right">
                <div className="h-3.5 w-24 bg-zinc-200 rounded ml-auto" />
                <div className="h-8 w-12 bg-zinc-200 rounded ml-auto" />
              </div>
            </div>
            <div className="mt-6 h-4 w-32 bg-zinc-200 rounded pt-3" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card 1: Total Blog Posts */}
      <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-orange-200">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 ring-4 ring-orange-50/50">
            <FileText className="h-6 w-6" />
          </div>
          <div className="text-right">
            <span className="text-xs font-serif font-bold text-zinc-500 uppercase tracking-widest">Total Blog Posts</span>
            <p className="mt-1 font-serif text-3xl font-black tracking-tight text-zinc-950">{stats.totalBlogs}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3 text-xs border-t border-zinc-100 pt-3">
          <span className="font-bold text-emerald-600">{stats.publishedBlogs} Published</span>
          <span className="text-zinc-300">•</span>
          <span className="text-zinc-400 font-medium">{stats.draftBlogs} Drafts</span>
        </div>
      </div>

      {/* Card 2: Total Services */}
      <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-orange-200">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-4 ring-emerald-50/50">
            <Briefcase className="h-6 w-6" />
          </div>
          <div className="text-right">
            <span className="text-xs font-serif font-bold text-zinc-500 uppercase tracking-widest">Total Services</span>
            <p className="mt-1 font-serif text-3xl font-black tracking-tight text-zinc-950">{stats.totalServices}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3 text-xs border-t border-zinc-100 pt-3">
          <span className="font-bold text-emerald-600">{stats.publishedServices} Published</span>
          <span className="text-zinc-300">•</span>
          <span className="text-zinc-400 font-medium">{stats.draftServices} Drafts</span>
        </div>
      </div>

      {/* Card 3: SEO Score */}
      <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-orange-200">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 ring-4 ring-orange-50/50">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="text-right">
            <span className="text-xs font-serif font-bold text-zinc-500 uppercase tracking-widest">SEO Score</span>
            <p className="mt-1 font-serif text-3xl font-black tracking-tight text-zinc-950">
              {stats.avgSeoScore}<span className="text-lg font-normal text-zinc-400">/100</span>
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {/* Progress Bar */}
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100">
            <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-sm" style={{ width: `${stats.avgSeoScore}%` }} />
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="font-extrabold text-emerald-600">
              {stats.avgSeoScore >= 90 ? 'Excellent' : stats.avgSeoScore >= 70 ? 'Good' : 'Needs Work'}
            </span>
          </div>
        </div>
      </div>

      {/* Card 4: Pages with Issues */}
      <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-red-200">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 ring-4 ring-red-50/50">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="text-right">
            <span className="text-xs font-serif font-bold text-zinc-500 uppercase tracking-widest">Pages with Issues</span>
            <p className="mt-1 font-serif text-3xl font-black tracking-tight text-zinc-950">{stats.pagesWithIssues}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center border-t border-zinc-100 pt-3">
          <button className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 group transition-colors">
            <span>View Issues</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
