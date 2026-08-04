import { NextResponse } from 'next/server';
import { getCleanHtml } from '@/lib/htmlHelper';

export async function GET() {
  const html = getCleanHtml('about/index.html');
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
