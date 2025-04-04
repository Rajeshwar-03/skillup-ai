
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

export const sendChatRequest = async (messages: ChatMessage[], apiKey?: string) => {
  try {
    const { data, error } = await supabase.functions.invoke("chat", {
      body: { 
        messages: messages.map(m => ({ role: m.role, content: m.content })),
        apiKey
      }
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
    
    const transactionId = `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    // Immediately enroll the user after successful payment
    const { error } = await supabase
      .from('course_enrollments')
      .insert([
        { 
          course_id: courseId,
          status: 'enrolled',
          payment_method: paymentMethod,
          transaction_id: transactionId,
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
      transactionId,
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
