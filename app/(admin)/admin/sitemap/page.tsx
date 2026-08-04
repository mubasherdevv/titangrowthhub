'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  RotateCcw,
  FileCode,
  Globe,
  Clock,
  CheckCircle2,
  Download,
  ExternalLink,
  Info,
  Play,
  Send,
  MoreVertical,
  Layers,
  ChevronRight
} from 'lucide-react';

interface SitemapFile {
  id: string;
  name: string;
  type: 'Index' | 'Posts' | 'Services' | 'Pages' | 'Categories';
  typeBg: string;
  typeText: string;
  urlsCount: number;
  lastModifiedDate: string;
  lastModifiedTime: string;
}

const sitemapFiles: SitemapFile[] = [
  {
    id: '1',
    name: 'sitemap.xml',
    type: 'Index',
    typeBg: 'bg-emerald-50 border-emerald-200/60',
    typeText: 'text-emerald-700',
    urlsCount: 246,
    lastModifiedDate: 'May 26, 2025',
    lastModifiedTime: '10:30 AM',
  },
  {
    id: '2',
    name: 'sitemap-posts.xml',
    type: 'Posts',
    typeBg: 'bg-purple-50 border-purple-200/60',
    typeText: 'text-purple-700',
    urlsCount: 142,
    lastModifiedDate: 'May 26, 2025',
    lastModifiedTime: '10:30 AM',
  },
  {
    id: '3',
    name: 'sitemap-services.xml',
    type: 'Services',
    typeBg: 'bg-blue-50 border-blue-200/60',
    typeText: 'text-blue-700',
    urlsCount: 48,
    lastModifiedDate: 'May 26, 2025',
    lastModifiedTime: '10:30 AM',
  },
  {
    id: '4',
    name: 'sitemap-pages.xml',
    type: 'Pages',
    typeBg: 'bg-amber-50 border-amber-200/60',
    typeText: 'text-amber-700',
    urlsCount: 36,
    lastModifiedDate: 'May 26, 2025',
    lastModifiedTime: '10:30 AM',
  },
  {
    id: '5',
    name: 'sitemap-categories.xml',
    type: 'Categories',
    typeBg: 'bg-pink-50 border-pink-200/60',
    typeText: 'text-pink-700',
    urlsCount: 20,
    lastModifiedDate: 'May 26, 2025',
    lastModifiedTime: '10:30 AM',
  },
];

