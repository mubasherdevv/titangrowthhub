import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getCleanHtml } from '@/lib/htmlHelper';

interface RouteParams {
  params: {
    slug: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const slug = params.slug;

    // Fetch the service item from Supabase by matching slug (either exact /services/slug or slug)
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .or(`slug.eq.${slug},slug.eq./services/${slug}`);

    if (error) throw error;

    const service = services && services[0];

    if (!service) {
      return new NextResponse('<h1>Service not found</h1>', { status: 404 });
    }

    // Read base HTML page
    let html = getCleanHtml('our-services/index.html');

    // Replace static services list with single service details
    const servicesWrapStart = html.indexOf('<div class="as-services-1-wrap">');
    if (servicesWrapStart !== -1) {
      const servicesContentIndex = servicesWrapStart + '<div class="as-services-1-wrap">'.length;
      
      const endMarker = '</div>\n                            </div>\n        </div>\n    </div>\n</section>';
      const closingIndex = html.indexOf(endMarker, servicesContentIndex);

      if (closingIndex !== -1) {
        // Construct single service details HTML
        const singleServiceHtml = `
          <div class="as-services-1-item single-service-view" style="padding: 40px; background: #fff; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-bottom: 30px;">
            <div class="right-content wa-fix" style="width: 100%;">
              <div class="category" style="margin-bottom: 15px;">
                <span style="background: #fd3f00; color: #fff; padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase;">
                  ${service.category}
                </span>
              </div>
              <h2 class="title" style="font-size: 32px; font-weight: 800; line-height: 1.3; margin-bottom: 20px; color: #111;">
                ${service.title}
              </h2>
              <p class="as-p-1 short-description" style="font-size: 16px; color: #fd3f00; font-weight: bold; line-height: 1.6; margin-bottom: 25px; border-left: 3px solid #fd3f00; padding-left: 15px;">
                ${service.short_desc || ''}
              </p>
              <div class="service-content leading-relaxed" style="font-size: 15px; color: #444; line-height: 1.8;">
                ${service.content ? service.content.split('\n').map((p: string) => `<p style="margin-bottom: 15px;">${p}</p>`).join('') : 'No content details available.'}
              </div>
            </div>
          </div>
`;

        html = html.substring(0, servicesContentIndex) + singleServiceHtml + '\n' + html.substring(closingIndex);
      }
    }

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  } catch (error) {
    console.error('Error serving service details page:', error);
    return new NextResponse('<h1>Failed to load service details</h1>', { status: 500 });
  }
}
