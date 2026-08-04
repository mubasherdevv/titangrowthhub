/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, Bell, ChevronDown, CheckCircle2, Sparkles } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onOpenSearch?: () => void;
}

export default function Header({ onToggleSidebar, onOpenSearch }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'SEO Audit Completed', desc: 'Blog posts score updated to 85/100', time: '10m ago', unread: true },
    { id: 2, title: '3 Pages Need Attention', desc: 'Broken links detected in /services/local-seo', time: '1h ago', unread: true },
    { id: 3, title: 'New Organic Traffic Peak', desc: '12.4K impressions recorded today', time: '3h ago', unread: true },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200/80 bg-white px-4 md:px-6 shadow-sm">
      {/* Left: Brand Logo & Menu Toggle */}
      <div className="flex items-center gap-4">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-md shadow-orange-500/25">
            <Sparkles className="h-5 w-5 fill-white/20" />
          </div>
          <span className="font-serif text-2xl font-black tracking-tight text-zinc-950">
            Vista<span className="text-orange-600">SEO</span>
          </span>
        </Link>

        <button
          onClick={onToggleSidebar}
          className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md mx-6 hidden sm:block">
        <div
          onClick={onOpenSearch}
          className="relative flex items-center w-full cursor-pointer rounded-xl border border-zinc-200 bg-zinc-50/70 px-3.5 py-2 text-sm text-zinc-400 shadow-inner transition-all hover:border-zinc-300 hover:bg-zinc-100/60"
        >
          <Search className="h-4 w-4 text-zinc-400 mr-2.5 shrink-0" />
          <span className="flex-1 text-zinc-400 font-normal">Search here...</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 rounded border border-zinc-200 bg-white px-2 py-0.5 text-[11px] font-medium text-zinc-500 shadow-sm">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Notifications & User Profile */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="flex sm:hidden h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white ring-2 ring-white">
              3
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <h3 className="font-serif font-bold text-zinc-900 text-base">Notifications</h3>
                <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200/50">
                  3 unread
                </span>
              </div>
              <div className="mt-2 divide-y divide-zinc-100 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-2.5 flex items-start gap-3 hover:bg-zinc-50 rounded-lg px-2 transition-colors">
                    <div className="mt-0.5 text-orange-600">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-bold text-zinc-900">{n.title}</p>
                      <p className="text-zinc-500 mt-0.5 text-[11px]">{n.desc}</p>
                      <span className="text-[10px] text-zinc-400 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 rounded-xl p-1 transition-colors hover:bg-zinc-100 focus:outline-none"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
              alt="John Doe"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-orange-500/20"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-extrabold text-zinc-950 leading-tight">John Doe</span>
              <span className="text-[11px] text-orange-600 font-bold">Admin</span>
            </div>
            <ChevronDown className="h-4 w-4 text-zinc-400 hidden md:block" />
          </button>

          {/* User Menu Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-zinc-200 bg-white py-2 shadow-lg z-50">
              <div className="px-4 py-2 border-b border-zinc-100">
                <p className="text-xs font-bold text-zinc-900">John Doe</p>
                <p className="text-[11px] text-zinc-500">john.doe@vistaseo.com</p>
              </div>
              <Link href="#profile" className="block px-4 py-2 text-xs text-zinc-700 hover:bg-orange-50 hover:text-orange-600 font-medium">Account Settings</Link>
              <Link href="#billing" className="block px-4 py-2 text-xs text-zinc-700 hover:bg-orange-50 hover:text-orange-600 font-medium">Billing & Plans</Link>
              <div className="border-t border-zinc-100 mt-1"></div>
              <button className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-bold">Log out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
