
import { motion } from "framer-motion";

export const CoursesHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold mb-4 gradient-text">Popular Courses</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Start your learning journey with our most popular and in-demand courses
      </p>
    </motion.div>
  );
};
