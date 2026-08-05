import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, fileName } = await request.json();

    if (!imageUrl && !fileName) {
      return NextResponse.json({ success: false, error: 'imageUrl or fileName is required' }, { status: 400 });
    }

    // Get AI settings
    const { data: settings } = await supabase
      .from('site_settings')
      .select('ai_endpoints')
      .eq('id', 1)
      .single();

    if (!settings || !settings.ai_endpoints || !Array.isArray(settings.ai_endpoints) || settings.ai_endpoints.length === 0) {
      return NextResponse.json({ success: false, error: 'No AI endpoints configured in settings' }, { status: 400 });
    }

    const prompt = `Write a short, descriptive, and SEO-optimized alt text (maximum 120 characters) for an image named "${fileName}". Just return the alt text, no quotes or extra words.`;
    
    let lastError = null;

    // Try endpoints in order
    for (const endpoint of settings.ai_endpoints) {
      if (!endpoint.url || !endpoint.model || !endpoint.apiKey) continue;

      let apiUrl = endpoint.url.trim();
      if (!apiUrl.endsWith('/chat/completions')) {
        apiUrl = apiUrl.replace(/\/$/, '') + '/chat/completions';
      }

      const payload = {
        model: endpoint.model.trim(),
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200, // Increased to allow reasoning models to finish
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
          const altText = messageContent ? messageContent.trim().replace(/^["']|["']$/g, '') : null;
          
          if (altText) {
            return NextResponse.json({ success: true, altText });
          } else {
            lastError = 'Model returned empty response or reached token limit';
          }
        } else {
          lastError = await response.text();
        }
      } catch (err: any) {
        lastError = err.message;
      }
    }

    return NextResponse.json({ success: false, error: 'All AI models failed', details: lastError }, { status: 500 });

  } catch (error: any) {
    console.error('AI Alt Gen Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
