import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Book, Star, Trophy, Calendar } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signup');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfile(profile);
    } catch (error) {
      toast.error("Error loading profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3]">
      <Navigation />
      
      <Button 
        onClick={() => navigate(-1)} 
        variant="ghost" 
        className="fixed top-24 left-4 z-50"
      >
        <ArrowLeft className="mr-2" />
        Back
      </Button>

      <main className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <Card className="lg:col-span-3 glass">
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-4">{profile?.first_name} {profile?.last_name}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                    <Progress value={75} className="mt-2" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="text-primary" />
                      <span>Rank: #42</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-400" />
                      <span>Points: 1250</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strengths & Weaknesses */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Skills Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Strengths</h4>
                  <ul className="list-disc list-inside">
                    {profile?.strengths?.map((strength: string, index: number) => (
                      <li key={index}>{strength}</li>
                    )) || <li>No strengths recorded yet</li>}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Areas for Improvement</h4>
                  <ul className="list-disc list-inside">
                    {profile?.weaknesses?.map((weakness: string, index: number) => (
                      <li key={index}>{weakness}</li>
                    )) || <li>No areas recorded yet</li>}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Tasks */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Daily Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add daily tasks here */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Complete React Tutorial</h4>
                    <Calendar className="text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Due today</p>
                  <Button className="w-full">Start Task</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add recommendations here */}
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <Book className="text-primary" />
                  <div>
                    <h4 className="font-semibold">Advanced JavaScript Concepts</h4>
                    <p className="text-sm text-muted-foreground">Based on your progress</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;