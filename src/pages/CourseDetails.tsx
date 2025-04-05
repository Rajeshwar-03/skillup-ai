
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useEnrollment } from "@/hooks/useEnrollment";
import { courses } from "@/data/coursesData";
import { courseDetails } from "@/data/courseDetailsData";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { CourseReviews } from "@/components/reviews/CourseReviews";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { CourseMaterials } from "@/components/courses/CourseMaterials";
import { LiveSessions } from "@/components/courses/LiveSessions";

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

  // Find course information
  const course = courses.find((c) => c.path === courseId);
  const detail = courseDetails.find((c) => c.courseId === courseId);

  const { enrollmentStatus, isLoading, handleEnroll, completeEnrollment } = useEnrollment(courses);

  useEffect(() => {
    // Check if the user has access when the component mounts
    if (courseId && enrollmentStatus[courseId]?.enrolled) {
      setAccessGranted(true);
    }
  }, [courseId, enrollmentStatus]);

  const handleEnrollClick = () => {
    if (!course) return;
    
    if (course.price === 0) {
      handleEnroll(course.path);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentComplete = (success: boolean) => {
    setShowPaymentModal(false);
    if (success && course) {
      completeEnrollment(course.path);
      setAccessGranted(true);
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  if (!course || !detail) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={handleBackClick} 
            className="mb-6 hover:bg-transparent"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
          <div className="space-y-6">
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={handleBackClick} 
          className="mb-6 hover:bg-transparent"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="bg-muted rounded-lg px-4 py-2">
              <span className="text-sm font-medium">Level:</span> {course.level}
            </div>
            <div className="bg-muted rounded-lg px-4 py-2">
              <span className="text-sm font-medium">Duration:</span> {course.duration}
            </div>
            <div className="bg-muted rounded-lg px-4 py-2">
              <span className="text-sm font-medium">Students:</span> {course.students.toLocaleString()}
            </div>
            <div className="bg-muted rounded-lg px-4 py-2">
              <span className="text-sm font-medium">Rating:</span> {course.rating}/5
            </div>
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-xl border">
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={detail.demoVideoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
              title={`${course.title} Demo Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium">Course Demo</h3>
                <p className="text-sm text-muted-foreground">
                  Watch this preview to learn more about the course content
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(detail.demoVideoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")}
                  className="flex items-center gap-2"
                >
                  <Play className="h-4 w-4" />
                  Open in YouTube
                </Button>
              </div>
            </div>
          </div>
        </div>

        {enrollmentStatus[course.path]?.enrolled || accessGranted ? (
          <div className="space-y-8">
            <div className="p-6 bg-primary/10 rounded-xl">
              <h2 className="text-2xl font-bold mb-2">You have full access to this course!</h2>
              <p className="mb-4">Start learning now and unlock your potential.</p>
              <Button size="lg">
                Start Learning
              </Button>
            </div>
            
            {/* Course Materials Section */}
            <CourseMaterials courseId={course.path} />
            
            {/* Live Sessions Section */}
            <LiveSessions courseId={course.path} />

          </div>
        ) : (
          <div className="space-y-8">
            <div className="p-6 bg-card rounded-xl border">
              <h2 className="text-2xl font-bold mb-2">{course.price === 0 ? 'Enroll for Free' : `Enroll for $${course.price}`}</h2>
              <p className="mb-6 text-muted-foreground">
                Gain access to all course materials, assignments, and receive a certificate upon completion.
              </p>
              
              <div className="mb-6">
                <h3 className="font-bold mb-2">What you'll learn:</h3>
                <ul className="space-y-2">
                  {detail.learningOutcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                size="lg" 
                className="w-full" 
                onClick={handleEnrollClick}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : course.price === 0 ? 'Enroll Now (Free)' : `Enroll Now ($${course.price})`}
              </Button>
            </div>
            
            {/* Course Preview Materials */}
            <div className="border rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4">Sample Course Materials</h2>
              <p className="text-muted-foreground mb-6">
                Preview some of the course materials before enrolling
              </p>
              
              <div className="space-y-4">
                {detail.previewMaterials?.map((material, index) => (
                  <div key={index} className="border rounded-lg p-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{material.title}</h3>
                      <p className="text-sm text-muted-foreground">{material.description}</p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Course Reviews Section */}
        <div className="mt-12 border-t pt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Student Reviews</h2>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{course.rating}</div>
              <div className="text-muted-foreground">/ 5</div>
            </div>
          </div>
          
          <CourseReviews courseId={course.path} />
          
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-bold mb-4">Share Your Experience</h3>
            <ReviewForm courseId={course.path} courseName={course.title} />
          </div>
        </div>
      </div>
      
      <PaymentModal 
        isOpen={showPaymentModal} 
        onClose={() => setShowPaymentModal(false)}
        onPaymentComplete={handlePaymentComplete}
        courseTitle={course.title}
        courseId={course.path}
        price={course.price}
      />
    </div>
  );
};

export default CourseDetails;
