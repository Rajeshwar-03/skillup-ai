import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Clock, FileText, Download, Star, CheckCircle2, Calendar, BarChart2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { CourseContent } from "@/components/CourseContent";
import { CourseReviews } from "@/components/CourseReviews";
import { Community } from "@/components/Community";
import { checkCourseEnrollment, simulatePayment } from "@/services/chatService";
import { toast } from "sonner";

// Ensure we have default values for potentially missing properties
const getCourseDataWithDefaults = (course) => {
  return {
    ...course,
    outcomes: course.outcomes || [],
    videoHours: course.videoHours || 0,
    articles: course.articles || 0,
    resources: course.resources || 0,
    originalPrice: course.originalPrice || course.price * 1.25,
    updatedAt: course.updatedAt || new Date().toISOString(),
  };
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Fetch course details
        const { data: course, error } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();

        if (error) throw error;
        setCourseData(course);

        // Check enrollment status
        const enrollment = await checkCourseEnrollment(courseId);
        setEnrollmentStatus(enrollment.enrolled ? enrollment.status : null);
      } catch (error) {
        console.error('Error fetching course details:', error);
        toast.error('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleEnrollment = async () => {
    setProcessingPayment(true);
    try {
      const result = await simulatePayment(courseId, 'credit_card');
      if (result.success) {
        toast.success(result.message);
        setEnrollmentStatus('enrolled');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      toast.error('Failed to process enrollment');
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container py-8">
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
        <div className="container py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Course not found</h2>
            <p className="mt-2">The course you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="mt-4">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const courseWithDefaults = getCourseDataWithDefaults(courseData);
  const { 
    title, 
    description, 
    level, 
    instructor, 
    price, 
    originalPrice, 
    rating, 
    ratingCount, 
    students, 
    outcomes, 
    videoHours, 
    articles, 
    resources, 
    updatedAt 
  } = courseWithDefaults;

  const isEnrolled = enrollmentStatus === 'enrolled';
  const discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);
  const formattedDate = new Date(updatedAt).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Layout>
      <div className="container py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Course Info Section */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-lg mt-2 text-muted-foreground">{description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <Badge variant="outline" className="text-sm py-1">
                  {level} Level
                </Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>{rating} ({ratingCount} ratings)</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{students} students</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Updated {formattedDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={instructor?.avatar || ""} alt={instructor?.name} />
                <AvatarFallback>{instructor?.name?.charAt(0) || "I"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{instructor?.name || "Instructor"}</p>
                <p className="text-sm text-muted-foreground">{instructor?.title || "Course Instructor"}</p>
              </div>
            </div>

            <Tabs defaultValue="content">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>
              <TabsContent value="content" className="pt-4">
                <CourseContent courseId={courseId} isEnrolled={isEnrolled} />
              </TabsContent>
              <TabsContent value="reviews" className="pt-4">
                <CourseReviews courseId={courseId} />
              </TabsContent>
              <TabsContent value="community" className="pt-4">
                <Community courseId={courseId} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Course Purchase Card */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={courseData.thumbnail || "/placeholder-course.jpg"} 
                    alt={title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">${price}</div>
                    {originalPrice > price && (
                      <>
                        <div className="text-muted-foreground line-through">${originalPrice}</div>
                        <Badge className="ml-2">{discountPercentage}% off</Badge>
                      </>
                    )}
                  </div>

                  {isEnrolled ? (
                    <Button className="w-full" asChild>
                      <Link to={`/course/${courseId}/learn`}>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Continue Learning
                      </Link>
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={handleEnrollment}
                      disabled={processingPayment}
                    >
                      {processingPayment ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                          Processing...
                        </>
                      ) : (
                        <>Enroll Now</>
                      )}
                    </Button>
                  )}

                  <p className="text-xs text-center text-muted-foreground">
                    30-Day Money-Back Guarantee
                  </p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium">This course includes:</h3>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{videoHours} hours on-demand video</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{articles} articles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span>{resources} downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart2 className="h-4 w-4 text-muted-foreground" />
                      <span>Completion certificate</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="font-medium">What you'll learn:</h3>
                  <ul className="space-y-2">
                    {outcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary mt-1" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetails;
