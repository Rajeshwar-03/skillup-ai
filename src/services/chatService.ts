
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
      throw new Error("User not authenticated");
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
    return false;
  }
};

export const sendChatRequest = async (messages: ChatMessage[]) => {
  try {
    // Get user provided API key if available
    const userApiKey = localStorage.getItem("user_openai_api_key");
    
    const { data, error } = await supabase.functions.invoke("chat", {
      body: { 
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        userApiKey: userApiKey || null,  // Pass the user API key to the edge function
      }
    });

    if (error) {
      console.error("Edge function error:", error);
      // For API quota errors, provide a specific message
      if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
        return { 
          success: true, 
          message: "I'm currently experiencing high demand. Please try again in a few moments or add your own OpenAI API key for faster responses."
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
      message: "I'm currently experiencing technical difficulties. Please try again later or add your own OpenAI API key." 
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

// New function to simulate a payment for courses
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
    // For this simulation, we'll just simulate a successful payment
    
    return {
      success: true,
      message: "Payment successful",
      transactionId: `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
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
