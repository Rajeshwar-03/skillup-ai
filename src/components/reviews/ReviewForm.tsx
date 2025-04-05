
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters" }),
});

interface ReviewFormProps {
  courseId: string;
  courseName: string;
}

export const ReviewForm = ({ courseId, courseName }: ReviewFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rating: 5,
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to submit a review");
        setIsSubmitting(false);
        return;
      }

      // Submit the review
      const { error } = await supabase
        .from('course_reviews')
        .insert({
          course_id: courseId,
          user_id: user.id,
          reviewer_name: values.name,
          rating: values.rating,
          comment: values.comment
        });

      if (error) {
        if (error.code === '23505') {
          toast.error("You have already submitted a review for this course");
        } else {
          console.error("Error submitting review:", error);
          toast.error("Failed to submit review. Please try again.");
        }
        return;
      }
      
      // Success
      toast.success("Your review has been submitted successfully!");
      form.reset({
        name: "",
        rating: 5,
        comment: "",
      });
      
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating (1-5)</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input 
                    type="number" 
                    min={1} 
                    max={5} 
                    {...field} 
                    className="w-20" 
                  />
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => form.setValue('rating', star)}
                        className={`h-6 w-6 focus:outline-none ${
                          star <= field.value ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="currentColor"
                          strokeWidth="0"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={`Share your experience with the ${courseName} course`} 
                  {...field} 
                  className="min-h-[120px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </Form>
  );
};
