'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Upload,
  Plus,
  RotateCcw,
  Edit2,
  Eye,
  EyeOff,
  Trash2,
  ChevronLeft,
  ChevronRight,
  SearchCode,
  FileCheck,
  Zap,
  Link2,
  FileText,
  Loader2,
  MoreVertical
} from 'lucide-react';
import { useToast } from '@/components/ToastProvider';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: 'Published' | 'Draft' | 'Archived';
  seoScore: number;
  updatedDate: string;
  updatedTime: string;
  category: string;
  isActive: boolean;
  metaDesc?: string;
  content?: string;
}

const PAGE_SIZE = 10;

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Guides':
    case 'SEO Strategy':
      return SearchCode;
    case 'Link Building':
      return Link2;
    case 'On-Page SEO':
      return FileCheck;
    case 'Technical':
      return Zap;
    default:
      return FileText;
  }
};

const getCategoryIconBg = (category: string) => {
  switch (category) {
    case 'Guides':
    case 'SEO Strategy':
      return 'bg-emerald-100 text-emerald-600';
    case 'Link Building':
      return 'bg-amber-100 text-amber-600';
    case 'On-Page SEO':
      return 'bg-blue-100 text-blue-600';
    case 'Technical':
      return 'bg-purple-100 text-purple-600';
    default:
      return 'bg-orange-100 text-orange-600';
  }
};

// Build a smart page-number list with ellipsis
const getPageNumbers = (total: number, current: number): (number | '...')[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '...')[] = [1];
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
};

