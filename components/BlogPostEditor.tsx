'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';
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
  Unlink,
  Quote,
  Code,
  Info,
  ChevronDown,
  ChevronRight,
  X,
  Loader2,
  ExternalLink,
  RefreshCcw,
  Link as LinkIcon,
  CheckCircle2
} from 'lucide-react';

const slugify = (str: string) =>
  str
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

interface BlogPostEditorProps {
  postId?: string;
}

export default function BlogPostEditor({ postId }: BlogPostEditorProps) {
  const router = useRouter();
  const toast = useToast();
  const isEdit = !!postId;

  const [loading, setLoading] = useState(isEdit);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugAuto, setSlugAuto] = useState(!isEdit);
  const [metaDesc, setMetaDesc] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [activePreviewTab, setActivePreviewTab] = useState<'google' | 'social'>('google');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingContentImage, setUploadingContentImage] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const featuredInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);

  // Active formatting state for the toolbar
  const [formatState, setFormatState] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    insertUnorderedList: false,
    insertOrderedList: false,
    formatBlock: 'P',
  });

  // Detect the site URL (site_settings first, fallback to current origin)
  useEffect(() => {
    setSiteUrl(window.location.origin.replace(/\/$/, ''));
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data?.siteUrl) {
          setSiteUrl(data.siteUrl.replace(/\/$/, ''));
        }
      })
      .catch(() => {});
  }, []);

  // Load existing post data when editing
  useEffect(() => {
    if (!postId) return;
    fetch(`/api/blogs/${postId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load post');
        return res.json();
      })
      .then((post) => {
        setTitle(post.title || '');
        setSlug((post.slug || '').replace(/^\/+/, '').replace(/^blog\//, ''));
        setMetaDesc(post.metaDesc || '');
        setContent(post.content || '');
        setCategory(post.category || '');
        setTags(post.tags || '');
        setFeaturedImage(post.featuredImage || '');
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load blog post');
        setLoading(false);
      });
  }, [postId]);

  // Auto-generate slug from title while auto-sync is on
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (slugAuto) {
      setSlug(slugify(val));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugAuto(false);
    setSlug(slugify(e.target.value));
  };

  const handleRegenerateSlug = () => {
    setSlugAuto(true);
    setSlug(slugify(title));
  };

  // Featured image upload
  const handleFeaturedUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setFeaturedImage(data.url);
        toast.success('Featured image uploaded');
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  // Editor helpers
  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    syncEditorState();
    if (editorRef.current) setContent(editorRef.current.innerHTML);
  };

  const handleFormatBlock = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tag = e.target.value;
    e.target.value = '';
    exec('formatBlock', tag);
  };

  const handleCreateLink = () => {
    const url = window.prompt('Enter the link URL:', 'https://');
    if (url) {
      exec('createLink', url);
    }
  };

  const handleInsertContentImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadingContentImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        editorRef.current?.focus();
        document.execCommand('insertImage', false, data.url);
        syncEditorState();
        if (editorRef.current) setContent(editorRef.current.innerHTML);
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Image upload failed');
    } finally {
      setUploadingContentImage(false);
    }
  };

  const syncEditorState = useCallback(() => {
    setFormatState({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      formatBlock: (document.queryCommandValue('formatBlock') || 'P').toUpperCase(),
    });
  }, []);

  useEffect(() => {
    document.addEventListener('selectionchange', syncEditorState);
    return () => document.removeEventListener('selectionchange', syncEditorState);
  }, [syncEditorState]);

  const handlePublish = async (status: 'Published' | 'Draft' = 'Published') => {
    if (!title || !slug) {
      toast.error('Title and Slug are required!');
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        title,
        slug,
        category: category || 'SEO Strategy',
        metaDesc,
        content,
        featuredImage,
        tags,
        status,
        seoScore,
      };

      const res = isEdit
        ? await fetch(`/api/blogs/${postId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        : await fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

      if (res.ok) {
        toast.success(
          isEdit
            ? `Blog post "${title}" updated`
            : status === 'Draft'
            ? `Draft "${title}" saved`
            : `Blog post "${title}" published`
        );
        router.push('/admin/blog-posts');
        router.refresh();
      } else {
        toast.error('Failed to save post');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error saving post');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SEO Score calculation (dynamic based on form inputs)
  const calculateSeoScore = () => {
    let score = 0;
    if (title.length >= 10 && title.length <= 60) score += 25;
    if (slug.length > 3) score += 20;
    if (metaDesc.length >= 50 && metaDesc.length <= 160) score += 25;
    if (stripHtml(content).length > 100) score += 20;
    if (category) score += 10;
    return score;
  };

  const seoScore = calculateSeoScore();
  const plainContent = stripHtml(content);

  // SEO Checklist items
  const seoChecklist = [
    { label: 'SEO Title', passed: title.length >= 10 && title.length <= 60 },
    { label: 'Meta Description', passed: metaDesc.length >= 50 && metaDesc.length <= 160 },
    { label: 'URL Slug', passed: slug.length > 3 },
    { label: 'Content Length', passed: plainContent.length >= 300 },
    { label: 'Focus Keyword', passed: title.length > 0 && content.toLowerCase().includes(title.toLowerCase().split(' ')[0]) },
    { label: 'Headings', passed: /<h[1-6]/i.test(content) },
    { label: 'Images', passed: !!featuredImage || /<img/i.test(content) },
    { label: 'Internal Links', passed: /<a\s/i.test(content) },
    { label: 'Schema', passed: true },
    { label: 'Readability', passed: plainContent.length > 50 },
  ];

  const editorActiveClass = 'bg-orange-600 text-white shadow-sm';

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-orange-600 animate-spin" />
          <p className="text-xs font-semibold text-zinc-500">Loading blog post...</p>
        </div>
      </div>
    );
  }

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
            {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
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
            <span>{isSubmitting ? 'Saving...' : isEdit ? 'Save Changes' : 'Save Draft'}</span>
          </button>
          <button
            onClick={() =>
              document.getElementById('preview-card')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300"
          >
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
              <span>{isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Publish'}</span>
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
              <div className="flex items-center gap-3">
                {slugAuto ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200/60">
                    <CheckCircle2 className="h-3 w-3" />
                    Auto-generated
                  </span>
                ) : (
                  <button
                    onClick={handleRegenerateSlug}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-md border border-orange-200/60 hover:bg-orange-100 transition-colors"
                  >
                    <RefreshCcw className="h-3 w-3" />
                    Regenerate from title
                  </button>
                )}
                <span className="text-[11px] font-semibold text-zinc-400">
                  {slug.length} / 100
                </span>
              </div>
            </div>
            <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50/50 overflow-hidden focus-within:border-orange-500 focus-within:bg-white transition-all">
              <span className="bg-zinc-100 px-3.5 py-3 text-xs font-medium text-zinc-500 border-r border-zinc-200 shrink-0">
                {siteUrl || 'https://yoursite.com'}/blog/
              </span>
              <input
                type="text"
                value={slug}
                onChange={handleSlugChange}
                placeholder="enter-your-post-slug"
                className="w-full bg-transparent px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-zinc-400 font-medium">
              The slug updates automatically as you type the title. Edit it manually to override.
            </p>
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
            <input
              ref={featuredInputRef}
              type="file"
              accept="image/*"
              onChange={handleFeaturedUpload}
              className="hidden"
            />
            {featuredImage ? (
              <div className="rounded-xl border border-zinc-200 overflow-hidden">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredImage}
                    alt="Featured image preview"
                    className="w-full max-h-72 object-cover"
                  />
                  <button
                    onClick={() => setFeaturedImage('')}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950/70 text-white backdrop-blur-sm hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 border-t border-zinc-100">
                  <span className="text-[11px] font-medium text-zinc-500 truncate">{featuredImage}</span>
                  <button
                    onClick={() => featuredInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-bold text-zinc-700 hover:bg-zinc-100 disabled:opacity-50"
                  >
                    {uploadingImage ? <Loader2 className="h-3 w-3 animate-spin" /> : <ImageIcon className="h-3 w-3" />}
                    Replace
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => featuredInputRef.current?.click()}
                disabled={uploadingImage}
                className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50/40 p-5 transition-all hover:border-orange-300 hover:bg-orange-50/20 disabled:opacity-50"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
                    {uploadingImage ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <ImageIcon className="h-6 w-6" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-zinc-800">
                      {uploadingImage ? 'Uploading image...' : 'Click to upload featured image'}
                    </p>
                    <p className="text-[11px] text-zinc-400 font-medium">
                      Recommended size: 1200 x 630px (16:9)
                    </p>
                  </div>
                </div>
                <span className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-zinc-700 shadow-sm hover:bg-zinc-50 hover:border-zinc-300 shrink-0">
                  Choose Image
                </span>
              </button>
            )}
          </div>

          {/* Rich Text Editor Field */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-3">
            <label className="text-xs font-serif font-bold text-zinc-900 block">
              Content <span className="text-red-500">*</span>
            </label>

            {/* Editor Toolbar */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-2 flex flex-wrap items-center gap-1">
              <select
                value={formatState.formatBlock === 'P' ? 'p' : formatState.formatBlock === 'H1' ? 'h1' : formatState.formatBlock === 'H2' ? 'h2' : formatState.formatBlock === 'H3' ? 'h3' : 'p'}
                onChange={handleFormatBlock}
                className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-700 focus:outline-none mr-2"
              >
                <option value="p">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
              </select>

              <div className="h-4 w-px bg-zinc-200 mx-1" />

              <button
                type="button"
                title="Bold"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('bold')}
                className={`p-1.5 rounded-lg transition-colors ${formatState.bold ? editorActiveClass : 'text-zinc-600 hover:bg-zinc-200/70'}`}
              >
                <Bold className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                title="Italic"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('italic')}
                className={`p-1.5 rounded-lg transition-colors ${formatState.italic ? editorActiveClass : 'text-zinc-600 hover:bg-zinc-200/70'}`}
              >
                <Italic className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                title="Underline"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('underline')}
                className={`p-1.5 rounded-lg transition-colors ${formatState.underline ? editorActiveClass : 'text-zinc-600 hover:bg-zinc-200/70'}`}
              >
                <UnderlineIcon className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                title="Strikethrough"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('strikeThrough')}
                className={`p-1.5 rounded-lg transition-colors ${formatState.strikeThrough ? editorActiveClass : 'text-zinc-600 hover:bg-zinc-200/70'}`}
              >
                <Strikethrough className="h-3.5 w-3.5" />
              </button>

              <div className="h-4 w-px bg-zinc-200 mx-1" />

              <button
                type="button"
                title="Bullet List"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('insertUnorderedList')}
                className={`p-1.5 rounded-lg transition-colors ${formatState.insertUnorderedList ? editorActiveClass : 'text-zinc-600 hover:bg-zinc-200/70'}`}
              >
                <List className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                title="Numbered List"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => exec('insertOrderedList')}
                className={`p-1.5 rounded-lg transition-colors ${formatState.insertOrderedList ? editorActiveClass : 'text-zinc-600 hover:bg-zinc-200/70'}`}
              >
                <ListOrdered className="h-3.5 w-3.5" />
              </button>

              <div className="h-4 w-px bg-zinc-200 mx-1" />

              <button type="button" title="Align Left" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('justifyLeft')} className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                <AlignLeft className="h-3.5 w-3.5" />
              </button>
              <button type="button" title="Align Center" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('justifyCenter')} className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                <AlignCenter className="h-3.5 w-3.5" />
              </button>
              <button type="button" title="Align Right" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('justifyRight')} className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                <AlignRight className="h-3.5 w-3.5" />
              </button>
              <button type="button" title="Justify" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('justifyFull')} className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                <AlignJustify className="h-3.5 w-3.5" />
              </button>

              <div className="h-4 w-px bg-zinc-200 mx-1" />

              <button type="button" title="Insert Link" onMouseDown={(e) => e.preventDefault()} onClick={handleCreateLink} className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                <Link2 className="h-3.5 w-3.5" />
              </button>
              <button type="button" title="Remove Link" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('unlink')} className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                <Unlink className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                title="Insert Image"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => contentImageInputRef.current?.click()}
                disabled={uploadingContentImage}
                className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70 disabled:opacity-50"
              >
                {uploadingContentImage ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImageIcon className="h-3.5 w-3.5" />}
              </button>
              <input
                ref={contentImageInputRef}
                type="file"
                accept="image/*"
                onChange={handleInsertContentImage}
                className="hidden"
              />
              <button type="button" title="Quote" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('formatBlock', 'blockquote')} className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                <Quote className="h-3.5 w-3.5" />
              </button>
              <button type="button" title="Code block" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('formatBlock', 'pre')} className="p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-200/70">
                <Code className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Main Editor */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => setContent((e.currentTarget as HTMLDivElement).innerHTML)}
              className="rich-editor w-full min-h-[240px] rounded-xl border border-zinc-200 bg-white p-4 text-sm font-normal text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:outline-none transition-all leading-relaxed"
              data-placeholder="Write your blog content here..."
            />

            <style>{`
              .rich-editor h1 { font-size: 1.6rem; font-weight: 800; margin: 0.6em 0 0.4em; color: #18181b; }
              .rich-editor h2 { font-size: 1.35rem; font-weight: 800; margin: 0.6em 0 0.4em; color: #18181b; }
              .rich-editor h3 { font-size: 1.15rem; font-weight: 700; margin: 0.6em 0 0.35em; color: #18181b; }
              .rich-editor p { margin: 0.5em 0; }
              .rich-editor ul, .rich-editor ol { padding-left: 1.5em; margin: 0.5em 0; }
              .rich-editor ul { list-style: disc; }
              .rich-editor ol { list-style: decimal; }
              .rich-editor a { color: #ea580c; text-decoration: underline; }
              .rich-editor blockquote { border-left: 3px solid #ea580c; padding-left: 1em; color: #52525b; font-style: italic; margin: 0.75em 0; }
              .rich-editor pre { background: #f4f4f5; border: 1px solid #e4e4e7; border-radius: 8px; padding: 0.75em; font-family: ui-monospace, monospace; font-size: 0.8rem; overflow-x: auto; margin: 0.75em 0; }
              .rich-editor code { background: #f4f4f5; padding: 0.1em 0.3em; border-radius: 4px; font-family: ui-monospace, monospace; font-size: 0.85em; }
              .rich-editor pre code { background: transparent; padding: 0; }
              .rich-editor img { max-width: 100%; height: auto; border-radius: 10px; margin: 0.75em 0; }
              .rich-editor:empty::before { content: attr(data-placeholder); color: #a1a1aa; }
            `}</style>

            {/* Bottom Word & Character Counter */}
            <div className="flex items-center justify-between text-[11px] text-zinc-400 font-medium pt-1">
              <span>Word count: {plainContent ? plainContent.split(/\s+/).length : 0}</span>
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
                placeholder="Comma separated: seo, marketing, growth"
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
          <div id="preview-card" className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-4 scroll-mt-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-bold text-zinc-950">
                Preview
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={`/blog/${slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-1 text-[10px] font-extrabold text-orange-600 hover:text-orange-700 transition-colors ${slug ? '' : 'pointer-events-none opacity-40'}`}
                  title="Open post page"
                >
                  <ExternalLink className="h-3 w-3" />
                  Open
                </a>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200/60">
                  <LinkIcon className="h-2.5 w-2.5" />
                  Live
                </span>
              </div>
            </div>

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
                    {(siteUrl || 'yoursite.com').replace(/^https?:\/\//, '')}
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 truncate">
                  {siteUrl || 'https://yoursite.com'}/blog/{slug || 'your-post-slug'}
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
                <div className="relative h-36 bg-zinc-200 flex items-center justify-center overflow-hidden">
                  {featuredImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={featuredImage} alt="Featured image preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="flex flex-col items-center gap-1 text-zinc-400 text-xs font-semibold">
                      <ImageIcon className="h-6 w-6" />
                      Featured Image Preview
                    </span>
                  )}
                </div>
                <div className="p-3 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">
                    {(siteUrl || 'yoursite.com').replace(/^https?:\/\//, '').toUpperCase()}
                  </span>
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
