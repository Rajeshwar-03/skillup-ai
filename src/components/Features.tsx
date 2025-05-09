
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Code, GraduationCap, FileVideo, Lightbulb, Brain, Globe, Shield } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Comprehensive Curriculum",
      description: "Our courses cover everything from fundamentals to advanced concepts with structured learning paths.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      color: "from-orange-500 to-amber-400"
    },
    {
      icon: <FileVideo className="h-8 w-8 text-primary" />,
      title: "High-Quality Video Content",
      description: "Learn with professionally produced video lessons, available on-demand and downloadable for offline viewing.",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      color: "from-amber-500 to-yellow-400"
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      title: "Expert Instructors",
      description: "Learn from industry veterans with real-world experience in their respective fields.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      color: "from-orange-600 to-red-500"
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Hands-on Projects",
      description: "Apply your knowledge with practical assignments and portfolio-worthy projects.",
      image: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      color: "from-amber-600 to-orange-400"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Personalized Learning Paths",
      description: "Adaptive learning technology that adjusts to your skill level and learning speed.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80",
      color: "from-yellow-500 to-amber-400"
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI-Enhanced Learning",
      description: "Our AI tools help identify your strengths and areas for improvement to optimize your learning journey.",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      color: "from-red-500 to-orange-400"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Community",
      description: "Connect with fellow learners worldwide through forums, group projects, and networking events.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      color: "from-orange-400 to-amber-300"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Certification Programs",
      description: "Earn industry-recognized certifications to showcase your skills to employers.",
      image: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
      color: "from-amber-500 to-yellow-400"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white to-orange-50" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 gradient-text"
          >
            Why Choose Our Platform?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Our educational platform combines cutting-edge technology with expert instruction to deliver an unparalleled learning experience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full feature-card overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className={`bg-gradient-to-r ${feature.color} text-white`}>
                  <div className="flex items-center justify-center bg-white/20 w-12 h-12 rounded-full mb-2">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
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
      </div>
    </section>
  );
};
