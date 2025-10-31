import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Award, BookOpen, Clock } from "lucide-react";

export const StatisticsSection = () => {
  const stats = [
    {
      icon: BookOpen,
      label: "Courses Enrolled",
      value: "8",
      progress: 75,
      color: "text-blue-600"
    },
    {
      icon: Clock,
      label: "Total Hours",
      value: "156",
      progress: 62,
      color: "text-green-600"
    },
    {
      icon: Award,
      label: "Certificates",
      value: "5",
      progress: 83,
      color: "text-purple-600"
    },
    {
      icon: TrendingUp,
      label: "Avg Quiz Score",
      value: "88%",
      progress: 88,
      color: "text-orange-600"
    }
  ];

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Learning Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                    <span className="text-sm font-medium">{stat.label}</span>
                  </div>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <Progress value={stat.progress} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
