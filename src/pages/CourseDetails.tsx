import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Clock, Trophy, Users, Star, PlayCircle, MessageSquare, Download, Calendar, CheckCircle, BarChart, BookOpen, Video, FileText, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { toast } from "sonner";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [selectedTab, setSelectedTab] = useState("overview");

  // This would typically come from an API
  const courseDetails = {
    title: "Full Stack Development",
    description: "Master MERN stack and modern web development practices with hands-on projects and real-world applications. Learn from industry experts and build a professional portfolio.",
    duration: "6 months",
    lessons: 120,
    students: 2500,
    rating: 4.8,
    instructor: "Dr. Sarah Johnson",
    price: "Free",
    features: [
      "24/7 AI Learning Assistant",
      "Live Virtual Classes",
      "Industry Projects",
      "Career Support",
      "Certificate",
      "Community Access"
    ],
    materials: [
      { title: "Introduction to Web Development", type: "video", duration: "45 min" },
      { title: "HTML & CSS Basics", type: "document", size: "2.3 MB" },
      { title: "JavaScript Fundamentals", type: "video", duration: "1.5 hours" },
    ],
    reviews: [
      { name: "John D.", rating: 5, comment: "Excellent course structure and content!" },
      { name: "Sarah M.", rating: 4.5, comment: "Very practical and hands-on learning experience." },
    ],
    weeklyTasks: [
      { week: 1, task: "Build a responsive landing page", deadline: "Friday" },
      { week: 1, task: "Complete HTML assessment", deadline: "Sunday" },
    ],
    liveSessionSchedule: [
      { day: "Monday", time: "10:00 AM", topic: "Frontend Development" },
      { day: "Wednesday", time: "2:00 PM", topic: "Backend Development" },
    ]
  };

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
      
      <main className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <h1 className="text-4xl font-bold mb-4 gradient-text">{courseDetails.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{courseDetails.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="w-4 h-4 text-primary" />
                <span>{courseDetails.lessons} Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{courseDetails.students} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span>{courseDetails.rating}</span>
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
                  <p className="text-muted-foreground mb-6">{courseDetails.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courseDetails.features.map((feature, index) => (
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
                    {courseDetails.materials.map((material, index) => (
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
                    {courseDetails.reviews.map((review, index) => (
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
                    {courseDetails.liveSessionSchedule.map((session, index) => (
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
              <div className="text-3xl font-bold mb-6 text-center text-primary">{courseDetails.price}</div>
              
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
                    <div className="font-medium">{courseDetails.instructor}</div>
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
