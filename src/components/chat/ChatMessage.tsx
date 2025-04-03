
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div className="flex items-start gap-4">
      <Avatar className={`w-8 h-8 ${role === "assistant" ? "bg-primary" : "bg-secondary"}`}>
        {role === "assistant" ? (
          <AvatarFallback className="text-white">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        ) : (
          <AvatarFallback className="text-white">
            <User className="w-4 h-4" />
          </AvatarFallback>
        )}
      </Avatar>
      <div className="flex-1 glass rounded-xl p-4">
        <p>{content}</p>
      </div>
    </div>
  );
};
