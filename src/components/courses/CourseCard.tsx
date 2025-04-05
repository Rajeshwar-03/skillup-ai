
import { motion } from "framer-motion";
import { BookOpen, Video, MessageSquare, Trophy, Star, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PaymentOptions } from "@/components/PaymentOptions";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
    materials?: {
      name: string;
      url: string;
      type: string;
    }[];
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
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleViewCourse = () => {
    navigate(`/course/${course.path}`);
  };

  const handleWatchDemo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVideoModal(true);
  };

  const handleDownloadMaterial = (e: React.MouseEvent, material: any) => {
    e.stopPropagation();
    window.open(material.url, '_blank');
    toast.success(`Downloading ${material.name}`);
  };

  return (
    <>
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
            onClick={handleWatchDemo}
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
          
          {course.materials && course.materials.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Free Materials:</p>
              <div className="flex flex-col gap-2">
                {course.materials.slice(0, 1).map((material, idx) => (
                  <Button 
                    key={idx} 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center justify-between w-full gap-2"
                    onClick={(e) => handleDownloadMaterial(e, material)}
                  >
                    <span className="truncate">{material.name}</span>
                    <Download className="w-4 h-4 flex-shrink-0" />
                  </Button>
                ))}
              </div>
            </div>
          )}
          
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
              onClick={handleViewCourse}
              className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              View Course Details
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
            <Button
              onClick={handleViewCourse}
              className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              View Course Details
            </Button>
          )}
        </div>
      </motion.div>

      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setShowVideoModal(false)}>
          <div className="relative w-full max-w-4xl p-4" onClick={e => e.stopPropagation()}>
            <Button 
              variant="ghost" 
              onClick={() => setShowVideoModal(false)} 
              className="absolute top-0 right-0 text-white bg-black/50 rounded-full p-2 z-10"
            >
              X
            </Button>
            <div className="bg-black rounded-lg overflow-hidden">
              <iframe 
                src={course.demoVideo} 
                className="w-full aspect-video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
