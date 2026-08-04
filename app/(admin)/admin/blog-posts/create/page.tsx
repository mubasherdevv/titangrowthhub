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
  ChevronRight
} from 'lucide-react';

export default function CreateBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [activePreviewTab, setActivePreviewTab] = useState<'google' | 'social'>('google');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePublish = async (status: 'Published' | 'Draft' = 'Published') => {
    if (!title || !slug) {
      alert('Title and Slug are required!');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          category: category || 'SEO Strategy',
          metaDesc,
          content,
          status,
          seoScore,
        }),
      });
      if (res.ok) {
        router.push('/admin/blog-posts');
        router.refresh();
      } else {
        alert('Failed to publish post');
      }
    } catch (err) {
      console.error(err);
      alert('Error publishing post');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-generate slug from title if slug not manually set
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
    }
  };

  // SEO Score calculation (dynamic based on form inputs)
  const calculateSeoScore = () => {
    let score = 0;
    if (title.length >= 10 && title.length <= 60) score += 25;
    if (slug.length > 3) score += 20;
    if (metaDesc.length >= 50 && metaDesc.length <= 160) score += 25;
    if (content.length > 100) score += 20;
    if (category) score += 10;
    return score;
  };

  const seoScore = calculateSeoScore();

  // SEO Checklist items
  const seoChecklist = [
    { label: 'SEO Title', passed: title.length >= 10 && title.length <= 60 },
    { label: 'Meta Description', passed: metaDesc.length >= 50 && metaDesc.length <= 160 },
    { label: 'URL Slug', passed: slug.length > 3 },
    { label: 'Content Length', passed: content.length >= 300 },
    { label: 'Focus Keyword', passed: title.length > 0 && content.toLowerCase().includes(title.toLowerCase().split(' ')[0]) },
    { label: 'Headings', passed: content.includes('#') || content.length > 200 },
    { label: 'Images', passed: false },
    { label: 'Internal Links', passed: false },
    { label: 'Schema', passed: true },
    { label: 'Readability', passed: content.length > 50 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/blog-posts"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Blog Posts</span>
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
            Create New Blog Post
          </h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-500 font-medium">
            Fill in the details to create and optimize your blog post.
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
        {/* Left Column: Form Fields (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Title Field */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-serif font-bold text-zinc-900">
                Title <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] font-semibold text-zinc-400">
                {title.length} / 60
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter attractive title for your blog post..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          {/* Slug Field */}
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
              <span className="bg-zinc-100 px-3.5 py-3 text-xs font-medium text-zinc-500 border-r border-zinc-200 shrink-0">
                https://yoursite.com/blog/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="enter-your-post-slug"
                className="w-full bg-transparent px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Meta Description Field */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-serif font-bold text-zinc-900">
                Meta Description <span className="text-red-500">*</span>
              </label>
            </div>
            <div className="relative">
              <textarea
                rows={3}
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                placeholder="Write a compelling meta description..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none transition-all resize-none"
              />
              <span className="absolute right-3 bottom-3 text-[11px] font-semibold text-zinc-400">
                {metaDesc.length} / 160
              </span>
            </div>
          </div>

          {/* Featured Image Box */}
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
                    Click to upload featured image
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

          {/* Rich Text Editor Field */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-3">
            <label className="text-xs font-serif font-bold text-zinc-900 block">
              Content <span className="text-red-500">*</span>
            </label>

            {/* Editor Toolbar */}
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

              <button type="button" title="Insert Link" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                <Link2 className="h-3.5 w-3.5" />
              </button>
              <button type="button" title="Insert Image" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                <ImageIcon className="h-3.5 w-3.5" />
              </button>
              <button type="button" title="Quote" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                <Quote className="h-3.5 w-3.5" />
              </button>
              <button type="button" title="Code block" className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                <Code className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Main Textarea */}
            <textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              className="w-full rounded-xl border border-zinc-200 bg-white p-4 text-xs font-normal text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:outline-none transition-all leading-relaxed"
            />

            {/* Bottom Word & Character Counter */}
            <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium pt-1">
              <span>Word count: {content.trim() ? content.trim().split(/\s+/).length : 0}</span>
              <span>Characters: {content.length}</span>
            </div>
          </div>

          {/* Category & Tags Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Dropdown */}
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
                <option value="Guides">Guides & Tutorials</option>
                <option value="SEO Strategy">SEO Strategy</option>
                <option value="Technical SEO">Technical SEO</option>
                <option value="Marketing">Marketing Trends</option>
              </select>
            </div>

            {/* Tags Input */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-2">
              <label className="text-xs font-serif font-bold text-zinc-900 block">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags and press enter..."
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 px-3.5 py-2.5 text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: SEO Inspector & Live Preview (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: SEO Score Card */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-bold text-zinc-950">
                SEO Score
              </h3>
              <Info className="h-4 w-4 text-zinc-400 cursor-pointer" />
            </div>

            <div className="flex items-center gap-5 pt-1">
              {/* Score Ring */}
              <div
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 text-xl font-serif font-black ${
                  seoScore >= 80
                    ? 'border-emerald-500 text-emerald-600 bg-emerald-50/40'
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
                  ? 'Great job! Your blog post content is well-optimized for search engines.'
                  : seoScore >= 50
                  ? 'Good start! Fill in title and description to boost score.'
                  : 'Start optimizing your content to improve your SEO score.'}
              </p>
            </div>
          </div>

          {/* Card 2: SEO Checklist */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-3">
            <h3 className="font-serif text-sm font-bold text-zinc-950 mb-3">
              SEO Check List
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

          {/* Card 3: Search Engine Preview Card */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4">
            <h3 className="font-serif text-sm font-bold text-zinc-950">
              Preview
            </h3>

            {/* Tabs */}
            <div className="flex items-center border-b border-zinc-100 text-xs font-bold text-zinc-500">
              <button
                onClick={() => setActivePreviewTab('google')}
                className={`pb-2 px-3 border-b-2 transition-all ${
                  activePreviewTab === 'google'
                    ? 'border-orange-600 text-orange-600 font-extrabold'
                    : 'border-transparent hover:text-zinc-900'
                }`}
              >
                Google
              </button>
              <button
                onClick={() => setActivePreviewTab('social')}
                className={`pb-2 px-3 border-b-2 transition-all ${
                  activePreviewTab === 'social'
                    ? 'border-orange-600 text-orange-600 font-extrabold'
                    : 'border-transparent hover:text-zinc-900'
                }`}
              >
                Social
              </button>
            </div>

            {/* Google SERP Snippet Container */}
            {activePreviewTab === 'google' ? (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-[10px] font-bold">
                    v
                  </div>
                  <div className="text-[11px] text-zinc-500 truncate">
                    yoursite.com
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 truncate">
                  https://yoursite.com/blog/{slug || 'your-post-slug'}
                </p>
                <h4 className="text-sm font-extrabold text-blue-700 hover:underline cursor-pointer line-clamp-1">
                  {title || 'Your Blog Title Will Appear Here'}
                </h4>
                <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                  {metaDesc ||
                    'Your meta description will appear here and this is how it will look in Google search results.'}
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/40 overflow-hidden space-y-2">
                <div className="h-32 bg-zinc-200 flex items-center justify-center text-zinc-400 text-xs font-semibold">
                  Featured Image Preview
                </div>
                <div className="p-3 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">YOURSITE.COM</span>
                  <h4 className="text-xs font-extrabold text-zinc-900 line-clamp-1">
                    {title || 'Your Blog Title'}
                  </h4>
                  <p className="text-[11px] text-zinc-500 line-clamp-2">
                    {metaDesc || 'Meta description preview for Twitter and Facebook OpenGraph...'}
                  </p>
                </div>
              </div>
            )}

            <p className="text-[10px] text-zinc-400 italic">
              * This is a preview. Actual results may vary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
