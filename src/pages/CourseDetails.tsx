import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, Clock, BookOpen, Award, DollarSign, Calendar, Video, MessageSquare, Trophy, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { checkCourseEnrollment, simulatePayment } from "@/services/chatService";
import { Layout } from "@/components/Layout";
import { CourseContent } from "@/components/CourseContent";
import { CourseReviews } from "@/components/reviews/CourseReviews";
import { Community } from "@/components/Community";
import { CourseMaterials } from "@/components/courses/CourseMaterials";
import { LiveSessions } from "@/components/courses/LiveSessions";
import { PaymentOptions } from "@/components/PaymentOptions";

// Ensure we have default values for potentially missing properties
const getCourseDataWithDefaults = (course: any): any => {
  return {
    ...course,
    outcomes: course.outcomes || [],
    video_hours: course.video_hours || 0,
    articles: course.articles || 0,
    resources: course.resources || 0,
    original_price: course.original_price || course.price * 1.25,
    rating_count: course.rating_count || 0,
    students: course.students || 0,
    instructor: course.instructor || {
      name: "Course Instructor",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      bio: "Experienced instructor",
      rating: 4.5
    }
  };
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrollmentStatus, setEnrollmentStatus] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Fetch course details from Supabase
        const { data: course, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();

        if (error) throw error;

        setCourseData(course);

        // Check enrollment status
        const enrollment = await checkCourseEnrollment(courseId!);
        setEnrollmentStatus(enrollment.enrolled);
      } catch (error) {
        console.error('Error fetching course details:', error);
        toast.error('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const handleEnrollment = async (): Promise<void> => {
    try {
      const result = await simulatePayment(courseId!, 'credit_card');
      if (result.success) {
        toast.success(result.message);
        setEnrollmentStatus(true);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error('Failed to process enrollment');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!courseData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Course not found</h2>
            <p className="mt-2">The course you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => window.history.back()} className="mt-4">
              Go Back
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const course = getCourseDataWithDefaults(courseData);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate('/courses')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{course.level}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{course.rating}</span>
                        <span className="text-muted-foreground">({course.rating_count} reviews)</span>
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold">{course.title}</h1>
                    <p className="text-muted-foreground text-lg">{course.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{course.video_hours} hours video</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.articles} articles</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>{course.resources} resources</span>
                      </div>
                    </div>

                    {/* Instructor Info */}
                    {course.instructor && (
                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <img 
                          src={course.instructor.avatar} 
                          alt={course.instructor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold">{course.instructor.name}</h3>
                          <p className="text-sm text-muted-foreground">{course.instructor.bio}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm">{course.instructor.rating} instructor rating</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Course Tabs */}
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  <TabsTrigger value="placements">Placements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="mt-6">
                  <CourseContent courseId={courseId!} isEnrolled={enrollmentStatus} />
                </TabsContent>
                
                <TabsContent value="materials" className="mt-6">
                  <CourseMaterials courseId={courseId!} isEnrolled={enrollmentStatus} />
                </TabsContent>
                
                <TabsContent value="sessions" className="mt-6">
                  <LiveSessions courseId={courseId!} isEnrolled={enrollmentStatus} />
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-6">
                  <CourseReviews courseId={courseId!} />
                </TabsContent>
                
                <TabsContent value="discussions" className="mt-6">
                  <Community courseId={courseId} />
                </TabsContent>
                
                <TabsContent value="placements" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Placement Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">92%</div>
                          <div className="text-sm text-muted-foreground">Placement Rate</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">$75K</div>
                          <div className="text-sm text-muted-foreground">Avg. Starting Salary</div>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">450+</div>
                          <div className="text-sm text-muted-foreground">Students Placed</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold">Recent Placements</h3>
                        <div className="space-y-3">
                          {[
                            { name: "Alex Johnson", company: "Google", role: "Software Engineer", salary: "$120K" },
                            { name: "Sarah Chen", company: "Microsoft", role: "Full Stack Developer", salary: "$95K" },
                            { name: "Mike Rodriguez", company: "Amazon", role: "Cloud Engineer", salary: "$110K" },
                            { name: "Emily Davis", company: "Meta", role: "Frontend Developer", salary: "$105K" }
                          ].map((placement, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div>
                                <div className="font-medium">{placement.name}</div>
                                <div className="text-sm text-muted-foreground">{placement.role} at {placement.company}</div>
                              </div>
                              <div className="font-semibold text-primary">{placement.salary}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Purchase Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Course Access</span>
                    <div className="text-right">
                      {course.original_price && course.original_price > course.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${course.original_price}
                        </span>
                      )}
                      <div className="text-2xl font-bold text-primary">
                        {course.price === 0 ? "Free" : `$${course.price}`}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {enrollmentStatus ? (
                    <div className="text-center">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <h3 className="text-green-800 font-semibold mb-2">✅ Enrolled</h3>
                        <p className="text-green-600 text-sm">You have full access to this course</p>
                      </div>
                      <Button className="w-full" onClick={() => window.location.reload()}>
                        Continue Learning
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {course.price === 0 ? (
                        <Button 
                          className="w-full" 
                          onClick={handleEnrollment}
                        >
                          Enroll for Free
                        </Button>
                      ) : (
                        <Button 
                          className="w-full" 
                          onClick={handleEnrollment}
                        >
                          <DollarSign className="w-4 h-4 mr-2" />
                          Enroll for ${course.price}
                        </Button>
                      )}
                      <p className="text-xs text-muted-foreground text-center">
                        30-day money-back guarantee
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* What You'll Learn */}
              {course.outcomes && (
                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.outcomes.map((outcome: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Course Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Students Enrolled</span>
                    <span className="font-medium">{course.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Video Content</span>
                    <span className="font-medium">{course.video_hours} hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Articles</span>
                    <span className="font-medium">{course.articles}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Resources</span>
                    <span className="font-medium">{course.resources}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Certificate</span>
                    <span className="font-medium">✅ Included</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetails;