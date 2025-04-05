
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Code, GraduationCap, FileVideo, Lightbulb, Brain, Globe, Shield, Rocket } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Comprehensive Curriculum",
      description: "Our courses cover everything from fundamentals to advanced concepts with structured learning paths."
    },
    {
      icon: <FileVideo className="h-8 w-8 text-primary" />,
      title: "High-Quality Video Content",
      description: "Learn with professionally produced video lessons, available on-demand and downloadable for offline viewing."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      title: "Expert Instructors",
      description: "Learn from industry veterans with real-world experience in their respective fields."
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Hands-on Projects",
      description: "Apply your knowledge with practical assignments and portfolio-worthy projects."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Personalized Learning Paths",
      description: "Adaptive learning technology that adjusts to your skill level and learning speed."
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI-Enhanced Learning",
      description: "Our AI tools help identify your strengths and areas for improvement to optimize your learning journey."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Community",
      description: "Connect with fellow learners worldwide through forums, group projects, and networking events."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Certification Programs",
      description: "Earn industry-recognized certifications to showcase your skills to employers."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-950" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
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
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
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
      </div>
    </section>
  );
};
