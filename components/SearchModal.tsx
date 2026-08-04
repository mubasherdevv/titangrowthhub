'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, X, FileText, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { title: 'SEO Best Practices Guide', type: 'Blog Post', url: '/blog/seo-best-practices' },
    { title: 'Local SEO Service Config', type: 'Service', url: '/services/local-seo' },
    { title: 'Global Meta Descriptions', type: 'SEO Settings', url: '/seo/global' },
    { title: 'Sitemap XML Generator', type: 'Tools', url: '/seo/sitemap' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-zinc-950/40 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white shadow-2xl overflow-hidden">
        {/* Search Header */}
        <div className="flex items-center border-b border-zinc-100 px-4 py-3">
          <Search className="h-5 w-5 text-zinc-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, posts, services, settings..."
            className="flex-1 bg-transparent text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none font-medium"
            autoFocus
          />
          <button onClick={onClose} className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Results */}
        <div className="p-4 max-h-80 overflow-y-auto">
          <span className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider block mb-2">
            Quick Navigation
          </span>
          <div className="space-y-1">
            {quickLinks.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-xl text-xs hover:bg-orange-50 hover:text-orange-600 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 group-hover:bg-orange-100 group-hover:text-orange-600">
                    <FileText className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900 group-hover:text-orange-600">{item.title}</p>
                    <span className="text-[10px] text-zinc-400 font-medium">{item.type}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-50 px-4 py-2.5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
          <span>Navigate with <b>↑</b> <b>↓</b></span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
