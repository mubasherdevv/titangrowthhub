import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const powerWords = ['Expert', 'Professional', 'Proven', 'Top-Rated', 'Results-Driven', 'Data-Driven', 'Trusted', 'Leading', 'Premium', 'Award-Winning'];
const ctaWords = ['Get Started', 'Free Consultation', 'Get Results', 'Boost Your ROI', 'Scale Your Business'];
const locationTag = 'Pakistan';

function generateFallbackSeoTitle(title: string, category: string): string {
  const powerWord = powerWords[Math.floor(Math.random() * powerWords.length)];
  const templates = [
    `${title} | ${powerWord} ${category} Agency – Titan Growth Hub`,
    `${powerWord} ${title} Services | Rank Higher & Grow Faster`,
    `${title} – ${powerWord} Solutions for Business Growth | Titan Growth Hub`,
    `Best ${title} in ${locationTag} | ${powerWord} Digital Marketing Agency`,
    `${title} Services | Drive Traffic & Revenue – Titan Growth Hub`,
  ];
  const best = templates.sort((a, b) => Math.abs(a.length - 55) - Math.abs(b.length - 55))[0];
  return best.length > 60 ? best.substring(0, 57) + '...' : best;
}

function generateFallbackSeoDescription(title: string, shortDesc: string, category: string): string {
  const cta = ctaWords[Math.floor(Math.random() * ctaWords.length)];
  const templates = [
    `${shortDesc || `Looking for ${title.toLowerCase()}?`} Titan Growth Hub delivers ${category.toLowerCase()} solutions that drive measurable results. ${cta} today.`,
    `Boost your online presence with our ${title.toLowerCase()} services. We help businesses in ${locationTag} achieve higher rankings, more traffic, and better ROI. ${cta}.`,
    `${title} by Titan Growth Hub – ${shortDesc || `expert ${category.toLowerCase()} services designed to grow your business`}. Contact us for a free audit.`,
    `Get ${title.toLowerCase()} that actually works. Our data-driven approach delivers real results for businesses across ${locationTag}. ${cta}.`,
  ];
  const best = templates.sort((a, b) => Math.abs(a.length - 150) - Math.abs(b.length - 150))[0];
  return best.length > 160 ? best.substring(0, 157) + '...' : best;
}

export async function POST(request: NextRequest) {
  try {
    const { title, shortDesc, category } = await request.json();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Try to get AI settings
    const { data: settings } = await supabase
      .from('site_settings')
      .select('ai_endpoints')
      .eq('id', 1)
      .single();

    if (settings && settings.ai_endpoints && Array.isArray(settings.ai_endpoints) && settings.ai_endpoints.length > 0) {
      const prompt = `You are an expert SEO specialist. Generate an SEO Title (max 60 characters) and Meta Description (max 160 characters) for a service offered by Titan Growth Hub.
Service Title: ${title}
Category: ${category || 'SEO Services'}
Short Description: ${shortDesc || 'Professional digital marketing services.'}

Return ONLY a valid JSON object in this exact format, with no other text, markdown formatting, or markdown blocks:
{
  "seoTitle": "Your generated title here",
  "seoDescription": "Your generated description here"
}`;

      let aiErrors: string[] = [];

      for (const endpoint of settings.ai_endpoints) {
        if (!endpoint.url || !endpoint.model || !endpoint.apiKey) continue;

        let apiUrl = endpoint.url.trim();
        if (!apiUrl.endsWith('/chat/completions')) {
          apiUrl = apiUrl.replace(/\/$/, '') + '/chat/completions';
        }

        const payload = {
          model: endpoint.model.trim(),
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 300,
        };

        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${endpoint.apiKey.trim()}`
            },
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            const data = await response.json();
            const messageContent = data.choices?.[0]?.message?.content || data.choices?.[0]?.message?.reasoning;
            if (messageContent) {
              const cleanedContent = messageContent.trim().replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
              try {
                const parsed = JSON.parse(cleanedContent);
                if (parsed.seoTitle && parsed.seoDescription) {
                  return NextResponse.json({
                    seoTitle: parsed.seoTitle,
                    seoDescription: parsed.seoDescription
                  });
                }
              } catch (parseError: any) {
                aiErrors.push(`${endpoint.model}: Failed to parse JSON response (${parseError.message})`);
              }
            } else {
              aiErrors.push(`${endpoint.model}: Empty response from model`);
            }
          } else {
            const errorText = await response.text();
            aiErrors.push(`${endpoint.model}: API Error ${response.status} - ${errorText}`);
          }
        } catch (err: any) {
          aiErrors.push(`${endpoint.model}: Network/Fetch Error - ${err.message}`);
        }
      }

      // If we reach here, all configured AI models failed
      return NextResponse.json({ 
        error: 'All AI models failed to generate SEO.', 
        details: aiErrors.join(' | ') 
      }, { status: 500 });
    }

    // Fallback if NO AI endpoints are configured at all
    console.log('No AI endpoints configured, falling back to template-based SEO generator');
    const seoTitle = generateFallbackSeoTitle(title, category || 'SEO Services');
    const seoDescription = generateFallbackSeoDescription(title, shortDesc || '', category || 'SEO Services');

    return NextResponse.json({
      seoTitle,
      seoDescription,
    });

  } catch (error: any) {
    console.error('Error in SEO generation:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate SEO' }, { status: 500 });
  }
}