export default function BlogPostsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [scoreFilter, setScoreFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [busyId, setBusyId] = useState<string | null>(null);
  const toast = useToast();

  const fetchPosts = () => {
    setLoading(true);
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, scoreFilter]);

  // Toggle select all
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(posts.map((p) => p.id));
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
    setScoreFilter('All');
  };

  // Filtered posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || post.status === statusFilter;
    const matchesScore =
      scoreFilter === 'All' ||
      (scoreFilter === '90+' && post.seoScore >= 90) ||
      (scoreFilter === '70-89' && post.seoScore >= 70 && post.seoScore < 90) ||
      (scoreFilter === 'Below 70' && post.seoScore < 70);

    return matchesSearch && matchesStatus && matchesScore;
  });

  const totalResults = filteredPosts.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const pagePosts = filteredPosts.slice(startIndex, startIndex + PAGE_SIZE);
  const shownFrom = totalResults === 0 ? 0 : startIndex + 1;
  const shownTo = Math.min(startIndex + PAGE_SIZE, totalResults);

  // Delete a post
  const handleDelete = async (post: BlogPost) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setBusyId(post.id);
    try {
      const res = await fetch(`/api/blogs/${post.id}`, { method: 'DELETE' });
      if (res.ok) {
        setSelectedIds((prev) => prev.filter((i) => i !== post.id));
        fetchPosts();
        toast.success(`Blog post "${post.title}" deleted`);
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || 'Failed to delete post');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete post');
    } finally {
      setBusyId(null);
    }
  };

  // Toggle active / inactive
  const handleToggleActive = async (post: BlogPost) => {
    setBusyId(post.id);
    try {
      const res = await fetch(`/api/blogs/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !post.isActive }),
      });
      if (res.ok) {
        fetchPosts();
        toast.success(
          post.isActive
            ? `"${post.title}" is now inactive (hidden from site)`
            : `"${post.title}" is now active (visible on site)`
        );
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || 'Failed to update post');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update post');
    } finally {
      setBusyId(null);
    }
  };

  // Public URL for preview
  const getPublicSlug = (slug: string) => {
    const part = slug.split('/').filter(Boolean).pop();
    return part || slug;
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
            Blog Posts
          </h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-500 font-medium">
            Manage and optimize your blog posts SEO.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300">
            <Upload className="h-4 w-4 text-zinc-500" />
            <span>Import CSV</span>
          </button>
          <Link
            href="/admin/blog-posts/create"
            className="flex items-center gap-2 rounded-2xl bg-orange-600 px-4 py-2.5 text-xs font-extrabold text-white shadow-md shadow-orange-600/20 transition-all hover:bg-orange-700"
          >
            <Plus className="h-4 w-4" />
            <span>New Blog Post</span>
          </Link>
        </div>
      </div>

      {/* Filter & Toolbar Card */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="lg:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 pl-10 pr-4 py-2 text-xs font-medium text-zinc-800 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Status Dropdown */}
          <div className="lg:col-span-2">
            <label className="text-[10px] font-serif font-bold uppercase tracking-wider text-zinc-400 block mb-1">Status</label>
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
            <label className="text-[10px] font-serif font-bold uppercase tracking-wider text-zinc-400 block mb-1">Category</label>
            <select
              aria-label="Filter by Category"
              className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 focus:border-orange-500 focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Guides">Guides</option>
              <option value="SEO">SEO Strategy</option>
            </select>
          </div>

          {/* SEO Score Dropdown */}
          <div className="lg:col-span-2">
            <label className="text-[10px] font-serif font-bold uppercase tracking-wider text-zinc-400 block mb-1">SEO Score</label>
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
              <RotateCcw className="h-3.5 w-3.5 text-zinc-500" />
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
              <tr className="border-b border-zinc-200/80 bg-zinc-50/50 text-zinc-400 font-serif font-bold uppercase tracking-wider">
                <th className="py-4 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === pagePosts.length && pagePosts.length > 0}
                    onChange={handleSelectAll}
                    aria-label="Select all posts"
                    className="h-4 w-4 rounded border-zinc-300 text-orange-600 focus:ring-orange-500"
                  />
                </th>
                <th className="py-4 px-4">Title</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Visibility</th>
                <th className="py-4 px-4">SEO Score</th>
                <th className="py-4 px-4">Updated</th>
                <th className="py-4 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-7 w-7 text-orange-600 animate-spin" />
                      <p className="text-xs font-semibold text-zinc-400">Loading posts...</p>
                    </div>
                  </td>
                </tr>
              ) : pagePosts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="h-8 w-8 text-zinc-300" />
                      <p className="text-sm font-serif font-bold text-zinc-700">No blog posts found</p>
                      <p className="text-xs text-zinc-400 font-medium">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pagePosts.map((post) => {
                  const isSelected = selectedIds.includes(post.id);
                  const IconComponent = getCategoryIcon(post.category);
                  const iconBg = getCategoryIconBg(post.category);
                  const isBusy = busyId === post.id;

                  return (
                    <tr
                      key={post.id}
                      className={`group hover:bg-orange-50/30 transition-colors ${
                        isSelected ? 'bg-orange-50/50' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(post.id)}
                          aria-label={`Select ${post.title}`}
                          className="h-4 w-4 rounded border-zinc-300 text-orange-600 focus:ring-orange-500"
                        />
                      </td>

                      {/* Title + Thumbnail */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`flex h-12 w-14 shrink-0 items-center justify-center rounded-xl ${iconBg} shadow-sm`}
                          >
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-serif font-extrabold text-zinc-950 text-xs md:text-sm group-hover:text-orange-600 transition-colors">
                              {post.title}
                            </p>
                            <span className="text-[11px] text-zinc-400 font-medium">
                              {post.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4">
                        {post.status === 'Published' ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 border border-emerald-200/50">
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-600 border border-amber-200/50">
                            Draft
                          </span>
                        )}
                      </td>

                      {/* Active / Inactive Badge */}
                      <td className="py-4 px-4">
                        {post.isActive ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600 border border-blue-200/50">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-bold text-zinc-500 border border-zinc-200/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* SEO Score Badge */}
                      <td className="py-4 px-4">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-serif font-extrabold ${
                            post.seoScore >= 90
                              ? 'border-emerald-500 text-emerald-600 bg-emerald-50/50'
                              : post.seoScore >= 70
                              ? 'border-orange-500 text-orange-600 bg-orange-50/50'
                              : 'border-amber-500 text-amber-600 bg-amber-50/50'
                          }`}
                        >
                          {post.seoScore}
                        </div>
                      </td>

                      {/* Updated Date */}
                      <td className="py-4 px-4">
                        <div className="text-xs">
                          <p className="font-bold text-zinc-800">{post.updatedDate}</p>
                          <p className="text-[11px] text-zinc-400 font-medium">{post.updatedTime}</p>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-1">
                          <Link
                            href={`/admin/blog-posts/${post.id}/edit`}
                            title="Edit Post"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-orange-100 hover:text-orange-600"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Link>
                          <a
                            href={`/blog/${getPublicSlug(post.slug)}`}
                            target="_blank"
                            rel="noreferrer"
                            title="View Post"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-800"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </a>
                          <button
                            onClick={() => handleToggleActive(post)}
                            disabled={isBusy}
                            title={post.isActive ? 'Deactivate (hide from site)' : 'Activate (show on site)'}
                            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:opacity-40 ${
                              post.isActive
                                ? 'text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600'
                                : 'text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700'
                            }`}
                          >
                            {isBusy ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : post.isActive ? (
                              <Eye className="h-3.5 w-3.5" />
                            ) : (
                              <EyeOff className="h-3.5 w-3.5" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(post)}
                            disabled={isBusy}
                            title="Delete Post"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            title="More options"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-800"
                          >
                            <MoreVertical className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer & Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 bg-white px-6 py-4 text-xs font-semibold text-zinc-500">
          <div>
            Showing {shownFrom} to {shownTo} of {totalResults} results
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 disabled:opacity-40 hover:bg-zinc-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {getPageNumbers(totalPages, safePage).map((page, idx) =>
                page === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-1 text-zinc-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                      safePage === page
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'border border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 disabled:opacity-40 hover:bg-zinc-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
