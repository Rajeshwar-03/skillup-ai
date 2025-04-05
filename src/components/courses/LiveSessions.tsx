
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";
import { toast } from "sonner";
import { LiveSession } from "@/types/database";

interface LiveSessionsProps {
  courseId: string;
}

export const LiveSessions = ({ courseId }: LiveSessionsProps) => {
  // In a real app, these would come from an API call
  const [sessions, setSessions] = useState<LiveSession[]>([
    {
      id: "1",
      course_id: courseId,
      title: "Introduction to Key Concepts",
      description: "An overview of the fundamental principles covered in the course",
      instructor: "Dr. Sarah Miller",
      date: "2025-04-15",
      time: "10:00 AM - 11:30 AM",
      duration: 90,
      zoom_link: "https://zoom.us/j/123456789"
    },
    {
      id: "2",
      course_id: courseId,
      title: "Practical Applications Workshop",
      description: "Hands-on session applying theoretical concepts to real-world problems",
      instructor: "Prof. Michael Johnson",
      date: "2025-04-18",
      time: "2:00 PM - 4:00 PM",
      duration: 120,
      zoom_link: "https://zoom.us/j/987654321"
    },
    {
      id: "3",
      course_id: courseId,
      title: "Q&A and Problem Solving",
      description: "Interactive session to address student questions and work through challenging problems",
      instructor: "Dr. Emily Chen",
      date: "2025-04-22",
      time: "3:00 PM - 4:30 PM",
      duration: 90,
      zoom_link: "https://zoom.us/j/567891234"
    }
  ]);

  const handleJoinSession = (session: LiveSession) => {
    // In a real app, this would actually connect to the session
    window.open(session.zoom_link, "_blank");
    toast.success(`Joining session: ${session.title}`);
  };

  const handleAddToCalendar = (session: LiveSession) => {
    // In a real app, this would add the event to the user's calendar
    toast.success(`Added "${session.title}" to your calendar`);
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Upcoming Live Sessions</h3>
      <p className="text-muted-foreground mb-6">
        Join these interactive live sessions with course instructors to enhance your learning experience.
      </p>
      
      <div className="space-y-4">
        {sessions.map((session) => (
          <Card key={session.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{session.title}</CardTitle>
              <CardDescription>Instructor: {session.instructor}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{session.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{new Date(session.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{session.time} ({session.duration} minutes)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={() => handleJoinSession(session)}
                  className="flex items-center gap-2"
                >
                  <Video className="h-4 w-4" />
                  Join Session
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => handleAddToCalendar(session)}
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Add to Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
