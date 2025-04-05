import { CourseCard } from "@/components/courses/CourseCard";
import { CoursesHeader } from "@/components/courses/CoursesHeader";
import { useEnrollment } from "@/hooks/useEnrollment";
import { courses } from "@/data/coursesData";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const Courses = () => {
  const {
    enrollmentStatus,
    isLoading,
    handleWatchDemo,
    handleEnroll,
    completeEnrollment
  } = useEnrollment(courses);
  
  const [sortedCourses, setSortedCourses] = useState([...courses]);
  const [sortType, setSortType] = useState("default");
  const [levelFilter, setLevelFilter] = useState("all");

  useEffect(() => {
    let filtered = [...courses];
    
    // Apply level filter
    if (levelFilter !== "all") {
      filtered = filtered.filter(course => course.level.toLowerCase() === levelFilter.toLowerCase());
    }
    
    // Apply sorting
    switch (sortType) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "students":
        filtered.sort((a, b) => b.students - a.students);
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        // Default sorting - keep original order
        break;
    }
    
    setSortedCourses(filtered);
  }, [sortType, levelFilter]);

  const handleSortChange = (value: string) => {
    setSortType(value);
  };

  const handleFilterChange = (value: string) => {
    setLevelFilter(value);
  };

  const resetFilters = () => {
    setSortType("default");
    setLevelFilter("all");
    setSortedCourses([...courses]);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="courses">
      <div className="container mx-auto px-4">
        <CoursesHeader />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-48">
              <Label htmlFor="sort" className="mb-2 block">Sort by</Label>
              <Select value={sortType} onValueChange={handleSortChange}>
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Sort courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="students">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-48">
              <Label htmlFor="level" className="mb-2 block">Filter by Level</Label>
              <Select value={levelFilter} onValueChange={handleFilterChange}>
                <SelectTrigger id="level">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button variant="outline" onClick={resetFilters} className="mt-2 md:mt-0">
            Reset Filters
          </Button>
        </div>

        {sortedCourses.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No courses match your filters</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or browse all courses</p>
            <Button onClick={resetFilters}>Show All Courses</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {sortedCourses.map((course, index) => (
              <div key={course.path} className="flex flex-col mb-8">
                <CourseCard
                  course={course}
                  index={index}
                  enrollmentStatus={enrollmentStatus}
                  isLoading={isLoading}
                  onWatchDemo={handleWatchDemo}
                  onEnroll={handleEnroll}
                  onCompleteEnrollment={completeEnrollment}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
