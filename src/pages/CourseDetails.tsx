
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { courseDetailsData } from "@/data/courseDetailsData";
import { CheckCircle, CalendarDays, Clock, ArrowLeft, FileText, Video, Download } from "lucide-react";
import { CourseMaterials } from "@/components/courses/CourseMaterials";
import { LiveSessions } from "@/components/courses/LiveSessions";
import { CourseReviews } from "@/components/reviews/CourseReviews";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { useEnrollment } from "@/hooks/useEnrollment";
import { toast } from "sonner";
import { courses } from "@/data/coursesData";
import { CourseReviewForm } from "@/components/reviews/CourseReviewForm";

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { enrollmentStatus, isLoading: isEnrollmentLoading, completeEnrollment } = useEnrollment(
    courseId ? [{ path: courseId }] : []
  );
  
  // Find the course data
  const courseData = Object.values(courseDetailsData).find(course => course.id === courseId);
  // Find additional course data from coursesData
  const additionalCourseData = courses.find(course => course.path === courseId);

  const isEnrolled = courseId ? enrollmentStatus[courseId] : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [courseId]);

  if (!courseData) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
            <p className="mb-8">The course you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePaymentComplete = (method: string) => {
    setIsPaymentModalOpen(false);
    toast.success("Payment successful! You are now enrolled in the course.");
    if (courseId) {
      completeEnrollment(courseId);
    }
  };

  const handleSubmitReview = async (review: {name: string, rating: number, comment: string}) => {
    // This function would handle submitting a review to the backend
    toast.success("Review submitted successfully!");
  };

  const goBack = () => {
    navigate('/');
  };

  // Default values for missing properties
  const outcomes = additionalCourseData?.outcomes || ["Learn key concepts", "Build practical projects", "Master essential skills"];
  const videoHours = additionalCourseData?.videoHours || courseData.duration || 0;
  const articles = additionalCourseData?.articles || 5;
  const resources = additionalCourseData?.resources || 3;
  const originalPrice = additionalCourseData?.originalPrice || (courseData.price > 0 ? courseData.price + 30 : 0);
  const updatedAt = additionalCourseData?.updatedAt || "Recently";
  const prerequisites = courseData.prerequisites || ["Basic understanding of the subject", "Computer with internet access"];
  
  // Get demo video and materials for CourseMaterials component
  const demoVideo = additionalCourseData?.demoVideo || "https://www.youtube.com/embed/dQw4w9WgXcQ";
  const materials = additionalCourseData?.materials || [];
  
  // Define the course level from additionalCourseData
  const courseLevel = additionalCourseData?.level || "Beginner";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6 flex items-center gap-1 hover:bg-transparent hover:text-primary" 
          onClick={goBack}
        >
          <ArrowLeft className="h-4 w-4" /> Back to courses
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Details Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              {courseLevel && (
                <Badge variant="outline" className="mb-2">
                  {courseLevel}
                </Badge>
              )}
              <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
              <p className="text-muted-foreground mb-4">{courseData.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" alt={courseData.instructor} />
                    <AvatarFallback>{courseData.instructor.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{courseData.instructor}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{courseData.duration} hours</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>Updated {updatedAt}</span>
                </div>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="live-sessions">Live Sessions</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">What you'll learn</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Course content</h2>
                  <div className="space-y-4">
                    {courseData.modules.map((module, index) => (
                      <Card key={index} className="backdrop-blur-sm bg-white/70 hover:bg-white/90 transition-all">
                        <CardHeader className="py-3">
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                          <CardDescription>{module.lessons.length} lessons</CardDescription>
                        </CardHeader>
                        <CardContent className="py-0">
                          <ul className="divide-y">
                            {module.lessons.slice(0, 2).map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="py-2 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  {lesson.videoUrl ? (
                                    <Video className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                  )}
                                  <span>{lesson.title}</span>
                                </div>
                                {isEnrolled ? (
                                  <Button variant="ghost" size="sm">View</Button>
                                ) : (
                                  <Badge variant="outline">Preview</Badge>
                                )}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                        {module.lessons.length > 2 && (
                          <CardFooter className="pt-0">
                            <Button variant="link" className="h-8 p-0">
                              +{module.lessons.length - 2} more lessons
                            </Button>
                          </CardFooter>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="materials">
                <CourseMaterials materials={materials} demoVideo={demoVideo} />
              </TabsContent>
              
              <TabsContent value="live-sessions">
                <LiveSessions courseId={courseId || ""} />
              </TabsContent>
              
              <TabsContent value="reviews">
                <div className="space-y-8">
                  {isEnrolled && (
                    <CourseReviewForm 
                      courseId={courseId || ""}
                      onSubmitReview={handleSubmitReview}
                    />
                  )}
                  <CourseReviews courseId={courseId || ""} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Enrollment Card Section */}
          <div>
            <Card className="sticky top-20 backdrop-blur-sm bg-white/80 border border-orange-100 shadow-lg">
              <CardHeader>
                <CardTitle>
                  {courseData.price === 0 ? (
                    "Free"
                  ) : (
                    <>
                      ${courseData.price}
                      {originalPrice && (
                        <span className="text-muted-foreground line-through ml-2 text-base">
                          ${originalPrice}
                        </span>
                      )}
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEnrollmentLoading ? (
                  <Button disabled className="w-full">Loading...</Button>
                ) : isEnrolled ? (
                  <Button variant="default" className="w-full">Continue Learning</Button>
                ) : (
                  <Button 
                    onClick={() => setIsPaymentModalOpen(true)} 
                    className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
                  >
                    {courseData.price === 0 ? "Enroll Now" : "Buy Now"}
                  </Button>
                )}
                
                <div className="text-sm space-y-3">
                  <div className="font-medium">This course includes:</div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <span>{videoHours} hours on-demand video</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{articles} articles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span>{resources} downloadable resources</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>Full lifetime access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-4">
                <Button variant="link" className="text-center w-full">
                  30-Day Money-Back Guarantee
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Payment Modal */}
      <PaymentModal 
        open={isPaymentModalOpen} 
        onOpenChange={setIsPaymentModalOpen} 
        onPaymentComplete={handlePaymentComplete} 
        courseTitle={courseData.title} 
        courseId={courseId} 
        price={courseData.price} 
        isLoading={false}
      />
    </div>
  );
};

export default CourseDetails;
