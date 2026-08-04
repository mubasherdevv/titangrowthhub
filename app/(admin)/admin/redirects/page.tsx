'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Upload,
  Settings,
  Plus,
  ChevronDown,
  Lock,
  CheckCircle2,
  PauseCircle,
  Globe,
  Search,
  Filter,
  RotateCcw,
  Info,
  ExternalLink,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface RedirectRule {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  type: '301' | '302' | '307';
  status: 'Active' | 'Inactive';
  hits: number;
  lastAccessed: string;
}

const initialRedirects: RedirectRule[] = [
  {
    id: '1',
    sourceUrl: '/old-about-us',
    targetUrl: '/about',
    type: '301',
    status: 'Active',
    hits: 245,
    lastAccessed: 'May 26, 2025 10:30 AM',
  },
  {
    id: '2',
    sourceUrl: '/old-services',
    targetUrl: '/services',
    type: '301',
    status: 'Active',
    hits: 189,
    lastAccessed: 'May 26, 2025 09:15 AM',
  },
  {
    id: '3',
    sourceUrl: '/blog/old-post-name',
    targetUrl: '/blog/new-post-name',
    type: '301',
    status: 'Active',
    hits: 156,
    lastAccessed: 'May 25, 2025 11:20 PM',
  },
  {
    id: '4',
    sourceUrl: '/contact-us',
    targetUrl: '/contact',
    type: '302',
    status: 'Active',
    hits: 98,
    lastAccessed: 'May 25, 2025 08:45 PM',
  },
  {
    id: '5',
    sourceUrl: '/old-pricing',
    targetUrl: '/pricing',
    type: '301',
    status: 'Inactive',
    hits: 0,
    lastAccessed: '-',
  },
  {
    id: '6',
    sourceUrl: '/products',
    targetUrl: '/shop',
    type: '301',
    status: 'Active',
    hits: 312,
    lastAccessed: 'May 24, 2025 04:10 PM',
  },
  {
    id: '7',
    sourceUrl: '/2019/old-article',
    targetUrl: '/blog/old-article',
    type: '301',
    status: 'Active',
    hits: 72,
    lastAccessed: 'May 24, 2025 02:30 PM',
  },
  {
    id: '8',
    sourceUrl: '/old-feature',
    targetUrl: '/features',
    type: '302',
    status: 'Inactive',
    hits: 0,
    lastAccessed: '-',
  },
];

