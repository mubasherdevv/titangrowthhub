'use client';

import React from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';

const pagesData = [
  {
    path: '/blog/seo-best-practices',
    impressions: '3.2K',
    clicks: '320',
    ctr: '10.00%',
  },
  {
    path: '/services/local-seo',
    impressions: '2.7K',
    clicks: '280',
    ctr: '10.37%',
  },
  {
    path: '/blog/technical-seo-guide',
    impressions: '1.9K',
    clicks: '180',
    ctr: '9.47%',
  },
];

export default function TopPagesTable() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
      <div>
        <h3 className="font-serif text-lg font-bold text-zinc-950">Top Pages</h3>
        
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-100 text-zinc-400 font-serif font-bold uppercase tracking-wider">
                <th className="pb-3 pt-1">Page</th>
                <th className="pb-3 pt-1 text-right">Impressions</th>
                <th className="pb-3 pt-1 text-right">Clicks</th>
                <th className="pb-3 pt-1 text-right">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {pagesData.map((row) => (
                <tr key={row.path} className="group hover:bg-orange-50/40 transition-colors">
                  <td className="py-3 font-semibold text-zinc-700 group-hover:text-orange-600">
                    <div className="flex items-center gap-1.5">
                      <span>{row.path}</span>
                      <ExternalLink className="h-3 w-3 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </td>
                  <td className="py-3 text-right font-serif font-bold text-zinc-950">{row.impressions}</td>
                  <td className="py-3 text-right font-semibold text-zinc-700">{row.clicks}</td>
                  <td className="py-3 text-right font-semibold text-zinc-700">{row.ctr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 border-t border-zinc-100 pt-3 text-right">
        <button className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors group">
          <span>View All Pages</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
