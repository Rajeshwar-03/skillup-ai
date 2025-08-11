
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const saveChatMessage = async (message: string, isAssistant: boolean) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log("User not authenticated, continuing without saving message");
      return true; // Don't fail the chat if user is not authenticated
    }

    const { error } = await supabase
      .from('chat_messages')
      .insert([
        { 
          message,
          is_assistant: isAssistant,
          user_id: user.id
        }
      ]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error saving chat message:", error);
    return true; // Don't fail the chat if saving fails
  }
};

export const sendChatRequest = async (messages: ChatMessage[]) => {
  try {
    // Build a lightweight system context about courses and instructions
    const { courses } = await import("@/data/coursesData");
    const courseSummaries = courses
      .slice(0, 12)
      .map((c: any) => `- ${c.title} (${c.level}) — ${c.description}`)
      .join("\n");

    const systemPrompt = `You are an AI assistant for an ed-tech platform.\n\nProvide concise, accurate answers about:\n- Available courses, levels, outcomes and brief descriptions\n- General guidance on curriculum structure (modules, projects, assessments)\n- Founders/company info: If unknown, politely say it's not provided and ask for details\n- Resolve simple questions and rectify user misunderstandings.\n\nCourses:\n${courseSummaries}\n\nIf you don't know, ask a clarifying question before answering.`;

    const payloadMessages: any[] = [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({ role: m.role, content: m.content }))
    ];

    // Try the X.AI chat function first
    try {
      const { data, error } = await supabase.functions.invoke("x-ai-chat", {
        body: { messages: payloadMessages }
      });

      if (error) {
        console.warn("X.AI chat function error, falling back to grok-chat function:", error);
        // Fall back to the grok-chat function if x-ai-chat fails
      } else {
        return {
          success: true,
          message: data.message || "I couldn't generate a response. Please try again."
        };
      }
    } catch (xAiError) {
      console.warn("Error with X.AI chat function, falling back:", xAiError);
      // Continue to fallback
    }

    // Try the grok-chat function as first fallback
    try {
      const { data, error } = await supabase.functions.invoke("grok-chat", {
        body: { messages: payloadMessages }
      });

      if (error) {
        console.warn("Grok chat function error, falling back to default chat:", error);
        // Fall back to the original chat function if grok-chat fails
      } else {
        return {
          success: true,
          message: data.message || "I couldn't generate a response. Please try again."
        };
      }
    } catch (grokError) {
      console.warn("Error with grok-chat function, falling back to default chat:", grokError);
      // Continue to fallback if there's an error
    }

    // Fallback to original chat function
    const { data, error } = await supabase.functions.invoke("chat", {
      body: { messages: payloadMessages }
    });

    if (error) {
      console.error("Edge function error:", error);
      // For API quota errors, provide a specific message
      if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
        return {
          success: true,
          message: "I'm currently experiencing high demand. Please try again in a few moments."
        };
      }
      throw error;
    }

    return {
      success: true,
      message: data.message || "I apologize, but I couldn't generate a response. Please try again."
    };
  } catch (error) {
    console.error("Error sending chat request:", error);
    // Return a fallback message instead of showing an error toast
    return {
      success: true,
      message: "I'm currently experiencing technical difficulties. Please try again later."
    };
  }
};

// Function to check if a user is already enrolled in a course
export const checkCourseEnrollment = async (courseId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { enrolled: false, error: "User not authenticated" };
    }

    const { data, error } = await supabase
      .from('course_enrollments')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found" error
      throw error;
    }

    return { 
      enrolled: !!data, 
      status: data?.status || null,
      error: null 
    };
  } catch (error) {
    console.error("Error checking enrollment:", error);
    return { enrolled: false, error: "Failed to check enrollment status" };
  }
};

// Enhanced payment simulation function with better verification and automatic course access
export const simulatePayment = async (courseId: string, paymentMethod: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    // Check if user is already enrolled to avoid duplicate enrollments
    const { enrolled } = await checkCourseEnrollment(courseId);
    
    if (enrolled) {
      return {
        success: true,
        message: "You are already enrolled in this course",
        transactionId: null,
        alreadyEnrolled: true
      };
    }
    
    // In a real implementation, this would call a payment processing API
    // For this simulation, after a simulated payment success, immediately enroll the user
    
    // Immediately enroll the user after successful payment
    const { error } = await supabase
      .from('course_enrollments')
      .insert([
        { 
          course_id: courseId,
          status: 'enrolled',
          user_id: user.id
        }
      ]);
    
    if (error) {
      if (error.code === '23505') { // Duplicate key error
        return {
          success: true,
          message: "You are already enrolled in this course",
          transactionId: null,
          alreadyEnrolled: true
        };
      }
      throw error;
    }
    
    return {
      success: true,
      message: "Payment successful! You are now enrolled in the course.",
      transactionId: null,
      alreadyEnrolled: false
    };
  } catch (error) {
    console.error("Error processing payment:", error);
    return {
      success: false,
      message: "Payment failed. Please try again.",
      transactionId: null,
      alreadyEnrolled: false
    };
  }
};
