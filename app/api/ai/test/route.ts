import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { aiApiUrl, aiModel, aiApiKey } = await request.json();

    if (!aiApiUrl || !aiModel || !aiApiKey) {
      return NextResponse.json({ success: false, error: 'Missing required AI configuration fields' }, { status: 400 });
    }

    // Default to OpenAI chat completions endpoint format if just a base domain is provided
    let endpoint = aiApiUrl;
    if (!endpoint.endsWith('/chat/completions')) {
      endpoint = endpoint.replace(/\/$/, '') + '/chat/completions';
    }

    const payload = {
      model: aiModel,
      messages: [
        { role: 'user', content: 'Say "Hello, connection successful!"' }
      ],
      max_tokens: 20
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiApiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ success: false, error: `API Error: ${response.status} ${response.statusText}`, details: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, message: 'Connection successful', data });
  } catch (error: any) {
    console.error('AI Test Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to connect to the AI API' }, { status: 500 });
  }
}
