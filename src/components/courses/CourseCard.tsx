
import { motion } from "framer-motion";
import { BookOpen, Video, MessageSquare, Trophy, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PaymentOptions } from "@/components/PaymentOptions";
import { Button } from "@/components/ui/button";

export interface CourseCardProps {
  course: {
    title: string;
    description: string;
    level: string;
    rating: number;
    students: number;
    image: string;
    path: string;
    demoVideo: string;
    price: number;
  };
  index: number;
  enrollmentStatus: Record<string, boolean>;
  isLoading: boolean;
  onWatchDemo: (course: any) => void;
  onEnroll: (course: any) => void;
  onCompleteEnrollment: (courseId: string) => void;
}

export const CourseCard = ({
  course,
  index,
  enrollmentStatus,
  isLoading,
  onWatchDemo,
  onEnroll,
  onCompleteEnrollment
}: CourseCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      <div className="relative h-48">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
          {course.level}
        </div>
        <button
          onClick={() => onWatchDemo(course)}
          className="absolute bottom-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-primary transition-colors"
        >
          <Video className="w-4 h-4" />
          Watch Demo
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-muted-foreground mb-4">{course.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{course.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm">{course.students} students</span>
          </div>
        </div>
        <div className="mb-4 text-center">
          <span className="text-lg font-bold text-primary">
            {course.price === 0 ? "Free" : `$${course.price}`}
          </span>
        </div>
        
        {isLoading ? (
          <Button className="w-full" disabled>
            <span className="animate-pulse">Checking access...</span>
          </Button>
        ) : enrollmentStatus[course.path] ? (
          <Button
            onClick={() => navigate(`/course/${course.path}`)}
            className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Access Course
          </Button>
        ) : course.price === 0 ? (
          <Button
            onClick={() => onEnroll(course)}
            className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Enroll Now
          </Button>
        ) : (
          <PaymentOptions
            courseTitle={course.title}
            price={course.price}
            courseId={course.path}
            onPaymentComplete={onCompleteEnrollment}
          />
        )}
      </div>
    </motion.div>
  );
};
