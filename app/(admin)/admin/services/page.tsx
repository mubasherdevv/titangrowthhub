'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ToastProvider';
import {
  Search,
  Upload,
  Plus,
  RotateCcw,
  Edit2,
  Eye,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Wrench,
  FileCheck2,
  Link2,
  Users
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: 'SEO Services' | 'Consulting' | 'Technical';
  status: 'Published' | 'Draft' | 'Archived';
  seoScore: number;
  updatedDate: string;
  updatedTime: string;
  shortDesc?: string;
  content?: string;
}

const getCategoryDetails = (category: string) => {
  switch (category) {
    case 'Consulting':
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-600 border-blue-200/60',
        iconBg: 'bg-purple-100 text-purple-600',
        icon: Users,
      };
    case 'Technical':
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600 border-emerald-200/60',
        iconBg: 'bg-emerald-100 text-emerald-600',
        icon: Wrench,
      };
    default:
      return {
        bg: 'bg-orange-50',
        text: 'text-orange-600 border-orange-200/60',
        iconBg: 'bg-orange-100 text-orange-600',
        icon: TrendingUp,
      };
  }
};

export default function ServicesPage() {
  const toast = useToast();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load services');
        setLoading(false);
      });
  }, []);
  const [scoreFilter, setScoreFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Toggle select all
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(services.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Toggle single row selection
  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setCategoryFilter('All');
    setScoreFilter('All');
  };

  // Filtered services
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || service.status === statusFilter;
    const matchesCategory =
      categoryFilter === 'All' || service.category === categoryFilter;
    const matchesScore =
      scoreFilter === 'All' ||
      (scoreFilter === '90+' && service.seoScore >= 90) ||
      (scoreFilter === '70-89' && service.seoScore >= 70 && service.seoScore < 90) ||
      (scoreFilter === 'Below 70' && service.seoScore < 70);

    return matchesSearch && matchesStatus && matchesCategory && matchesScore;
  });

  return (
    <div className="space-y-6">
      {/* Top Title & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
            Services
          </h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-800 font-medium">
            Manage and optimize your services pages for better visibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300">
            <Upload className="h-4 w-4 text-zinc-800" />
            <span>Import CSV</span>
          </button>
          <Link
            href="/admin/services/add"
            className="flex items-center gap-2 rounded-2xl bg-orange-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-md shadow-orange-600/20 transition-all hover:bg-orange-700"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Service</span>
          </Link>
        </div>
      </div>

      {/* Filter & Toolbar Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="lg:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-700" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 pl-10 pr-4 py-2 text-xs font-medium text-zinc-800 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Status Dropdown */}
          <div className="lg:col-span-2">
            <label className="text-[10px] font-serif font-bold uppercase tracking-wider text-zinc-700 block mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Filter by Status"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 focus:border-orange-500 focus:outline-none"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          {/* Category Dropdown */}
          <div className="lg:col-span-2">
            <label className="text-[10px] font-serif font-bold uppercase tracking-wider text-zinc-700 block mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by Category"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 focus:border-orange-500 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="SEO Services">SEO Services</option>
              <option value="Consulting">Consulting</option>
            </select>
          </div>

          {/* SEO Score Dropdown */}
          <div className="lg:col-span-2">
            <label className="text-[10px] font-serif font-bold uppercase tracking-wider text-zinc-700 block mb-1">SEO Score</label>
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              aria-label="Filter by SEO Score"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 focus:border-orange-500 focus:outline-none"
            >
              <option value="All">All Scores</option>
              <option value="90+">90+ Excellent</option>
              <option value="70-89">70 - 89 Good</option>
              <option value="Below 70">Below 70 Needs Work</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="lg:col-span-2 flex items-end">
            <button
              onClick={handleClearFilters}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5 text-zinc-800" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-zinc-200/80 bg-zinc-50/50 text-zinc-700 font-serif font-bold uppercase tracking-wider">
                <th className="py-4 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === services.length && services.length > 0}
                    onChange={handleSelectAll}
                    aria-label="Select all services"
                    className="h-4 w-4 rounded border-zinc-300 text-orange-600 focus:ring-orange-500"
                  />
                </th>
                <th className="py-4 px-4">Service</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">SEO Score</th>
                <th className="py-4 px-4">Updated</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredServices.map((service) => {
                const isSelected = selectedIds.includes(service.id);
                const details = getCategoryDetails(service.category);
                const IconComponent = details.icon;

                return (
                  <tr
                    key={service.id}
                    className={`group hover:bg-orange-50/30 transition-colors ${
                      isSelected ? 'bg-orange-50/50' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(service.id)}
                        aria-label={`Select ${service.title}`}
                        className="h-4 w-4 rounded border-zinc-300 text-orange-600 focus:ring-orange-500"
                      />
                    </td>

                    {/* Service Title + Thumbnail */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-12 w-14 shrink-0 items-center justify-center rounded-xl ${details.iconBg} shadow-sm`}
                        >
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-serif font-extrabold text-zinc-950 text-xs md:text-sm group-hover:text-orange-600 transition-colors">
                            {service.title}
                          </p>
                          <span className="text-[11px] text-zinc-700 font-medium">
                            {service.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category Pill Tag */}
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${details.bg} ${details.text}`}>
                        {service.category}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      {service.status === 'Published' ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 border border-emerald-200/50">
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-600 border border-amber-200/50">
                          Draft
                        </span>
                      )}
                    </td>

                    {/* SEO Score Circle Badge */}
                    <td className="py-4 px-4">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-serif font-extrabold ${
                          service.seoScore >= 90
                            ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50'
                            : service.seoScore >= 70
                            ? 'border-orange-500 text-orange-600 bg-orange-50/50'
                            : 'border-amber-500 text-amber-600 bg-amber-50/50'
                        }`}
                      >
                        {service.seoScore}
                      </div>
                    </td>

                    {/* Updated Date */}
                    <td className="py-4 px-4">
                      <div className="text-xs">
                        <p className="font-bold text-zinc-800">{service.updatedDate}</p>
                        <p className="text-[11px] text-zinc-700 font-medium">{service.updatedTime}</p>
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          title="Edit Service"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-800"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          title="Preview Service"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-800"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          title="More options"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-800"
                        >
                          <MoreVertical className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer & Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 bg-white px-6 py-4 text-xs font-semibold text-zinc-800">
          <div>Showing 1 to 5 of 12 results</div>
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-800 disabled:opacity-40 hover:bg-zinc-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                currentPage === 1
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              1
            </button>
            <button
              onClick={() => setCurrentPage(2)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                currentPage === 2
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              2
            </button>
            <button
              onClick={() => setCurrentPage(3)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                currentPage === 3
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              3
            </button>
            <span className="px-1 text-zinc-700">...</span>
            <button
              onClick={() => setCurrentPage(12)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-xs font-bold text-zinc-700 hover:bg-zinc-50"
            >
              12
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(12, p + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-800 hover:bg-zinc-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
