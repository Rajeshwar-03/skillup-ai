
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface CourseReviewFormProps {
  courseId: string;
  onSubmitReview: (review: {name: string, rating: number, comment: string}) => void;
}

export const CourseReviewForm = ({ courseId, onSubmitReview }: CourseReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    
    if (!comment.trim()) {
      toast.error("Please enter a review comment");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get user name from Supabase
      // For now, we'll use "Current User" as a placeholder
      const userName = "Current User";
      
      const newReview = {
        name: userName,
        rating,
        comment: comment.trim()
      };
      
      // Submit the review
      onSubmitReview(newReview);
      
      // Reset form
      setRating(0);
      setComment("");
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass rounded-xl p-4 mb-6">
      <h3 className="font-semibold mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="ml-2 text-sm text-muted-foreground">
            {rating > 0 ? `${rating} out of 5 stars` : "Select a rating"}
          </span>
        </div>
        
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this course..."
          className="min-h-[100px] mb-4"
        />
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  );
};
