'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Info
} from 'lucide-react';

export default function AddRedirectPage() {
  const [sourceDomain, setSourceDomain] = useState('https://yoursite.com');
  const [sourcePath, setSourcePath] = useState('');
  const [targetDomain, setTargetDomain] = useState('https://yoursite.com');
  const [targetPath, setTargetPath] = useState('');
  const [redirectType, setRedirectType] = useState('301');
  const [matchType, setMatchType] = useState('Exact Match');
  const [isActive, setIsActive] = useState(true);
  const [redirectGroup, setRedirectGroup] = useState('');
  const [notes, setNotes] = useState('');
  const [excludeLogs, setExcludeLogs] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/admin/redirects';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium mb-1">
            <Link href="/admin/redirects" className="hover:text-zinc-600 transition-colors">
              Redirects
            </Link>
            <ChevronRight className="h-3 w-3 text-zinc-300" />
            <span className="text-purple-600 font-semibold">Add Redirect</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950">
            Add Redirect
          </h1>
          <p className="mt-1 text-xs md:text-sm text-zinc-500 font-medium">
            Create a new redirect rule to guide users and search engines from one URL to another.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin/redirects"
            className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:bg-zinc-50 hover:border-zinc-300"
          >
            <ArrowLeft className="h-4 w-4 text-zinc-500" />
            <span>Back to Redirects</span>
          </Link>
          <div className="relative inline-flex rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-600/20">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-extrabold transition-all hover:bg-purple-700 rounded-l-2xl"
            >
              <Save className="h-4 w-4" />
              <span>Save Redirect</span>
            </button>
            <button className="px-2.5 py-2.5 border-l border-purple-500/40 hover:bg-purple-700 rounded-r-2xl">
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Fields (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Redirect Details */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm space-y-6">
            <h2 className="font-serif text-base font-bold text-zinc-950 border-b border-zinc-100 pb-3">
              Redirect Details
            </h2>

            {/* Row 1: Source URL & Target URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Source URL */}
              <div className="space-y-2">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Source URL <span className="text-red-500">*</span>
                </label>
                <p className="text-[11px] text-zinc-400 font-medium">
                  The original URL you want to redirect from.
                </p>
                <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50/40 overflow-hidden focus-within:border-purple-600 focus-within:bg-white transition-all">
                  <select
                    value={sourceDomain}
                    onChange={(e) => setSourceDomain(e.target.value)}
                    className="bg-zinc-100 px-3 py-2.5 text-xs font-semibold text-zinc-700 border-r border-zinc-200 focus:outline-none shrink-0"
                  >
                    <option value="https://yoursite.com">https://yoursite.com</option>
                    <option value="https://app.yoursite.com">https://app.yoursite.com</option>
                  </select>
                  <input
                    type="text"
                    value={sourcePath}
                    onChange={(e) => setSourcePath(e.target.value)}
                    placeholder="Enter source path (e.g. old-page)"
                    className="w-full bg-transparent px-3 py-2.5 text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none"
                  />
                </div>
                <span className="text-[11px] text-zinc-400 font-medium block">
                  Example: https://yoursite.com/old-page
                </span>
              </div>

              {/* Target URL */}
              <div className="space-y-2">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Target URL <span className="text-red-500">*</span>
                </label>
                <p className="text-[11px] text-zinc-400 font-medium">
                  The URL you want to redirect users and search engines to.
                </p>
                <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50/40 overflow-hidden focus-within:border-purple-600 focus-within:bg-white transition-all">
                  <select
                    value={targetDomain}
                    onChange={(e) => setTargetDomain(e.target.value)}
                    className="bg-zinc-100 px-3 py-2.5 text-xs font-semibold text-zinc-700 border-r border-zinc-200 focus:outline-none shrink-0"
                  >
                    <option value="https://yoursite.com">https://yoursite.com</option>
                    <option value="https://app.yoursite.com">https://app.yoursite.com</option>
                  </select>
                  <input
                    type="text"
                    value={targetPath}
                    onChange={(e) => setTargetPath(e.target.value)}
                    placeholder="Enter target path (e.g. new-page)"
                    className="w-full bg-transparent px-3 py-2.5 text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:outline-none"
                  />
                </div>
                <span className="text-[11px] text-zinc-400 font-medium block">
                  Example: https://yoursite.com/new-page
                </span>
              </div>
            </div>

            {/* Row 2: Redirect Type & Match Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {/* Redirect Type */}
              <div className="space-y-2">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Redirect Type
                </label>
                <p className="text-[11px] text-zinc-400 font-medium">
                  Choose the type of redirect.
                </p>
                <select
                  value={redirectType}
                  onChange={(e) => setRedirectType(e.target.value)}
                  className="w-full rounded-xl border border-purple-300 bg-purple-50/20 px-3.5 py-2.5 text-xs font-bold text-zinc-900 focus:border-purple-600 focus:bg-white focus:outline-none transition-all"
                >
                  <option value="301">301 - Moved Permanently</option>
                  <option value="302">302 - Found / Temporary</option>
                  <option value="307">307 - Temporary Redirect</option>
                </select>
                <span className="text-[11px] text-zinc-500 font-medium block">
                  301 is recommended for SEO. It passes link equity to the new URL.
                </span>
              </div>

              {/* Match Type */}
              <div className="space-y-2">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Match Type
                </label>
                <p className="text-[11px] text-zinc-400 font-medium">
                  How should we match the source URL?
                </p>
                <select
                  value={matchType}
                  onChange={(e) => setMatchType(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-3.5 py-2.5 text-xs font-semibold text-zinc-700 focus:border-purple-600 focus:bg-white focus:outline-none transition-all"
                >
                  <option value="Exact Match">Exact Match</option>
                  <option value="Ignore Slash">Ignore Slash</option>
                  <option value="Regex Match">Regex Match</option>
                </select>
                <span className="text-[11px] text-zinc-400 font-medium block">
                  Redirect only when the URL matches exactly.
                </span>
              </div>
            </div>

            {/* Row 3: Status & Redirect Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {/* Status Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Status
                </label>
                <p className="text-[11px] text-zinc-400 font-medium">
                  Enable or disable this redirect rule.
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isActive ? 'bg-purple-600' : 'bg-zinc-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        isActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-xs font-bold text-zinc-800">
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 font-medium block">
                  Inactive redirects will not work.
                </span>
              </div>

              {/* Redirect Group */}
              <div className="space-y-2">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Redirect Group (Optional)
                </label>
                <p className="text-[11px] text-zinc-400 font-medium">
                  Organize redirects using groups.
                </p>
                <select
                  value={redirectGroup}
                  onChange={(e) => setRedirectGroup(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 px-3.5 py-2.5 text-xs font-semibold text-zinc-700 focus:border-purple-600 focus:bg-white focus:outline-none transition-all"
                >
                  <option value="">Select a group (optional)</option>
                  <option value="Pages">Pages</option>
                  <option value="Posts">Posts</option>
                  <option value="Services">Services</option>
                </select>
                <span className="text-[11px] text-zinc-400 font-medium block">
                  You can manage groups from redirect settings.
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Additional Settings (Optional) */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm space-y-6">
            <h2 className="font-serif text-base font-bold text-zinc-950 border-b border-zinc-100 pb-3">
              Additional Settings (Optional)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Notes */}
              <div className="space-y-2">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Notes
                </label>
                <p className="text-[11px] text-zinc-400 font-medium">
                  Add a note to describe this redirect (for your reference).
                </p>
                <div className="relative">
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter note..."
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50/40 p-3.5 text-xs font-medium text-zinc-900 placeholder-zinc-400 focus:border-purple-600 focus:bg-white focus:outline-none transition-all resize-none"
                  />
                  <span className="absolute right-3 bottom-3 text-[11px] font-semibold text-zinc-400">
                    {notes.length} / 255
                  </span>
                </div>
              </div>

              {/* Exclude from Redirect Logs */}
              <div className="space-y-2">
                <label className="text-xs font-serif font-bold text-zinc-900 block">
                  Exclude from Redirect Logs
                </label>
                <p className="text-[11px] text-zinc-400 font-medium">
                  Do not log hits for this redirect.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setExcludeLogs(!excludeLogs)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      excludeLogs ? 'bg-purple-600' : 'bg-zinc-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        excludeLogs ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-xs font-bold text-zinc-700">
                    {excludeLogs ? 'Excluded' : 'Exclude'}
                  </span>
                </div>
                <span className="text-[11px] text-zinc-400 font-medium block pt-1">
                  Useful for internal or system redirects.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Redirect Tips & Need Help Cards (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Redirect Tips */}
          <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-purple-700">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Lightbulb className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-serif text-sm font-bold text-zinc-950">
                Redirect Tips
              </h3>
            </div>

            <ul className="space-y-3 text-xs text-zinc-600 font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                <span>Use 301 redirect for permanent changes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                <span>Use 302 redirect only for temporary changes.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                <span>Make sure the target URL is accessible.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                <span>Avoid redirect chains to keep your site fast and SEO-friendly.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Need Help? */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <HelpCircle className="h-4.5 w-4.5" />
              </div>
              <h3 className="font-serif text-sm font-bold text-zinc-950">
                Need Help?
              </h3>
            </div>
            <p className="text-xs text-zinc-500 font-medium leading-relaxed">
              Learn more about redirects and best practices.
            </p>
            <button className="w-full flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white py-2.5 text-xs font-bold text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-colors shadow-sm">
              <span>View Documentation</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
