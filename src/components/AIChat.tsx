import { motion } from "framer-motion";
import { MessageSquare, Mic, Speaker, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const AIChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hello! How can I help you with your learning journey today?" }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
              const { data, error } = await supabase.functions.invoke("speech-to-text", {
                body: { audio: base64Audio }
              });
              
              if (error) throw error;
              if (data.text) {
                setMessage(data.text);
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
      toast.info("Recording started...");
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
      
      // Stop all tracks on the stream
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const speakText = async (text: string) => {
    if (isSpeaking) return;
    
    try {
      setIsSpeaking(true);
      const { data, error } = await supabase.functions.invoke("text-to-speech", {
        body: { text, voice: "nova" }
      });
      
      if (error) throw error;
      
      if (data.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audio.onended = () => setIsSpeaking(false);
        await audio.play();
      }
    } catch (error) {
      console.error("Text to speech error:", error);
      toast.error("Failed to convert text to speech. Please try again.");
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user" as const, content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");

    try {
      // Simulate AI response for now - replace with actual AI integration
      const aiResponse = { 
        role: "assistant" as const, 
        content: "I understand your message. This is a placeholder response that would normally come from an AI model. How else can I help you?" 
      };
      setMessages(prev => [...prev, aiResponse]);
      
      // Automatically speak the response
      await speakText(aiResponse.content);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">AI Learning Assistant</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get instant help with your learning journey through our AI-powered chatbot
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex flex-col h-[400px]">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full ${msg.role === "assistant" ? "bg-primary" : "bg-secondary"} flex items-center justify-center`}>
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 glass rounded-xl p-4">
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className={isRecording ? "bg-red-500 hover:bg-red-600" : ""}
                  onClick={isRecording ? stopRecording : startRecording}
                >
                  <Mic className="w-4 h-4" />
                </Button>
                
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                
                <Button
                  variant="outline"
                  size="icon"
                  className={isSpeaking ? "animate-pulse" : ""}
                  onClick={() => messages.length > 0 && speakText(messages[messages.length - 1].content)}
                  disabled={isSpeaking || messages.length === 0}
                >
                  <Speaker className="w-4 h-4" />
                </Button>

                <Button
                  variant="default"
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};