
import { MessageSquare } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-8 h-8 rounded-full ${role === "assistant" ? "bg-primary" : "bg-secondary"} flex items-center justify-center`}>
        <MessageSquare className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 glass rounded-xl p-4">
        <p>{content}</p>
      </div>
    </div>
  );
};
