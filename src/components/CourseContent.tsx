import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PlayCircle, FileText, CheckCircle2, Lock } from "lucide-react";

interface CourseContentProps {
  courseId: string;
  isEnrolled: boolean;
}

export const CourseContent = ({ courseId, isEnrolled }: CourseContentProps) => {
  const [progress, setProgress] = useState(0);

  // Mock course content data
  const courseModules = [
    {
      id: 1,
      title: "Introduction to the Course",
      lessons: [
        { id: 1, title: "Welcome & Overview", type: "video", duration: "5 min", completed: true },
        { id: 2, title: "Course Materials", type: "article", duration: "3 min", completed: true },
      ]
    },
    {
      id: 2,
      title: "Fundamentals",
      lessons: [
        { id: 3, title: "Basic Concepts", type: "video", duration: "15 min", completed: false },
        { id: 4, title: "Practical Examples", type: "video", duration: "20 min", completed: false },
        { id: 5, title: "Exercise 1", type: "exercise", duration: "30 min", completed: false },
      ]
    },
    {
      id: 3,
      title: "Advanced Topics",
      lessons: [
        { id: 6, title: "Deep Dive", type: "video", duration: "25 min", completed: false },
        { id: 7, title: "Case Study", type: "article", duration: "10 min", completed: false },
      ]
    }
  ];

  useEffect(() => {
    const completedLessons = courseModules.flatMap(m => m.lessons).filter(l => l.completed).length;
    const totalLessons = courseModules.flatMap(m => m.lessons).length;
    setProgress((completedLessons / totalLessons) * 100);
  }, []);

  const getLessonIcon = (type: string, completed: boolean) => {
    if (completed) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (!isEnrolled) return <Lock className="h-5 w-5 text-muted-foreground" />;
    
    switch (type) {
      case "video":
        return <PlayCircle className="h-5 w-5 text-primary" />;
      case "article":
      case "exercise":
        return <FileText className="h-5 w-5 text-primary" />;
      default:
        return <FileText className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-6">
      {isEnrolled && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {courseModules.map((module, moduleIndex) => (
          <Card key={module.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                Module {moduleIndex + 1}: {module.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {module.lessons.map((lesson, lessonIndex) => (
                  <div key={lesson.id}>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        {getLessonIcon(lesson.type, lesson.completed)}
                        <div>
                          <p className="font-medium">{lesson.title}</p>
                          <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                        </div>
                      </div>
                      {isEnrolled ? (
                        <Button variant="ghost" size="sm">
                          {lesson.completed ? "Review" : "Start"}
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" disabled>
                          Preview
                        </Button>
                      )}
                    </div>
                    {lessonIndex < module.lessons.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isEnrolled && (
        <Card className="bg-muted/50">
          <CardContent className="py-6">
            <div className="text-center space-y-2">
              <Lock className="h-8 w-8 text-muted-foreground mx-auto" />
              <h3 className="font-semibold">Enroll to access all content</h3>
              <p className="text-sm text-muted-foreground">
                Get unlimited access to all course materials and track your progress.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};