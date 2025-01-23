import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, Clock, Trophy, Users, Star, PlayCircle, MessageSquare, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";

const CourseDetails = () => {
  const { courseId } = useParams();

  // This would typically come from an API
  const courseDetails = {
    title: "Full Stack Development",
    description: "Master MERN stack and modern web development practices with hands-on projects and real-world applications. Learn from industry experts and build a professional portfolio.",
    duration: "6 months",
    lessons: 120,
    students: 2500,
    rating: 4.8,
    instructor: "Dr. Sarah Johnson",
    price: "$499",
    features: [
      "24/7 AI Learning Assistant",
      "Live Virtual Classes",
      "Industry Projects",
      "Career Support",
      "Certificate",
      "Community Access"
    ]
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

            <div className="glass rounded-2xl p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
              <p className="text-muted-foreground">{courseDetails.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {courseDetails.features.map((feature, index) => (
                <Card key={index} className="glass border-none">
                  <CardContent className="flex items-center gap-3 p-4">
                    <Trophy className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass rounded-2xl p-6 sticky top-24">
              <div className="text-3xl font-bold mb-6 text-center">{courseDetails.price}</div>
              
              <div className="space-y-4">
                <Button className="w-full" size="lg">
                  <PlayCircle className="mr-2" />
                  Start Learning
                </Button>
                
                <Button variant="outline" className="w-full" size="lg">
                  <Download className="mr-2" />
                  Download Syllabus
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