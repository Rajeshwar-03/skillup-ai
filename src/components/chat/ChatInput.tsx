
import { Mic, Send, Speaker } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isSpeaking: boolean;
  isLoading: boolean;
  onSpeakLastMessage: () => void;
  lastMessageExists: boolean;
}

export const ChatInput = ({ 
  onSendMessage, 
  isSpeaking, 
  isLoading, 
  onSpeakLastMessage,
  lastMessageExists
}: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || isLoading) return;
    onSendMessage(message);
    setMessage("");
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result?.toString().split(",")[1];
          if (base64Audio) {
            try {
              toast.info("Converting your speech to text...");
              const { data, error } = await supabase.functions.invoke("speech-to-text", {
                body: { audio: base64Audio }
              });
              
              if (error) throw error;
              if (data.text) {
                setMessage(data.text);
                toast.success("Speech converted successfully!");
              }
            } catch (error) {
              console.error("Speech to text error:", error);
              toast.error("Failed to convert speech to text. Please try again.");
            }
          }
        };
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast.info("Listening... Click the microphone again to stop recording.");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success("Recording stopped");
      
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="flex gap-4">
      <Button
        variant="outline"
        size="icon"
        className={`${isRecording ? "bg-red-500 hover:bg-red-600" : ""} transition-colors duration-200`}
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isLoading}
      >
        <Mic className={`w-4 h-4 ${isRecording ? "animate-pulse" : ""}`} />
      </Button>
      
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type or speak your message in any language..."
        className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        disabled={isLoading}
      />
      
      <Button
        variant="outline"
        size="icon"
        className={isSpeaking ? "animate-pulse" : ""}
        onClick={onSpeakLastMessage}
        disabled={isSpeaking || !lastMessageExists || isLoading}
      >
        <Speaker className="w-4 h-4" />
      </Button>

      <Button
        variant="default"
        size="icon"
        onClick={handleSendMessage}
        disabled={!message.trim() || isLoading}
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};
