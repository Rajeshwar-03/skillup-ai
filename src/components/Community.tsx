
import { motion } from "framer-motion";
import { Users, MessageSquare, Heart, Calendar, Clock, Lightbulb, HelpCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const discussions = [
  {
    title: "Advanced React Patterns",
    author: "Sarah Johnson",
    replies: 23,
    likes: 45,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    preview: "I've been working with React for two years and just discovered the power of compound components pattern. Has anyone used this in production?"
  },
  {
    title: "Python vs JavaScript for Data Science",
    author: "Mike Chen",
    replies: 18,
    likes: 32,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    preview: "I'm currently using Python for data analysis but wonder if I should learn JavaScript for interactive visualizations. What are your thoughts?"
  },
  {
    title: "Career switch to IT from Marketing",
    author: "Priya Sharma",
    replies: 34,
    likes: 67,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    preview: "After 8 years in marketing, I'm transitioning to IT. Anyone else make a similar switch? I'd love to hear about your journey."
  },
  {
    title: "DevOps Best Practices",
    author: "John Doe",
    replies: 15,
    likes: 28,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    preview: "I'm implementing CI/CD pipelines for the first time. What are some pitfalls to avoid and best practices to follow?"
  },
  {
    title: "Getting Started with Blockchain",
    author: "Emma Wilson",
    replies: 21,
    likes: 39,
    avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56",
    preview: "Just completed the Blockchain course. Where should I go from here? Looking for project ideas to build my portfolio."
  },
  {
    title: "UI/UX Design Resources",
    author: "David Kim",
    replies: 27,
    likes: 52,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    preview: "I've collected some amazing design resources that helped me ace my projects. Would anyone be interested in a compiled list?"
  }
];

const events = [
  {
    title: "Web Development Hackathon",
    date: "2025-05-15",
    time: "10:00 AM - 6:00 PM",
    description: "Join our 8-hour hackathon to build innovative web applications with fellow learners."
  },
  {
    title: "AI in Healthcare Workshop",
    date: "2025-05-22",
    time: "2:00 PM - 4:00 PM",
    description: "Learn how machine learning is transforming healthcare with industry experts."
  },
  {
    title: "Career Fair: Tech Industry",
    date: "2025-06-05",
    time: "11:00 AM - 3:00 PM",
    description: "Connect with top tech companies hiring junior and senior developers."
  }
];

export const Community = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5" id="community">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Join Our Community</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Connect with over 50,000 learners worldwide, share experiences, participate in events, and grow together in our supportive learning community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-6 rounded-2xl col-span-1 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">Active Discussions</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {discussions.slice(0, 6).map((discussion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl hover:bg-secondary/10 transition-colors border border-border"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={discussion.avatar}
                      alt={discussion.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold line-clamp-1">{discussion.title}</h3>
                      <p className="text-sm text-muted-foreground">by {discussion.author}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{discussion.preview}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>{discussion.replies}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      <span>{discussion.likes}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">Upcoming Events</h3>
              <Button variant="outline" size="sm">All Events</Button>
            </div>
            
            <div className="space-y-4">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-4 rounded-xl border border-border"
                >
                  <h4 className="font-semibold mb-2">{event.title}</h4>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Knowledge Sharing</h3>
            <p className="text-muted-foreground">Share your insights and learn from others' experiences in our forum discussions.</p>
          </div>
          <div className="glass p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Peer Support</h3>
            <p className="text-muted-foreground">Get unstuck with help from fellow learners and mentors in our support community.</p>
          </div>
          <div className="glass p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Study Groups</h3>
            <p className="text-muted-foreground">Form study groups to tackle courses together and improve learning outcomes.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
