import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MessageSquare, Video } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface LiveSession {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  instructor: string;
  attendees: number;
  maxAttendees: number;
  status: "upcoming" | "live" | "completed";
  meetingLink?: string;
}

interface LiveSessionsProps {
  courseId: string;
  isEnrolled: boolean;
}

export const LiveSessions = ({ courseId, isEnrolled }: LiveSessionsProps) => {
  const [sessions] = useState<LiveSession[]>([
    {
      id: "1",
      title: "Course Introduction & Q&A",
      description: "Welcome session covering course overview and answering student questions",
      date: "2024-01-25",
      time: "14:00",
      duration: "1 hour",
      instructor: "Sarah Johnson",
      attendees: 45,
      maxAttendees: 100,
      status: "upcoming",
      meetingLink: "https://meet.google.com/abc-def-ghi"
    },
    {
      id: "2", 
      title: "Advanced Concepts Deep Dive",
      description: "Interactive session covering advanced topics with hands-on examples",
      date: "2024-01-30",
      time: "15:00", 
      duration: "1.5 hours",
      instructor: "Sarah Johnson",
      attendees: 38,
      maxAttendees: 100,
      status: "upcoming",
      meetingLink: "https://meet.google.com/xyz-abc-def"
    },
    {
      id: "3",
      title: "Project Review & Feedback",
      description: "Review student projects and provide personalized feedback",
      date: "2024-01-20",
      time: "16:00",
      duration: "2 hours", 
      instructor: "Sarah Johnson",
      attendees: 52,
      maxAttendees: 100,
      status: "completed"
    }
  ]);

  const [selectedSession, setSelectedSession] = useState<LiveSession | null>(null);

  const getStatusColor = (status: LiveSession["status"]) => {
    switch (status) {
      case "upcoming": return "bg-blue-500";
      case "live": return "bg-green-500";
      case "completed": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: LiveSession["status"]) => {
    switch (status) {
      case "upcoming": return "Upcoming";
      case "live": return "Live Now";
      case "completed": return "Completed";
      default: return "Unknown";
    }
  };

  const handleJoinSession = (session: LiveSession) => {
    if (session.meetingLink) {
      window.open(session.meetingLink, '_blank');
    }
  };

  if (!isEnrolled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Live Sessions & Meetings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Enroll in this course to access live sessions and meetings.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-5 h-5" />
          Live Sessions & Meetings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold">{session.title}</h3>
                  <p className="text-sm text-muted-foreground">{session.description}</p>
                </div>
                <Badge className={getStatusColor(session.status)}>
                  {getStatusText(session.status)}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {session.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {session.time} ({session.duration})
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {session.attendees}/{session.maxAttendees}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Instructor: {session.instructor}</span>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedSession(session)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{selectedSession?.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p>{selectedSession?.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <strong>Date:</strong> {selectedSession?.date}
                          </div>
                          <div>
                            <strong>Time:</strong> {selectedSession?.time}
                          </div>
                          <div>
                            <strong>Duration:</strong> {selectedSession?.duration}
                          </div>
                          <div>
                            <strong>Instructor:</strong> {selectedSession?.instructor}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>{selectedSession?.attendees} / {selectedSession?.maxAttendees} attendees</span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {session.status === "upcoming" && (
                    <Button size="sm" onClick={() => handleJoinSession(session)}>
                      <Video className="w-4 h-4 mr-2" />
                      Join Session
                    </Button>
                  )}
                  
                  {session.status === "live" && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleJoinSession(session)}>
                      <Video className="w-4 h-4 mr-2" />
                      Join Live
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};