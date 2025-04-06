
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { checkCourseEnrollment } from "@/services/chatService";

// Define a common course type to make this reusable
export interface CourseType {
  path: string;
  price?: number;
  demoVideo?: string;
}

export const useEnrollment = (courses: CourseType[]) => {
  const navigate = useNavigate();
  const [enrollmentStatus, setEnrollmentStatus] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAllEnrollments = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsLoading(false);
          return;
        }

        const statuses: Record<string, boolean> = {};
        
        for (const course of courses) {
          try {
            const { enrolled } = await checkCourseEnrollment(course.path);
            statuses[course.path] = enrolled;
          } catch (error) {
            console.error(`Error checking enrollment for course ${course.path}:`, error);
            statuses[course.path] = false;
          }
        }
        
        setEnrollmentStatus(statuses);
      } catch (error) {
        console.error("Error checking enrollments:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAllEnrollments();
  }, [courses]);

  const handleWatchDemo = async (course: CourseType) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to watch demo videos");
        return;
      }

      const { error } = await supabase
        .from('course_enrollments')
        .insert([
          { 
            course_id: course.path,
            status: 'demo_viewed',
            user_id: user.id
          }
        ]);

      if (error) throw error;
      
      if (course.demoVideo) {
        window.open(course.demoVideo, '_blank');
        toast.success("Loading demo video...");
      } else {
        toast.error("Demo video not available");
      }
    } catch (error) {
      console.error("Error logging demo view:", error);
      toast.error("Failed to load demo video. Please try again.");
    }
  };

  const handleEnroll = async (course: CourseType) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to enroll in courses");
        return;
      }

      if (course.price === 0) {
        const { data: existingEnrollment } = await supabase
          .from('course_enrollments')
          .select('id')
          .eq('user_id', user.id)
          .eq('course_id', course.path)
          .single();

        if (existingEnrollment) {
          toast.info("You are already enrolled in this course");
          navigate(`/course/${course.path}`);
          return;
        }

        const { error } = await supabase
          .from('course_enrollments')
          .insert([
            { 
              course_id: course.path,
              status: 'enrolled',
              user_id: user.id
            }
          ]);

        if (error) throw error;
        
        toast.success("Successfully enrolled in the course!");
        setEnrollmentStatus(prev => ({...prev, [course.path]: true}));
        navigate(`/course/${course.path}`);
      } else {
        navigate(`/course/${course.path}?enroll=true`);
      }
    } catch (error: any) {
      console.error("Error enrolling in course:", error);
      if (error.code === '23505') {
        toast.info("You are already enrolled in this course");
        setEnrollmentStatus(prev => ({...prev, [course.path]: true}));
        navigate(`/course/${course.path}`);
      } else {
        toast.error("Failed to enroll in course. Please try again.");
      }
    }
  };

  const completeEnrollment = (courseId: string) => {
    setEnrollmentStatus(prev => ({...prev, [courseId]: true}));
    navigate(`/course/${courseId}`);
  };

  return {
    enrollmentStatus,
    isLoading,
    handleWatchDemo,
    handleEnroll,
    completeEnrollment
  };
};
