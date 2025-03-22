
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
    const { data, error } = await supabase.functions.invoke("chat", {
      body: { 
        messages: messages.map(m => ({ role: m.role, content: m.content }))
      }
    });

    if (error) throw error;
    
    return { 
      success: true, 
      message: data.message || "I apologize, but I couldn't generate a response. Please try again."
    };
  } catch (error) {
    console.error("Error sending chat request:", error);
    toast.error("Failed to get a response. Please try again.");
    return { success: false, message: "" };
  }
};
