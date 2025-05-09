
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, MessageSquare, Lightbulb, Calendar, Video, Globe, MessageCircleQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfessorReview } from "@/types/database";
import { useState } from "react";

export const Community = () => {
  const [professorReviews] = useState<ProfessorReview[]>([
    {
      id: "1",
      professor_name: "Dr. Emily Chen",
      institution: "Stanford University",
      profile_image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      comment: "The course platform has been instrumental in helping my students grasp complex concepts. The interactive elements and AI assistance have significantly improved engagement and retention rates in my classes.",
      rating: 5
    },
    {
      id: "2",
      professor_name: "Prof. James Wilson",
      institution: "MIT",
      profile_image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      comment: "As an educator with over 20 years of experience, I'm impressed by the quality of content and the thoughtful pedagogical approach. The platform bridges theoretical knowledge with practical applications effectively.",
      rating: 4
    },
    {
      id: "3",
      professor_name: "Dr. Maria Rodriguez",
      institution: "UC Berkeley",
      profile_image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      comment: "The doubt clarification system is phenomenal. My students report faster learning progress and greater confidence in tackling difficult subjects when using this platform alongside traditional classroom instruction.",
      rating: 5
    }
  ]);
  
  const [showQuestionInput, setShowQuestionInput] = useState(false);
  const [question, setQuestion] = useState("");

  const handleAskQuestion = () => {
    if (!showQuestionInput) {
      setShowQuestionInput(true);
      return;
    }
    
    if (question.trim()) {
      // Submit question logic would go here
      toast.success("Your question has been submitted!");
      setQuestion("");
      setShowQuestionInput(false);
    } else {
      toast.error("Please enter your question");
    }
  };

  const communityFeatures = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
      title: "Join a Global Network",
      description: "Connect with thousands of learners worldwide who share your passion for technology and education."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      title: "Discussion Forums",
      description: "Participate in topic-specific forums where you can ask questions, share insights, and help others."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1063&q=80",
      title: "Study Groups",
      description: "Form or join study groups with peers working on the same courses or technologies."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      title: "Live Events",
      description: "Attend virtual workshops, hackathons, and networking sessions organized regularly."
    },
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      title: "Expert Webinars",
      description: "Join live webinars with industry experts discussing cutting-edge technologies and career advice."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      image: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      title: "Job Board",
      description: "Access exclusive job opportunities and internships shared by our partner companies."
    }
  ];

  const upcomingEvents = [
    {
      title: "Full Stack Development Workshop",
      date: "June 15, 2025",
      time: "10:00 AM - 12:00 PM PST",
      host: "John Doe",
      registrations: 128
    },
    {
      title: "Machine Learning Career Panel",
      date: "June 22, 2025",
      time: "2:00 PM - 3:30 PM PST",
      host: "Dr. Sarah Chen",
      registrations: 94
    },
    {
      title: "Cloud Computing Hackathon",
      date: "July 3-5, 2025",
      time: "All day event",
      host: "Michael Johnson",
      registrations: 76
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-orange-50 to-white" id="community">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
          >
            Join Our Learning Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Learning is better together. Connect with fellow students, instructors, and industry professionals.
          </motion.p>
        </div>

        {/* Professor Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-center gradient-text">What Professors Say About Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {professorReviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={review.profile_image} alt={review.professor_name} />
                    <AvatarFallback>{review.professor_name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{review.professor_name}</CardTitle>
                    <CardDescription>{review.institution}</CardDescription>
                    <div className="flex mt-1">{renderStars(review.rating)}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Doubt Clarification Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Doubt Clarification System</h3>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                  <h4 className="text-xl font-semibold mb-2">Get Your Questions Answered</h4>
                  <p className="text-muted-foreground mb-4">
                    Our dedicated doubt clarification system connects you directly with course instructors and expert teaching assistants to resolve your questions quickly.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>24/7 access to AI-powered preliminary answers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MessageSquare className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Live chat with teaching assistants during scheduled hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Video className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>Weekly office hours with course professors</span>
                    </li>
                  </ul>
                  
                  {showQuestionInput ? (
                    <div className="space-y-2">
                      <textarea 
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={3}
                        placeholder="Type your question here..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      ></textarea>
                      <div className="flex gap-2">
                        <Button onClick={handleAskQuestion}>Submit Question</Button>
                        <Button variant="outline" onClick={() => setShowQuestionInput(false)}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <Button onClick={() => setShowQuestionInput(true)}>
                      <MessageCircleQuestion className="mr-2 h-4 w-4" />
                      Ask a Question
                    </Button>
                  )}
                </div>
                <div className="md:w-1/3">
                  <img 
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                    alt="Student getting help" 
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {communityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 h-40 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="feature-icon mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/80">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Upcoming Community Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{event.registrations} registered</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Hosted by {event.host} • {event.time}
                  </p>
                  <Button size="sm" className="w-full">Register Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button size="lg" className="px-8">
            Join Our Community
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Already a member? <a href="#" className="text-primary hover:underline">Sign in</a> to access the community portal
          </p>
        </motion.div>
      </div>
    </section>
  );
};
