export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    // AI Chat Endpoint Route
    if (url.pathname === '/api/ai-chat' && request.method === 'POST') {
      try {
        const body = await request.json();
        const userMessage = body.message || '';

        if (!userMessage) {
          return new Response(JSON.stringify({ error: 'Message field is required.' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const HF_API_KEY = env.HF_API_KEY;
        const HF_MODEL = env.HF_MODEL || 'Qwen/Qwen2.5-72B-Instruct';

        if (!HF_API_KEY) {
          return new Response(JSON.stringify({ error: 'Hugging Face API key not configured on server.' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Call Hugging Face Router / Inference API
        const hfResponse = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HF_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: userMessage,
            parameters: {
              max_new_tokens: 512,
              temperature: 0.7,
              return_full_text: false
            }
          }),
        });

        if (!hfResponse.ok) {
          const errorData = await hfResponse.text();
          return new Response(JSON.stringify({ error: `Hugging Face Gateway Error: ${errorData}` }), {
            status: hfResponse.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const hfResult = await hfResponse.json();
        let aiReply = '';

        if (Array.isArray(hfResult) && hfResult[0]?.generated_text) {
          aiReply = hfResult[0].generated_text.trim();
        } else if (hfResult.generated_text) {
          aiReply = hfResult.generated_text.trim();
        } else {
          aiReply = typeof hfResult === 'string' ? hfResult : JSON.stringify(hfResult);
        }

        return new Response(JSON.stringify({ reply: aiReply }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ status: 'FlyTripVisa API Gateway Online' }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};