export default function SitemapPage() {
  const [files] = useState<SitemapFile[]>(sitemapFiles);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium mb-1">
            <Link href="/" className="hover:text-zinc-600 transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="h-3 w-3 text-zinc-300" />
            <span className="text-purple-600 font-semibold">Sitemap</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
            Sitemap
          </h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-500 font-medium">
            Manage and submit your XML sitemap to search engines.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleRegenerate}
          disabled={isRegenerating}
          className="flex items-center gap-2 rounded-2xl bg-purple-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-md shadow-purple-600/20 transition-all hover:bg-purple-700 active:scale-95 disabled:opacity-70 self-start sm:self-auto"
        >
          <RotateCcw className={`h-4 w-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          <span>{isRegenerating ? 'Regenerating...' : 'Regenerate Sitemap'}</span>
        </button>
      </div>

      {/* Top Overview Cards (4 Grid Items) */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4">
        <h2 className="font-serif text-sm font-bold text-zinc-950">
          Sitemap Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Sitemap URL */}
          <div className="flex items-center gap-3.5 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 transition-all hover:border-zinc-200">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
              <FileCode className="h-5.5 w-5.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold text-zinc-400">Sitemap URL</p>
              <a
                href="https://yourwebsite.com/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-zinc-800 hover:text-purple-600 transition-colors flex items-center gap-1 truncate mt-0.5"
              >
                <span className="truncate">https://yourwebsite.com/sitemap.xml</span>
                <ExternalLink className="h-3 w-3 shrink-0 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* Card 2: Total URLs */}
          <div className="flex items-center gap-3.5 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 transition-all hover:border-zinc-200">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <Globe className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-zinc-400">Total URLs</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-serif text-2xl font-black text-zinc-950">246</span>
                <span className="text-[11px] font-extrabold text-emerald-600">+12 this week</span>
              </div>
            </div>
          </div>

          {/* Card 3: Last Generated */}
          <div className="flex items-center gap-3.5 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 transition-all hover:border-zinc-200">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Clock className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-zinc-400">Last Generated</p>
              <p className="font-serif text-sm font-extrabold text-zinc-950 mt-0.5">May 26, 2025</p>
              <p className="text-[11px] text-zinc-400 font-medium">10:30 AM</p>
            </div>
          </div>

          {/* Card 4: Status */}
          <div className="flex items-center gap-3.5 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 transition-all hover:border-zinc-200">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <CheckCircle2 className="h-5.5 w-5.5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-zinc-400">Status</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 border border-emerald-200/60">
                  Success
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium mt-1">Your sitemap is healthy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Section (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sitemap Files Table (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100">
              <h2 className="font-serif text-base font-bold text-zinc-950">
                Sitemap Files
              </h2>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">
                Download and manage your sitemap files.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200/80 bg-zinc-50/50 text-zinc-400 font-serif font-bold uppercase tracking-wider">
                    <th className="py-4 px-5">File Name</th>
                    <th className="py-4 px-4">Type</th>
                    <th className="py-4 px-4">URLs</th>
                    <th className="py-4 px-4">Last Modified</th>
                    <th className="py-4 px-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {files.map((file) => (
                    <tr
                      key={file.id}
                      className="group hover:bg-purple-50/30 transition-colors"
                    >
                      {/* File Name */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 font-mono text-xs group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                            {'</>'}
                          </div>
                          <span className="font-mono text-xs font-bold text-zinc-800 group-hover:text-purple-600 transition-colors">
                            {file.name}
                          </span>
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${file.typeBg} ${file.typeText}`}
                        >
                          {file.type}
                        </span>
                      </td>

                      {/* URLs Count */}
                      <td className="py-4 px-4 font-serif font-bold text-zinc-900">
                        {file.urlsCount}
                      </td>

                      {/* Last Modified */}
                      <td className="py-4 px-4">
                        <div className="text-xs">
                          <p className="font-bold text-zinc-800">{file.lastModifiedDate}</p>
                          <p className="text-[11px] text-zinc-400 font-medium">{file.lastModifiedTime}</p>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            title="Download XML"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </button>
                          <button
                            title="View XML File"
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-zinc-100 bg-white px-6 py-3.5 text-xs font-semibold text-zinc-400">
              Showing 1 to 5 of 5 files
            </div>
          </div>

          {/* Bottom Info Banner */}
          <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-5 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
              <Info className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-sm font-bold text-zinc-950">
                About XML Sitemaps
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                Sitemaps help search engines discover and index your content faster. Make sure to keep your sitemap updated regularly.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:underline pt-1"
              >
                <span>Learn more about sitemaps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Tools & Search Engine Submission (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Sitemap Tools */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4">
            <h3 className="font-serif text-sm font-bold text-zinc-950">
              Sitemap Tools
            </h3>

            <div className="space-y-3">
              {/* Tool 1 */}
              <div className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/40 p-3.5 hover:bg-purple-50/40 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <Send className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-800 group-hover:text-purple-600 transition-colors">
                      Ping Search Engines
                    </p>
                    <p className="text-[11px] text-zinc-400 font-medium">
                      Notify search engines about your sitemap
                    </p>
                  </div>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-purple-200 bg-white text-purple-600 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Play className="h-3 w-3 fill-current ml-0.5" />
                </div>
              </div>

              {/* Tool 2 */}
              <div className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/40 p-3.5 hover:bg-purple-50/40 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-800 group-hover:text-purple-600 transition-colors">
                      Verify Sitemap
                    </p>
                    <p className="text-[11px] text-zinc-400 font-medium">
                      Check if your sitemap is accessible
                    </p>
                  </div>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-purple-200 bg-white text-purple-600 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Play className="h-3 w-3 fill-current ml-0.5" />
                </div>
              </div>

              {/* Tool 3 */}
              <div className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/40 p-3.5 hover:bg-purple-50/40 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-800 group-hover:text-purple-600 transition-colors">
                      View Sitemap Index
                    </p>
                    <p className="text-[11px] text-zinc-400 font-medium">
                      View all URLs in your sitemap
                    </p>
                  </div>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-purple-200 bg-white text-purple-600 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Play className="h-3 w-3 fill-current ml-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Search Engine Submission */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4">
            <h3 className="font-serif text-sm font-bold text-zinc-950">
              Search Engine Submission
            </h3>

            <div className="space-y-3 divide-y divide-zinc-100">
              {/* Row 1: Google */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 font-bold text-sm">
                    G
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Google Search Console</p>
                    <p className="text-[10px] text-zinc-400">Last pinged: May 26, 2025 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 border border-emerald-200/60">
                    Submitted
                  </span>
                  <MoreVertical className="h-3.5 w-3.5 text-zinc-300 cursor-pointer" />
                </div>
              </div>

              {/* Row 2: Bing */}
              <div className="pt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-600 font-bold text-sm">
                    b
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Bing Webmaster Tools</p>
                    <p className="text-[10px] text-zinc-400">Last pinged: May 26, 2025 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 border border-emerald-200/60">
                    Submitted
                  </span>
                  <MoreVertical className="h-3.5 w-3.5 text-zinc-300 cursor-pointer" />
                </div>
              </div>

              {/* Row 3: Yandex */}
              <div className="pt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-red-700 font-serif font-black text-sm">
                    Y
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Yandex Webmaster</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 border border-amber-200/60">
                    Pending
                  </span>
                  <button className="rounded-lg border border-purple-200 bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-600 hover:bg-purple-600 hover:text-white transition-colors">
                    Submit
                  </button>
                </div>
              </div>

              {/* Row 4: Baidu */}
              <div className="pt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold text-sm">
                    🐾
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Baidu Webmaster</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 border border-amber-200/60">
                    Pending
                  </span>
                  <button className="rounded-lg border border-purple-200 bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-600 hover:bg-purple-600 hover:text-white transition-colors">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
