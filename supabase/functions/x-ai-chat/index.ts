
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    const { messages } = requestData;
    
    // Get X.AI API key from environment variable
    const xAiApiKey = Deno.env.get('X_AI_API_KEY');
    
    console.log('Processing chat request with X.AI using', messages?.length || 0, 'messages');

    if (!xAiApiKey) {
      throw new Error('X.AI API key not found in environment variables');
    }

    try {
      const response = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${xAiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'grok-2-latest',
          messages: [
            {
              role: 'system',
              content: `You are a helpful AI learning assistant specializing in education and skill development. 
                       You provide personalized guidance for students on our online learning platform. 
                       Respond with helpful, engaging information about our courses and educational content.
                       If you're asked technical questions, provide practical, clear explanations.
                       Keep your responses concise but informative and friendly.`
            },
            ...messages.slice(-10) // Only use the last 10 messages to keep context size manageable
          ],
          temperature: 0.7,
          stream: false
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('X.AI API error:', errorData);
        throw new Error(`X.AI API error: ${errorData}`);
      }

      const data = await response.json();
      console.log('Successfully received response from X.AI model');
      
      return new Response(
        JSON.stringify({ message: data.choices[0].message.content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (apiError) {
      console.error('Error calling X.AI API:', apiError);
      throw new Error(`X.AI API error: ${apiError.message}`);
    }
  } catch (error) {
    console.error('Error in chat function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred while processing your request',
        details: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
