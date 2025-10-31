import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

interface Quiz {
  id: string;
  title: string;
  course: string;
  questions: number;
  duration: number;
  completed: boolean;
  score?: number;
}

const sampleQuizzes: Quiz[] = [
  {
    id: "1",
    title: "React Fundamentals Quiz",
    course: "Full Stack Development",
    questions: 20,
    duration: 30,
    completed: true,
    score: 85
  },
  {
    id: "2",
    title: "Machine Learning Basics",
    course: "AI & Machine Learning",
    questions: 15,
    duration: 25,
    completed: true,
    score: 92
  },
  {
    id: "3",
    title: "AWS Core Services",
    course: "Cloud Computing (AWS)",
    questions: 18,
    duration: 30,
    completed: false
  }
];

export const QuizzesSection = () => {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Recent Quizzes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sampleQuizzes.map((quiz) => (
            <div key={quiz.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{quiz.title}</h4>
                  <p className="text-sm text-muted-foreground">{quiz.course}</p>
                </div>
                {quiz.completed ? (
                  <Badge variant="outline" className="bg-green-50">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {quiz.score}%
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-amber-50">
                    <XCircle className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{quiz.questions} questions</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {quiz.duration} min
                </span>
              </div>
              {!quiz.completed && (
                <Button size="sm" className="w-full">Start Quiz</Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
