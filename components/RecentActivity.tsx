'use client';

import React from 'react';
import { FileText, Edit3, Globe, ChevronRight } from 'lucide-react';

interface RecentActivityProps {
  activities?: Array<{
    id: number;
    text: string;
    time: string;
    iconType: 'blog' | 'service' | 'settings';
    iconBg: string;
  }>;
  loading?: boolean;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'blog':
      return FileText;
    case 'service':
      return Edit3;
    case 'settings':
      return Globe;
    default:
      return FileText;
  }
};

export default function RecentActivity({ activities, loading }: RecentActivityProps) {
  if (loading || !activities) {
    return (
      <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm min-h-[300px]">
        <div>
          <h3 className="font-serif text-lg font-bold text-zinc-950">Recent Activity</h3>
          <div className="mt-5 space-y-4 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-zinc-200 rounded-xl" />
                  <div className="h-3 w-40 bg-zinc-200 rounded" />
                </div>
                <div className="h-3 w-12 bg-zinc-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm min-h-[300px]">
      <div>
        <h3 className="font-serif text-lg font-bold text-zinc-950">Recent Activity</h3>
        <div className="mt-5 space-y-4">
          {activities.length > 0 ? (
            activities.map((item) => {
              const Icon = getIcon(item.iconType);
              return (
                <div key={item.id} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-zinc-600 font-medium truncate">{item.text}</p>
                  </div>
                  <span className="text-zinc-400 font-semibold whitespace-nowrap ml-2">{item.time}</span>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-zinc-400">No recent activities found.</div>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-zinc-100 pt-3 text-right">
        <button className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors group">
          <span>View All Activity</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
