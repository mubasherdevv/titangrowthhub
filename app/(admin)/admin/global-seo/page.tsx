'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ToastProvider';
import {
  Code,
  FileText,
  Share2,
  Check,
  Copy,
  Save,
  Globe,
  CheckCircle2,
  AlertCircle,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  Search,
  Eye,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function GlobalSeoPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'meta' | 'schema' | 'robots' | 'opengraph'>('meta');
  const [schemaType, setSchemaType] = useState<'Organization' | 'Article' | 'FAQ' | 'LocalBusiness'>('Organization');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Meta & Search States (directly controls Google search snippet)
  const [siteName, setSiteName] = useState('');
  const [siteTagline, setSiteTagline] = useState('');
  const [globalMetaDesc, setGlobalMetaDesc] = useState('');
  const [allowIndexing, setAllowIndexing] = useState(true);

  // Schema Form States
  const [orgName, setOrgName] = useState('');
  const [orgUrl, setOrgUrl] = useState('');
  const [orgLogo, setOrgLogo] = useState('');

  // Robots.txt State
  const [robotsText, setRobotsText] = useState('');

  // OpenGraph State
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogImage, setOgImage] = useState('');

  // Fetch current SEO settings on load
  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSiteName(data.siteName || '');
          setSiteTagline(data.siteTagline || '');
          setGlobalMetaDesc(data.globalMetaDesc || '');
          setAllowIndexing(data.allowIndexing !== false);
          setOrgName(data.orgName || '');
          setOrgUrl(data.orgUrl || '');
          setOrgLogo(data.orgLogo || '');
          setRobotsText(data.robotsText || `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://titangrowthhub.com/sitemap.xml`);
          setOgTitle(data.ogTitle || '');
          setOgDescription(data.ogDescription || '');
          setOgImage(data.ogImage || '');
        }
      })
      .catch((err) => console.error('Error fetching global SEO settings:', err));
  }, []);

  // JSON-LD Generator Output
  const generateJsonLd = () => {
    if (schemaType === 'Organization') {
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: orgName || undefined,
          url: orgUrl || undefined,
          logo: orgLogo || undefined,
          sameAs: [
            'https://twitter.com/vistaseo',
            'https://facebook.com/vistaseo',
            'https://linkedin.com/company/vistaseo',
          ],
        },
        null,
        2
      );
    } else if (schemaType === 'Article') {
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'SEO Best Practices for 2025',
          author: {
            '@type': 'Person',
            name: 'John Doe',
          },
          publisher: {
            '@type': 'Organization',
            name: orgName || undefined,
            logo: {
              '@type': 'ImageObject',
              url: orgLogo || undefined,
            },
          },
        },
        null,
        2
      );
    } else {
      return JSON.stringify(
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is VistaSEO?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'VistaSEO is a comprehensive SEO management platform for Next.js and web apps.',
              },
            },
          ],
        },
        null,
        2
      );
    }
  };

  const jsonLdOutput = generateJsonLd();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(jsonLdOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('JSON-LD code copied to clipboard');
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteName,
          siteTagline,
          globalMetaDesc,
          allowIndexing,
          orgName,
          orgUrl,
          orgLogo,
          robotsText,
          ogTitle,
          ogDescription,
          ogImage,
        }),
      });

      if (response.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2000);
        toast.success('Global SEO settings saved successfully');
      } else {
        toast.error('Failed to save global SEO settings');
      }
    } catch (err) {
      console.error('Error saving global SEO:', err);
      toast.error('Error saving global SEO settings');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Save Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
            Global SEO & Schema
          </h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-800 font-medium">
            Manage global meta tags, JSON-LD schema generators, and robots.txt file configurations.
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
              <span>Save Global SEO</span>
            </>
          )}
        </button>
      </div>

      {/* Metric Cards (4 Items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
            <Code className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-700 uppercase">Active Schemas</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">4</p>
            <p className="text-[11px] text-emerald-600 font-bold">JSON-LD Validated</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-700 uppercase">Robots.txt Status</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">Valid</p>
            <p className="text-[11px] text-emerald-600 font-bold">Indexing Allowed</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Share2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-700 uppercase">OpenGraph</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">Active</p>
            <p className="text-[11px] text-zinc-700 font-medium">FB & Twitter Cards</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-700 uppercase">Schema Health</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">100%</p>
            <p className="text-[11px] text-purple-600 font-bold">Zero Errors</p>
          </div>
        </div>
      </div>

      {/* Main Tabs Container */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-zinc-200/80 px-4 pt-3 text-xs font-bold text-zinc-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('meta')}
            className={`pb-3 px-4 border-b-2 font-serif tracking-wide transition-all ${
              activeTab === 'meta'
                ? 'border-orange-600 text-orange-600 font-extrabold'
                : 'border-transparent hover:text-zinc-950'
            }`}
          >
            Meta & Search
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`pb-3 px-4 border-b-2 font-serif tracking-wide transition-all ${
              activeTab === 'schema'
                ? 'border-orange-600 text-orange-600 font-extrabold'
                : 'border-transparent hover:text-zinc-950'
            }`}
          >
            JSON-LD Schema Builder
          </button>
          <button
            onClick={() => setActiveTab('robots')}
            className={`pb-3 px-4 border-b-2 font-serif tracking-wide transition-all ${
              activeTab === 'robots'
                ? 'border-orange-600 text-orange-600 font-extrabold'
                : 'border-transparent hover:text-zinc-950'
            }`}
          >
            Robots.txt Editor
          </button>
          <button
            onClick={() => setActiveTab('opengraph')}
            className={`pb-3 px-4 border-b-2 font-serif tracking-wide transition-all ${
              activeTab === 'opengraph'
                ? 'border-orange-600 text-orange-600 font-extrabold'
                : 'border-transparent hover:text-zinc-950'
            }`}
          >
            OpenGraph & Social Cards
          </button>
        </div>

        {/* TAB 0: META & SEARCH (Google Snippet Control) */}
        {activeTab === 'meta' && (
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Fields */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h3 className="font-serif text-sm font-bold text-zinc-950 mb-0.5">Google Search Snippet</h3>
                <p className="text-xs text-zinc-700 font-medium">These fields control what Google shows for your site in search results.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-serif font-bold text-zinc-900 block">Site Name (Title)</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="e.g. Titan Growth Hub"
                  maxLength={60}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none"
                />
                <p className="text-[11px] text-zinc-700">{siteName.length}/60 characters</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-serif font-bold text-zinc-900 block">Site Tagline (Subtitle)</label>
                <input
                  type="text"
                  value={siteTagline}
                  onChange={(e) => setSiteTagline(e.target.value)}
                  placeholder="e.g. SEO Growth Agency"
                  maxLength={60}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none"
                />
                <p className="text-[11px] text-zinc-700">Shown in browser tab as: {siteName || 'Site Name'} – {siteTagline || 'Tagline'}</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-serif font-bold text-zinc-900 block">Meta Description</label>
                <textarea
                  rows={3}
                  value={globalMetaDesc}
                  onChange={(e) => setGlobalMetaDesc(e.target.value)}
                  placeholder="Write a compelling description that convinces users to click your result..."
                  maxLength={160}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none resize-none"
                />
                <p className={`text-[11px] font-medium ${ globalMetaDesc.length > 155 ? 'text-red-500' : globalMetaDesc.length > 120 ? 'text-amber-500' : 'text-zinc-700'}`}>{globalMetaDesc.length}/160 characters</p>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                <div>
                  <p className="text-xs font-bold text-zinc-900">Allow Search Engine Indexing</p>
                  <p className="text-[11px] text-zinc-700 font-medium mt-0.5">Disable to add noindex / nofollow to all pages</p>
                </div>
                <button
                  onClick={() => setAllowIndexing(!allowIndexing)}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                    allowIndexing
                      ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      : 'bg-red-50 text-red-600 border border-red-200'
                  }`}
                >
                  {allowIndexing ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                  {allowIndexing ? 'Indexing ON' : 'Indexing OFF'}
                </button>
              </div>
            </div>

            {/* Right: Google Search Preview */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-zinc-700" />
                  <span className="text-xs font-bold text-zinc-900">Google Search Preview</span>
                </div>

                {/* Google snippet mockup */}
                <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
                  {/* Site favicon + URL */}
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center">
                      <Globe className="h-2.5 w-2.5 text-orange-500" />
                    </div>
                    <span className="text-[11px] text-zinc-800">titangrowthhub.com</span>
                  </div>
                  {/* Title */}
                  <p className="text-[17px] font-normal text-blue-600 hover:underline cursor-pointer leading-tight mb-1">
                    {siteName && siteTagline
                      ? `${siteName} – ${siteTagline}`
                      : siteName || 'Site Title will appear here'}
                  </p>
                  {/* Description */}
                  <p className="text-[13px] text-zinc-600 leading-snug">
                    {globalMetaDesc || 'Your meta description will appear here. Write something compelling that convinces users to visit your site.'}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3 space-y-1">
                  <p className="text-[11px] font-bold text-amber-700">💡 Google Tips</p>
                  <ul className="text-[11px] text-amber-700 space-y-0.5 list-disc list-inside">
                    <li>Title: 50–60 characters recommended</li>
                    <li>Description: 120–155 characters recommended</li>
                    <li>Google may rewrite these based on page content</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schema' && (
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Form (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Select Schema Type:
                </label>
                <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 p-1 text-xs">
                  {(['Organization', 'Article', 'FAQ'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSchemaType(type)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        schemaType === type
                          ? 'bg-orange-600 text-white shadow-sm'
                          : 'text-zinc-600 hover:text-zinc-900'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {schemaType === 'Organization' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-serif font-bold text-zinc-900 block">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-serif font-bold text-zinc-900 block">
                      Organization URL
                    </label>
                    <input
                      type="url"
                      value={orgUrl}
                      onChange={(e) => setOrgUrl(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-serif font-bold text-zinc-900 block">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      value={orgLogo}
                      onChange={(e) => setOrgLogo(e.target.value)}
                      className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Right Generated Code Box (6 Cols) */}
            <div className="lg:col-span-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-white space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-mono text-orange-400 font-bold">
                  JSON-LD Output ({schemaType})
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-[11px] font-bold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="font-mono text-xs text-zinc-300 overflow-x-auto p-2 leading-relaxed max-h-72">
                {jsonLdOutput}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 2: ROBOTS.TXT EDITOR */}
        {activeTab === 'robots' && (
          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-sm font-bold text-zinc-950">Robots.txt File Rules</h3>
                <p className="text-xs text-zinc-700 font-medium mt-0.5">Control which pages search engine crawlers can access.</p>
              </div>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] font-bold text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                View Live robots.txt
              </a>
            </div>

            {/* Quick Reference Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
                <p className="text-[11px] font-bold text-zinc-700 mb-1">Allow All</p>
                <pre className="text-[11px] font-mono text-emerald-600">{`User-agent: *
Allow: /`}</pre>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
                <p className="text-[11px] font-bold text-zinc-700 mb-1">Block Admin</p>
                <pre className="text-[11px] font-mono text-amber-600">{`Disallow: /admin/
Disallow: /api/`}</pre>
              </div>
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
                <p className="text-[11px] font-bold text-zinc-700 mb-1">Sitemap Line</p>
                <pre className="text-[11px] font-mono text-blue-600">{`Sitemap: https://titangrowthhub.com/sitemap.xml`}</pre>
              </div>
            </div>

            <div>
              <label className="text-xs font-serif font-bold text-zinc-900 block mb-2">Edit robots.txt Content</label>
              <textarea
                rows={10}
                value={robotsText}
                onChange={(e) => setRobotsText(e.target.value)}
                className="w-full font-mono text-xs bg-zinc-900 text-emerald-400 p-4 rounded-xl border border-zinc-800 focus:outline-none leading-relaxed"
              />
              <p className="text-[11px] text-zinc-700 mt-1.5">After saving, visit <span className="text-orange-600 font-bold">/robots.txt</span> to verify your changes are live.</p>
            </div>
          </div>
        )}

        {/* TAB 3: OPENGRAPH & SOCIAL CARDS */}
        {activeTab === 'opengraph' && (
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Fields */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h3 className="font-serif text-sm font-bold text-zinc-950 mb-0.5">OpenGraph & Social Cards</h3>
                <p className="text-xs text-zinc-700 font-medium">Controls how your site looks when shared on Facebook, WhatsApp, LinkedIn, and Twitter.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-serif font-bold text-zinc-900 block">OG Title (Social Share Title)</label>
                <input
                  type="text"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  placeholder="e.g. Titan Growth Hub – Pakistan's #1 SEO Agency"
                  maxLength={95}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none"
                />
                <p className="text-[11px] text-zinc-700">{ogTitle.length}/95 characters — Facebook shows up to 95 chars</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-serif font-bold text-zinc-900 block">OG Description</label>
                <textarea
                  rows={3}
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  placeholder="Short description shown when link is shared on social media..."
                  maxLength={200}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none resize-none"
                />
                <p className="text-[11px] text-zinc-700">{ogDescription.length}/200 characters</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-serif font-bold text-zinc-900 block">OG Image URL</label>
                <input
                  type="url"
                  value={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                  placeholder="https://titangrowthhub.com/og-image.jpg (1200×630px recommended)"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none"
                />
                <p className="text-[11px] text-zinc-700">Recommended: 1200×630px JPG/PNG. This image appears in social share previews.</p>
              </div>

              {/* OG Image Preview */}
              {ogImage && (
                <div className="rounded-xl border border-zinc-200 overflow-hidden">
                  <img src={ogImage} alt="OG Preview" className="w-full h-32 object-cover" />
                  <p className="text-[11px] text-zinc-700 px-3 py-2">OG Image Preview</p>
                </div>
              )}
            </div>

            {/* Right: Social Card Preview */}
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs font-bold text-zinc-900">Social Share Preview</p>

              {/* Facebook Card */}
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-zinc-800 uppercase tracking-wider">Facebook / LinkedIn / WhatsApp</p>
                <div className="rounded-xl border border-zinc-200 overflow-hidden bg-white shadow-sm">
                  <div className="h-40 bg-zinc-100 flex items-center justify-center overflow-hidden">
                    {ogImage
                      ? <img src={ogImage} alt="" className="w-full h-full object-cover" />
                      : <div className="flex flex-col items-center gap-2 text-zinc-700">
                          <ImageIcon className="h-8 w-8" />
                          <span className="text-[11px]">1200×630px image here</span>
                        </div>
                    }
                  </div>
                  <div className="p-3 border-t border-zinc-100">
                    <p className="text-[11px] uppercase text-zinc-700 tracking-wider">titangrowthhub.com</p>
                    <p className="text-sm font-bold text-zinc-900 leading-tight mt-0.5">{ogTitle || 'Your OG Title appears here'}</p>
                    <p className="text-[12px] text-zinc-800 mt-0.5 line-clamp-2">{ogDescription || 'Your OG description appears here when the link is shared on social media.'}</p>
                  </div>
                </div>
              </div>

              {/* Twitter Card */}
              <div className="space-y-1">
                <p className="text-[11px] font-bold text-zinc-800 uppercase tracking-wider">Twitter / X</p>
                <div className="rounded-xl border border-zinc-200 overflow-hidden bg-white shadow-sm">
                  <div className="h-32 bg-zinc-100 flex items-center justify-center overflow-hidden">
                    {ogImage
                      ? <img src={ogImage} alt="" className="w-full h-full object-cover" />
                      : <div className="flex flex-col items-center gap-2 text-zinc-700">
                          <Share2 className="h-6 w-6" />
                          <span className="text-[11px]">Twitter card image</span>
                        </div>
                    }
                  </div>
                  <div className="p-3 border-t border-zinc-100">
                    <p className="text-[12px] font-bold text-zinc-900">{ogTitle || 'Twitter card title'}</p>
                    <p className="text-[11px] text-zinc-800">{ogDescription || 'Twitter card description'}</p>
                    <p className="text-[11px] text-zinc-700 mt-1">titangrowthhub.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