export default function RedirectsPage() {
  const [redirects, setRedirects] = useState<RedirectRule[]>(initialRedirects);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [groupFilter, setGroupFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Toggle Single Status (Active <-> Inactive)
  const handleToggleStatus = (id: string) => {
    setRedirects((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'Active' ? 'Inactive' : 'Active',
            }
          : item
      )
    );
  };

  // Toggle Select All
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(redirects.map((r) => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Toggle Row Selection
  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Clear Filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setTypeFilter('All');
    setStatusFilter('All');
    setGroupFilter('All');
  };

  // Filtered List
  const filteredRedirects = redirects.filter((rule) => {
    const matchesSearch =
      rule.sourceUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.targetUrl.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || rule.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || rule.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
            Redirects
          </h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-500 font-medium">
            Manage 301, 302 and other redirects to improve your site structure and SEO.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300">
            <Upload className="h-4 w-4 text-zinc-500" />
            <span>Import / Export</span>
          </button>
          <button className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300">
            <Settings className="h-4 w-4 text-zinc-500" />
            <span>Settings</span>
          </button>
          <div className="relative inline-flex rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-600/20">
            <Link
              href="/admin/redirects/add"
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold transition-all hover:bg-purple-700 rounded-l-2xl"
            >
              <Plus className="h-4 w-4" />
              <span>Add Redirect</span>
            </Link>
            <button className="px-2.5 py-2.5 border-l border-purple-500/40 hover:bg-purple-700 rounded-r-2xl">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Overview Cards (4 Grid Items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Redirects */}
        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">Total Redirects</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">120</p>
            <p className="text-[11px] text-zinc-400 font-medium">All redirect rules</p>
          </div>
        </div>

        {/* Card 2: Active */}
        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">Active</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">112</p>
            <p className="text-[11px] text-emerald-600 font-extrabold">Working properly</p>
          </div>
        </div>

        {/* Card 3: Inactive */}
        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <PauseCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">Inactive</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">6</p>
            <p className="text-[11px] text-zinc-400 font-medium">Disabled rules</p>
          </div>
        </div>

        {/* Card 4: Types */}
        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">Types</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">2</p>
            <p className="text-[11px] text-zinc-400 font-medium">301, 302</p>
          </div>
        </div>
      </div>

      {/* Filter & Toolbar Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search redirects..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 pl-10 pr-4 py-2.5 text-xs font-medium text-zinc-800 placeholder-zinc-400 focus:border-purple-600 focus:bg-white focus:outline-none transition-all"
              />
            </div>

            {/* All Types */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-zinc-700 focus:border-purple-600 focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="301">301 Permanent</option>
              <option value="302">302 Temporary</option>
            </select>

            {/* All Status */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-zinc-700 focus:border-purple-600 focus:outline-none"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* All Groups */}
            <select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-zinc-700 focus:border-purple-600 focus:outline-none"
            >
              <option value="All">All Groups</option>
              <option value="Pages">Pages</option>
              <option value="Posts">Posts</option>
            </select>
          </div>

          {/* Action Buttons Right */}
          <div className="flex items-center gap-2 self-end lg:self-auto">
            <button className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50">
              <Filter className="h-3.5 w-3.5 text-zinc-500" />
              <span>Filters</span>
            </button>
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 px-2 py-2 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200/80 bg-zinc-50/50 text-zinc-400 font-serif font-bold uppercase tracking-wider">
                <th className="py-4 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === redirects.length && redirects.length > 0}
                    onChange={handleSelectAll}
                    aria-label="Select all redirects"
                    className="h-4 w-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500"
                  />
                </th>
                <th className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <span>Source URL</span>
                    <Info className="h-3 w-3 text-zinc-300" />
                  </div>
                </th>
                <th className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <span>Target URL</span>
                    <Info className="h-3 w-3 text-zinc-300" />
                  </div>
                </th>
                <th className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <span>Type</span>
                    <Info className="h-3 w-3 text-zinc-300" />
                  </div>
                </th>
                <th className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <span>Status</span>
                    <Info className="h-3 w-3 text-zinc-300" />
                  </div>
                </th>
                <th className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <span>Hits</span>
                    <Info className="h-3 w-3 text-zinc-300" />
                  </div>
                </th>
                <th className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    <span>Last Accessed</span>
                    <Info className="h-3 w-3 text-zinc-300" />
                  </div>
                </th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredRedirects.map((rule) => {
                const isSelected = selectedIds.includes(rule.id);

                return (
                  <tr
                    key={rule.id}
                    className={`group hover:bg-purple-50/30 transition-colors ${
                      isSelected ? 'bg-purple-50/50' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(rule.id)}
                        aria-label={`Select ${rule.sourceUrl}`}
                        className="h-4 w-4 rounded border-zinc-300 text-purple-600 focus:ring-purple-500"
                      />
                    </td>

                    {/* Source URL */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-800 group-hover:text-purple-600 transition-colors">
                        <span>{rule.sourceUrl}</span>
                        <ExternalLink className="h-3 w-3 text-zinc-400 shrink-0" />
                      </div>
                    </td>

                    {/* Target URL */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-800">
                        <span>{rule.targetUrl}</span>
                        <ExternalLink className="h-3 w-3 text-zinc-400 shrink-0" />
                      </div>
                    </td>

                    {/* Type Badge */}
                    <td className="py-4 px-4">
                      {rule.type === '301' ? (
                        <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-extrabold text-purple-700 border border-purple-200/60">
                          301
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-extrabold text-blue-700 border border-blue-200/60">
                          302
                        </span>
                      )}
                    </td>

                    {/* Status Pill */}
                    <td className="py-4 px-4">
                      {rule.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 border border-emerald-200/60">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-600 border border-amber-200/60">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Hits */}
                    <td className="py-4 px-4 font-serif font-bold text-zinc-900">
                      {rule.hits}
                    </td>

                    {/* Last Accessed */}
                    <td className="py-4 px-4 text-xs text-zinc-500 font-medium">
                      {rule.lastAccessed}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit Button */}
                        <button
                          title="Edit Redirect"
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-800"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>

                        {/* Toggle Switch */}
                        <button
                          onClick={() => handleToggleStatus(rule.id)}
                          title={`Switch to ${rule.status === 'Active' ? 'Inactive' : 'Active'}`}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            rule.status === 'Active' ? 'bg-purple-600' : 'bg-zinc-200'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                              rule.status === 'Active' ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>

                        {/* Delete Button */}
                        <button
                          title="Delete Redirect"
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer & Bulk Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 bg-white px-6 py-4 text-xs font-semibold text-zinc-500">
          {/* Bulk Actions Left */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 focus:border-purple-600 focus:outline-none">
              <option value="">Bulk Actions</option>
              <option value="delete">Delete Selected</option>
              <option value="activate">Activate Selected</option>
              <option value="deactivate">Deactivate Selected</option>
            </select>
            <button className="rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-100">
              Apply
            </button>
          </div>

          {/* Showing Count */}
          <div className="text-zinc-400">Showing 1 to 8 of 120 redirects</div>

          {/* Pagination Right */}
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 disabled:opacity-40 hover:bg-zinc-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                currentPage === 1
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                currentPage === 2
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              2
            </button>
            <button
              onClick={() => setCurrentPage(3)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                currentPage === 3
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              3
            </button>
            <span className="px-1 text-zinc-400">...</span>
            <button
              onClick={() => setCurrentPage(15)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50"
            >
              15
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(15, p + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
