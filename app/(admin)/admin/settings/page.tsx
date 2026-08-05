'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ToastProvider';
import {
  Sliders,
  Globe,
  Key,
  Users,
  ShieldCheck,
  Bell,
  Save,
  Upload,
  Check,
  ChevronRight,
  Info,
  Plus,
  Mail,
  Lock,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Layers,
  Sparkles
} from 'lucide-react';

export default function SettingsPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'api' | 'team' | 'security' | 'notifications'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // General Form States
  const [siteName, setSiteName] = useState('');
  const [siteTagline, setSiteTagline] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [timezone, setTimezone] = useState('UTC (GMT+00:00)');
  const [language, setLanguage] = useState('English (US)');

  // Logo & Favicon Preview States
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  // SEO Form States
  const [defaultTitlePattern, setDefaultTitlePattern] = useState('%page_title% | %site_name%');
  const [globalMetaDesc, setGlobalMetaDesc] = useState('');
  const [allowIndexing, setAllowIndexing] = useState(true);

  // Per-page meta state
  const [pageMeta, setPageMeta] = useState<Array<{
    slug: string;
    label: string;
    url: string;
    metaTitle: string;
    metaDesc: string;
    defaultTitle: string;
    defaultDesc: string;
  }>>([]);
  const [pageMetaLoading, setPageMetaLoading] = useState(false);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const [gscApiKey, setGscApiKey] = useState('');
  const [bingApiKey, setBingApiKey] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');

  // Webmaster Verification States
  const [gscVerificationMeta, setGscVerificationMeta] = useState('');
  const [gscVerificationFilename, setGscVerificationFilename] = useState('');
  const [gscVerificationFilecontent, setGscVerificationFilecontent] = useState('');

  // Fetch settings on load
  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSiteName(data.siteName || '');
          setSiteTagline(data.siteTagline || '');
          setSiteUrl(data.siteUrl || '');
          setTimezone(data.timezone || 'UTC (GMT+00:00)');
          setLanguage(data.language || 'English (US)');
          setLogoPreview(data.logoUrl || null);
          setFaviconPreview(data.faviconUrl || null);
          setDefaultTitlePattern(data.defaultTitlePattern || '%page_title% | %site_name%');
          setGlobalMetaDesc(data.globalMetaDesc || '');
          setAllowIndexing(data.allowIndexing !== undefined ? data.allowIndexing : true);
          setGscApiKey(data.gscApiKey || '');
          setBingApiKey(data.bingApiKey || '');
          setGeminiApiKey(data.geminiApiKey || '');
          setGscVerificationMeta(data.gscVerificationMeta || '');
          setGscVerificationFilename(data.gscVerificationFilename || '');
          setGscVerificationFilecontent(data.gscVerificationFilecontent || '');
        }
      })
      .catch((err) => console.error('Error fetching settings:', err));
  }, []);

  // Load page meta when SEO tab is opened
  useEffect(() => {
    if (activeTab === 'seo' && pageMeta.length === 0) {
      setPageMetaLoading(true);
      fetch('/api/page-meta')
        .then((res) => res.json())
        .then((data) => setPageMeta(data))
        .catch((err) => console.error('Error fetching page meta:', err))
        .finally(() => setPageMetaLoading(false));
    }
  }, [activeTab]);

  const updatePageMetaField = (slug: string, field: 'metaTitle' | 'metaDesc', value: string) => {
    setPageMeta((prev) => prev.map((p) => p.slug === slug ? { ...p, [field]: value } : p));
  };

  const savePageMeta = async (slug: string) => {
    const page = pageMeta.find((p) => p.slug === slug);
    if (!page) return;
    setSavingSlug(slug);
    try {
      const res = await fetch('/api/page-meta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, metaTitle: page.metaTitle, metaDesc: page.metaDesc }),
      });
      if (res.ok) {
        toast.success(`"${page.label}" meta saved successfully`);
      } else {
        toast.error('Failed to save page meta');
      }
    } catch (err) {
      toast.error('Error saving page meta');
    } finally {
      setSavingSlug(null);
    }
  };

  const resetPageMeta = (slug: string) => {
    setPageMeta((prev) =>
      prev.map((p) => p.slug === slug ? { ...p, metaTitle: p.defaultTitle, metaDesc: p.defaultDesc } : p)
    );
  };

  // Save settings via API
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteName,
          siteTagline,
          siteUrl,
          timezone,
          language,
          logoUrl: logoPreview,
          faviconUrl: faviconPreview,
          defaultTitlePattern,
          globalMetaDesc,
          allowIndexing,
          gscApiKey,
          bingApiKey,
          geminiApiKey,
          gscVerificationMeta,
          gscVerificationFilename,
          gscVerificationFilecontent,
        }),
      });

      if (response.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2000);
        toast.success('Settings saved successfully');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      toast.error('Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  // Base64 file uploader
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setPreview: (val: string) => void) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

    { id: 'general', label: 'General', subtitle: 'Site identity, logo & favicon', icon: Sliders },
    { id: 'seo', label: 'Global SEO', subtitle: 'Search engine defaults', icon: Globe },
    { id: 'api', label: 'API & Integrations', subtitle: 'Search console & AI keys', icon: Key },
    { id: 'verifications', label: 'Webmaster Tools', subtitle: 'Google verification', icon: ShieldCheck },
    { id: 'team', label: 'Team & Users', subtitle: 'Access & permissions', icon: Users },
    { id: 'security', label: 'Security', subtitle: 'Passwords & 2FA', icon: Lock },
    { id: 'notifications', label: 'Notifications', subtitle: 'Email alerts & webhooks', icon: Bell },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
            Settings
          </h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-500 font-medium">
            Manage your website preferences, global SEO configurations, API keys, and team members.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-2xl bg-orange-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-md shadow-orange-600/20 transition-all hover:bg-orange-700 active:scale-95 self-start sm:self-auto"
        >
          {savedSuccess ? (
            <>
              <Check className="h-4 w-4 text-white" />
              <span>Saved Successfully!</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Main 2-Column Layout with Inner Settings Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Inner Settings Sub-Sidebar (4 Columns on LG) */}
        <div className="lg:col-span-4 rounded-2xl border border-zinc-200/80 bg-white p-3 shadow-sm space-y-1">
          <h3 className="px-3 py-2 text-[10px] font-serif font-bold uppercase tracking-widest text-zinc-400">
            System Preferences
          </h3>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between rounded-xl px-3.5 py-3 text-left transition-all ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 font-extrabold shadow-sm ring-1 ring-orange-500/20 border border-orange-100'
                    : 'text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 font-medium'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isActive ? 'bg-orange-600 text-white' : 'bg-zinc-100 text-zinc-500'
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-xs font-bold truncate">{item.label}</p>
                    <p className="text-[11px] text-zinc-400 font-normal truncate">{item.subtitle}</p>
                  </div>
                </div>
                <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isActive ? 'text-orange-600 translate-x-0.5' : 'text-zinc-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel (8 Columns on LG) */}
        <div className="lg:col-span-8 space-y-6">
          {/* TAB 1: GENERAL SETTINGS */}
          {activeTab === 'general' && (
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h2 className="font-serif text-lg font-bold text-zinc-950">
                  General Settings
                </h2>
                <p className="text-xs text-zinc-500 font-medium mt-0.5">
                  Configure your site identity, logo, favicon, and regional preferences.
                </p>
              </div>

              {/* Site Name */}
              <div className="space-y-2">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Site Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-semibold text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
                />
              </div>

              {/* Tagline */}
              <div className="space-y-2">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Tagline
                </label>
                <input
                  type="text"
                  value={siteTagline}
                  onChange={(e) => setSiteTagline(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
                />
              </div>

              {/* Site Address (URL) */}
              <div className="space-y-2">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Site Address (URL)
                </label>
                <input
                  type="url"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none transition-all"
                />
              </div>

              {/* LOGO & FAVICON UPLOAD SECTION */}
              <div className="pt-2 border-t border-zinc-100 space-y-6">
                <div>
                  <h3 className="font-serif text-sm font-bold text-zinc-950">
                    Branding Assets (Logo & Favicon)
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-medium mt-0.5">
                    Upload your official website brand logo and browser favicon.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Site Logo Upload Box */}
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/30 p-4 space-y-3">
                    <label className="text-xs font-serif font-bold text-zinc-900 block">
                      Site Logo
                    </label>

                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-28 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm">
                        {logoPreview ? (
                          <img src={logoPreview} alt="Logo Preview" className="h-full max-w-full object-contain" />
                        ) : (
                          <div className="flex items-center gap-1.5 text-orange-600 font-bold font-serif text-xs">
                            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-600 text-white text-[10px]">
                              <Layers className="h-3.5 w-3.5" />
                            </div>
                            <span>VistaSEO</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold text-zinc-700 shadow-sm hover:bg-zinc-50">
                          <Upload className="h-3.5 w-3.5 text-zinc-500" />
                          <span>Upload Logo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                           onChange={(e) => handleFileChange(e, setLogoPreview)}
                          />
                        </label>
                        {logoPreview && (
                          <button
                            onClick={() => setLogoPreview(null)}
                            className="block text-[11px] font-semibold text-red-600 hover:underline"
                          >
                            Remove Logo
                          </button>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-400 block font-medium">
                      Recommended: 512 x 512px (PNG, SVG, or WebP)
                    </span>
                  </div>

                  {/* Site Favicon Upload Box */}
                  <div className="rounded-xl border border-zinc-200 bg-zinc-50/30 p-4 space-y-3">
                    <label className="text-xs font-serif font-bold text-zinc-900 block">
                      Site Favicon
                    </label>

                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm">
                        {faviconPreview ? (
                          <img src={faviconPreview} alt="Favicon Preview" className="h-8 w-8 object-contain" />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-white font-serif font-black text-xs">
                            v
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold text-zinc-700 shadow-sm hover:bg-zinc-50">
                          <Upload className="h-3.5 w-3.5 text-zinc-500" />
                          <span>Upload Favicon</span>
                          <input
                            type="file"
                            accept="image/*,.ico"
                            className="hidden"
                             onChange={(e) => handleFileChange(e, setFaviconPreview)}
                          />
                        </label>
                        {faviconPreview && (
                          <button
                            onClick={() => setFaviconPreview(null)}
                            className="block text-[11px] font-semibold text-red-600 hover:underline"
                          >
                            Remove Favicon
                          </button>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-400 block font-medium">
                      Appears in browser tabs. Recommended: 32 x 32px (ICO, PNG, or SVG)
                    </span>
                  </div>
                </div>
              </div>

              {/* Timezone & Language Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-100">
                <div className="space-y-2">
                  <label className="text-xs font-serif font-bold text-zinc-900 block">
                    Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-3.5 py-2.5 text-xs font-semibold text-zinc-700 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="UTC (GMT+00:00)">UTC (GMT+00:00)</option>
                    <option value="EST (GMT-05:00)">Eastern Time (GMT-05:00)</option>
                    <option value="PST (GMT-08:00)">Pacific Time (GMT-08:00)</option>
                    <option value="PKT (GMT+05:00)">Pakistan Time (GMT+05:00)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-serif font-bold text-zinc-900 block">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-3.5 py-2.5 text-xs font-semibold text-zinc-700 focus:border-orange-500 focus:outline-none"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="English (UK)">English (UK)</option>
                    <option value="Urdu">Urdu (اردو)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GLOBAL SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              {/* Global SEO Card */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm space-y-6">
                <div className="border-b border-zinc-100 pb-4">
                  <h2 className="font-serif text-lg font-bold text-zinc-950">Global SEO Configurations</h2>
                  <p className="text-xs text-zinc-500 font-medium mt-0.5">Set default meta patterns, global descriptions, and indexing behavior.</p>
                </div>

                {/* Title Pattern */}
                <div className="space-y-2">
                  <label className="text-xs font-serif font-bold text-zinc-900 block">Default Title Format</label>
                  <input
                    type="text"
                    value={defaultTitlePattern}
                    onChange={(e) => setDefaultTitlePattern(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-mono text-zinc-900 focus:border-orange-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-zinc-400 font-medium block">Available tags: %page_title%, %site_name%, %separator%</span>
                </div>

                {/* Global Meta Description */}
                <div className="space-y-2">
                  <label className="text-xs font-serif font-bold text-zinc-900 block">Global Meta Description</label>
                  <textarea
                    rows={3}
                    value={globalMetaDesc}
                    onChange={(e) => setGlobalMetaDesc(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:outline-none resize-none leading-relaxed"
                  />
                </div>

                {/* Search Engine Indexing Toggle */}
                <div className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/40 p-4">
                  <div>
                    <p className="text-xs font-bold text-zinc-900">Discourage Search Engine Indexing</p>
                    <p className="text-[11px] text-zinc-400 font-medium">When enabled, adds noindex meta tag to all pages.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAllowIndexing(!allowIndexing)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      allowIndexing ? 'bg-orange-600' : 'bg-zinc-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                        allowIndexing ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* ─── PER-PAGE META SECTION ─── */}
              <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif text-base font-bold text-zinc-950">Page Meta Title &amp; Description</h2>
                    <p className="text-xs text-zinc-500 font-medium mt-0.5">Edit meta title and description for each page — controls what Google shows in search results.</p>
                  </div>
                  <span className="text-[11px] font-bold text-zinc-400 bg-zinc-100 rounded-full px-2.5 py-1">{pageMeta.length} pages</span>
                </div>

                {pageMetaLoading ? (
                  <div className="p-8 text-center text-xs text-zinc-400">Loading pages...</div>
                ) : (
                  <div className="divide-y divide-zinc-100">
                    {pageMeta.map((page) => {
                      const isExpanded = expandedSlug === page.slug;
                      const isSaving = savingSlug === page.slug;
                      const titleLen = page.metaTitle.length;
                      const descLen = page.metaDesc.length;

                      return (
                        <div key={page.slug} className="hover:bg-zinc-50/50 transition-colors">
                          {/* Row Header — click to expand */}
                          <button
                            onClick={() => setExpandedSlug(isExpanded ? null : page.slug)}
                            className="w-full flex items-center justify-between px-6 py-4 text-left"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                                <Globe className="h-3.5 w-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-zinc-900">{page.label}</p>
                                <p className="text-[11px] text-zinc-400 font-mono">{page.url}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-4">
                              <div className="hidden sm:flex flex-col items-end gap-0.5">
                                <p className="text-[11px] text-zinc-500 truncate max-w-[200px]">{page.metaTitle}</p>
                                <p className={`text-[10px] font-bold ${ titleLen > 60 ? 'text-red-500' : titleLen > 50 ? 'text-amber-500' : 'text-emerald-600'}`}>{titleLen}/60</p>
                              </div>
                              <ChevronRight className={`h-4 w-4 text-zinc-300 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </div>
                          </button>

                          {/* Expanded Edit Panel */}
                          {isExpanded && (
                            <div className="px-6 pb-6 space-y-5 border-t border-zinc-100 pt-5 bg-zinc-50/40">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left: Edit Fields */}
                                <div className="space-y-4">
                                  <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <label className="text-xs font-serif font-bold text-zinc-900">Meta Title</label>
                                      <span className={`text-[11px] font-bold ${ titleLen > 60 ? 'text-red-500' : titleLen > 50 ? 'text-amber-500' : 'text-zinc-400'}`}>{titleLen}/60</span>
                                    </div>
                                    <input
                                      type="text"
                                      value={page.metaTitle}
                                      onChange={(e) => updatePageMetaField(page.slug, 'metaTitle', e.target.value)}
                                      maxLength={70}
                                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:outline-none"
                                    />
                                    <p className="text-[11px] text-zinc-400">Recommended: 50–60 characters. Google truncates beyond 60.</p>
                                  </div>

                                  <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                      <label className="text-xs font-serif font-bold text-zinc-900">Meta Description</label>
                                      <span className={`text-[11px] font-bold ${ descLen > 155 ? 'text-red-500' : descLen > 130 ? 'text-amber-500' : 'text-zinc-400'}`}>{descLen}/155</span>
                                    </div>
                                    <textarea
                                      rows={3}
                                      value={page.metaDesc}
                                      onChange={(e) => updatePageMetaField(page.slug, 'metaDesc', e.target.value)}
                                      maxLength={160}
                                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:outline-none resize-none"
                                    />
                                    <p className="text-[11px] text-zinc-400">Recommended: 120–155 characters.</p>
                                  </div>

                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={() => savePageMeta(page.slug)}
                                      disabled={isSaving}
                                      className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-[11px] font-extrabold text-white shadow-sm hover:bg-orange-700 disabled:opacity-60 transition-all"
                                    >
                                      {isSaving ? (
                                        <><span className="animate-spin">⏳</span> Saving...</>
                                      ) : (
                                        <><Save className="h-3.5 w-3.5" /> Save Page Meta</>
                                      )}
                                    </button>
                                    <button
                                      onClick={() => resetPageMeta(page.slug)}
                                      className="text-[11px] font-bold text-zinc-500 hover:text-zinc-700 underline"
                                    >
                                      Reset to Default
                                    </button>
                                  </div>
                                </div>

                                {/* Right: Google Preview */}
                                <div className="space-y-2">
                                  <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Google Search Preview</p>
                                  <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center">
                                        <Globe className="h-2.5 w-2.5 text-orange-500" />
                                      </div>
                                      <span className="text-[11px] text-zinc-500">titangrowthhub.com{page.url}</span>
                                    </div>
                                    <p className="text-[16px] font-normal text-blue-600 leading-snug mb-1 line-clamp-1">{page.metaTitle || 'Meta Title'}</p>
                                    <p className="text-[12px] text-zinc-600 leading-snug line-clamp-2">{page.metaDesc || 'Meta description will appear here.'}</p>
                                  </div>
                                  <p className="text-[10px] text-zinc-400">Preview is approximate. Google may rewrite titles/descriptions.</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: API & INTEGRATIONS */}
          {activeTab === 'api' && (
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h2 className="font-serif text-lg font-bold text-zinc-950">
                  API & Integrations
                </h2>
                <p className="text-xs text-zinc-500 font-medium mt-0.5">
                  Connect third-party services like Google Search Console, Bing, and Gemini.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-serif font-bold text-zinc-900 block">
                    Google Search Console API Key
                  </label>
                  <input
                    type="password"
                    value={gscApiKey}
                    onChange={(e) => setGscApiKey(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-mono text-zinc-900 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-serif font-bold text-zinc-900 block">
                    Bing Webmaster API Key
                  </label>
                  <input
                    type="password"
                    value={bingApiKey}
                    onChange={(e) => setBingApiKey(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-mono text-zinc-900 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-serif font-bold text-zinc-900 block">
                    Gemini AI Key (Auto Content Generation)
                  </label>
                  <input
                    type="password"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-mono text-zinc-900 focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3.5: VERIFICATIONS (Webmaster Tools) */}
          {activeTab === 'verifications' && (
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h2 className="font-serif text-lg font-bold text-zinc-950">
                  Google Search Console Verification
                </h2>
                <p className="text-xs text-zinc-500 font-medium mt-0.5">
                  Verify ownership of your site using a Meta Tag or by uploading the HTML verification file string.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-serif font-bold text-zinc-900 block">
                    Meta Tag Verification
                  </label>
                  <p className="text-[11px] text-zinc-500">Paste the full meta tag (e.g., <code>&lt;meta name="google-site-verification" content="..." /&gt;</code>)</p>
                  <input
                    type="text"
                    value={gscVerificationMeta}
                    onChange={(e) => setGscVerificationMeta(e.target.value)}
                    placeholder="<meta name='google-site-verification' content='...' />"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-mono text-zinc-900 focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-zinc-100 space-y-4">
                  <div>
                    <label className="text-xs font-serif font-bold text-zinc-900 block">
                      HTML File Verification
                    </label>
                    <p className="text-[11px] text-zinc-500 mb-2">If you prefer HTML file verification, enter the filename and content Google provided.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-700 block">HTML File Name</label>
                      <input
                        type="text"
                        value={gscVerificationFilename}
                        onChange={(e) => setGscVerificationFilename(e.target.value)}
                        placeholder="google123456789.html"
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-mono text-zinc-900 focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-zinc-700 block">HTML File Content</label>
                      <input
                        type="text"
                        value={gscVerificationFilecontent}
                        onChange={(e) => setGscVerificationFilecontent(e.target.value)}
                        placeholder="google-site-verification: google123456789.html"
                        className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-mono text-zinc-900 focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TEAM & USERS */}
          {activeTab === 'team' && (
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                <div>
                  <h2 className="font-serif text-lg font-bold text-zinc-950">
                    Team Members
                  </h2>
                  <p className="text-xs text-zinc-500 font-medium mt-0.5">
                    Manage users who have access to this admin dashboard.
                  </p>
                </div>
                <button className="flex items-center gap-1.5 rounded-xl bg-orange-600 px-3.5 py-2 text-xs font-extrabold text-white shadow-sm hover:bg-orange-700">
                  <Plus className="h-4 w-4" />
                  <span>Invite User</span>
                </button>
              </div>

              <div className="divide-y divide-zinc-100">
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600 text-sm">
                      JD
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-900">John Doe (You)</p>
                      <p className="text-[11px] text-zinc-400">admin@vistaseo.com</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-[11px] font-bold text-orange-600 border border-orange-200/60">
                    Super Admin
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-600 text-sm">
                      AS
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-900">Alex Smith</p>
                      <p className="text-[11px] text-zinc-400">alex@vistaseo.com</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-bold text-zinc-600 border border-zinc-200">
                    Editor
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5 & 6 PLACEHOLDERS */}
          {(activeTab === 'security' || activeTab === 'notifications') && (
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-8 text-center text-xs text-zinc-500 space-y-2">
              <p className="font-bold text-zinc-900 text-sm capitalize">{activeTab} Preferences</p>
              <p>Configure {activeTab} policies, authentication protocols, and system triggers.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
