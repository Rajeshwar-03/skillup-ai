import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MessageSquare, UserCheck, BookOpenCheck, Book, Video, Download, Play, X, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CourseReviewForm } from "@/components/reviews/CourseReviewForm";
import { CourseReviews } from "@/components/reviews/CourseReviews";
import { PaymentOptions } from "@/components/PaymentOptions";
import { Navigation } from "@/components/Navigation";
import { courseDetailsData } from "@/data/courseDetailsData";

interface CourseDetailsProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: number;
  modules: {
    title: string;
    lessons: {
      title: string;
      content: string;
      videoUrl?: string;
      materials?: {
        name: string;
        url: string;
        type: string;
      }[];
    }[];
  }[];
  price: number;
  enrollmentCount: number;
  thumbnailUrl: string;
  prerequisites: string[];
  tags: string[];
}

interface LiveSession {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  duration: number;
  instructor: string;
  thumbnailUrl: string;
  meetingUrl: string;
}

const createMockLiveSessions = (count: number, courseId: string): LiveSession[] => {
  const topics = {
    "full-stack": ["React Hooks Deep Dive", "Building Responsive Layouts", "State Management with Redux"],
    "ai-ml": ["Neural Networks Explained", "Computer Vision Applications", "Natural Language Processing"],
    "aws": ["EC2 Instance Management", "S3 Storage Solutions", "Lambda Functions"],
    "devops": ["CI/CD Pipeline Setup", "Docker Containerization", "Kubernetes Orchestration"],
    "blockchain": ["Smart Contract Development", "Web3 Integration", "DeFi Applications"],
    "ui-ux": ["Design System Creation", "User Research Methods", "Prototyping Techniques"],
    "data-science": ["Data Visualization", "Predictive Modeling", "Feature Engineering"],
    "cybersecurity": ["Network Security", "Ethical Hacking", "Security Auditing"],
    "mobile-dev": ["React Native Navigation", "Mobile UI Best Practices", "App Store Deployment"],
    "python": ["Python Data Structures", "Web Scraping with Python", "Testing in Python"],
    "digital-marketing": ["SEO Strategy", "Content Marketing", "Social Media Analytics"],
    "iot": ["Sensor Integration", "IoT Protocols", "Edge Computing"],
    "game-dev": ["Unity Physics", "3D Asset Creation", "Game AI Systems"],
    "cloud-native": ["Microservices Architecture", "Service Mesh Implementation", "Cloud-Native Security"],
    "data-engineering": ["Data Pipeline Design", "ETL Processes", "Big Data Technologies"]
  };

  const defaultTopics = ["Workshop Session", "Q&A Session", "Expert Interview"];
  
  const courseTitleList = topics[courseId as keyof typeof topics] || defaultTopics;
  
  return Array.from({ length: count }, (_, i) => ({
    id: `session-${courseId}-${i + 1}`,
    title: courseTitleList[i % courseTitleList.length] || `Live Session ${i + 1}`,
    description: `Interactive session for ${courseId} course students with live Q&A and hands-on exercises.`,
    dateTime: new Date(Date.now() + (i + 1) * 3 * 24 * 60 * 60 * 1000).toISOString(),
    duration: 60, // minutes
    instructor: courseDetailsData[courseId]?.instructor || "Expert Instructor",
    thumbnailUrl: `/placeholder.svg`,
    meetingUrl: `https://meet.example.com/session-${courseId}-${i + 1}`
  }));
};

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseDetailsProps | null>(null);
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessGranted, setAccessGranted] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        if (courseId && courseDetailsData[courseId]) {
          setCourse(courseDetailsData[courseId]);
          
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            const { data: enrollment } = await supabase
              .from('course_enrollments')
              .select('status')
              .eq('user_id', user.id)
              .eq('course_id', courseId)
              .maybeSingle();
              
            if (enrollment) {
              setAccessGranted(true);
            }
          }
        } else {
          toast.error("Course not found");
          navigate("/");
        }

        if (courseId) {
          const mockSessions = createMockLiveSessions(3, courseId);
          setLiveSessions(mockSessions);
        }
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        toast.error("Failed to load course details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId, navigate]);

  const handlePaymentComplete = (courseId: string) => {
    setAccessGranted(true);
    toast.success("You now have full access to the course!");
    navigate(`/course/${courseId}`);
  };

  const handleSubmitReview = async (review: {name: string, rating: number, comment: string}) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to submit a review");
        return;
      }
      
      console.log("New review submitted:", review);
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const handlePlayVideo = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
  };

  const closeVideoPlayer = () => {
    setCurrentVideo(null);
  };

  const handleBackToList = () => {
    navigate("/");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }

  if (!course) {
    return <div className="min-h-screen flex items-center justify-center">
      <Card>
        <CardContent>
          Course not found.
        </CardContent>
      </Card>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3]">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-6">
          <Button 
            onClick={handleBackToList} 
            variant="ghost" 
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to courses
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="rounded-md mb-4 w-full h-48 object-cover"
                />
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span>{course.enrollmentCount} students enrolled</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span>Duration: {course.duration} hours</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Instructor</h4>
                  <p>{course.instructor}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Prerequisites</h4>
                <ul className="list-disc list-inside mb-4">
                  {course.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
                <h4 className="font-semibold mb-2">Tags</h4>
                <div className="flex gap-2">
                  {course.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-sm">{tag}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {currentVideo && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
            <div className="relative w-full max-w-4xl p-4">
              <Button 
                variant="ghost" 
                onClick={closeVideoPlayer} 
                className="absolute top-0 right-0 text-white bg-black/50 rounded-full p-2 z-10"
              >
                <X className="h-5 w-5" />
              </Button>
              <div className="bg-black rounded-lg overflow-hidden">
                <video 
                  src={currentVideo} 
                  controls 
                  autoPlay 
                  className="w-full max-h-[80vh]"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>Explore the modules and lessons in this course</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {course.modules.map((module, index) => (
                  <AccordionItem key={index} value={`module-${index}`}>
                    <AccordionTrigger>{module.title}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-none pl-4 mt-2 space-y-4">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-start gap-2 mb-2">
                              {lesson.videoUrl ? <Video className="h-4 w-4 mt-1 text-blue-500" /> : <Book className="h-4 w-4 mt-1 text-gray-500" />}
                              <span className="font-medium">{lesson.title}</span>
                            </div>
                            <p className="text-sm text-muted-foreground ml-6 mb-3">{lesson.content}</p>
                            
                            {lesson.videoUrl && (
                              <div className="flex ml-6 mb-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="flex items-center gap-1"
                                  onClick={() => handlePlayVideo(lesson.videoUrl!)}
                                >
                                  <Play className="h-3 w-3" /> Watch Video
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="flex items-center gap-1 ml-2"
                                  onClick={() => {
                                    window.open(lesson.videoUrl, '_blank');
                                    toast.success(`Downloading ${lesson.title} video`);
                                  }}
                                >
                                  <Download className="h-3 w-3" /> Download Video
                                </Button>
                              </div>
                            )}
                            
                            {lesson.materials && lesson.materials.length > 0 && (
                              <div className="ml-6 mt-2">
                                <p className="text-xs font-semibold text-muted-foreground mb-1">MATERIALS:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {lesson.materials.map((material, matIndex) => (
                                    <a 
                                      key={matIndex}
                                      href={material.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors bg-background/50 px-3 py-2 rounded-md"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        window.open(material.url, '_blank');
                                        toast.success(`Downloading ${material.name}`);
                                      }}
                                    >
                                      <Download className="h-3 w-3" />
                                      <span className="flex-1 truncate">{material.name}</span>
                                      <span className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{material.type}</span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle>Live Sessions</CardTitle>
              <CardDescription>Join our live sessions for interactive learning</CardDescription>
            </CardHeader>
            <CardContent>
              {liveSessions.length > 0 ? (
                <ul className="list-none pl-4 mt-2">
                  {liveSessions.map((session) => (
                    <li key={session.id} className="mb-4 p-4 rounded-md bg-gray-100 dark:bg-gray-700">
                      <div className="flex items-center gap-4">
                        <img src={session.thumbnailUrl} alt={session.title} className="w-20 h-12 object-cover rounded-md" />
                        <div>
                          <h5 className="font-semibold">{session.title}</h5>
                          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{new Date(session.dateTime).toLocaleDateString()}</span>
                            <Clock className="h-4 w-4 ml-3 mr-1" />
                            <span>{new Date(session.dateTime).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm">{session.description}</p>
                      <Button variant="secondary" className="mt-3">
                        Join Session
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No live sessions scheduled yet.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>See what other students are saying</CardDescription>
            </CardHeader>
            <CardContent>
              <CourseReviewForm courseId={courseId || 'default-course-id'} onSubmitReview={handleSubmitReview} />
              <CourseReviews courseId={courseId || 'default-course-id'} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {course.price === 0 ? (
            <Card className="glass">
              <CardContent className="flex justify-center p-6">
                <Button 
                  size="lg" 
                  className="w-full max-w-md text-lg"
                  onClick={() => handlePaymentComplete(course.id)}
                >
                  Enroll for Free
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass">
              <CardContent className="flex justify-center">
                <PaymentOptions 
                  courseTitle={course.title}
                  price={course.price}
                  courseId={course.id}
                  onPaymentComplete={handlePaymentComplete}
                  showAccessButton={accessGranted}
                />
              </CardContent>
            </Card>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default CourseDetails;
