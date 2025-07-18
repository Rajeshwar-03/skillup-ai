import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Clock, Users, BookOpen } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "AI Fundamentals Certificate",
    description: "Master the basics of artificial intelligence and machine learning",
    level: "Beginner",
    duration: "4 weeks",
    enrolled: 1250,
    skills: ["Machine Learning", "Neural Networks", "Python", "Data Analysis"],
    price: "$99"
  },
  {
    id: 2,
    title: "Advanced Machine Learning",
    description: "Deep dive into advanced ML algorithms and techniques",
    level: "Advanced",
    duration: "8 weeks", 
    enrolled: 850,
    skills: ["Deep Learning", "TensorFlow", "PyTorch", "Computer Vision"],
    price: "$199"
  },
  {
    id: 3,
    title: "Data Science Professional",
    description: "Comprehensive data science certification program",
    level: "Intermediate",
    duration: "12 weeks",
    enrolled: 2100,
    skills: ["Statistics", "R", "SQL", "Visualization", "Big Data"],
    price: "$299"
  },
  {
    id: 4,
    title: "AI Ethics & Governance",
    description: "Learn responsible AI development and deployment",
    level: "Intermediate",
    duration: "6 weeks",
    enrolled: 675,
    skills: ["Ethics", "Policy", "Governance", "Bias Detection"],
    price: "$149"
  }
];

export const Certifications = () => {
  return (
    <section id="certifications" className="py-24 bg-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Professional Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Earn industry-recognized certifications to validate your AI and data science skills
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Award className="h-8 w-8 text-primary" />
                    <Badge variant={cert.level === "Beginner" ? "secondary" : cert.level === "Intermediate" ? "default" : "destructive"}>
                      {cert.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{cert.title}</CardTitle>
                  <CardDescription>{cert.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {cert.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {cert.enrolled.toLocaleString()} enrolled
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        Skills you'll learn:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <span className="text-2xl font-bold text-primary">{cert.price}</span>
                      <Button>Enroll Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};