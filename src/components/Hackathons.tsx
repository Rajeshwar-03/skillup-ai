import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Users, Clock, MapPin } from "lucide-react";

const hackathons = [
  {
    id: 1,
    title: "AI for Healthcare Hackathon",
    description: "Build innovative AI solutions to improve healthcare outcomes",
    date: "March 15-17, 2024",
    location: "Virtual",
    participants: 500,
    prize: "$50,000",
    status: "upcoming",
    duration: "48 hours",
    tags: ["Healthcare", "AI", "Machine Learning"]
  },
  {
    id: 2,
    title: "Climate Tech Challenge",
    description: "Develop AI-powered solutions for environmental sustainability",
    date: "April 22-24, 2024", 
    location: "San Francisco, CA",
    participants: 300,
    prize: "$75,000",
    status: "registration-open",
    duration: "3 days",
    tags: ["Climate", "Sustainability", "Green Tech"]
  },
  {
    id: 3,
    title: "FinTech AI Innovation",
    description: "Create next-gen financial technology using artificial intelligence",
    date: "May 10-12, 2024",
    location: "New York, NY",
    participants: 400,
    prize: "$100,000",
    status: "upcoming",
    duration: "60 hours",
    tags: ["FinTech", "Blockchain", "AI"]
  },
  {
    id: 4,
    title: "Education Revolution Hack",
    description: "Transform education with AI and innovative learning technologies",
    date: "June 5-7, 2024",
    location: "Virtual",
    participants: 600,
    prize: "$40,000",
    status: "coming-soon",
    duration: "48 hours",
    tags: ["EdTech", "Learning", "Accessibility"]
  }
];

export const Hackathons = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "registration-open":
        return "default";
      case "upcoming":
        return "secondary";
      case "coming-soon":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "registration-open":
        return "Registration Open";
      case "upcoming":
        return "Upcoming";
      case "coming-soon":
        return "Coming Soon";
      default:
        return status;
    }
  };

  return (
    <section id="hackathons" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">AI Hackathons</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join exciting hackathons and compete with the best minds to build innovative AI solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Trophy className="h-8 w-8 text-primary" />
                    <Badge variant={getStatusColor(hackathon.status)}>
                      {getStatusText(hackathon.status)}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{hackathon.title}</CardTitle>
                  <CardDescription>{hackathon.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {hackathon.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {hackathon.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {hackathon.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {hackathon.participants} participants
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {hackathon.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Total Prize</p>
                        <span className="text-2xl font-bold text-primary">{hackathon.prize}</span>
                      </div>
                      <Button 
                        variant={hackathon.status === "registration-open" ? "default" : "outline"}
                        disabled={hackathon.status === "coming-soon"}
                      >
                        {hackathon.status === "registration-open" ? "Register Now" : 
                         hackathon.status === "upcoming" ? "Learn More" : "Notify Me"}
                      </Button>
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