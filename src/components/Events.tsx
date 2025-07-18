import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Video, Mic } from "lucide-react";

const events = [
  {
    id: 1,
    title: "AI Leadership Summit 2024",
    description: "Join industry leaders discussing the future of AI in business",
    date: "March 20, 2024",
    time: "9:00 AM - 5:00 PM PST",
    location: "Virtual",
    type: "conference",
    attendees: 2500,
    speakers: ["Dr. Sarah Chen", "Alex Rodriguez", "Prof. Michael Johnson"],
    price: "Free",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Machine Learning Workshop",
    description: "Hands-on workshop covering advanced ML techniques and implementation",
    date: "March 25, 2024",
    time: "2:00 PM - 6:00 PM EST",
    location: "Boston, MA",
    type: "workshop",
    attendees: 150,
    speakers: ["Dr. Emily Watson", "James Kim"],
    price: "$199",
    status: "registration-open"
  },
  {
    id: 3,
    title: "AI Ethics Panel Discussion",
    description: "Critical conversations about responsible AI development and deployment",
    date: "April 2, 2024",
    time: "7:00 PM - 8:30 PM UTC",
    location: "Virtual",
    type: "panel",
    attendees: 800,
    speakers: ["Prof. David Liu", "Dr. Amanda Foster", "Marc Thompson"],
    price: "Free",
    status: "upcoming"
  },
  {
    id: 4,
    title: "Deep Learning Masterclass",
    description: "Intensive masterclass on neural networks and deep learning architectures",
    date: "April 15, 2024",
    time: "10:00 AM - 4:00 PM PST",
    location: "San Francisco, CA",
    type: "masterclass",
    attendees: 200,
    speakers: ["Dr. Jennifer Park", "Robert Chen"],
    price: "$299",
    status: "early-bird"
  },
  {
    id: 5,
    title: "AI Startup Pitch Night",
    description: "Watch promising AI startups pitch their innovative solutions",
    date: "April 28, 2024",
    time: "6:00 PM - 9:00 PM EST",
    location: "New York, NY",
    type: "networking",
    attendees: 300,
    speakers: ["Various Startup Founders"],
    price: "$75",
    status: "upcoming"
  },
  {
    id: 6,
    title: "Computer Vision Bootcamp",
    description: "3-day intensive bootcamp on computer vision and image processing",
    date: "May 10-12, 2024",
    time: "9:00 AM - 5:00 PM daily",
    location: "Virtual",
    type: "bootcamp",
    attendees: 500,
    speakers: ["Dr. Lisa Zhang", "Ahmed Hassan", "Dr. Carlos Rodriguez"],
    price: "$599",
    status: "coming-soon"
  }
];

export const Events = () => {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "conference":
        return <Mic className="h-5 w-5" />;
      case "workshop":
      case "masterclass":
      case "bootcamp":
        return <Video className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "registration-open":
        return "default";
      case "early-bird":
        return "secondary";
      case "upcoming":
        return "outline";
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
      case "early-bird":
        return "Early Bird";
      case "upcoming":
        return "Upcoming";
      case "coming-soon":
        return "Coming Soon";
      default:
        return status;
    }
  };

  return (
    <section id="events" className="py-24 bg-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Upcoming Events</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with AI experts, learn from industry leaders, and expand your professional network
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getEventIcon(event.type)}
                      <Badge variant="outline" className="capitalize">
                        {event.type}
                      </Badge>
                    </div>
                    <Badge variant={getStatusColor(event.status)}>
                      {getStatusText(event.status)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees} attendees
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-1">Speakers:</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.speakers.join(", ")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <span className="text-lg font-bold text-primary">{event.price}</span>
                      <Button 
                        size="sm"
                        variant={event.status === "registration-open" || event.status === "early-bird" ? "default" : "outline"}
                        disabled={event.status === "coming-soon"}
                      >
                        {event.status === "registration-open" || event.status === "early-bird" ? "Register" : 
                         event.status === "upcoming" ? "Learn More" : "Notify Me"}
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