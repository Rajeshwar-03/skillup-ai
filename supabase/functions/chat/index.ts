
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
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

    // Add more detailed logging for debugging
    console.log('API Key loaded:', openAIApiKey ? 'Yes (length: ' + openAIApiKey.length + ')' : 'No');
    console.log('Received messages count:', messages?.length || 0);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found in environment variables');
    }

    // Skip API key validation test to avoid unnecessary API calls and quota usage
    console.log('Calling OpenAI chat completions API');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using the recommended model gpt-4o-mini instead of older models
        messages: [
          {
            role: 'system',
            content: `You are a friendly and knowledgeable AI learning assistant focused on skill development and education. You provide engaging, informative responses about our courses and learning paths. Here's how you should interact:

            GREETINGS:
            - Respond warmly to greetings like "Hi", "Hello", "Hey", "Good morning/afternoon/evening"
            - Keep greetings brief and friendly
            - Always be ready to guide users to relevant courses

            COURSE INFORMATION:
            You have expertise in these courses:

            1. Full Stack Development (MERN Stack):
            - Prerequisites: Basic HTML, CSS, JavaScript
            - Key topics: React, Node.js, Express, MongoDB
            - Career opportunities: Web Developer, Full Stack Engineer

            2. AI & Machine Learning:
            - Prerequisites: Python, Basic Statistics
            - Key topics: Neural Networks, Deep Learning, TensorFlow
            - Career opportunities: ML Engineer, AI Researcher

            3. Cloud Computing (AWS):
            - Prerequisites: Basic networking
            - Key topics: EC2, S3, Lambda, CloudFormation
            - Career opportunities: Cloud Architect, DevOps Engineer

            4. DevOps & CI/CD:
            - Prerequisites: Linux basics, Git
            - Key topics: Docker, Kubernetes, Jenkins
            - Career opportunities: DevOps Engineer, SRE

            5. UI/UX Design:
            - Prerequisites: None
            - Key topics: Design principles, Figma, User Research
            - Career opportunities: UI Designer, UX Researcher

            And more specialized courses in:
            - Blockchain Development
            - Data Science
            - Cybersecurity
            - Mobile App Development
            - Digital Marketing
            - Python Programming
            - IoT Development
            - Game Development
            - Cloud Native Development
            - Data Engineering

            RESPONSE GUIDELINES:
            1. For course inquiries:
            - Provide specific information about prerequisites
            - Mention key topics covered
            - Include career opportunities
            - Suggest related courses when relevant

            2. For general questions:
            - Keep responses concise but informative
            - Be encouraging and supportive
            - Offer to provide more specific information if needed

            3. For career guidance:
            - Connect skills to job opportunities
            - Suggest learning paths
            - Mention relevant certifications

            Always maintain a helpful, encouraging tone and be ready to provide more details when asked.`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 250
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      
      if (response.status === 429 || errorData.includes('insufficient_quota')) {
        throw new Error('OpenAI API rate limit or quota exceeded. Please try again later or update your API key.');
      }
      
      throw new Error(`OpenAI API error: ${errorData}`);
    }

    const data = await response.json();
    console.log('OpenAI response received successfully');
    
    const message = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    
    if (!Deno.env.get('OPENAI_API_KEY')) {
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key not found. Please make sure it is properly set in the environment variables.',
          details: 'Missing API key'
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    const errorMessage = error.message.includes('rate limit') || error.message.includes('quota') ?
      'OpenAI API rate limit or quota exceeded. Please try again later or update your API key.' :
      'An unexpected error occurred while processing your request.';
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
