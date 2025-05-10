import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MessageCircle, X } from "lucide-react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ThreeJSAnimation } from "@/components/chat/ThreeJSAnimation";
import { sendChatRequest, saveChatMessage, ChatMessage as ChatMessageType } from "@/services/chatService";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { toast } from "sonner";

export const AIChat = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const { speakText } = useTextToSpeech();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    // Add user message to the chat
    const userMessage: ChatMessageType = { role: "user", content: message };
    setMessages(prev => [...prev, userMessage]);
    
    // Save user message
    await saveChatMessage(message, false);
    
    // Show loading state
    setIsLoading(true);
    
    try {
      // Send message to API
      const allMessages = [...messages, userMessage];
      const response = await sendChatRequest(allMessages);
      
      if (response.success && response.message) {
        // Add AI response to the chat without speaking it
        const aiMessage: ChatMessageType = { role: "assistant", content: response.message };
        setMessages(prev => [...prev, aiMessage]);
        
        // Save AI message
        await saveChatMessage(response.message, true);
        
        // We specifically do NOT call speakText here as requested by the user
      } else {
        throw new Error("Failed to get a response from the AI");
      }
    } catch (error) {
      console.error("Error in chat:", error);
      toast.error("There was an error sending your message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md p-0 gap-0 flex flex-col h-full">
        <SheetHeader className="border-b p-4 text-left">
          <div className="flex items-center justify-between">
            <SheetTitle>AI Learning Assistant</SheetTitle>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 flex flex-col">
          {/* Three.js Animation Section */}
          <ThreeJSAnimation isTyping={isTyping} />

          {/* Chat Messages Section */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p>Hello! I'm your AI learning assistant.</p>
                <p>How can I help you today?</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <ChatMessage key={index} role={message.role} content={message.content} />
              ))
            )}
            <div ref={messagesEndRef} />
            {isLoading && (
              <div className="flex justify-center">
                <div className="dot-flashing"></div>
              </div>
            )}
          </div>

          {/* Chat Input Section */}
          <div className="p-4 border-t">
            <ChatInput 
              onSubmit={handleSendMessage} 
              isLoading={isLoading} 
              onTypingStateChange={setIsTyping}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
