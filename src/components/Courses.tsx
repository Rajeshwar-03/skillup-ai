import { motion } from "framer-motion";
import { BookOpen, Video, MessageSquare, Trophy, Star } from "lucide-react";

const courses = [
  {
    title: "Web Development",
    description: "Learn modern web development with hands-on projects",
    level: "Beginner",
    rating: 4.8,
    students: 1200,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  },
  {
    title: "Data Science",
    description: "Master data analysis and machine learning",
    level: "Intermediate",
    rating: 4.9,
    students: 800,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
  },
  {
    title: "Digital Marketing",
    description: "Learn to grow businesses in the digital age",
    level: "Beginner",
    rating: 4.7,
    students: 1500,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
  }
];

export const Courses = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Popular Courses</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start your learning journey with our most popular courses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="text-sm">{course.students} students</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};