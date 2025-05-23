
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { Stripe } from "https://esm.sh/stripe@12.5.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    const { messages, action, courseId, courseTitle, price, apiKey } = requestData;
    
    // Use provided API key or fall back to environment variable
    const openAIApiKey = apiKey || Deno.env.get('OPENAI_API_KEY');
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');

    // Add more detailed logging for debugging
    console.log('OpenAI API Key loaded:', openAIApiKey ? 'Yes (length: ' + openAIApiKey.length + ')' : 'No');
    console.log('Stripe API Key loaded:', stripeSecretKey ? 'Yes (length: ' + stripeSecretKey.length + ')' : 'No');
    console.log('Received messages count:', messages?.length || 0);
    console.log('Action requested:', action || 'None');

    // Handle Stripe payment creation if requested
    if (action === 'create_payment') {
      if (!stripeSecretKey) {
        throw new Error('Stripe API key not found in environment variables');
      }

      try {
        console.log(`Creating payment for course: ${courseId} - ${courseTitle} at $${price}`);

        const stripe = new Stripe(stripeSecretKey, {
          apiVersion: '2023-10-16',
        });

        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(price * 100), // Convert to cents
          currency: 'usd',
          description: `Course purchase: ${courseTitle}`,
          metadata: {
            courseId: courseId,
          },
        });

        return new Response(
          JSON.stringify({ 
            clientSecret: paymentIntent.client_secret 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } catch (stripeError) {
        console.error('Stripe error:', stripeError);
        throw new Error(`Stripe API error: ${stripeError.message}`);
      }
    }

    // Regular chat handling with OpenAI
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not found. Please contact support.');
    }

    try {
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
              content: `You are a friendly and knowledgeable AI learning assistant focused on skill development and education. You provide engaging, informative responses about our courses and learning paths. Respond only in English. Here's how you should interact:

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
              - Price: $3 (Intermediate level)

              2. AI & Machine Learning:
              - Prerequisites: Python, Basic Statistics
              - Key topics: Neural Networks, Deep Learning, TensorFlow
              - Career opportunities: ML Engineer, AI Researcher
              - Price: $6 (Advanced level)

              3. Cloud Computing (AWS):
              - Prerequisites: Basic networking
              - Key topics: EC2, S3, Lambda, CloudFormation
              - Career opportunities: Cloud Architect, DevOps Engineer
              - Price: $3 (Intermediate level)

              4. DevOps & CI/CD:
              - Prerequisites: Linux basics, Git
              - Key topics: Docker, Kubernetes, Jenkins
              - Career opportunities: DevOps Engineer, SRE
              - Price: $6 (Advanced level)

              5. UI/UX Design:
              - Prerequisites: None
              - Key topics: Design principles, Figma, User Research
              - Career opportunities: UI Designer, UX Researcher
              - Price: Free (Beginner level)

              And more specialized courses in:
              - Blockchain Development ($6 - Advanced)
              - Data Science ($3 - Intermediate)
              - Cybersecurity ($6 - Advanced)
              - Mobile App Development ($3 - Intermediate)
              - Digital Marketing (Free - Beginner)
              - Python Programming (Free - Beginner)
              - IoT Development ($6 - Advanced)
              - Game Development ($3 - Intermediate)
              - Cloud Native Development ($6 - Advanced)
              - Data Engineering ($6 - Advanced)

              PRICING STRUCTURE:
              - Beginner courses: Free
              - Intermediate courses: $3
              - Advanced courses: $6

              PURCHASE INFORMATION:
              - If users want to purchase a course, tell them they can sign up for any course by typing "I want to purchase [course name]"
              - When they express interest in purchasing, share the course price and tell them about our 30-day money-back guarantee
              - Mention that all courses include lifetime access and certification upon completion

              RESPONSE GUIDELINES:
              1. For course inquiries:
              - Provide specific information about prerequisites
              - Mention key topics covered
              - Include career opportunities
              - Share the price based on difficulty level
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
          max_tokens: 500  // Increased token limit for more comprehensive responses
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenAI API error:', errorData);
        
        if (response.status === 429 || errorData.includes('insufficient_quota')) {
          throw new Error('OpenAI API rate limit or quota exceeded. Please try again later.');
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
    } catch (openAIError) {
      console.error('OpenAI API error:', openAIError);
      throw new Error(`OpenAI API error: ${openAIError.message}`);
    }
  } catch (error) {
    console.error('Error in chat function:', error);
    
    if (!Deno.env.get('OPENAI_API_KEY')) {
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key not found. Please contact support.',
          details: 'Missing API key'
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    const errorMessage = error.message.includes('rate limit') || error.message.includes('quota') ?
      'OpenAI API rate limit or quota exceeded. Please try again later.' :
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
