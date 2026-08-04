'use client';

import React from 'react';
import { FileText, Briefcase, TrendingUp, AlertTriangle, ChevronRight } from 'lucide-react';

export default function StatCards() {
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
            <p className="mt-1 font-serif text-3xl font-black tracking-tight text-zinc-950">24</p>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3 text-xs border-t border-zinc-100 pt-3">
          <span className="font-bold text-emerald-600">12 Published</span>
          <span className="text-zinc-300">•</span>
          <span className="text-zinc-400 font-medium">12 Drafts</span>
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
            <p className="mt-1 font-serif text-3xl font-black tracking-tight text-zinc-950">8</p>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3 text-xs border-t border-zinc-100 pt-3">
          <span className="font-bold text-emerald-600">6 Published</span>
          <span className="text-zinc-300">•</span>
          <span className="text-zinc-400 font-medium">2 Drafts</span>
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
              85<span className="text-lg font-normal text-zinc-400">/100</span>
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {/* Progress Bar */}
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100">
            <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-sm" style={{ width: '85%' }} />
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="font-extrabold text-emerald-600">Good</span>
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
            <p className="mt-1 font-serif text-3xl font-black tracking-tight text-zinc-950">3</p>
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
