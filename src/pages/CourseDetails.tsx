
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ClockIcon, BookOpen, Users, Star, ArrowLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { PaymentOptions } from "@/components/PaymentOptions";
import { useEnrollment } from "@/hooks/useEnrollment";
import { CourseReviews } from "@/components/reviews/CourseReviews";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { CourseMaterials } from "@/components/courses/CourseMaterials";
import { toast } from "sonner";
import { courses } from "@/data/coursesData";

const CourseDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [refreshReviews, setRefreshReviews] = useState(0);

  // Find the course by ID
  const course = courses.find(c => c.path === courseId);

  // Use the enrollment hook
  const { handleEnroll, completeEnrollment } = useEnrollment(courses);

  useEffect(() => {
    // Check if URL has query param for enrollment
    const searchParams = new URLSearchParams(location.search);
    const shouldEnroll = searchParams.get('enroll') === 'true';
    
    if (shouldEnroll && course) {
      handleEnroll(course);
      
      // Clean up the URL
      navigate(`/course/${courseId}`, { replace: true });
    }
  }, [location, courseId, navigate, course, handleEnroll]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  const handleWatchDemo = () => {
    window.open(course.demoVideo, '_blank');
    toast.success("Loading demo video...");
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    setRefreshReviews(prev => prev + 1);
    toast.success("Thank you for your review!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3]">
      <Navigation />
      
      <Button 
        onClick={() => navigate(-1)} 
        variant="ghost" 
        className="fixed top-24 left-4 z-50"
      >
        <ArrowLeft className="mr-2" />
        Back
      </Button>

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {course.level}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-primary" />
                    <span>40 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span>12 modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <PaymentOptions 
                    courseTitle={course.title}
                    price={course.price}
                    courseId={course.path}
                    onPaymentComplete={completeEnrollment}
                    showAccessButton={true}
                  />
                  <Button variant="outline" onClick={handleWatchDemo}>
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Course Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="glass">
              <CardContent className="p-6">
                <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="materials">Materials</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">About this course</h3>
                      <p className="text-muted-foreground">
                        This comprehensive {course.title} course is designed to take you from beginner to professional. 
                        You'll learn all the essential concepts, tools, and best practices needed to excel in this field.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          "Fundamentals and core concepts",
                          "Industry best practices",
                          "Real-world project implementation",
                          "Advanced techniques and optimization",
                          "Problem-solving strategies",
                          "Team collaboration workflow"
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {[
                          "Basic understanding of computers and technology",
                          "Desire to learn and practice regularly",
                          "Computer with internet connection"
                        ].map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="materials">
                    <CourseMaterials 
                      materials={course.materials || []}
                      demoVideo={course.demoVideo}
                    />
                  </TabsContent>

                  <TabsContent value="reviews">
                    <div className="space-y-8">
                      {!showReviewForm && (
                        <div className="flex justify-end">
                          <Button onClick={() => setShowReviewForm(true)}>
                            Write a Review
                          </Button>
                        </div>
                      )}
                      
                      {showReviewForm && (
                        <ReviewForm 
                          courseId={course.path} 
                          onReviewSubmitted={handleReviewSubmitted} 
                        />
                      )}
                      
                      <CourseReviews key={refreshReviews} courseId={course.path} />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="glass overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Course Modules</h3>
                  <div className="space-y-4">
                    {[
                      "Introduction to the Course",
                      "Core Concepts and Foundations",
                      "Building Your First Project",
                      "Advanced Techniques",
                      "Working with Teams",
                      "Deployment and Publishing",
                    ].map((module, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                          {i + 1}
                        </div>
                        <span>{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t p-6">
                  <PaymentOptions 
                    courseTitle={course.title}
                    price={course.price}
                    courseId={course.path}
                    onPaymentComplete={completeEnrollment}
                    showAccessButton={true}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
