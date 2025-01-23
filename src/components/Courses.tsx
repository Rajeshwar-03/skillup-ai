import { motion } from "framer-motion";
import { BookOpen, Video, MessageSquare, Trophy, Star } from "lucide-react";
import { Link } from "react-router-dom";

const courses = [
  {
    title: "Full Stack Development",
    description: "Master MERN stack and modern web development",
    level: "Intermediate",
    rating: 4.8,
    students: 2500,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    path: "full-stack"
  },
  {
    title: "AI & Machine Learning",
    description: "Deep dive into AI, ML, and Neural Networks",
    level: "Advanced",
    rating: 4.9,
    students: 1800,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    path: "ai-ml"
  },
  {
    title: "Cloud Computing (AWS)",
    description: "Learn AWS services and cloud architecture",
    level: "Intermediate",
    rating: 4.7,
    students: 2100,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    path: "aws"
  },
  {
    title: "DevOps & CI/CD",
    description: "Master modern DevOps practices and tools",
    level: "Advanced",
    rating: 4.8,
    students: 1500,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    path: "devops"
  },
  {
    title: "Blockchain Development",
    description: "Build decentralized apps and smart contracts",
    level: "Advanced",
    rating: 4.6,
    students: 1200,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
    path: "blockchain"
  },
  {
    title: "UI/UX Design",
    description: "Create stunning user interfaces and experiences",
    level: "Beginner",
    rating: 4.9,
    students: 3000,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    path: "ui-ux"
  },
  {
    title: "Data Science",
    description: "Master data analysis and visualization",
    level: "Intermediate",
    rating: 4.8,
    students: 2200,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    path: "data-science"
  },
  {
    title: "Cybersecurity",
    description: "Learn ethical hacking and security practices",
    level: "Advanced",
    rating: 4.7,
    students: 1600,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    path: "cybersecurity"
  },
  {
    title: "Mobile App Development",
    description: "Build iOS and Android apps with React Native",
    level: "Intermediate",
    rating: 4.8,
    students: 2800,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    path: "mobile-dev"
  },
  {
    title: "Python Programming",
    description: "Master Python for automation and development",
    level: "Beginner",
    rating: 4.9,
    students: 3500,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
    path: "python"
  },
  {
    title: "Digital Marketing",
    description: "Learn SEO, SEM, and social media marketing",
    level: "Beginner",
    rating: 4.7,
    students: 2600,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    path: "digital-marketing"
  },
  {
    title: "IoT Development",
    description: "Build smart devices and IoT solutions",
    level: "Advanced",
    rating: 4.6,
    students: 1100,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    path: "iot"
  },
  {
    title: "Game Development",
    description: "Create games with Unity and C#",
    level: "Intermediate",
    rating: 4.8,
    students: 1900,
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914",
    path: "game-dev"
  },
  {
    title: "Cloud Native Development",
    description: "Master Kubernetes and microservices",
    level: "Advanced",
    rating: 4.7,
    students: 1400,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    path: "cloud-native"
  },
  {
    title: "Data Engineering",
    description: "Build robust data pipelines and infrastructure",
    level: "Advanced",
    rating: 4.8,
    students: 1300,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    path: "data-engineering"
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
            Start your learning journey with our most popular and in-demand courses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <Link to={`/course/${course.path}`} className="block">
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};