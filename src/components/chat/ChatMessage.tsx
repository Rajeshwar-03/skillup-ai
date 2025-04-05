
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div className="flex items-start gap-4">
      <Avatar className={`w-8 h-8 ${role === "assistant" ? "bg-primary/20" : "bg-secondary/20"}`}>
        {role === "assistant" ? (
          <>
            <AvatarImage src="/lovable-uploads/robot-avatar.png" alt="AI Assistant" />
            <AvatarFallback className="bg-primary/90 text-white">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="/lovable-uploads/user-avatar.png" alt="User" />
            <AvatarFallback className="bg-secondary/90 text-white">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </>
        )}
      </Avatar>
      <div className={`flex-1 ${role === "assistant" ? "bg-primary/10" : "bg-secondary/10"} rounded-xl p-4`}>
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};
