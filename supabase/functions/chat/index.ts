import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    console.log('Received messages:', messages);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using the most efficient model
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI learning assistant focused on skill development and education. You provide clear, concise, and supportive responses to help users with their learning journey. Keep responses friendly and encouraging, and be able to assist in multiple languages.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 150 // Reduced max tokens to help with quota
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      
      // Check specifically for quota errors
      if (errorData.includes('insufficient_quota')) {
        throw new Error('OpenAI API quota exceeded. Please update your API key.');
      }
      
      throw new Error(`OpenAI API error: ${errorData}`);
    }

    const data = await response.json();
    console.log('OpenAI response:', data);
    
    const message = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.message.includes('quota') ? 
          'Please update your OpenAI API key with one that has available credits.' : 
          'An unexpected error occurred.'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});