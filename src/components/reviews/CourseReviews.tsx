
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { CourseReview } from "@/types/database";

interface CourseReviewsProps {
  courseId: string;
}

export const CourseReviews = ({ courseId }: CourseReviewsProps) => {
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('course_reviews')
          .select('*')
          .eq('course_id', courseId)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setReviews(data || []);
      } catch (error: any) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [courseId]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading) {
    return <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-4">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </CardContent>
        </Card>
      ))}
    </div>;
  }

  if (reviews.length === 0) {
    return <p className="text-center text-muted-foreground py-4">No reviews yet. Be the first to review this course!</p>;
  }

  return (
    <div className="space-y-4 mt-4">
      {reviews.map((review) => (
        <Card key={review.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt={review.reviewer_name} />
                <AvatarFallback>{review.reviewer_name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium">{review.reviewer_name}</h4>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex mb-2">{renderStars(review.rating)}</div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
