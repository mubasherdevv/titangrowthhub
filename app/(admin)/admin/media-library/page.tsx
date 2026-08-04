'use client';

import React, { useState } from 'react';
import {
  Upload,
  Search,
  Image as ImageIcon,
  Wand2,
  CheckCircle2,
  AlertTriangle,
  Download,
  Copy,
  Trash2,
  ExternalLink,
  Check
} from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  dimensions: string;
  size: string;
  format: string;
  altText: string;
  hasAlt: boolean;
  isWebp: boolean;
}

const initialMedia: MediaItem[] = [
  {
    id: '1',
    name: 'seo-guide-2025-cover.jpg',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60',
    dimensions: '1200 x 630px',
    size: '145 KB',
    format: 'JPG',
    altText: 'SEO Best Practices 2025 Cover Illustration',
    hasAlt: true,
    isWebp: true,
  },
  {
    id: '2',
    name: 'keyword-research-dashboard.png',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60',
    dimensions: '1400 x 800px',
    size: '230 KB',
    format: 'PNG',
    altText: '',
    hasAlt: false,
    isWebp: false,
  },
  {
    id: '3',
    name: 'local-seo-map-location.jpg',
    url: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&auto=format&fit=crop&q=60',
    dimensions: '1000 x 600px',
    size: '98 KB',
    format: 'JPG',
    altText: 'Local SEO map markers and geographic rankings',
    hasAlt: true,
    isWebp: true,
  },
  {
    id: '4',
    name: 'technical-audit-report.png',
    url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop&q=60',
    dimensions: '1200 x 700px',
    size: '310 KB',
    format: 'PNG',
    altText: '',
    hasAlt: false,
    isWebp: false,
  },
];

export default function MediaLibraryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'missing' | 'webp'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Generate AI Alt Text
  const handleGenerateAlt = (id: string, name: string) => {
    const generated = name
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());

    setMediaList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, altText: generated, hasAlt: true } : item
      )
    );
  };

  // Copy Image URL
  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered List
  const filteredMedia = mediaList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.altText.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterType === 'missing') return matchesSearch && !item.hasAlt;
    if (filterType === 'webp') return matchesSearch && item.isWebp;
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
            Media Library & Image SEO
          </h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-500 font-medium">
            Manage images, auto-generate AI Alt tags, and optimize WebP image compression.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-2xl bg-orange-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-md shadow-orange-600/20 transition-all hover:bg-orange-700 active:scale-95 self-start sm:self-auto">
          <Upload className="h-4 w-4" />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Overview Cards (4 Grid Items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <ImageIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">Total Images</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">{mediaList.length}</p>
            <p className="text-[11px] text-zinc-400 font-medium">In media directory</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">Missing Alt Text</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">
              {mediaList.filter((m) => !m.hasAlt).length}
            </p>
            <p className="text-[11px] text-amber-600 font-bold">Needs Optimization</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">WebP Optimized</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">
              {mediaList.filter((m) => m.isWebp).length}
            </p>
            <p className="text-[11px] text-emerald-600 font-bold">Fast Load Speed</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
            <Wand2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">SEO Health</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">96%</p>
            <p className="text-[11px] text-purple-600 font-bold">High Image Rank</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search images by name or alt tag..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 pl-10 pr-4 py-2 text-xs font-medium text-zinc-800 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 p-1 text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'all' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            All Media
          </button>
          <button
            onClick={() => setFilterType('missing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'missing' ? 'bg-amber-500 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            Missing Alt Tag
          </button>
          <button
            onClick={() => setFilterType('webp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === 'webp' ? 'bg-emerald-600 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            WebP Optimized
          </button>
        </div>
      </div>

      {/* Media Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm flex flex-col sm:flex-row items-center gap-4 transition-all hover:border-zinc-300"
          >
            {/* Image Thumbnail */}
            <div className="relative h-32 w-full sm:w-40 shrink-0 rounded-xl bg-zinc-100 overflow-hidden border border-zinc-200">
              <img
                src={item.url}
                alt={item.altText || item.name}
                className="h-full w-full object-cover"
              />
              <span className="absolute top-2 left-2 rounded-md bg-zinc-950/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white font-mono uppercase">
                {item.format}
              </span>
            </div>

            {/* Content Details */}
            <div className="flex-1 min-w-0 space-y-2.5 w-full">
              <div>
                <p className="font-serif font-extrabold text-sm text-zinc-950 truncate">
                  {item.name}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-medium mt-0.5">
                  <span>{item.dimensions}</span>
                  <span>•</span>
                  <span>{item.size}</span>
                </div>
              </div>

              {/* Alt Text Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-serif font-bold text-zinc-700">
                    Alt Text (SEO Image Tag)
                  </label>
                  {!item.hasAlt && (
                    <button
                      onClick={() => handleGenerateAlt(item.id, item.name)}
                      className="inline-flex items-center gap-1 text-[10px] font-extrabold text-purple-600 hover:text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200/60"
                    >
                      <Wand2 className="h-3 w-3" />
                      <span>AI Generate</span>
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={item.altText}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMediaList((prev) =>
                      prev.map((m) =>
                        m.id === item.id ? { ...m, altText: val, hasAlt: !!val } : m
                      )
                    );
                  }}
                  placeholder="Describe this image for Google SEO..."
                  className={`w-full rounded-xl border px-3 py-1.5 text-xs font-medium text-zinc-900 focus:outline-none ${
                    item.hasAlt
                      ? 'border-zinc-200 bg-zinc-50/50 focus:border-orange-500'
                      : 'border-amber-300 bg-amber-50/30 focus:border-amber-500'
                  }`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleCopyUrl(item.id, item.url)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-zinc-600 hover:text-zinc-900"
                >
                  {copiedId === item.id ? (
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  )}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy URL'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100"
                    title="Open original image"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    className="p-1.5 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                    title="Delete image"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
