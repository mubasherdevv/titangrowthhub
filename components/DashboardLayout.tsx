'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Sidebar from './Sidebar';
import SearchModal from './SearchModal';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isAdminPath = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login' || pathname === '/login';

  // Exclude DashboardLayout wrapper on login page and public website pages
  if (!isAdminPath || isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-zinc-900 flex flex-col">
      {/* Top Persistent Header */}
      <Header
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Persistent Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Dynamic Route Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          {children}
        </main>
      </div>

      {/* Command Palette (⌘K) Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
