
import { courses } from "@/data/coursesData";

// Sample videos and materials for each course
const videoUrls = {
  fullStack: [
    "https://sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4",
    "https://sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4",
    "https://sample-videos.com/video/mp4/720/big_buck_bunny_720p_5mb.mp4"
  ],
  aiMl: [
    "https://sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4",
    "https://sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4",
    "https://sample-videos.com/video/mp4/720/big_buck_bunny_720p_5mb.mp4"
  ],
  aws: [
    "https://sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4",
    "https://sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4",
    "https://sample-videos.com/video/mp4/720/big_buck_bunny_720p_5mb.mp4"
  ],
  default: [
    "https://sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4",
    "https://sample-videos.com/video/mp4/720/big_buck_bunny_720p_2mb.mp4" 
  ]
};

export const courseDetailsData = {
  "full-stack": {
    id: "full-stack",
    title: "Full Stack Development",
    description: "Master MERN stack and modern web development practices to build complete applications from front to back end.",
    instructor: "John Doe",
    duration: 60,
    modules: [
      {
        title: "Introduction to Web Development",
        lessons: [
          {
            title: "Understanding the Web Stack",
            content: "Learn the fundamentals of how web technologies work together.",
            videoUrl: videoUrls.fullStack[0],
            materials: [
              {
                name: "Web Stack Overview",
                url: "https://example.com/materials/web-stack.pdf",
                type: "PDF"
              },
              {
                name: "Modern Web Architecture",
                url: "https://example.com/materials/web-architecture.pdf",
                type: "PDF"
              }
            ]
          },
          {
            title: "Setting Up Your Development Environment",
            content: "Configure your local environment for modern web development.",
            videoUrl: videoUrls.fullStack[1],
            materials: [
              {
                name: "Dev Setup Guide",
                url: "https://example.com/materials/dev-setup.pdf",
                type: "PDF"
              },
              {
                name: "Tool Installation Checklist",
                url: "https://example.com/materials/tools-checklist.docx",
                type: "DOCX"
              }
            ]
          }
        ]
      },
      {
        title: "Frontend Development with React",
        lessons: [
          {
            title: "React Fundamentals",
            content: "Learn the core concepts of React including components and JSX.",
            videoUrl: videoUrls.fullStack[2],
            materials: [
              {
                name: "React Cheat Sheet",
                url: "https://example.com/materials/react-cheatsheet.pdf",
                type: "PDF"
              },
              {
                name: "Component Examples",
                url: "https://example.com/materials/component-examples.zip",
                type: "ZIP"
              }
            ]
          },
          {
            title: "State Management with Redux",
            content: "Master global state management using Redux.",
            videoUrl: videoUrls.fullStack[0],
            materials: [
              {
                name: "Redux Flow Diagram",
                url: "https://example.com/materials/redux-flow.pdf",
                type: "PDF"
              },
              {
                name: "Redux Code Examples",
                url: "https://example.com/materials/redux-examples.zip",
                type: "ZIP"
              }
            ]
          }
        ]
      },
      {
        title: "Backend Development with Node.js",
        lessons: [
          {
            title: "Building RESTful APIs",
            content: "Learn how to create robust RESTful APIs with Node.js and Express.",
            videoUrl: videoUrls.fullStack[1],
            materials: [
              {
                name: "REST API Design Guide",
                url: "https://example.com/materials/rest-design.pdf",
                type: "PDF"
              },
              {
                name: "Express Router Examples",
                url: "https://example.com/materials/express-examples.js",
                type: "JS"
              }
            ]
          },
          {
            title: "Database Integration with MongoDB",
            content: "Connect your Node.js application to MongoDB for persistent data storage.",
            videoUrl: videoUrls.fullStack[2],
            materials: [
              {
                name: "MongoDB Schema Design",
                url: "https://example.com/materials/mongodb-schema.pdf",
                type: "PDF"
              },
              {
                name: "Mongoose Models Examples",
                url: "https://example.com/materials/mongoose-examples.zip",
                type: "ZIP"
              }
            ]
          }
        ]
      }
    ],
    price: 3,
    enrollmentCount: 2500,
    thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    prerequisites: ["Basic HTML", "CSS", "JavaScript fundamentals", "Basic command line usage"],
    tags: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "Web Development"]
  },
  "ai-ml": {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Deep dive into artificial intelligence, machine learning techniques, and neural networks for building intelligent systems.",
    instructor: "Dr. Sarah Chen",
    duration: 72,
    modules: [
      {
        title: "Foundations of Machine Learning",
        lessons: [
          {
            title: "Introduction to AI and ML",
            content: "Understand the basic concepts of artificial intelligence and machine learning.",
            videoUrl: videoUrls.aiMl[0],
            materials: [
              {
                name: "AI ML Overview Slides",
                url: "https://example.com/materials/ai-ml-overview.pdf",
                type: "PDF"
              },
              {
                name: "History of AI",
                url: "https://example.com/materials/ai-history.pdf",
                type: "PDF"
              }
            ]
          },
          {
            title: "Supervised Learning Algorithms",
            content: "Learn about fundamental supervised learning algorithms like linear regression and decision trees.",
            videoUrl: videoUrls.aiMl[1],
            materials: [
              {
                name: "Supervised Learning Guide",
                url: "https://example.com/materials/supervised-learning.pdf",
                type: "PDF"
              },
              {
                name: "Algorithm Comparison Chart",
                url: "https://example.com/materials/algorithm-comparison.xlsx",
                type: "XLSX"
              }
            ]
          }
        ]
      },
      {
        title: "Deep Learning",
        lessons: [
          {
            title: "Neural Networks Fundamentals",
            content: "Understand the structure and function of artificial neural networks.",
            videoUrl: videoUrls.aiMl[2],
            materials: [
              {
                name: "Neural Network Architecture",
                url: "https://example.com/materials/neural-networks.pdf",
                type: "PDF"
              },
              {
                name: "Backpropagation Explained",
                url: "https://example.com/materials/backpropagation.pdf",
                type: "PDF"
              }
            ]
          },
          {
            title: "Building Models with TensorFlow",
            content: "Learn to implement neural networks using the TensorFlow framework.",
            videoUrl: videoUrls.aiMl[0],
            materials: [
              {
                name: "TensorFlow Getting Started",
                url: "https://example.com/materials/tensorflow-guide.pdf",
                type: "PDF"
              },
              {
                name: "Model Examples",
                url: "https://example.com/materials/tensorflow-examples.zip",
                type: "ZIP"
              }
            ]
          }
        ]
      },
      {
        title: "Applied Machine Learning",
        lessons: [
          {
            title: "Computer Vision Applications",
            content: "Explore applications of machine learning in computer vision.",
            videoUrl: videoUrls.aiMl[1],
            materials: [
              {
                name: "Computer Vision Overview",
                url: "https://example.com/materials/computer-vision.pdf",
                type: "PDF"
              },
              {
                name: "Image Recognition Code",
                url: "https://example.com/materials/image-recognition.zip",
                type: "ZIP"
              }
            ]
          },
          {
            title: "Natural Language Processing",
            content: "Learn how to process and analyze human language using machine learning.",
            videoUrl: videoUrls.aiMl[2],
            materials: [
              {
                name: "NLP Techniques",
                url: "https://example.com/materials/nlp-techniques.pdf",
                type: "PDF"
              },
              {
                name: "Text Analysis Examples",
                url: "https://example.com/materials/text-analysis.ipynb",
                type: "IPYNB"
              }
            ]
          }
        ]
      }
    ],
    price: 6,
    enrollmentCount: 1800,
    thumbnailUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    prerequisites: ["Python programming", "Basic statistics", "Linear algebra", "Probability theory"],
    tags: ["Artificial Intelligence", "Machine Learning", "Neural Networks", "Python", "TensorFlow", "Data Science"]
  },
  "aws": {
    id: "aws",
    title: "Cloud Computing (AWS)",
    description: "Learn Amazon Web Services from the ground up and master cloud architecture and deployment.",
    instructor: "Michael Johnson",
    duration: 55,
    modules: [
      {
        title: "AWS Fundamentals",
        lessons: [
          {
            title: "Introduction to Cloud Computing",
            content: "Understand the basics of cloud computing and its benefits.",
            videoUrl: videoUrls.aws[0],
            materials: [
              {
                name: "Cloud Computing Basics",
                url: "https://example.com/materials/cloud-basics.pdf",
                type: "PDF"
              },
              {
                name: "AWS Account Setup",
                url: "https://example.com/materials/aws-setup.pdf",
                type: "PDF"
              }
            ]
          },
          {
            title: "AWS Console and CLI",
            content: "Learn to navigate the AWS Management Console and use the Command Line Interface.",
            videoUrl: videoUrls.aws[1],
            materials: [
              {
                name: "AWS Console Guide",
                url: "https://example.com/materials/aws-console.pdf",
                type: "PDF"
              },
              {
                name: "AWS CLI Commands",
                url: "https://example.com/materials/aws-cli.pdf",
                type: "PDF"
              }
            ]
          }
        ]
      },
      {
        title: "AWS Core Services",
        lessons: [
          {
            title: "EC2 and Virtual Servers",
            content: "Master Amazon EC2 for scalable computing in the cloud.",
            videoUrl: videoUrls.aws[2],
            materials: [
              {
                name: "EC2 Instance Types",
                url: "https://example.com/materials/ec2-types.pdf",
                type: "PDF"
              },
              {
                name: "EC2 Best Practices",
                url: "https://example.com/materials/ec2-best-practices.pdf",
                type: "PDF"
              }
            ]
          },
          {
            title: "S3 Storage Solutions",
            content: "Learn to use Amazon S3 for scalable storage in the cloud.",
            videoUrl: videoUrls.aws[0],
            materials: [
              {
                name: "S3 Storage Classes",
                url: "https://example.com/materials/s3-classes.pdf",
                type: "PDF"
              },
              {
                name: "S3 Security Guide",
                url: "https://example.com/materials/s3-security.pdf",
                type: "PDF"
              }
            ]
          }
        ]
      },
      {
        title: "Advanced AWS Architecture",
        lessons: [
          {
            title: "Building Serverless Applications",
            content: "Learn to build applications using AWS Lambda and API Gateway.",
            videoUrl: videoUrls.aws[1],
            materials: [
              {
                name: "Serverless Architecture",
                url: "https://example.com/materials/serverless.pdf",
                type: "PDF"
              },
              {
                name: "Lambda Function Examples",
                url: "https://example.com/materials/lambda-examples.zip",
                type: "ZIP"
              }
            ]
          },
          {
            title: "AWS Security Best Practices",
            content: "Implement security best practices for your AWS resources.",
            videoUrl: videoUrls.aws[2],
            materials: [
              {
                name: "AWS Security Checklist",
                url: "https://example.com/materials/security-checklist.pdf",
                type: "PDF"
              },
              {
                name: "IAM Policy Examples",
                url: "https://example.com/materials/iam-policies.json",
                type: "JSON"
              }
            ]
          }
        ]
      }
    ],
    price: 3,
    enrollmentCount: 2100,
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    prerequisites: ["Basic IT knowledge", "Networking fundamentals", "Linux basics"],
    tags: ["AWS", "Cloud Computing", "Serverless", "EC2", "S3", "Lambda"]
  },
  "ui-ux": {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Create stunning user interfaces and experiences using modern design principles and tools.",
    instructor: "Emily Chen",
    duration: 45,
    modules: [
      {
        title: "Design Fundamentals",
        lessons: [
          {
            title: "Principles of Visual Design",
            content: "Learn the core principles that make designs effective and appealing.",
            videoUrl: videoUrls.default[0],
            materials: [
              {
                name: "Visual Design Principles",
                url: "https://example.com/materials/visual-design.pdf",
                type: "PDF"
              },
              {
                name: "Color Theory Guide",
                url: "https://example.com/materials/color-theory.pdf",
                type: "PDF"
              }
            ]
          },
          {
            title: "Typography and Layout",
            content: "Master the art of typography and layout for effective communication.",
            videoUrl: videoUrls.default[1],
            materials: [
              {
                name: "Typography Fundamentals",
                url: "https://example.com/materials/typography.pdf",
                type: "PDF"
              },
              {
                name: "Grid Systems",
                url: "https://example.com/materials/grid-systems.pdf",
                type: "PDF"
              }
            ]
          }
        ]
      },
      {
        title: "User Experience Design",
        lessons: [
          {
            title: "User Research Methods",
            content: "Learn effective techniques for understanding user needs and behaviors.",
            videoUrl: videoUrls.default[0],
            materials: [
              {
                name: "User Research Toolkit",
                url: "https://example.com/materials/user-research.pdf",
                type: "PDF"
              },
              {
                name: "Interview Templates",
                url: "https://example.com/materials/interview-templates.docx",
                type: "DOCX"
              }
            ]
          },
          {
            title: "Creating User Personas",
            content: "Develop detailed user personas to guide your design decisions.",
            videoUrl: videoUrls.default[1],
            materials: [
              {
                name: "Persona Templates",
                url: "https://example.com/materials/persona-templates.pdf",
                type: "PDF"
              },
              {
                name: "Persona Examples",
                url: "https://example.com/materials/persona-examples.pdf",
                type: "PDF"
              }
            ]
          }
        ]
      },
      {
        title: "UI Design Tools",
        lessons: [
          {
            title: "Designing with Figma",
            content: "Master the popular design tool Figma for creating user interfaces.",
            videoUrl: videoUrls.default[0],
            materials: [
              {
                name: "Figma Getting Started",
                url: "https://example.com/materials/figma-basics.pdf",
                type: "PDF"
              },
              {
                name: "Figma Components",
                url: "https://example.com/materials/figma-components.pdf",
                type: "PDF"
              }
            ]
          },
          {
            title: "Prototyping Interactions",
            content: "Learn to create interactive prototypes that simulate user interactions.",
            videoUrl: videoUrls.default[1],
            materials: [
              {
                name: "Prototyping Guide",
                url: "https://example.com/materials/prototyping.pdf",
                type: "PDF"
              },
              {
                name: "Animation Principles",
                url: "https://example.com/materials/animation.pdf",
                type: "PDF"
              }
            ]
          }
        ]
      }
    ],
    price: 0,
    enrollmentCount: 3000,
    thumbnailUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    prerequisites: ["None required", "Basic computer skills", "Interest in design"],
    tags: ["UI Design", "UX Design", "Figma", "Typography", "Visual Design", "Prototyping"]
  },
  "python": {
    id: "python",
    title: "Python Programming",
    description: "Master Python for automation, web development, data analysis, and more.",
    instructor: "David Brown",
    duration: 50,
    modules: [
      {
        title: "Python Fundamentals",
        lessons: [
          {
            title: "Getting Started with Python",
            content: "Set up your Python environment and learn the basics of the language.",
            videoUrl: videoUrls.default[0],
            materials: [
              {
                name: "Python Installation Guide",
                url: "https://example.com/materials/python-install.pdf",
                type: "PDF"
              },
              {
                name: "Python Syntax Cheatsheet",
                url: "https://example.com/materials/python-syntax.pdf",
                type: "PDF"
              }
            ]
          },
          {
            title: "Variables and Data Types",
            content: "Learn about Python's data types and how to work with variables.",
            videoUrl: videoUrls.default[1],
            materials: [
              {
                name: "Python Data Types",
                url: "https://example.com/materials/python-datatypes.pdf",
                type: "PDF"
              },
              {
                name: "Practice Exercises",
                url: "https://example.com/materials/datatypes-exercises.py",
                type: "PY"
              }
            ]
          }
        ]
      },
      {
        title: "Python Control Structures",
        lessons: [
          {
            title: "Conditional Statements",
            content: "Master if/else statements and control flow in Python.",
            videoUrl: videoUrls.default[0],
            materials: [
              {
                name: "Conditionals Guide",
                url: "https://example.com/materials/conditionals.pdf",
                type: "PDF"
              },
              {
                name: "Practice Problems",
                url: "https://example.com/materials/conditional-problems.py",
                type: "PY"
              }
            ]
          },
          {
            title: "Loops and Iterations",
            content: "Learn how to use for and while loops for repeated tasks.",
            videoUrl: videoUrls.default[1],
            materials: [
              {
                name: "Loops in Python",
                url: "https://example.com/materials/loops.pdf",
                type: "PDF"
              },
              {
                name: "Loop Examples",
                url: "https://example.com/materials/loop-examples.py",
                type: "PY"
              }
            ]
          }
        ]
      },
      {
        title: "Python Functions and Modules",
        lessons: [
          {
            title: "Creating Functions",
            content: "Learn to write reusable functions in Python.",
            videoUrl: videoUrls.default[0],
            materials: [
              {
                name: "Functions Guide",
                url: "https://example.com/materials/functions.pdf",
                type: "PDF"
              },
              {
                name: "Function Examples",
                url: "https://example.com/materials/function-examples.py",
                type: "PY"
              }
            ]
          },
          {
            title: "Working with Modules",
            content: "Learn how to import and use Python modules and packages.",
            videoUrl: videoUrls.default[1],
            materials: [
              {
                name: "Modules and Packages",
                url: "https://example.com/materials/modules.pdf",
                type: "PDF"
              },
              {
                name: "Popular Libraries Overview",
                url: "https://example.com/materials/libraries.pdf",
                type: "PDF"
              }
            ]
          }
        ]
      }
    ],
    price: 0,
    enrollmentCount: 3500,
    thumbnailUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
    prerequisites: ["No programming experience required", "Basic computer skills"],
    tags: ["Python", "Programming", "Automation", "Scripting", "Beginner"]
  }
};

