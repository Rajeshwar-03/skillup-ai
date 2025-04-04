
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewType {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  date: string;
}

interface CourseReviewsProps {
  courseId: string;
}

export const CourseReviews = ({ courseId }: CourseReviewsProps) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch reviews from the backend
    // For now, we'll use mock data
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock reviews data
        const mockReviews: ReviewType[] = [
          {
            id: "1",
            name: "Sarah Johnson",
            avatar: "/placeholder.svg",
            rating: 5,
            comment: "This course exceeded my expectations! The instructor explained complex concepts in a way that made them easy to understand.",
            date: "2023-03-15",
          },
          {
            id: "2",
            name: "Michael Chen",
            avatar: "/placeholder.svg",
            rating: 4,
            comment: "Great content and well-structured. Would have given 5 stars if there were more practical exercises.",
            date: "2023-02-28",
          },
          {
            id: "3",
            name: "Emma Williams",
            avatar: "/placeholder.svg",
            rating: 5,
            comment: "The instructor's expertise really shines through. I feel much more confident in my skills after completing this course.",
            date: "2023-01-22",
          },
        ];
        
        setReviews(mockReviews);
      } catch (error) {
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
                <AvatarImage src={review.avatar} alt={review.name} />
                <AvatarFallback>{review.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium">{review.name}</h4>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
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
