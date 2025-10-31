import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, TrendingUp, Target } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AssessmentArea {
  skill: string;
  current: number;
  target: number;
  improvement: string;
}

const assessmentAreas: AssessmentArea[] = [
  {
    skill: "Problem Solving",
    current: 75,
    target: 90,
    improvement: "Practice more algorithm challenges"
  },
  {
    skill: "Code Quality",
    current: 82,
    target: 95,
    improvement: "Focus on clean code principles"
  },
  {
    skill: "Time Management",
    current: 68,
    target: 85,
    improvement: "Use Pomodoro technique"
  }
];

export const AssessmentSection = () => {
  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Skills Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Based on your recent activity, here are areas where you can improve.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-6">
          {assessmentAreas.map((area, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{area.skill}</h4>
                <span className="text-sm text-muted-foreground">
                  {area.current}% / {area.target}%
                </span>
              </div>
              <Progress value={area.current} className="h-2" />
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{area.improvement}</span>
              </div>
            </div>
          ))}
          
          <Button className="w-full mt-4">
            Take Full Assessment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
