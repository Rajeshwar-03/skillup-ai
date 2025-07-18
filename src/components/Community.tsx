import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface Comment {
  id: string;
  author: string;
  content: string;
  replies?: Comment[];
}

interface CommunityProps {
  courseId?: string;
}

const initialComments: Comment[] = [
  {
    id: "1",
    author: "Alice",
    content: "Great course! I learned a lot.",
    replies: [
      {
        id: "1-1",
        author: "Bob",
        content: "I agree, it was very informative.",
      },
    ],
  },
  {
    id: "2",
    author: "Charlie",
    content: "How do I apply what I've learned in practice?",
  },
];

export const Community = ({ courseId = "general" }: CommunityProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentObj: Comment = {
      id: String(Date.now()),
      author: "You",
      content: newComment,
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
    toast.success("Comment added!");
  };

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
  };

  const handleAddReply = (commentId: string) => {
    if (replyText.trim() === "") return;

    const newReply: Comment = {
      id: String(Date.now()),
      author: "You",
      content: replyText,
    };

    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies ? [...comment.replies, newReply] : [newReply],
            }
          : comment
      )
    );

    setReplyingTo(null);
    setReplyText("");
    toast.success("Reply added!");
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Community Discussion</h2>

        {/* Comment Input */}
        <div className="mb-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
            className="mb-2"
          />
          <Button onClick={handleAddComment} disabled={newComment.trim() === ""}>
            Add Comment
          </Button>
        </div>

        {/* Comments List */}
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4">
              <div className="flex items-start gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/lovable-uploads/user-avatar.png" alt={comment.author} />
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{comment.author}</div>
                  <div className="text-sm text-muted-foreground">{comment.content}</div>
                  <Button variant="link" size="sm" onClick={() => handleReply(comment.id)}>
                    Reply
                  </Button>
                </div>
              </div>

              {/* Reply Input */}
              {replyingTo === comment.id && (
                <div className="mt-2 ml-10">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Add your reply..."
                    className="mb-2"
                  />
                  <Button onClick={() => handleAddReply(comment.id)} disabled={replyText.trim() === ""}>
                    Add Reply
                  </Button>
                </div>
              )}

              {/* Replies List */}
              {comment.replies &&
                comment.replies.map((reply) => (
                  <div key={reply.id} className="mt-2 ml-10 flex items-start gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src="/lovable-uploads/user-avatar.png" alt={reply.author} />
                      <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{reply.author}</div>
                      <div className="text-sm text-muted-foreground">{reply.content}</div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
