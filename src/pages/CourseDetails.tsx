import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const CourseDetails = () => {
  const { courseId } = useParams();

  return (
    <div className="min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-8"
      >
        <h1 className="text-4xl font-bold mb-4">Course Details: {courseId}</h1>
        <p className="text-muted-foreground">
          Course content is coming soon. This page will be enhanced with detailed course information,
          curriculum, and interactive learning materials.
        </p>
      </motion.div>
    </div>
  );
};

export default CourseDetails;