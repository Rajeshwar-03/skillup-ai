
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, MessageSquare, Lightbulb, Calendar, Video, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Community = () => {
  const communityFeatures = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Join a Global Network",
      description: "Connect with thousands of learners worldwide who share your passion for technology and education."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Discussion Forums",
      description: "Participate in topic-specific forums where you can ask questions, share insights, and help others."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Study Groups",
      description: "Form or join study groups with peers working on the same courses or technologies."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Live Events",
      description: "Attend virtual workshops, hackathons, and networking sessions organized regularly."
    },
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: "Expert Webinars",
      description: "Join live webinars with industry experts discussing cutting-edge technologies and career advice."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
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

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-950" id="community">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {communityFeatures.map((feature, index) => (
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
