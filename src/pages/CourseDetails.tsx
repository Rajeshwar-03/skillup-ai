import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Clock, Trophy, Users, Star, PlayCircle, MessageSquare, Download, Calendar, CheckCircle, BarChart, BookOpen, Video, FileText, Map, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const courseData = {
  "full-stack": {
    title: "Full Stack Development",
    description: "Master MERN stack and modern web development practices with hands-on projects and real-world applications. Learn from industry experts and build a professional portfolio.",
    duration: "6 months",
    lessons: 120,
    students: 2500,
    rating: 4.8,
    instructor: "Dr. Sarah Johnson",
    price: "Free",
  },
  "ai-ml": {
    title: "AI & Machine Learning",
    description: "Deep dive into artificial intelligence and machine learning concepts. Learn Python, TensorFlow, and PyTorch while building real AI applications.",
    duration: "8 months",
    lessons: 150,
    students: 1800,
    rating: 4.9,
    instructor: "Dr. Michael Chen",
    price: "Free",
  },
  "cloud": {
    title: "Cloud Computing (AWS)",
    description: "Learn AWS services and cloud architecture through hands-on projects and real-world applications.",
    duration: "5 months",
    lessons: 100,
    students: 2100,
    rating: 4.7,
    instructor: "Dr. Emily Davis",
    price: "Free",
  },
  "devops": {
    title: "DevOps & CI/CD",
    description: "Master modern DevOps practices and tools to streamline your development process.",
    duration: "4 months",
    lessons: 80,
    students: 1500,
    rating: 4.8,
    instructor: "Dr. Alex Smith",
    price: "Free",
  },
  "blockchain": {
    title: "Blockchain Development",
    description: "Build decentralized apps and smart contracts while learning blockchain technology.",
    duration: "6 months",
    lessons: 90,
    students: 1200,
    rating: 4.6,
    instructor: "Dr. Lisa White",
    price: "Free",
  },
  "ui-ux": {
    title: "UI/UX Design",
    description: "Create stunning user interfaces and experiences through design principles and tools.",
    duration: "3 months",
    lessons: 60,
    students: 3000,
    rating: 4.9,
    instructor: "Dr. John Brown",
    price: "Free",
  },
  "data-science": {
    title: "Data Science",
    description: "Master data analysis and visualization techniques using Python and R.",
    duration: "5 months",
    lessons: 110,
    students: 2200,
    rating: 4.8,
    instructor: "Dr. Sarah Lee",
    price: "Free",
  },
  "cybersecurity": {
    title: "Cybersecurity",
    description: "Learn ethical hacking and security practices to protect systems and networks.",
    duration: "4 months",
    lessons: 70,
    students: 1600,
    rating: 4.7,
    instructor: "Dr. Kevin Green",
    price: "Free",
  },
  "mobile-dev": {
    title: "Mobile App Development",
    description: "Build iOS and Android apps with React Native and modern development practices.",
    duration: "6 months",
    lessons: 100,
    students: 2800,
    rating: 4.8,
    instructor: "Dr. Rachel Adams",
    price: "Free",
  },
  "python": {
    title: "Python Programming",
    description: "Master Python for automation and development through hands-on projects.",
    duration: "3 months",
    lessons: 50,
    students: 3500,
    rating: 4.9,
    instructor: "Dr. Mark Wilson",
    price: "Free",
  },
  "digital-marketing": {
    title: "Digital Marketing",
    description: "Learn SEO, SEM, and social media marketing strategies to grow your business.",
    duration: "4 months",
    lessons: 80,
    students: 2600,
    rating: 4.7,
    instructor: "Dr. Anna Taylor",
    price: "Free",
  },
  "iot": {
    title: "IoT Development",
    description: "Build smart devices and IoT solutions using modern technologies.",
    duration: "5 months",
    lessons: 90,
    students: 1100,
    rating: 4.6,
    instructor: "Dr. Chris Martinez",
    price: "Free",
  },
  "game-dev": {
    title: "Game Development",
    description: "Create games with Unity and C# while learning game design principles.",
    duration: "6 months",
    lessons: 120,
    students: 1900,
    rating: 4.8,
    instructor: "Dr. Jessica Thompson",
    price: "Free",
  },
  "cloud-native": {
    title: "Cloud Native Development",
    description: "Master Kubernetes and microservices for scalable applications.",
    duration: "5 months",
    lessons: 100,
    students: 1400,
    rating: 4.7,
    instructor: "Dr. Brian Harris",
    price: "Free",
  },
  "data-engineering": {
    title: "Data Engineering",
    description: "Build robust data pipelines and infrastructure for data-driven applications.",
    duration: "6 months",
    lessons: 110,
    students: 1300,
    rating: 4.8,
    instructor: "Dr. Emily Clark",
    price: "Free",
  }
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("overview");
  const course = courseData[courseId as keyof typeof courseData];

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleEnroll = () => {
    toast.success("Successfully enrolled! Check your email for next steps.");
  };

  const handleDownload = () => {
    toast.success("Materials downloading...");
  };

  const handleWatchDemo = () => {
    toast.success("Loading demo video...");
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
      
      <main className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
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

            {/* Tabs Navigation */}
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

            {/* Tab Content */}
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
                  <div className="space-y-4">
                    {course.reviews.map((review, index) => (
                      <div key={index} className="glass rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{review.name}</p>
                            <div className="flex items-center">
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
                    {course.liveSessionSchedule.map((session, index) => (
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

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="text-3xl font-bold mb-6 text-center text-primary">{course.price}</div>
              
              <div className="space-y-4">
                <Button className="w-full" size="lg" onClick={handleEnroll}>
                  <PlayCircle className="mr-2" />
                  Enroll Now
                </Button>
                
                <Button variant="outline" className="w-full" size="lg" onClick={handleWatchDemo}>
                  <Video className="mr-2" />
                  Watch Demo
                </Button>

                <Button variant="outline" className="w-full" size="lg">
                  <Map className="mr-2" />
                  View Roadmap
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

              <div className="mt-6 pt-6 border-t border-white/20">
                <Button variant="outline" className="w-full" size="lg">
                  <MessageSquare className="mr-2" />
                  Chat with AI Assistant
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
