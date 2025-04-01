
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { ChatMessage as ChatMessageComponent } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { ChatMessage, saveChatMessage, sendChatRequest } from "@/services/chatService";

export const AIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: "assistant", 
      content: "Hello! I'm here to assist you with your learning journey. How can I help you today?" 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isSpeaking, speakText } = useTextToSpeech();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    
    // Add a small delay to ensure DOM has updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: message };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Save user message
      const saveSuccess = await saveChatMessage(userMessage.content, false);
      if (!saveSuccess) {
        toast.error("Please sign in to send messages");
        setIsLoading(false);
        return;
      }

      // Get AI response
      const response = await sendChatRequest([...messages, userMessage]);
      
      if (response.success) {
        const aiResponse = { 
          role: "assistant" as const, 
          content: response.message
        };
        
        // Save AI response
        await saveChatMessage(aiResponse.content, true);
        
        setMessages(prev => [...prev, aiResponse]);
        await speakText(aiResponse.content);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeakLastMessage = () => {
    if (messages.length > 0) {
      speakText(messages[messages.length - 1].content);
    }
  };

  return (
    <section id="chat" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">AI Learning Assistant</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chat with our AI to get answers about your learning journey
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
              <div 
                ref={messagesContainerRef} 
                className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2"
              >
                {messages.map((msg, index) => (
                  <ChatMessageComponent key={index} role={msg.role} content={msg.content} />
                ))}
                <div ref={messagesEndRef} />
              </div>

              <ChatInput 
                onSendMessage={handleSendMessage}
                isSpeaking={isSpeaking}
                isLoading={isLoading}
                onSpeakLastMessage={handleSpeakLastMessage}
                lastMessageExists={messages.length > 0}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
