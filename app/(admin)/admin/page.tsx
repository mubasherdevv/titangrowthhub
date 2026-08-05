'use client';

import React, { useState, useEffect } from 'react';
import StatCards from '@/components/StatCards';
import SeoOverviewChart from '@/components/SeoOverviewChart';
import RecentActivity from '@/components/RecentActivity';
import TopPagesTable from '@/components/TopPagesTable';
import { Calendar, ChevronDown } from 'lucide-react';

export default function HomePage() {
  const [dateRange, setDateRange] = useState('May 20, 2025 - May 26, 2025');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard-stats')
      .then((res) => res.json())
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching dashboard stats:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Dashboard Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
            Dashboard
          </h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-800 font-medium">
            Welcome back! Here&apos;s what&apos;s happening with your website.
          </p>
        </div>

        {/* Date Range Picker */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center gap-2.5 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300"
          >
            <Calendar className="h-4 w-4 text-orange-600" />
            <span className="font-serif">{dateRange}</span>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-700 ml-1" />
          </button>

          {showDatePicker && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-zinc-200 bg-white p-3 shadow-xl z-30 text-xs">
              <div className="font-serif font-bold text-zinc-950 pb-2 border-b border-zinc-100">
                Select Date Range
              </div>
              <div className="mt-2 space-y-1">
                {[
                  'May 20, 2025 - May 26, 2025',
                  'May 01, 2025 - May 31, 2025',
                  'Last 7 Days',
                  'Last 30 Days',
                  'Year to Date (2025)',
                ].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setDateRange(range);
                      setShowDatePicker(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      dateRange === range
                        ? 'bg-orange-50 text-orange-600 font-bold border border-orange-200/50 font-serif'
                        : 'text-zinc-600 hover:bg-zinc-50 font-serif'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 1: Stat Cards Grid */}
      <StatCards stats={dashboardData?.stats} loading={loading} />

      {/* Section 2: Middle Row (SEO Overview & Recent Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <SeoOverviewChart />
        </div>
        <div className="lg:col-span-5">
          <RecentActivity activities={dashboardData?.recentActivity} loading={loading} />
        </div>
      </div>

      {/* Section 3: Bottom Row (Top Pages Table) */}
      <div>
        <TopPagesTable pages={dashboardData?.topPages} loading={loading} />
      </div>
    </>
  );
}
