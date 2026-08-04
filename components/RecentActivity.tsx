'use client';

import React from 'react';
import { FileText, Edit3, Image as ImageIcon, Globe, ChevronRight } from 'lucide-react';

const activities = [
  {
    id: 1,
    icon: FileText,
    iconBg: 'bg-emerald-50 text-emerald-600',
    text: (
      <>
        Blog post <span className="font-bold font-serif text-zinc-950">“SEO Best Practices”</span> published
      </>
    ),
    time: '2 hours ago',
  },
  {
    id: 2,
    icon: Edit3,
    iconBg: 'bg-blue-50 text-blue-600',
    text: (
      <>
        Service <span className="font-bold font-serif text-zinc-950">“Local SEO”</span> updated
      </>
    ),
    time: '5 hours ago',
  },
  {
    id: 3,
    icon: ImageIcon,
    iconBg: 'bg-amber-50 text-amber-600',
    text: (
      <>
        Meta description updated for <span className="font-bold font-serif text-zinc-950">3 pages</span>
      </>
    ),
    time: '1 day ago',
  },
  {
    id: 4,
    icon: Globe,
    iconBg: 'bg-orange-50 text-orange-600',
    text: (
      <>
        Global SEO settings updated
      </>
    ),
    time: '2 days ago',
  },
];

export default function RecentActivity() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
      <div>
        <h3 className="font-serif text-lg font-bold text-zinc-950">Recent Activity</h3>
        <div className="mt-5 space-y-4">
          {activities.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.iconBg}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-zinc-600 font-medium leading-relaxed">{item.text}</p>
                </div>
                <span className="text-zinc-400 font-semibold whitespace-nowrap ml-2">{item.time}</span>
              </div>
            );
          })}
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
