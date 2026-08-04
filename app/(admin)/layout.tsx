import '../globals.css';
import type { Metadata } from 'next';
import DashboardLayout from '@/components/DashboardLayout';

export const metadata: Metadata = {
  title: 'VistaSEO Admin Dashboard',
  description: 'SEO performance and content analytics dashboard',
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAFAFC] text-zinc-900 antialiased">
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
