'use client';

import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const data7Days = [
  { date: 'May 20', impressions: 6200 },
  { date: 'May 21', impressions: 8100 },
  { date: 'May 22', impressions: 7200 },
  { date: 'May 23', impressions: 10400 },
  { date: 'May 24', impressions: 9800 },
  { date: 'May 25', impressions: 13600 },
  { date: 'May 26', impressions: 10200 },
  { date: 'May 26 (End)', impressions: 15400 },
];

const data30Days = [
  { date: 'W1', impressions: 32000 },
  { date: 'W2', impressions: 45000 },
  { date: 'W3', impressions: 52000 },
  { date: 'W4', impressions: 68000 },
];

export default function SeoOverviewChart() {
  const [timeframe, setTimeframe] = useState('Last 7 Days');
  const [showDropdown, setShowDropdown] = useState(false);

  const chartData = timeframe === 'Last 7 Days' ? data7Days : data30Days;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
      {/* Top Header & Filter */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-zinc-950">SEO Overview</h3>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50/70 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            <span>{timeframe}</span>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-1 w-36 rounded-xl border border-zinc-200 bg-white py-1 shadow-lg z-20">
              {['Last 7 Days', 'Last 30 Days', 'Last 90 Days'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setTimeframe(option);
                    setShowDropdown(false);
                  }}
                  className="block w-full text-left px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-orange-50 hover:text-orange-600"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Impression Stats */}
      <div className="mt-4">
        <span className="text-xs font-serif font-bold text-zinc-400 uppercase tracking-wider">Total Impressions</span>
        <div className="mt-1 flex items-baseline gap-3">
          <span className="font-serif text-3xl font-black text-zinc-950">12.4K</span>
          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-600 border border-emerald-200/50">
            <ArrowUpRight className="h-3 w-3" />
            15.6%
          </span>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EA580C" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EA580C" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F4F4F5" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717A', fontSize: 11 }}
              dy={5}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717A', fontSize: 11 }}
              tickFormatter={(val) => (val >= 1000 ? `${val / 1000}K` : val)}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-xl border border-zinc-200 bg-zinc-900 text-white p-2.5 shadow-xl text-xs">
                      <p className="font-bold">{payload[0].payload.date}</p>
                      <p className="text-orange-400 font-extrabold mt-0.5">
                        {payload[0].value?.toLocaleString()} Impressions
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="impressions"
              stroke="#EA580C"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#orangeGradient)"
              dot={{ r: 4, fill: '#EA580C', stroke: '#FFFFFF', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#C2410C', stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
