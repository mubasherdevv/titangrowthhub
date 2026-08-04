'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Save,
  Eye,
  Send,
  Image as ImageIcon,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link2,
  Quote,
  Code,
  Info,
  ChevronDown,
  ChevronRight,
  User,
  Monitor,
  Smartphone,
  Star,
  CheckCircle2
} from 'lucide-react';

export default function AddNewServicePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'schema' | 'social'>('seo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // General Tab State
  const [title, setTitle] = useState('Local SEO Services');
  const [slug, setSlug] = useState('local-seo-services');
  const [category, setCategory] = useState('SEO Services');
  const [shortDesc, setShortDesc] = useState('Boost your business with our professional Local SEO services.');
  const [content, setContent] = useState('Comprehensive local SEO strategies tailored for growing businesses...');
  const [displayOrder, setDisplayOrder] = useState('0');

  const handlePublish = async (status: 'Published' | 'Draft' = 'Published') => {
    if (!title || !slug) {
      alert('Title and Slug are required!');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          category,
          status,
          seoScore,
          shortDesc,
          content,
        }),
      });
      if (res.ok) {
        router.push('/admin/services');
        router.refresh();
      } else {
        alert('Failed to save service');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving service');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SEO Settings Tab State
  const [seoTitle, setSeoTitle] = useState('Local SEO Services | Rank Higher & Get More Traffic');
  const [seoMetaDesc, setSeoMetaDesc] = useState(
    'Boost your business with our professional Local SEO services. Get more leads, more traffic, and grow your online presence with proven SEO strategies.'
  );
  const [seoSlug, setSeoSlug] = useState('local-seo-services');
  const [focusKeyword, setFocusKeyword] = useState('local seo services');
  const [canonicalUrl, setCanonicalUrl] = useState('https://yoursite.com/services/local-seo-services');
  const [metaRobots, setMetaRobots] = useState('Index, Follow');

  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Auto-generate slug from service title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
      const generated = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setSlug(generated);
      setSeoSlug(generated);
      setCanonicalUrl(`https://yoursite.com/services/${generated}`);
    }
  };

  // Dynamic SEO score calculation
  const calculateSeoScore = () => {
    let score = 0;
    if (seoTitle.length >= 10 && seoTitle.length <= 60) score += 25;
    if (seoMetaDesc.length >= 50 && seoMetaDesc.length <= 160) score += 25;
    if (seoSlug.length > 3) score += 15;
    if (focusKeyword.length > 2) score += 15;
    if (canonicalUrl.length > 10) score += 10;
    if (metaRobots.includes('Index')) score += 10;
    return score;
  };

  const seoScore = calculateSeoScore();

  // SEO Checklist items
  const seoChecklist = [
    { label: 'SEO Title', passed: seoTitle.length >= 10 && seoTitle.length <= 60 },
    { label: 'Meta Description', passed: seoMetaDesc.length >= 50 && seoMetaDesc.length <= 160 },
    { label: 'URL Slug', passed: seoSlug.length > 3 },
    { label: 'Focus Keyword', passed: focusKeyword.length > 2 },
    { label: 'Content Length', passed: content.length >= 50 },
    { label: 'Headings', passed: true },
    { label: 'Image Alt Text', passed: false },
    { label: 'Internal Links', passed: true },
    { label: 'Schema Markup', passed: true },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Services</span>
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
            Add New Service
          </h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-500 font-medium">
            Create a new service page and optimize for search engines.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handlePublish('Draft')}
            disabled={isSubmitting}
            className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300 disabled:opacity-50"
          >
            <Save className="h-4 w-4 text-zinc-500" />
            <span>{isSubmitting ? 'Saving...' : 'Save Draft'}</span>
          </button>
          <button className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300">
            <Eye className="h-4 w-4 text-zinc-500" />
            <span>Preview</span>
          </button>
          <div className="relative inline-flex rounded-2xl bg-orange-600 text-white shadow-md shadow-orange-600/20">
            <button
              onClick={() => handlePublish('Published')}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold transition-all hover:bg-orange-700 rounded-l-2xl disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{isSubmitting ? 'Publishing...' : 'Publish'}</span>
            </button>
            <button className="px-2.5 py-2.5 border-l border-orange-500/40 hover:bg-orange-700 rounded-r-2xl">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Fields & Navigation Tabs (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Form Tabs Bar */}
          <div className="flex items-center border-b border-zinc-200/80 bg-white rounded-2xl px-4 pt-3 text-xs font-bold text-zinc-500 shadow-sm overflow-x-auto">
            <button
              onClick={() => setActiveTab('general')}
              className={`pb-3 px-4 border-b-2 font-serif tracking-wide transition-all ${
                activeTab === 'general'
                  ? 'border-orange-600 text-orange-600 font-extrabold'
                  : 'border-transparent hover:text-zinc-950'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab('seo')}
              className={`pb-3 px-4 border-b-2 font-serif tracking-wide transition-all ${
                activeTab === 'seo'
                  ? 'border-orange-600 text-orange-600 font-extrabold'
                  : 'border-transparent hover:text-zinc-950'
              }`}
            >
              SEO Settings
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`pb-3 px-4 border-b-2 font-serif tracking-wide transition-all ${
                activeTab === 'schema'
                  ? 'border-orange-600 text-orange-600 font-extrabold'
                  : 'border-transparent hover:text-zinc-950'
              }`}
            >
              Schema
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`pb-3 px-4 border-b-2 font-serif tracking-wide transition-all ${
                activeTab === 'social'
                  ? 'border-orange-600 text-orange-600 font-extrabold'
                  : 'border-transparent hover:text-zinc-950'
              }`}
            >
              Social Preview
            </button>
          </div>

          {/* TAB 1: GENERAL */}
          {activeTab === 'general' && (
            <>
              {/* Service Title */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-serif font-bold text-zinc-900">
                    Service Title <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] font-semibold text-zinc-400">
                    {title.length} / 60
                  </span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter service title..."
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
                />
              </div>

              {/* Slug & Category Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Slug */}
                <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-serif font-bold text-zinc-900">
                      Slug <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] font-semibold text-zinc-400">
                      {slug.length} / 100
                    </span>
                  </div>
                  <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50/50 overflow-hidden focus-within:border-orange-500 focus-within:bg-white transition-all">
                    <span className="bg-zinc-100 px-3 py-2.5 text-xs font-medium text-zinc-500 border-r border-zinc-200 shrink-0">
                      /services/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="enter-service-slug"
                      className="w-full bg-transparent px-3 py-2.5 text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
                  <label className="text-xs font-serif font-bold text-zinc-900 block">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs font-semibold text-zinc-700 focus:border-orange-500 focus:bg-white focus:outline-none"
                  >
                    <option value="">Select a category</option>
                    <option value="SEO Services">SEO Services</option>
                    <option value="Consulting">Consulting & Audit</option>
                    <option value="Technical">Technical Optimization</option>
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-serif font-bold text-zinc-900">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    placeholder="Enter a short description about this service..."
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none transition-all resize-none"
                  />
                  <span className="absolute right-3 bottom-3 text-[11px] font-semibold text-zinc-400">
                    {shortDesc.length} / 160
                  </span>
                </div>
              </div>

              {/* Featured Image Upload */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-3">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Featured Image
                </label>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50/40 p-5 transition-all hover:border-orange-300 hover:bg-orange-50/20">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-800">
                        Click to upload image
                      </p>
                      <p className="text-[11px] text-zinc-400 font-medium">
                        Recommended size: 1200 x 630px (16:9)
                      </p>
                    </div>
                  </div>
                  <button className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 hover:border-zinc-300 shrink-0">
                    Choose Image
                  </button>
                </div>
              </div>

              {/* Content / Service Details */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-3">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Content / Service Details <span className="text-red-500">*</span>
                </label>

                {/* Toolbar */}
                <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-2 flex flex-wrap items-center gap-1">
                  <select className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 focus:outline-none mr-2">
                    <option>Paragraph</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                    <option>Heading 3</option>
                  </select>

                  <div className="h-4 w-px bg-zinc-200 mx-1" />

                  <button type="button" title="Bold" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <Bold className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" title="Italic" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <Italic className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" title="Underline" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <UnderlineIcon className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" title="Strikethrough" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <Strikethrough className="h-3.5 w-3.5" />
                  </button>

                  <div className="h-4 w-px bg-zinc-200 mx-1" />

                  <button type="button" title="Bullet List" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <List className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" title="Numbered List" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <ListOrdered className="h-3.5 w-3.5" />
                  </button>

                  <div className="h-4 w-px bg-zinc-200 mx-1" />

                  <button type="button" title="Align Left" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <AlignLeft className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" title="Align Center" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <AlignCenter className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" title="Align Right" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <AlignRight className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" title="Justify" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <AlignJustify className="h-3.5 w-3.5" />
                  </button>

                  <div className="h-4 w-px bg-zinc-200 mx-1" />

                  <button type="button" title="Link" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <Link2 className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" title="Image" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <ImageIcon className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" title="Quote" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <Quote className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" title="Code" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                    <Code className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Textarea */}
                <textarea
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write about your service, features, benefits, process..."
                  className="w-full rounded-xl border border-zinc-200 bg-white p-4 text-xs font-normal text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:outline-none transition-all leading-relaxed"
                />

                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium pt-1">
                  <span>Word count: {content.trim() ? content.trim().split(/\s+/).length : 0}</span>
                  <span>Characters: {content.length}</span>
                </div>
              </div>

              {/* Service Icon & Display Order Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Icon Selection */}
                <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
                  <label className="text-xs font-serif font-bold text-zinc-900 block">
                    Service Icon (Optional)
                  </label>
                  <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/40 p-3 hover:bg-zinc-50 cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-800">Click to select icon</p>
                        <p className="text-[11px] text-zinc-400">Select an icon that represents this service</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-zinc-400" />
                  </div>
                </div>

                {/* Display Order */}
                <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
                  <label className="text-xs font-serif font-bold text-zinc-900 block">
                    Display Order (Optional)
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2.5 text-xs font-semibold text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none"
                  />
                  <span className="text-[11px] text-zinc-400 block font-medium">Lower numbers appear first</span>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: SEO SETTINGS (MATCHING DESIGN SCREENSHOT 6) */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              {/* Section Header */}
              <div>
                <h2 className="font-serif text-xl font-extrabold text-zinc-950">
                  SEO Settings
                </h2>
                <p className="text-xs text-zinc-500 font-medium mt-0.5">
                  Optimize your service page for search engines and improve visibility.
                </p>
              </div>

              {/* Field 1: SEO Title */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs font-serif font-bold text-zinc-900">
                      SEO Title
                    </label>
                    <Info className="h-3.5 w-3.5 text-zinc-400 cursor-pointer" />
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-400">
                    {seoTitle.length} / 60
                  </span>
                </div>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Local SEO Services | Rank Higher & Get More Traffic"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/30 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
                />
                
                {/* Green Progress Bar & Feedback */}
                <div className="space-y-1.5 pt-1">
                  <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (seoTitle.length / 60) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <span>Good! Your title contains the target keyword.</span>
                  </p>
                </div>
              </div>

              {/* Field 2: Meta Description */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs font-serif font-bold text-zinc-900">
                      Meta Description
                    </label>
                    <Info className="h-3.5 w-3.5 text-zinc-400 cursor-pointer" />
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={seoMetaDesc}
                    onChange={(e) => setSeoMetaDesc(e.target.value)}
                    placeholder="Boost your business with our professional Local SEO services..."
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/30 p-4 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none transition-all resize-none leading-relaxed"
                  />
                  <span className="absolute right-3 bottom-3 text-[11px] font-semibold text-zinc-400">
                    {seoMetaDesc.length} / 160
                  </span>
                </div>

                {/* Green Progress Bar & Feedback */}
                <div className="space-y-1.5 pt-1">
                  <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (seoMetaDesc.length / 160) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] font-semibold text-emerald-600">
                    Great! Your meta description is within the recommended length.
                  </p>
                </div>
              </div>

              {/* Field 3: URL Slug */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-serif font-bold text-zinc-900">
                    URL Slug
                  </label>
                  <Info className="h-3.5 w-3.5 text-zinc-400 cursor-pointer" />
                </div>
                <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50/40 overflow-hidden focus-within:border-orange-500 focus-within:bg-white transition-all">
                  <span className="bg-zinc-100 px-3.5 py-2.5 text-xs font-medium text-zinc-500 border-r border-zinc-200 shrink-0">
                    yoursite.com/services/
                  </span>
                  <input
                    type="text"
                    value={seoSlug}
                    onChange={(e) => setSeoSlug(e.target.value)}
                    placeholder="local-seo-services"
                    className="w-full bg-transparent px-3 py-2.5 text-xs font-medium text-zinc-900 focus:outline-none"
                  />
                </div>
                <span className="text-[11px] text-zinc-400 font-medium block">
                  Short, descriptive and keyword focused URL is recommended.
                </span>
              </div>

              {/* Field 4: Focus Keyword */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs font-serif font-bold text-zinc-900">
                      Focus Keyword
                    </label>
                    <Info className="h-3.5 w-3.5 text-zinc-400 cursor-pointer" />
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-400">
                    {focusKeyword.split(' ').length} / 80
                  </span>
                </div>
                <input
                  type="text"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  placeholder="local seo services"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/30 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
                />
                <span className="text-[11px] text-zinc-400 font-medium block">
                  This keyword will be used to calculate your SEO score.
                </span>
              </div>

              {/* Field 5: Canonical URL */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-serif font-bold text-zinc-900">
                    Canonical URL
                  </label>
                  <Info className="h-3.5 w-3.5 text-zinc-400 cursor-pointer" />
                </div>
                <input
                  type="text"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://yoursite.com/services/local-seo-services"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/30 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
                />
                <span className="text-[11px] text-zinc-400 font-medium block">
                  The canonical URL helps prevent duplicate content issues.
                </span>
              </div>

              {/* Field 6: Meta Robots */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-serif font-bold text-zinc-900">
                    Meta Robots
                  </label>
                  <Info className="h-3.5 w-3.5 text-zinc-400 cursor-pointer" />
                </div>
                <select
                  value={metaRobots}
                  onChange={(e) => setMetaRobots(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/30 px-3.5 py-2.5 text-xs font-semibold text-zinc-800 focus:border-orange-500 focus:bg-white focus:outline-none"
                >
                  <option value="Index, Follow">Index, Follow</option>
                  <option value="Noindex, Follow">Noindex, Follow</option>
                  <option value="Noindex, Nofollow">Noindex, Nofollow</option>
                  <option value="Index, Nofollow">Index, Nofollow</option>
                </select>
                <span className="text-[11px] text-zinc-400 font-medium block">
                  Allow search engines to index and follow this page.
                </span>
              </div>
            </div>
          )}

          {/* TAB 3 & 4 PLACEHOLDERS */}
          {(activeTab === 'schema' || activeTab === 'social') && (
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-8 text-center text-xs text-zinc-500 space-y-2">
              <p className="font-bold text-zinc-900 text-sm capitalize">{activeTab} Configuration</p>
              <p>Configure advanced {activeTab} attributes for search engine crawlers and social cards.</p>
            </div>
          )}
        </div>

        {/* Right Column: SEO Inspector & Search Preview (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* SEO Score Card */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-bold text-zinc-950">
                SEO Score
              </h3>
              <Info className="h-4 w-4 text-zinc-400 cursor-pointer" />
            </div>

            <div className="flex items-center gap-5 pt-1">
              <div
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 text-xl font-serif font-black ${
                  seoScore >= 80
                    ? 'border-purple-600 text-purple-700 bg-purple-50/40'
                    : seoScore >= 50
                    ? 'border-orange-500 text-orange-600 bg-orange-50/40'
                    : 'border-zinc-300 text-zinc-400 bg-zinc-50'
                }`}
              >
                <div>
                  <span>{seoScore}</span>
                  <span className="text-xs font-normal text-zinc-400 block text-center -mt-1">/100</span>
                </div>
              </div>

              <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                {seoScore >= 80
                  ? 'Great job! Your service page content is well-optimized for search engines.'
                  : seoScore >= 50
                  ? 'Good start! Fill in title and description to boost score.'
                  : 'Start optimizing your content to improve your SEO score.'}
              </p>
            </div>
          </div>

          {/* SEO Checklist */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-3">
            <h3 className="font-serif text-sm font-bold text-zinc-950 mb-3">
              SEO Checklist
            </h3>
            <div className="divide-y divide-zinc-100">
              {seoChecklist.map((item) => (
                <div
                  key={item.label}
                  className="py-2 flex items-center justify-between text-xs transition-colors hover:bg-zinc-50/60 px-1 rounded-lg"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        item.passed ? 'bg-emerald-500 ring-2 ring-emerald-100' : 'bg-zinc-300'
                      }`}
                    />
                    <span
                      className={`font-semibold ${
                        item.passed ? 'text-zinc-900' : 'text-zinc-500'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-zinc-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Search Preview Card (Real-time update from SEO Settings) */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-bold text-zinc-950">
                Search Preview
              </h3>
              <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1 rounded-md transition-colors ${
                    previewDevice === 'desktop' ? 'bg-purple-600 text-white' : 'text-zinc-400'
                  }`}
                  title="Desktop preview"
                >
                  <Monitor className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1 rounded-md transition-colors ${
                    previewDevice === 'mobile' ? 'bg-purple-600 text-white' : 'text-zinc-400'
                  }`}
                  title="Mobile preview"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Live Search Result Box */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 space-y-1.5">
              <p className="text-[11px] text-emerald-700 truncate font-mono">
                yoursite.com › services › {seoSlug || 'local-seo-services'}
              </p>
              <h4 className="text-sm font-extrabold text-blue-700 hover:underline cursor-pointer line-clamp-2">
                {seoTitle || 'Local SEO Services | Rank Higher & Get More Traffic'}
              </h4>
              <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                {seoMetaDesc ||
                  'Boost your business with our professional Local SEO services. Get more leads, more traffic, and grow your online presence with proven SEO strategies.'}
              </p>

              {/* Star Rating snippet */}
              <div className="flex items-center gap-1 text-[11px] text-amber-600 pt-1 font-medium">
                <div className="flex items-center text-amber-500">
                  <Star className="h-3 w-3 fill-amber-400" />
                  <Star className="h-3 w-3 fill-amber-400" />
                  <Star className="h-3 w-3 fill-amber-400" />
                  <Star className="h-3 w-3 fill-amber-400" />
                  <Star className="h-3 w-3 fill-amber-400 text-amber-200" />
                </div>
                <span>Rating: 4.8 • 25 reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
