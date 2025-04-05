
import { CourseCard } from "@/components/courses/CourseCard";
import { CoursesHeader } from "@/components/courses/CoursesHeader";
import { useEnrollment } from "@/hooks/useEnrollment";
import { courses } from "@/data/coursesData";
import { useEffect, useState } from "react";

export const Courses = () => {
  const {
    enrollmentStatus,
    isLoading,
    handleWatchDemo,
    handleEnroll,
    completeEnrollment
  } = useEnrollment(courses);
  
  const [sortedCourses, setSortedCourses] = useState([...courses]);

  return (
    <section className="py-24 relative overflow-hidden" id="courses">
      <div className="container mx-auto px-4">
        <CoursesHeader />

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
      </div>
    </section>
  );
};
