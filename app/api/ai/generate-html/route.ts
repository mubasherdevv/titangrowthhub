import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { prompt, model } = await request.json();

    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Prompt is required' }, { status: 400 });
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

    const systemPrompt = "You are an expert web developer. The user will ask you to generate an HTML block. You must return both a <style> tag with regular CSS and the corresponding HTML elements below it. DO NOT use markdown backticks. DO NOT include <html>, <head>, or <body> tags. CRITICAL: DO NOT use Tailwind CSS classes. You MUST use regular CSS. STRICT RULE: DO NOT include any explanations, reasoning, or conversational text before or after the code. Output ONLY the raw HTML and CSS code directly. Nothing else.";
    
    let lastError = null;

    let endpointsToTry = settings.ai_endpoints;
    if (model) {
      const selectedEndpoint = settings.ai_endpoints.find((e: any) => e.model === model);
      if (selectedEndpoint) {
        endpointsToTry = [selectedEndpoint];
      }
    }

    // Try endpoints in order
    for (const endpoint of endpointsToTry) {
      if (!endpoint.url || !endpoint.model || !endpoint.apiKey) continue;

      let apiUrl = endpoint.url.trim();
      if (!apiUrl.endsWith('/chat/completions')) {
        apiUrl = apiUrl.replace(/\/$/, '') + '/chat/completions';
      }

      const payload = {
        model: endpoint.model.trim(),
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1500,
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
          let html = data.choices?.[0]?.message?.content || data.choices?.[0]?.message?.reasoning;
          
          if (html) {
            html = html.trim();
            // Clean up any markdown blocks if the AI still returned them
            if (html.startsWith('```html')) {
              html = html.replace(/^```html\n?/, '').replace(/\n?```$/, '');
            } else if (html.startsWith('```')) {
              html = html.replace(/^```\n?/, '').replace(/\n?```$/, '');
            }
            return NextResponse.json({ success: true, html });
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
    console.error('AI HTML Gen Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
