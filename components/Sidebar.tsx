'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Globe,
  Network,
  Image as ImageIcon,
  Settings,
  HelpCircle,
  ChevronRight,
  ArrowLeftRight,
  Search
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  // Cache buster: v2
  const pathname = usePathname();

  const menuGroups = [
    {
      title: 'CONTENT',
      items: [
        { name: 'Blog Posts', href: '/admin/blog-posts', icon: FileText },
        { name: 'Services', href: '/admin/services', icon: Briefcase },
      ],
    },
    {
      title: 'SEO',
      items: [
        { name: 'Global SEO', href: '/admin/global-seo', icon: Globe },
        { name: 'Sitemap', href: '/admin/sitemap', icon: Network },
        { name: 'Redirects', href: '/admin/redirects', icon: ArrowLeftRight },
        { name: 'Search Console', href: '/admin/search-console', icon: Search },
      ],
    },
    {
      title: 'MEDIA',
      items: [
        { name: 'Media Library', href: '/admin/media-library', icon: ImageIcon },
      ],
    },
    {
      title: 'SETTINGS',
      items: [
        { name: 'Settings', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-zinc-950/30 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 flex w-64 flex-col justify-between border-r border-zinc-200/80 bg-white p-4 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation Items */}
        <div className="space-y-6 overflow-y-auto pr-1">
          {/* Main Dashboard item */}
          <div className="pt-1">
            <Link
              href="/admin"
              onClick={onClose}
              className={`flex w-full items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm font-extrabold transition-all ${
                pathname === '/admin'
                  ? 'bg-orange-50 text-orange-600 shadow-sm ring-1 ring-orange-500/20 border border-orange-100 font-serif'
                  : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 font-serif'
              }`}
            >
              <LayoutDashboard className={`h-5 w-5 ${pathname === '/admin' ? 'text-orange-600' : 'text-zinc-400'}`} />
              <span className="font-serif tracking-wide text-base">Dashboard</span>
            </Link>
          </div>

          {/* Grouped Categories */}
          {menuGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <h4 className="px-3 text-[11px] font-serif font-bold tracking-widest text-zinc-400 uppercase">
                {group.title}
              </h4>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={`flex w-full items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-orange-50 text-orange-600 font-extrabold border border-orange-100 font-serif'
                          : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 font-serif'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? 'text-orange-600' : 'text-zinc-400'}`} />
                      <span className="font-serif tracking-wide text-sm">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Card: Need Help? */}
        <div className="mt-6 rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50/60 to-zinc-50 p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/20">
              <HelpCircle className="h-4 w-4" />
            </div>
            <span className="text-xs font-serif font-extrabold text-zinc-950">Need Help?</span>
          </div>
          <Link
            href="#documentation"
            className="mt-3 flex items-center justify-between text-xs font-semibold text-zinc-600 transition-colors hover:text-orange-600 group"
          >
            <span>View Documentation</span>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-orange-600" />
          </Link>
        </div>
      </aside>
    </>
  );
}
