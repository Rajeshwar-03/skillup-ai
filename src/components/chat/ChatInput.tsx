
import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ 
  onSendMessage, 
  isLoading
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

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

  return (
    <div className="flex gap-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message in English..."
        className="flex-1 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        disabled={isLoading}
      />

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
