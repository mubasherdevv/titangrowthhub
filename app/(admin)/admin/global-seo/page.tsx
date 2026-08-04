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
  ExternalLink
} from 'lucide-react';

export default function GlobalSeoPage() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'schema' | 'robots' | 'opengraph'>('schema');
  const [schemaType, setSchemaType] = useState<'Organization' | 'Article' | 'FAQ' | 'LocalBusiness'>('Organization');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Schema Form States
  const [orgName, setOrgName] = useState('');
  const [orgUrl, setOrgUrl] = useState('');
  const [orgLogo, setOrgLogo] = useState('');

  // Robots.txt State
  const [robotsText, setRobotsText] = useState('');

  // OpenGraph State
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');

  // Fetch current SEO settings on load
  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setOrgName(data.orgName || '');
          setOrgUrl(data.orgUrl || '');
          setOrgLogo(data.orgLogo || '');
          setRobotsText(data.robotsText || `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://yoursite.com/sitemap.xml`);
          setOgTitle(data.ogTitle || '');
          setOgDescription(data.ogDescription || '');
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
          orgName,
          orgUrl,
          orgLogo,
          robotsText,
          ogTitle,
          ogDescription,
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
          <p className="mt-1 text-xs md:text-sm text-zinc-500 font-medium">
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
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">Active Schemas</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">4</p>
            <p className="text-[11px] text-emerald-600 font-bold">JSON-LD Validated</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">Robots.txt Status</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">Valid</p>
            <p className="text-[11px] text-emerald-600 font-bold">Indexing Allowed</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Share2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">OpenGraph</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">Active</p>
            <p className="text-[11px] text-zinc-400 font-medium">FB & Twitter Cards</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-serif font-bold tracking-wider text-zinc-400 uppercase">Schema Health</p>
            <p className="font-serif text-2xl font-black text-zinc-950 mt-0.5">100%</p>
            <p className="text-[11px] text-purple-600 font-bold">Zero Errors</p>
          </div>
        </div>
      </div>

      {/* Main Tabs Container */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-sm overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-zinc-200/80 px-4 pt-3 text-xs font-bold text-zinc-500 overflow-x-auto">
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

        {/* TAB 1: JSON-LD SCHEMA BUILDER */}
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
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-sm font-bold text-zinc-950">
                  Robots.txt File Rules
                </h3>
                <p className="text-xs text-zinc-400 font-medium mt-0.5">
                  Control search engine crawlers access to specific routes.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 border border-emerald-200/60">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Valid Syntax
              </span>
            </div>

            <textarea
              rows={8}
              value={robotsText}
              onChange={(e) => setRobotsText(e.target.value)}
              className="w-full font-mono text-xs bg-zinc-900 text-emerald-400 p-4 rounded-xl border border-zinc-800 focus:outline-none leading-relaxed"
            />
          </div>
        )}

        {/* TAB 3: OPENGRAPH & SOCIAL CARDS */}
        {activeTab === 'opengraph' && (
          <div className="p-6 space-y-5">
            <div className="space-y-1.5 max-w-lg">
              <label className="text-xs font-serif font-bold text-zinc-900 block">
                Default OpenGraph Title
              </label>
              <input
                type="text"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-4 py-2.5 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 max-w-lg">
              <label className="text-xs font-serif font-bold text-zinc-900 block">
                Default OpenGraph Description
              </label>
              <textarea
                rows={3}
                value={ogDescription}
                onChange={(e) => setOgDescription(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 p-4 text-xs font-medium text-zinc-900 focus:border-orange-500 focus:bg-white focus:outline-none resize-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
