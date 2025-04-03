import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Clock, Trophy, Users, Star, PlayCircle, MessageSquare, Download, Calendar, CheckCircle, Video, FileText, ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PaymentOptions } from "@/components/PaymentOptions";
import { checkCourseEnrollment } from "@/services/chatService";
import { CourseReviewForm } from "@/components/reviews/CourseReviewForm";

interface LiveSession {
  topic: string;
  day: string;
  time: string;
}

type CourseType = {
  title: string;
  description: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  instructor: string;
  price: number;
  demoVideo: string;
  features: string[];
  materials: Array<{
    title: string;
    type: "video" | "document";
    duration?: string;
    size?: string;
  }>;
  reviews: Array<{
    name: string;
    rating: number;
    comment: string;
  }>;
  liveSessionSchedule: LiveSession[];
};

const courseData: Record<string, CourseType> = {
  "full-stack": {
    title: "Full Stack Development",
    description: "Master MERN stack and modern web development practices with hands-on projects and real-world applications. Learn from industry experts and build a professional portfolio.",
    duration: "6 months",
    lessons: 120,
    students: 2500,
    rating: 4.8,
    instructor: "Dr. Sarah Johnson",
    price: 3,
    demoVideo: "https://www.youtube.com/embed/bMknfKXIFA8",
    features: [
      "Comprehensive MERN Stack Coverage",
      "Real-world Project Development",
      "Industry Best Practices",
      "Portfolio Building",
    ],
    materials: [
      { title: "Introduction to Web Development", type: "video", duration: "45 min" },
      { title: "React Fundamentals Guide", type: "document", size: "2.5 MB" },
    ],
    reviews: [
      { name: "John Doe", rating: 5, comment: "Excellent course structure!" },
      { name: "Jane Smith", rating: 4, comment: "Very practical approach" },
    ],
    liveSessionSchedule: [
      { topic: "Advanced React Patterns", day: "Monday", time: "10:00 AM" },
      { topic: "Node.js Best Practices", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "ai-ml": {
    title: "AI & Machine Learning",
    description: "Deep dive into artificial intelligence and machine learning concepts. Learn Python, TensorFlow, and PyTorch while building real AI applications.",
    duration: "8 months",
    lessons: 150,
    students: 1800,
    rating: 4.9,
    instructor: "Dr. Michael Chen",
    price: 6,
    demoVideo: "https://www.youtube.com/embed/i_LwzRVP7bg",
    features: [
      "Deep Learning Fundamentals",
      "Neural Network Architecture",
      "Computer Vision Applications",
      "Natural Language Processing",
    ],
    materials: [
      { title: "Introduction to AI", type: "video", duration: "60 min" },
      { title: "Machine Learning Basics", type: "document", size: "3.2 MB" },
    ],
    reviews: [
      { name: "Alex Johnson", rating: 5, comment: "Comprehensive AI coverage!" },
      { name: "Sarah Lee", rating: 5, comment: "Excellent practical examples" },
    ],
    liveSessionSchedule: [
      { topic: "Neural Networks Deep Dive", day: "Tuesday", time: "11:00 AM" },
      { topic: "Advanced ML Algorithms", day: "Thursday", time: "3:00 PM" },
    ],
  },
  "aws": {
    title: "Cloud Computing (AWS)",
    description: "Master AWS services and cloud architecture through hands-on projects. Learn EC2, S3, Lambda, and other essential AWS services while building scalable cloud solutions.",
    duration: "5 months",
    lessons: 90,
    students: 2100,
    rating: 4.7,
    instructor: "Dr. Mark Anderson",
    price: 3,
    demoVideo: "https://www.youtube.com/embed/k1RI5locZE4",
    features: [
      "AWS Core Services Deep Dive",
      "Cloud Architecture Design",
      "Security Best Practices",
      "Cost Optimization Strategies",
    ],
    materials: [
      { title: "Introduction to AWS", type: "video", duration: "45 min" },
      { title: "Cloud Architecture Guide", type: "document", size: "2.8 MB" },
    ],
    reviews: [
      { name: "Michael Chen", rating: 5, comment: "Excellent AWS coverage!" },
      { name: "Sarah Wilson", rating: 4, comment: "Very practical approach" },
    ],
    liveSessionSchedule: [
      { topic: "AWS Services Overview", day: "Monday", time: "10:00 AM" },
      { topic: "Cloud Security Workshop", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "devops": {
    title: "DevOps & CI/CD",
    description: "Master modern DevOps practices and tools to streamline your development process.",
    duration: "4 months",
    lessons: 80,
    students: 1500,
    rating: 4.8,
    instructor: "Dr. Alex Smith",
    price: 6,
    demoVideo: "https://www.youtube.com/embed/j5Zsa_eOXeY",
    features: [
      "CI/CD Pipeline Setup",
      "Containerization with Docker",
      "Infrastructure as Code",
      "Monitoring and Logging",
    ],
    materials: [
      { title: "Introduction to DevOps", type: "video", duration: "30 min" },
      { title: "CI/CD Best Practices", type: "document", size: "1.5 MB" },
    ],
    reviews: [
      { name: "Chris Green", rating: 5, comment: "Very practical and hands-on!" },
      { name: "Anna Taylor", rating: 4, comment: "Good insights into DevOps" },
    ],
    liveSessionSchedule: [
      { topic: "Docker Fundamentals", day: "Monday", time: "10:00 AM" },
      { topic: "Kubernetes Basics", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "blockchain": {
    title: "Blockchain Development",
    description: "Build decentralized apps and smart contracts while learning blockchain technology.",
    duration: "6 months",
    lessons: 90,
    students: 1200,
    rating: 4.6,
    instructor: "Dr. Lisa White",
    price: 6,
    demoVideo: "https://www.youtube.com/embed/gyMwXuJrbJQ",
    features: [
      "Blockchain Fundamentals",
      "Smart Contract Development",
      "Decentralized Applications",
      "Real-world Use Cases",
    ],
    materials: [
      { title: "Blockchain Basics", type: "video", duration: "40 min" },
      { title: "Smart Contracts Guide", type: "document", size: "2.8 MB" },
    ],
    reviews: [
      { name: "David Black", rating: 5, comment: "Excellent course!" },
      { name: "Sophia Blue", rating: 4, comment: "Very informative" },
    ],
    liveSessionSchedule: [
      { topic: "Ethereum Development", day: "Tuesday", time: "11:00 AM" },
      { topic: "Blockchain Security", day: "Thursday", time: "3:00 PM" },
    ],
  },
  "ui-ux": {
    title: "UI/UX Design",
    description: "Create stunning user interfaces and experiences through design principles and tools.",
    duration: "3 months",
    lessons: 60,
    students: 3000,
    rating: 4.9,
    instructor: "Dr. John Brown",
    price: 0,
    demoVideo: "https://www.youtube.com/embed/c9Wg6Cb_YlU",
    features: [
      "User Research Techniques",
      "Wireframing and Prototyping",
      "Visual Design Principles",
      "Usability Testing",
    ],
    materials: [
      { title: "UI/UX Basics", type: "video", duration: "35 min" },
      { title: "Design Tools Overview", type: "document", size: "1.2 MB" },
    ],
    reviews: [
      { name: "Emma Wilson", rating: 5, comment: "Great insights into design!" },
      { name: "Liam Johnson", rating: 4, comment: "Very practical" },
    ],
    liveSessionSchedule: [
      { topic: "Design Thinking Workshop", day: "Monday", time: "10:00 AM" },
      { topic: "Prototyping with Figma", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "data-science": {
    title: "Data Science",
    description: "Master data analysis and visualization techniques using Python and R.",
    duration: "5 months",
    lessons: 110,
    students: 2200,
    rating: 4.8,
    instructor: "Dr. Sarah Lee",
    price: 3,
    demoVideo: "https://www.youtube.com/embed/ua-CiDNNj30",
    features: [
      "Data Analysis with Python",
      "Data Visualization Techniques",
      "Machine Learning Basics",
      "Real-world Projects",
    ],
    materials: [
      { title: "Data Science Basics", type: "video", duration: "50 min" },
      { title: "Data Visualization Guide", type: "document", size: "2.0 MB" },
    ],
    reviews: [
      { name: "Oliver Brown", rating: 5, comment: "Very comprehensive!" },
      { name: "Ava Davis", rating: 4, comment: "Good practical examples" },
    ],
    liveSessionSchedule: [
      { topic: "Data Analysis with Pandas", day: "Tuesday", time: "11:00 AM" },
      { topic: "Machine Learning with Scikit-learn", day: "Thursday", time: "3:00 PM" },
    ],
  },
  "cybersecurity": {
    title: "Cybersecurity",
    description: "Learn ethical hacking and security practices to protect systems and networks.",
    duration: "4 months",
    lessons: 70,
    students: 1600,
    rating: 4.7,
    instructor: "Dr. Kevin Green",
    price: 6,
    demoVideo: "https://www.youtube.com/embed/BsxdJTKRqNk",
    features: [
      "Network Security Fundamentals",
      "Ethical Hacking Techniques",
      "Incident Response",
      "Real-world Case Studies",
    ],
    materials: [
      { title: "Cybersecurity Basics", type: "video", duration: "45 min" },
      { title: "Ethical Hacking Guide", type: "document", size: "2.5 MB" },
    ],
    reviews: [
      { name: "Mia White", rating: 5, comment: "Very informative!" },
      { name: "James Black", rating: 4, comment: "Good insights" },
    ],
    liveSessionSchedule: [
      { topic: "Network Security Best Practices", day: "Monday", time: "10:00 AM" },
      { name: "Ethical Hacking Workshop", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "mobile-dev": {
    title: "Mobile App Development",
    description: "Build iOS and Android apps with React Native and modern development practices.",
    duration: "6 months",
    lessons: 100,
    students: 2800,
    rating: 4.8,
    instructor: "Dr. Rachel Adams",
    price: 3,
    demoVideo: "https://www.youtube.com/embed/0-S5a0eXPoc",
    features: [
      "React Native Fundamentals",
      "Mobile UI Design",
      "APIs and Backend Integration",
      "Real-world Projects",
    ],
    materials: [
      { title: "Mobile Development Basics", type: "video", duration: "50 min" },
      { title: "React Native Guide", type: "document", size: "2.0 MB" },
    ],
    reviews: [
      { name: "Lucas Green", rating: 5, comment: "Excellent course!" },
      { name: "Sophia Taylor", rating: 4, comment: "Very practical" },
    ],
    liveSessionSchedule: [
      { topic: "Building Your First App", day: "Tuesday", time: "11:00 AM" },
      { topic: "Advanced React Native Techniques", day: "Thursday", time: "3:00 PM" },
    ],
  },
  "python": {
    title: "Python Programming",
    description: "Master Python for automation and development through hands-on projects.",
    duration: "3 months",
    lessons: 50,
    students: 3500,
    rating: 4.9,
    instructor: "Dr. Mark Wilson",
    price: 0,
    demoVideo: "https://www.youtube.com/embed/rfscVS0vtbw",
    features: [
      "Python Basics",
      "Data Structures and Algorithms",
      "Web Development with Flask",
      "Real-world Projects",
    ],
    materials: [
      { title: "Python Basics", type: "video", duration: "30 min" },
      { title: "Flask Web Development Guide", type: "document", size: "1.5 MB" },
    ],
    reviews: [
      { name: "Ella Johnson", rating: 5, comment: "Great course!" },
      { name: "Liam Brown", rating: 4, comment: "Very informative" },
    ],
    liveSessionSchedule: [
      { topic: "Python for Data Analysis", day: "Monday", time: "10:00 AM" },
      { topic: "Web Development with Flask", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description: "Learn SEO, SEM, and social media marketing strategies to grow your business.",
    duration: "4 months",
    lessons: 80,
    students: 2600,
    rating: 4.7,
    instructor: "Dr. Anna Taylor",
    price: 0,
    demoVideo: "https://www.youtube.com/embed/uqJR-U1fTn8",
    features: [
      "SEO Fundamentals",
      "Social Media Strategies",
      "Content Marketing",
      "Real-world Case Studies",
    ],
    materials: [
      { title: "Digital Marketing Basics", type: "video", duration: "40 min" },
      { title: "SEO Guide", type: "document", size: "2.0 MB" },
    ],
    reviews: [
      { name: "Oliver White", rating: 5, comment: "Very practical!" },
      { name: "Ava Green", rating: 4, comment: "Good insights" },
    ],
    liveSessionSchedule: [
      { topic: "SEO Best Practices", day: "Tuesday", time: "11:00 AM" },
      { topic: "Social Media Marketing Strategies", day: "Thursday", time: "3:00 PM" },
    ],
  },
  "iot": {
    title: "IoT Development",
    description: "Build smart devices and IoT solutions using modern technologies.",
    duration: "5 months",
    lessons: 90,
    students: 1100,
    rating: 4.6,
    instructor: "Dr. Chris Martinez",
    price: 6,
    demoVideo: "https://www.youtube.com/embed/h0gWfVCSGQQ",
    features: [
      "IoT Fundamentals",
      "Device Communication Protocols",
      "Cloud Integration",
      "Real-world Projects",
    ],
    materials: [
      { title: "IoT Basics", type: "video", duration: "50 min" },
      { title: "Cloud Integration Guide", type: "document", size: "2.5 MB" },
    ],
    reviews: [
      { name: "Mason Brown", rating: 5, comment: "Excellent course!" },
      { name: "Isabella Davis", rating: 4, comment: "Very informative" },
    ],
    liveSessionSchedule: [
      { topic: "Building IoT Solutions", day: "Monday", time: "10:00 AM" },
      { topic: "IoT Security Best Practices", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "game-dev": {
    title: "Game Development",
    description: "Create games with Unity and C# while learning game design principles.",
    duration: "6 months",
    lessons: 120,
    students: 1900,
    rating: 4.8,
    instructor: "Dr. Jessica Thompson",
    price: 3,
    demoVideo: "https://www.youtube.com/embed/gB1F9G0JXOo",
    features: [
      "Game Design Principles",
      "Unity Fundamentals",
      "C# Programming",
      "Real-world Projects",
    ],
    materials: [
      { title: "Game Development Basics", type: "video", duration: "60 min" },
      { title: "Unity Guide", type: "document", size: "3.0 MB" },
    ],
    reviews: [
      { name: "Ethan Wilson", rating: 5, comment: "Great course!" },
      { name: "Mia Johnson", rating: 4, comment: "Very practical" },
    ],
    liveSessionSchedule: [
      { topic: "Creating Your First Game", day: "Tuesday", time: "11:00 AM" },
      { topic: "Advanced Unity Techniques", day: "Thursday", time: "3:00 PM" },
    ],
  },
  "cloud-native": {
    title: "Cloud Native Development",
    description: "Master Kubernetes and microservices for scalable applications.",
    duration: "5 months",
    lessons: 100,
    students: 1400,
    rating: 4.7,
    instructor: "Dr. Brian Harris",
    price: 6,
    demoVideo: "https://www.youtube.com/embed/d6WC5n9G_sM",
    features: [
      "Kubernetes Fundamentals",
      "Microservices Architecture",
      "Real-world Projects",
      "Cloud Deployment",
    ],
    materials: [
      { title: "Cloud Native Basics", type: "video", duration: "50 min" },
      { title: "Kubernetes Guide", type: "document", size: "2.5 MB" },
    ],
    reviews: [
      { name: "Aiden Brown", rating: 5, comment: "Excellent course!" },
      { name: "Charlotte Green", rating: 4, comment: "Very informative" },
    ],
    liveSessionSchedule: [
      { topic: "Kubernetes for Beginners", day: "Monday", time: "10:00 AM" },
      { name: "Microservices Best Practices", day: "Wednesday", time: "2:00 PM" },
    ],
  },
  "data-engineering": {
    title: "Data Engineering",
    description: "Build robust data pipelines and infrastructure for data-driven applications.",
    duration: "6 months",
    lessons: 110,
    students: 1300,
    rating: 4.8,
    instructor: "Dr. Emily Clark",
    price: 6,
    demoVideo: "https://www.youtube.com/embed/qWru-b6m030",
    features: [
      "Data Pipeline Fundamentals",
      "ETL Processes",
      "Data Warehousing",
      "Real-world Projects",
    ],
    materials: [
      { title: "Data Engineering Basics", type: "video", duration: "60 min" },
      { title: "ETL Guide", type: "document", size: "3.0 MB" },
    ],
    reviews: [
      { name: "James Wilson", rating: 5, comment: "Great course!" },
      { name: "Olivia Johnson", rating: 4, comment: "Very practical" },
    ],
    liveSessionSchedule: [
      { topic: "Building Data Pipelines", day: "Tuesday", time: "11:00 AM" },
      { topic: "Data Warehousing Best Practices", day: "Thursday", time: "3:00 PM" },
    ],
  }
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showDemoVideo, setShowDemoVideo] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const course = courseData[courseId as keyof typeof courseData];
  const shouldPromptEnroll = new URLSearchParams(location.search).get('enroll') === 'true';
  const [courseReviews, setCourseReviews] = useState<{ name: string; rating: number; comment: string; }[]>([]);

  useEffect(() => {
    if (course) {
      setCourseReviews(course.reviews);
    }
  }, [course]);

  useEffect(() => {
    const checkUserEnrollment = async () => {
      if (courseId) {
        const { enrolled } = await checkCourseEnrollment(courseId);
        setIsEnrolled(enrolled);
        setIsLoading(false);
      }
    };
    
    checkUserEnrollment();
  }, [courseId]);

  useEffect(() => {
    if (shouldPromptEnroll && course && course.price > 0 && !isEnrolled) {
      handlePayment();
    }
  }, [shouldPromptEnroll, course, isEnrolled]);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleSubmitReview = (review: { name: string; rating: number; comment: string; }) => {
    setCourseReviews(prevReviews => [review, ...prevReviews]);
  };

  const handlePayment = async () => {
    try {
      setProcessingPayment(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to purchase courses");
        setProcessingPayment(false);
        return;
      }

      const { enrolled } = await checkCourseEnrollment(courseId as string);
      
      if (enrolled) {
        toast.info("You are already enrolled in this course");
        setIsEnrolled(true);
        setProcessingPayment(false);
        return;
      }

      const response = await fetch('https://uecljvnuuwkvdxcmveho.supabase.co/functions/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_payment',
          courseId: courseId,
          courseTitle: course.title,
          price: course.price
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment');
      }

      setTimeout(() => {
        completeEnrollment();
      }, 2000);
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error("Payment processing failed. Please try again.");
      setProcessingPayment(false);
    }
  };

  const completeEnrollment = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to enroll in courses");
        setProcessingPayment(false);
        return;
      }

      const { enrolled } = await checkCourseEnrollment(courseId as string);
      
      if (enrolled) {
        toast.info("You are already enrolled in this course");
        setIsEnrolled(true);
        setProcessingPayment(false);
        return;
      }

      const { error } = await supabase
        .from('course_enrollments')
        .insert([
          { 
            course_id: courseId,
            status: 'enrolled',
            user_id: user.id
          }
        ]);

      if (error) throw error;
      
      toast.success("Payment successful! You are now enrolled in the course.");
      setIsEnrolled(true);
      setProcessingPayment(false);
    } catch (error: any) {
      console.error("Error enrolling after payment:", error);
      if (error.code === '23505') {
        toast.info("You are already enrolled in this course");
        setIsEnrolled(true);
      } else {
        toast.error("Enrollment failed. Please contact support.");
      }
      setProcessingPayment(false);
    }
  };

  const handleEnroll = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to enroll in courses");
        return;
      }

      if (course.price > 0) {
        handlePayment();
        return;
      }

      const { enrolled } = await checkCourseEnrollment(courseId as string);
      
      if (enrolled) {
        toast.info("You are already enrolled in this course");
        setIsEnrolled(true);
        return;
      }

      const { error } = await supabase
        .from('course_enrollments')
        .insert([
          { 
            course_id: courseId,
            status: 'enrolled',
            user_id: user.id
          }
        ]);

      if (error) throw error;
      
      toast.success("Successfully enrolled! Check your email for next steps.");
      setIsEnrolled(true);
    } catch (error: any) {
      console.error("Error enrolling in course:", error);
      if (error.code === '23505') {
        toast.info("You are already enrolled in this course");
        setIsEnrolled(true);
      } else {
        toast.error("Failed to enroll in course. Please try again.");
      }
    }
  };

  const handleWatchDemo = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from('course_enrollments')
          .upsert([
            { 
              course_id: courseId,
              status: 'demo_viewed',
              user_id: user.id
            }
          ], { onConflict: 'user_id, course_id' });
          
        if (error && error.code !== '23505') {
          console.error("Error logging demo view:", error);
        }
      }
      
      setShowDemoVideo(true);
    } catch (error) {
      console.error("Error logging demo view:", error);
    }
  };

  const handleDownload = () => {
    toast.success("Materials downloading...");
  };

  const fixedLiveSessionSchedule = course.liveSessionSchedule.map(session => {
    if ('topic' in session) {
      return session as LiveSession;
    } 
    return {
      topic: (session as any).name || (session as any).topic || "Session",
      day: (session as any).day || "",
      time: (session as any).time || ""
    };
  });

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
      
      {showDemoVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
          <div className="relative w-full max-w-4xl mx-auto">
            <Button 
              onClick={() => setShowDemoVideo(false)} 
              variant="secondary"
              className="absolute -top-12 right-0"
            >
              Close
            </Button>
            <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
              <iframe
                src={course.demoVideo}
                className="absolute top-0 left-0 w-full h-full"
                title={`${course.title} Demo`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <h1 className="text-4xl font-bold mb-4 gradient-text">{course.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="w-4 h-4 text-primary" />
                <span>{course.lessons} Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{course.students} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{course.rating}</span>
              </div>
            </div>

            <div className="mb-6 relative rounded-xl overflow-hidden cursor-pointer group" onClick={handleWatchDemo}>
              <div className="aspect-video bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center 
                                 transition-all group-hover:scale-110">
                    <PlayCircle className="w-8 h-8" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white text-lg font-medium">
                    Watch Course Demo
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mb-6 border-b">
              {["overview", "materials", "reviews", "schedule"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-2 px-4 ${
                    selectedTab === tab
                      ? "border-b-2 border-primary text-primary"
                      : "text-gray-600"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {selectedTab === "overview" && (
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
                  <p className="text-muted-foreground mb-6">{course.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.features.map((feature, index) => (
                      <Card key={index} className="glass border-none">
                        <CardContent className="flex items-center gap-3 p-4">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          <span>{feature}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === "materials" && (
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold mb-4">Course Materials</h2>
                  <div className="space-y-4">
                    {course.materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-4 glass rounded-xl">
                        <div className="flex items-center gap-3">
                          {material.type === "video" ? (
                            <Video className="w-5 h-5 text-primary" />
                          ) : (
                            <FileText className="w-5 h-5 text-primary" />
                          )}
                          <div>
                            <p className="font-medium">{material.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {material.duration || material.size}
                            </p>
                          </div>
                        </div>
                        <Button onClick={handleDownload} variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === "reviews" && (
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold mb-4">Student Reviews</h2>
                  
                  <CourseReviewForm 
                    courseId={courseId as string} 
                    onSubmitReview={handleSubmitReview} 
                  />
                  
                  <div className="space-y-4">
                    {courseReviews.map((review, index) => (
                      <div key={index} className="glass rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{review.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === "schedule" && (
                <div className="glass rounded-2xl p-6">
                  <h2 className="text-2xl font-semibold mb-4">Live Sessions Schedule</h2>
                  <div className="space-y-4">
                    {fixedLiveSessionSchedule.map((session, index) => (
                      <div key={index} className="glass rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{session.topic}</p>
                            <p className="text-sm text-muted-foreground">
                              {session.day} at {session.time}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Join Session</Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="text-3xl font-bold mb-6 text-center text-primary">
                {course.price === 0 ? "Free" : `$${course.price}`}
              </div>
              
              <div className="space-y-4">
                {isLoading ? (
                  <Button className="w-full" size="lg" disabled>
                    <span className="animate-pulse">Checking enrollment...</span>
                  </Button>
                ) : processingPayment ? (
                  <Button className="w-full" size="lg" disabled>
                    <span className="animate-pulse">Processing Payment...</span>
                  </Button>
                ) : (
                  <>
                    {isEnrolled ? (
                      <Button
                        className="w-full bg-primary text-white"
                        size="lg"
                        onClick={() => toast.success("You're already enrolled in this course!")}
                      >
                        <BookOpen className="mr-2" />
                        Already Enrolled
                      </Button>
                    ) : (
                      course.price > 0 ? (
                        <PaymentOptions 
                          courseTitle={course.title}
                          price={course.price}
                          courseId={courseId as string}
                          onPaymentComplete={() => setIsEnrolled(true)}
                          showAccessButton={false}
                        />
                      ) : (
                        <Button className="w-full" size="lg" onClick={handleEnroll}>
                          <PlayCircle className="mr-2" />
                          Enroll Now (Free)
                        </Button>
                      )
                    )}
                  </>
                )}
                
                <Button variant="outline" className="w-full" size="lg" onClick={handleWatchDemo}>
                  <Video className="mr-2" />
                  Watch Demo
                </Button>

                <Button variant="outline" className="w-full" size="lg">
                  <MessageSquare className="mr-2" />
                  Chat with AI Assistant
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <h3 className="font-semibold mb-4">Instructor</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{course.instructor}</div>
                    <div className="text-sm text-muted-foreground">Senior Developer & Educator</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
