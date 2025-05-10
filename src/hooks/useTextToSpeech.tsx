
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const speakText = async (text: string, shouldSpeak = false) => {
    if (isSpeaking || !shouldSpeak) {
      // If speech is disabled or already speaking, just return the text
      return text;
    }
    
    try {
      setIsSpeaking(true);
      const { data, error } = await supabase.functions.invoke("text-to-speech", {
        body: { text, voice: "nova" }
      });
      
      if (error) throw error;
      
      if (data?.audioContent && shouldSpeak) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audio.onended = () => setIsSpeaking(false);
        await audio.play();
      } else {
        setIsSpeaking(false);
      }
      
      return text;
    } catch (error) {
      console.error("Text to speech error:", error);
      toast.error("Failed to convert text to speech. Please try again.");
      setIsSpeaking(false);
      return text;
    }
  };

  return { isSpeaking, speakText };
};