// Generate course details for other courses using a default template
courses.forEach(course => {
  if (!courseDetailsData[course.path]) {
    courseDetailsData[course.path] = {
      id: course.path,
      title: course.title,
      description: course.description,
      instructor: "Expert Instructor",
      duration: 40 + Math.floor(Math.random() * 30),
      modules: [
        {
          title: `Introduction to ${course.title}`,
          lessons: [
            {
              title: "Getting Started",
              content: `Learn the basics of ${course.title}.`,
              videoUrl: videoUrls.default[0],
              materials: [
                {
                  name: "Course Overview",
                  url: "https://example.com/materials/overview.pdf",
                  type: "PDF"
                },
                {
                  name: "Getting Started Guide",
                  url: "https://example.com/materials/getting-started.pdf",
                  type: "PDF"
                }
              ]
            },
            {
              title: "Core Concepts",
              content: `Understand the fundamental concepts of ${course.title}.`,
              videoUrl: videoUrls.default[1],
              materials: [
                {
                  name: "Core Concepts Guide",
                  url: "https://example.com/materials/core-concepts.pdf",
                  type: "PDF"
                },
                {
                  name: "Practice Exercises",
                  url: "https://example.com/materials/exercises.zip",
                  type: "ZIP"
                }
              ]
            }
          ]
        },
        {
          title: "Intermediate Topics",
          lessons: [
            {
              title: "Advanced Techniques",
              content: `Explore advanced techniques in ${course.title}.`,
              videoUrl: videoUrls.default[0],
              materials: [
                {
                  name: "Advanced Guide",
                  url: "https://example.com/materials/advanced.pdf",
                  type: "PDF"
                },
                {
                  name: "Example Projects",
                  url: "https://example.com/materials/projects.zip",
                  type: "ZIP"
                }
              ]
            },
            {
              title: "Best Practices",
              content: `Learn industry best practices for ${course.title}.`,
              videoUrl: videoUrls.default[1],
              materials: [
                {
                  name: "Best Practices Guide",
                  url: "https://example.com/materials/best-practices.pdf",
                  type: "PDF"
                },
                {
                  name: "Code Examples",
                  url: "https://example.com/materials/code-examples.zip",
                  type: "ZIP"
                }
              ]
            }
          ]
        }
      ],
      price: course.price,
      enrollmentCount: course.students,
      thumbnailUrl: course.image,
      prerequisites: ["Basic knowledge in the field", "Enthusiasm to learn"],
      tags: course.title.split(" ").concat(["Online Course", "SkillUp AI"])
    };
  }
});

export default courseDetailsData;
