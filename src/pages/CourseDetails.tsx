import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MessageSquare, UserCheck, BookOpenCheck, Book, Video } from "lucide-react";
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

const mockCourseDetails: CourseDetailsProps = {
  id: "course-1",
  title: "Full Stack Web Development with React",
  description: "Learn to build modern web applications using React, Node.js, and MongoDB.",
  instructor: "John Doe",
  duration: 60,
  modules: [
    {
      title: "Introduction to React",
      lessons: [
        {
          title: "Setting up your environment",
          content: "Learn how to set up your development environment for React.",
        },
        {
          title: "Components and JSX",
          content: "Understand the basics of React components and JSX syntax.",
        },
      ],
    },
    {
      title: "Building a React App",
      lessons: [
        {
          title: "Creating a basic UI",
          content: "Build a simple user interface using React components.",
        },
        {
          title: "Handling user input",
          content: "Learn how to handle user input and update the UI.",
        },
      ],
    },
  ],
  price: 49.99,
  enrollmentCount: 120,
  thumbnailUrl: "/placeholder.svg",
  prerequisites: ["Basic HTML", "CSS", "JavaScript"],
  tags: ["React", "JavaScript", "Web Development"],
};

const createMockLiveSessions = (count: number): LiveSession[] => {
  const sessions: LiveSession[] = Array.from({ length: count }, (_, i) => ({
    id: `session-${i + 1}`,
    title: `Live Session ${i + 1}`,
    description: `Description for live session ${i + 1}`,
    dateTime: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString(),
    duration: 60, // minutes
    instructor: `Instructor ${i + 1}`,
    thumbnailUrl: `/placeholder.svg`,
    meetingUrl: `https://meet.example.com/session-${i + 1}`
  }));
  
  return sessions;
};

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CourseDetailsProps | null>(null);
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    // Fetch course details and live sessions based on courseId
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        // Mock implementation: Replace with actual data fetching from Supabase
        // Simulate fetching course details
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
        setCourse(mockCourseDetails);

        // Simulate fetching live sessions
        const mockSessions = createMockLiveSessions(3);
        setLiveSessions(mockSessions);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        toast.error("Failed to load course details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handlePaymentComplete = (courseId: string) => {
    // After successful payment, navigate to the course access page
    setAccessGranted(true);
    toast.success("You now have full access to the course!");
    navigate(`/course/${courseId}`); // Navigate to the same course details page
  };

  const handleSubmitReview = (review: {name: string, rating: number, comment: string}) => {
    // Handle the submission of a new review
    console.log("New review submitted:", review);
    toast.success("Review submitted successfully!");
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

      <main className="container mx-auto px-4 pt-24">
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
                      <ul className="list-none pl-4 mt-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="mb-2">
                            <div className="flex items-center gap-2">
                              {lesson.videoUrl ? <Video className="h-4 w-4 text-blue-500" /> : <Book className="h-4 w-4 text-gray-500" />}
                              <span>{lesson.title}</span>
                            </div>
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
        </motion.div>
      </main>
    </div>
  );
};

export default CourseDetails;
