
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
        userApiKey: userApiKey || null  // Pass the user API key to the edge function
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
