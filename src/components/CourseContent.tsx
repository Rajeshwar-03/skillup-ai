import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PlayCircle, FileText, CheckCircle2, Lock } from "lucide-react";
import { courseDetailsData } from "@/data/courseDetailsData";

interface CourseContentProps {
  courseId: string;
  isEnrolled: boolean;
}

export const CourseContent = ({ courseId, isEnrolled }: CourseContentProps) => {
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set([1, 2]));

  // Get course data from courseDetailsData
  const courseData = courseDetailsData[courseId as keyof typeof courseDetailsData];
  
  // Transform the data structure to match our component needs
  const courseModules = courseData?.modules.map((module, index) => ({
    id: index + 1,
    title: module.title,
    lessons: module.lessons.map((lesson, lessonIndex) => ({
      id: index * 100 + lessonIndex + 1,
      title: lesson.title,
      type: lesson.videoUrl ? "video" : "article",
      duration: "15 min",
      completed: completedLessons.has(index * 100 + lessonIndex + 1),
      videoUrl: lesson.videoUrl,
      content: lesson.content
    }))
  })) || [];

  useEffect(() => {
    const completed = courseModules.flatMap(m => m.lessons).filter(l => l.completed).length;
    const totalLessons = courseModules.flatMap(m => m.lessons).length;
    setProgress(totalLessons > 0 ? (completed / totalLessons) * 100 : 0);
  }, [courseModules, completedLessons]);

  const handleLessonClick = (lessonId: number) => {
    if (isEnrolled) {
      setCompletedLessons(prev => {
        const newSet = new Set(prev);
        newSet.add(lessonId);
        return newSet;
      });
    }
  };

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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLessonClick(lesson.id)}
                        >
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