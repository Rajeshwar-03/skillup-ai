
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  onTypingStateChange?: (isTyping: boolean) => void;
}

export const ChatInput = ({ onSubmit, isLoading, onTypingStateChange }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      // Clear timeout on unmount
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Signal that the user is typing
    onTypingStateChange?.(true);
    
    // Debounce the typing state to avoid flickering animations
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      onTypingStateChange?.(false);
    }, 800); // Stop "typing" animation 800ms after the last keystroke
  };

  const handleSubmit = () => {
    if (!message.trim() || isLoading) return;
    
    onSubmit(message.trim());
    setMessage("");
    
    // Clear typing state when message is sent
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    onTypingStateChange?.(false);
    
    // Focus back on textarea after sending
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border border-input rounded-lg p-2 flex items-end gap-2 bg-background">
      <Textarea
        ref={textareaRef}
        placeholder="Ask me anything about our courses..."
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="min-h-10 max-h-40 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-2"
        autoComplete="off"
        disabled={isLoading}
      />
      <Button 
        size={isMobile ? "icon" : "default"}
        onClick={handleSubmit} 
        disabled={!message.trim() || isLoading}
        className="shrink-0"
        aria-label="Send message"
      >
        {isMobile ? <Send className="h-4 w-4" /> : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Send
          </>
        )}
      </Button>
    </div>
  );
};
