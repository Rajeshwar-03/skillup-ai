
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
  },
  "devops": {
    id: "devops",
    title: "DevOps & CI/CD",
    description: "Master modern DevOps practices, continuous integration, and continuous deployment workflows.",
    instructor: "Robert Martinez",
    duration: 65,
    modules: [
      {
        title: "DevOps Fundamentals",
        lessons: [
          {
            title: "Introduction to DevOps Culture",
            content: "Understand the DevOps philosophy and its impact on software development.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "DevOps Principles", url: "https://example.com/materials/devops-principles.pdf", type: "PDF" },
              { name: "DevOps Roadmap", url: "https://example.com/materials/devops-roadmap.pdf", type: "PDF" }
            ]
          },
          {
            title: "Version Control with Git",
            content: "Master Git workflows and collaboration strategies.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Git Commands Reference", url: "https://example.com/materials/git-reference.pdf", type: "PDF" },
              { name: "Git Workflow Strategies", url: "https://example.com/materials/git-workflows.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "CI/CD Pipelines",
        lessons: [
          {
            title: "Building CI Pipelines",
            content: "Create automated build and test pipelines.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "CI Best Practices", url: "https://example.com/materials/ci-practices.pdf", type: "PDF" },
              { name: "Jenkins Configuration", url: "https://example.com/materials/jenkins-config.zip", type: "ZIP" }
            ]
          },
          {
            title: "Continuous Deployment Strategies",
            content: "Implement automated deployment workflows.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "CD Patterns", url: "https://example.com/materials/cd-patterns.pdf", type: "PDF" },
              { name: "Deployment Scripts", url: "https://example.com/materials/deploy-scripts.zip", type: "ZIP" }
            ]
          }
        ]
      },
      {
        title: "Containerization & Orchestration",
        lessons: [
          {
            title: "Docker Containerization",
            content: "Learn to containerize applications with Docker.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Docker Guide", url: "https://example.com/materials/docker-guide.pdf", type: "PDF" },
              { name: "Dockerfile Examples", url: "https://example.com/materials/dockerfiles.zip", type: "ZIP" }
            ]
          },
          {
            title: "Kubernetes Orchestration",
            content: "Master container orchestration with Kubernetes.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Kubernetes Basics", url: "https://example.com/materials/k8s-basics.pdf", type: "PDF" },
              { name: "K8s Manifests", url: "https://example.com/materials/k8s-manifests.zip", type: "ZIP" }
            ]
          }
        ]
      }
    ],
    price: 6,
    enrollmentCount: 1500,
    thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    prerequisites: ["Linux basics", "Networking fundamentals", "Basic scripting knowledge"],
    tags: ["DevOps", "CI/CD", "Docker", "Kubernetes", "Jenkins", "Automation"]
  },
  "blockchain": {
    id: "blockchain",
    title: "Blockchain Development",
    description: "Build decentralized applications and smart contracts on various blockchain platforms.",
    instructor: "Alex Thompson",
    duration: 70,
    modules: [
      {
        title: "Blockchain Fundamentals",
        lessons: [
          {
            title: "Understanding Blockchain Technology",
            content: "Learn the core concepts of blockchain and distributed ledger technology.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Blockchain Basics", url: "https://example.com/materials/blockchain-basics.pdf", type: "PDF" },
              { name: "Cryptography Fundamentals", url: "https://example.com/materials/cryptography.pdf", type: "PDF" }
            ]
          },
          {
            title: "Consensus Mechanisms",
            content: "Explore different consensus algorithms and their applications.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Consensus Algorithms", url: "https://example.com/materials/consensus.pdf", type: "PDF" },
              { name: "PoW vs PoS", url: "https://example.com/materials/pow-pos.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "Smart Contract Development",
        lessons: [
          {
            title: "Solidity Programming",
            content: "Master Solidity for Ethereum smart contract development.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Solidity Guide", url: "https://example.com/materials/solidity-guide.pdf", type: "PDF" },
              { name: "Smart Contract Examples", url: "https://example.com/materials/contracts.zip", type: "ZIP" }
            ]
          },
          {
            title: "Smart Contract Security",
            content: "Learn security best practices for smart contracts.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Security Patterns", url: "https://example.com/materials/security-patterns.pdf", type: "PDF" },
              { name: "Audit Checklist", url: "https://example.com/materials/audit-checklist.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "DApp Development",
        lessons: [
          {
            title: "Building Decentralized Applications",
            content: "Create full-stack decentralized applications.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "DApp Architecture", url: "https://example.com/materials/dapp-arch.pdf", type: "PDF" },
              { name: "Web3.js Tutorial", url: "https://example.com/materials/web3js.pdf", type: "PDF" }
            ]
          },
          {
            title: "Deploying on Blockchain Networks",
            content: "Deploy and test your DApps on various networks.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Deployment Guide", url: "https://example.com/materials/deployment.pdf", type: "PDF" },
              { name: "Testing Strategies", url: "https://example.com/materials/testing.pdf", type: "PDF" }
            ]
          }
        ]
      }
    ],
    price: 6,
    enrollmentCount: 1200,
    thumbnailUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
    prerequisites: ["JavaScript programming", "Web development basics", "Understanding of cryptography"],
    tags: ["Blockchain", "Smart Contracts", "Solidity", "Ethereum", "DApp", "Web3"]
  },
  "data-science": {
    id: "data-science",
    title: "Data Science",
    description: "Master data analysis, visualization, and machine learning for data-driven decision making.",
    instructor: "Dr. Lisa Anderson",
    duration: 68,
    modules: [
      {
        title: "Data Analysis Fundamentals",
        lessons: [
          {
            title: "Python for Data Science",
            content: "Learn Python libraries essential for data science.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "NumPy & Pandas Guide", url: "https://example.com/materials/numpy-pandas.pdf", type: "PDF" },
              { name: "Python Data Science Setup", url: "https://example.com/materials/ds-setup.pdf", type: "PDF" }
            ]
          },
          {
            title: "Data Cleaning and Preprocessing",
            content: "Master techniques for cleaning and preparing data.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Data Cleaning Techniques", url: "https://example.com/materials/data-cleaning.pdf", type: "PDF" },
              { name: "Preprocessing Scripts", url: "https://example.com/materials/preprocessing.zip", type: "ZIP" }
            ]
          }
        ]
      },
      {
        title: "Data Visualization",
        lessons: [
          {
            title: "Visualization with Matplotlib & Seaborn",
            content: "Create compelling visualizations with Python libraries.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Visualization Guide", url: "https://example.com/materials/viz-guide.pdf", type: "PDF" },
              { name: "Chart Examples", url: "https://example.com/materials/chart-examples.ipynb", type: "IPYNB" }
            ]
          },
          {
            title: "Interactive Dashboards",
            content: "Build interactive data dashboards.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Dashboard Design", url: "https://example.com/materials/dashboard-design.pdf", type: "PDF" },
              { name: "Plotly Tutorial", url: "https://example.com/materials/plotly.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "Statistical Analysis & ML",
        lessons: [
          {
            title: "Statistical Methods",
            content: "Apply statistical methods to data analysis.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Statistics for Data Science", url: "https://example.com/materials/statistics.pdf", type: "PDF" },
              { name: "Statistical Tests", url: "https://example.com/materials/stat-tests.pdf", type: "PDF" }
            ]
          },
          {
            title: "Machine Learning Models",
            content: "Build and evaluate machine learning models.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "ML Model Guide", url: "https://example.com/materials/ml-models.pdf", type: "PDF" },
              { name: "Scikit-learn Examples", url: "https://example.com/materials/sklearn.zip", type: "ZIP" }
            ]
          }
        ]
      }
    ],
    price: 3,
    enrollmentCount: 2200,
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    prerequisites: ["Python programming", "Basic statistics", "Mathematics fundamentals"],
    tags: ["Data Science", "Python", "Data Analysis", "Visualization", "Statistics", "Machine Learning"]
  },
  "cybersecurity": {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Learn ethical hacking, penetration testing, and security best practices to protect systems.",
    instructor: "James Wilson",
    duration: 75,
    modules: [
      {
        title: "Security Fundamentals",
        lessons: [
          {
            title: "Introduction to Cybersecurity",
            content: "Understand the cybersecurity landscape and threat models.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Cybersecurity Overview", url: "https://example.com/materials/cybersec-overview.pdf", type: "PDF" },
              { name: "Threat Landscape", url: "https://example.com/materials/threats.pdf", type: "PDF" }
            ]
          },
          {
            title: "Network Security Basics",
            content: "Learn fundamental network security concepts.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Network Security Guide", url: "https://example.com/materials/network-sec.pdf", type: "PDF" },
              { name: "Firewall Configuration", url: "https://example.com/materials/firewall.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "Ethical Hacking",
        lessons: [
          {
            title: "Penetration Testing Methodology",
            content: "Master the systematic approach to penetration testing.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Pentest Methodology", url: "https://example.com/materials/pentest-method.pdf", type: "PDF" },
              { name: "Testing Tools", url: "https://example.com/materials/pentest-tools.pdf", type: "PDF" }
            ]
          },
          {
            title: "Vulnerability Assessment",
            content: "Learn to identify and assess system vulnerabilities.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Vulnerability Scanning", url: "https://example.com/materials/vuln-scan.pdf", type: "PDF" },
              { name: "Assessment Templates", url: "https://example.com/materials/assessment.zip", type: "ZIP" }
            ]
          }
        ]
      },
      {
        title: "Security Operations",
        lessons: [
          {
            title: "Security Monitoring & SIEM",
            content: "Implement security monitoring and incident detection.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "SIEM Guide", url: "https://example.com/materials/siem-guide.pdf", type: "PDF" },
              { name: "Log Analysis", url: "https://example.com/materials/log-analysis.pdf", type: "PDF" }
            ]
          },
          {
            title: "Incident Response",
            content: "Learn to respond to and recover from security incidents.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Incident Response Plan", url: "https://example.com/materials/ir-plan.pdf", type: "PDF" },
              { name: "Forensics Basics", url: "https://example.com/materials/forensics.pdf", type: "PDF" }
            ]
          }
        ]
      }
    ],
    price: 6,
    enrollmentCount: 1600,
    thumbnailUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    prerequisites: ["Networking fundamentals", "Linux basics", "Understanding of IT systems"],
    tags: ["Cybersecurity", "Ethical Hacking", "Penetration Testing", "Security", "Network Security"]
  },
  "mobile-dev": {
    id: "mobile-dev",
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications using React Native for iOS and Android.",
    instructor: "Maria Garcia",
    duration: 58,
    modules: [
      {
        title: "React Native Fundamentals",
        lessons: [
          {
            title: "Getting Started with React Native",
            content: "Set up your development environment and create your first app.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "React Native Setup", url: "https://example.com/materials/rn-setup.pdf", type: "PDF" },
              { name: "Environment Configuration", url: "https://example.com/materials/env-config.pdf", type: "PDF" }
            ]
          },
          {
            title: "React Native Components",
            content: "Learn to build UIs with React Native components.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Component Library", url: "https://example.com/materials/components.pdf", type: "PDF" },
              { name: "UI Patterns", url: "https://example.com/materials/ui-patterns.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "Mobile App Features",
        lessons: [
          {
            title: "Navigation in Mobile Apps",
            content: "Implement navigation patterns for mobile applications.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Navigation Guide", url: "https://example.com/materials/navigation.pdf", type: "PDF" },
              { name: "React Navigation", url: "https://example.com/materials/react-nav.pdf", type: "PDF" }
            ]
          },
          {
            title: "Working with APIs",
            content: "Integrate REST APIs and handle data in mobile apps.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "API Integration", url: "https://example.com/materials/api-integration.pdf", type: "PDF" },
              { name: "Fetch & Axios", url: "https://example.com/materials/fetch-axios.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "Publishing & Deployment",
        lessons: [
          {
            title: "Building for Production",
            content: "Prepare your app for production deployment.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Production Build Guide", url: "https://example.com/materials/prod-build.pdf", type: "PDF" },
              { name: "Optimization Tips", url: "https://example.com/materials/optimization.pdf", type: "PDF" }
            ]
          },
          {
            title: "App Store Submission",
            content: "Learn to publish apps on Google Play and App Store.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "App Store Guidelines", url: "https://example.com/materials/app-store.pdf", type: "PDF" },
              { name: "Submission Checklist", url: "https://example.com/materials/submission.pdf", type: "PDF" }
            ]
          }
        ]
      }
    ],
    price: 3,
    enrollmentCount: 2800,
    thumbnailUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    prerequisites: ["JavaScript fundamentals", "React basics", "Mobile development interest"],
    tags: ["Mobile Development", "React Native", "iOS", "Android", "Cross-Platform", "JavaScript"]
  },
  "digital-marketing": {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Master SEO, social media marketing, content marketing, and analytics for digital success.",
    instructor: "Jennifer Lee",
    duration: 52,
    modules: [
      {
        title: "Digital Marketing Fundamentals",
        lessons: [
          {
            title: "Introduction to Digital Marketing",
            content: "Understand the digital marketing ecosystem and strategies.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Digital Marketing Overview", url: "https://example.com/materials/dm-overview.pdf", type: "PDF" },
              { name: "Marketing Channels", url: "https://example.com/materials/channels.pdf", type: "PDF" }
            ]
          },
          {
            title: "Marketing Strategy Development",
            content: "Learn to create effective marketing strategies.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Strategy Framework", url: "https://example.com/materials/strategy.pdf", type: "PDF" },
              { name: "Customer Personas", url: "https://example.com/materials/personas.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "SEO & Content Marketing",
        lessons: [
          {
            title: "Search Engine Optimization",
            content: "Master SEO techniques to improve search rankings.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "SEO Best Practices", url: "https://example.com/materials/seo-practices.pdf", type: "PDF" },
              { name: "Keyword Research", url: "https://example.com/materials/keywords.pdf", type: "PDF" }
            ]
          },
          {
            title: "Content Marketing Strategy",
            content: "Create compelling content that drives engagement.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Content Strategy", url: "https://example.com/materials/content-strategy.pdf", type: "PDF" },
              { name: "Content Calendar", url: "https://example.com/materials/calendar.xlsx", type: "XLSX" }
            ]
          }
        ]
      },
      {
        title: "Social Media & Analytics",
        lessons: [
          {
            title: "Social Media Marketing",
            content: "Build effective social media campaigns.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Social Media Guide", url: "https://example.com/materials/social-media.pdf", type: "PDF" },
              { name: "Platform Strategies", url: "https://example.com/materials/platforms.pdf", type: "PDF" }
            ]
          },
          {
            title: "Analytics & Reporting",
            content: "Measure and analyze marketing performance.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Google Analytics Guide", url: "https://example.com/materials/analytics.pdf", type: "PDF" },
              { name: "KPI Dashboard", url: "https://example.com/materials/kpi-dashboard.xlsx", type: "XLSX" }
            ]
          }
        ]
      }
    ],
    price: 0,
    enrollmentCount: 2600,
    thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    prerequisites: ["No prior experience required", "Basic internet knowledge", "Marketing interest"],
    tags: ["Digital Marketing", "SEO", "Social Media", "Content Marketing", "Analytics", "Marketing Strategy"]
  },
  "iot": {
    id: "iot",
    title: "IoT Development",
    description: "Build smart devices and Internet of Things solutions with sensors, microcontrollers, and cloud integration.",
    instructor: "Kevin Zhang",
    duration: 62,
    modules: [
      {
        title: "IoT Fundamentals",
        lessons: [
          {
            title: "Introduction to IoT",
            content: "Understand IoT architecture and ecosystem.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "IoT Overview", url: "https://example.com/materials/iot-overview.pdf", type: "PDF" },
              { name: "IoT Protocols", url: "https://example.com/materials/iot-protocols.pdf", type: "PDF" }
            ]
          },
          {
            title: "Microcontrollers & Sensors",
            content: "Learn to work with Arduino, Raspberry Pi, and sensors.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Hardware Guide", url: "https://example.com/materials/hardware.pdf", type: "PDF" },
              { name: "Sensor Interfacing", url: "https://example.com/materials/sensors.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "IoT Communication",
        lessons: [
          {
            title: "MQTT & IoT Protocols",
            content: "Implement communication protocols for IoT devices.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "MQTT Tutorial", url: "https://example.com/materials/mqtt.pdf", type: "PDF" },
              { name: "Protocol Comparison", url: "https://example.com/materials/protocol-comp.pdf", type: "PDF" }
            ]
          },
          {
            title: "Cloud Integration",
            content: "Connect IoT devices to cloud platforms.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Cloud Platforms", url: "https://example.com/materials/cloud-platforms.pdf", type: "PDF" },
              { name: "AWS IoT Guide", url: "https://example.com/materials/aws-iot.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "IoT Applications",
        lessons: [
          {
            title: "Smart Home Systems",
            content: "Build home automation solutions.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Smart Home Architecture", url: "https://example.com/materials/smart-home.pdf", type: "PDF" },
              { name: "Home Automation Code", url: "https://example.com/materials/home-auto.zip", type: "ZIP" }
            ]
          },
          {
            title: "Industrial IoT",
            content: "Explore industrial IoT applications and use cases.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "IIoT Overview", url: "https://example.com/materials/iiot.pdf", type: "PDF" },
              { name: "Industry 4.0", url: "https://example.com/materials/industry40.pdf", type: "PDF" }
            ]
          }
        ]
      }
    ],
    price: 6,
    enrollmentCount: 1100,
    thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    prerequisites: ["Basic electronics", "Programming fundamentals", "Understanding of networking"],
    tags: ["IoT", "Internet of Things", "Embedded Systems", "Arduino", "Raspberry Pi", "Sensors"]
  },
  "game-dev": {
    id: "game-dev",
    title: "Game Development",
    description: "Create engaging games using Unity game engine and C# programming.",
    instructor: "Chris Morgan",
    duration: 64,
    modules: [
      {
        title: "Unity Basics",
        lessons: [
          {
            title: "Getting Started with Unity",
            content: "Learn the Unity interface and basic game development concepts.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Unity Installation", url: "https://example.com/materials/unity-install.pdf", type: "PDF" },
              { name: "Unity Interface Guide", url: "https://example.com/materials/unity-interface.pdf", type: "PDF" }
            ]
          },
          {
            title: "C# for Unity",
            content: "Master C# programming for game development.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "C# Basics", url: "https://example.com/materials/csharp-basics.pdf", type: "PDF" },
              { name: "Unity Scripting", url: "https://example.com/materials/unity-scripting.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "Game Mechanics",
        lessons: [
          {
            title: "Physics and Collisions",
            content: "Implement game physics and collision detection.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Physics in Unity", url: "https://example.com/materials/unity-physics.pdf", type: "PDF" },
              { name: "Collision Examples", url: "https://example.com/materials/collisions.zip", type: "ZIP" }
            ]
          },
          {
            title: "Animation Systems",
            content: "Create smooth animations for game characters.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Animation Guide", url: "https://example.com/materials/animation.pdf", type: "PDF" },
              { name: "Animator Controller", url: "https://example.com/materials/animator.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "Game Production",
        lessons: [
          {
            title: "UI/UX for Games",
            content: "Design intuitive game interfaces and experiences.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Game UI Design", url: "https://example.com/materials/game-ui.pdf", type: "PDF" },
              { name: "UX Best Practices", url: "https://example.com/materials/game-ux.pdf", type: "PDF" }
            ]
          },
          {
            title: "Publishing Your Game",
            content: "Learn to build and publish games on various platforms.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Build Settings", url: "https://example.com/materials/build-settings.pdf", type: "PDF" },
              { name: "Publishing Guide", url: "https://example.com/materials/publishing.pdf", type: "PDF" }
            ]
          }
        ]
      }
    ],
    price: 3,
    enrollmentCount: 1900,
    thumbnailUrl: "https://images.unsplash.com/photo-1556438064-2d7646166914",
    prerequisites: ["Basic programming knowledge", "Computer graphics interest", "Creative mindset"],
    tags: ["Game Development", "Unity", "C#", "3D Graphics", "Game Design", "Animation"]
  },
  "cloud-native": {
    id: "cloud-native",
    title: "Cloud Native Development",
    description: "Master cloud-native architecture patterns, Kubernetes orchestration, and microservices.",
    instructor: "Steven Clark",
    duration: 70,
    modules: [
      {
        title: "Cloud Native Fundamentals",
        lessons: [
          {
            title: "Introduction to Cloud Native",
            content: "Understand cloud-native principles and architecture.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Cloud Native Principles", url: "https://example.com/materials/cn-principles.pdf", type: "PDF" },
              { name: "12-Factor App", url: "https://example.com/materials/12factor.pdf", type: "PDF" }
            ]
          },
          {
            title: "Microservices Architecture",
            content: "Learn to design and implement microservices.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Microservices Patterns", url: "https://example.com/materials/ms-patterns.pdf", type: "PDF" },
              { name: "Service Design", url: "https://example.com/materials/service-design.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "Kubernetes Deep Dive",
        lessons: [
          {
            title: "Kubernetes Architecture",
            content: "Master Kubernetes components and architecture.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "K8s Architecture", url: "https://example.com/materials/k8s-arch.pdf", type: "PDF" },
              { name: "Cluster Setup", url: "https://example.com/materials/cluster-setup.pdf", type: "PDF" }
            ]
          },
          {
            title: "Advanced Kubernetes",
            content: "Implement advanced K8s patterns and operators.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "K8s Operators", url: "https://example.com/materials/operators.pdf", type: "PDF" },
              { name: "Helm Charts", url: "https://example.com/materials/helm.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "Service Mesh & Observability",
        lessons: [
          {
            title: "Service Mesh with Istio",
            content: "Implement service mesh for microservices communication.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Istio Guide", url: "https://example.com/materials/istio.pdf", type: "PDF" },
              { name: "Traffic Management", url: "https://example.com/materials/traffic-mgmt.pdf", type: "PDF" }
            ]
          },
          {
            title: "Observability & Monitoring",
            content: "Implement comprehensive monitoring and logging.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Observability Stack", url: "https://example.com/materials/observability.pdf", type: "PDF" },
              { name: "Prometheus & Grafana", url: "https://example.com/materials/prom-grafana.pdf", type: "PDF" }
            ]
          }
        ]
      }
    ],
    price: 6,
    enrollmentCount: 1400,
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    prerequisites: ["Docker knowledge", "Linux fundamentals", "Networking basics", "Programming experience"],
    tags: ["Cloud Native", "Kubernetes", "Microservices", "Docker", "Service Mesh", "DevOps"]
  },
  "data-engineering": {
    id: "data-engineering",
    title: "Data Engineering",
    description: "Build robust data pipelines, data warehouses, and infrastructure for large-scale data processing.",
    instructor: "Dr. Amanda Roberts",
    duration: 72,
    modules: [
      {
        title: "Data Engineering Foundations",
        lessons: [
          {
            title: "Introduction to Data Engineering",
            content: "Understand the role and responsibilities of data engineers.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "Data Engineering Overview", url: "https://example.com/materials/de-overview.pdf", type: "PDF" },
              { name: "Data Architecture", url: "https://example.com/materials/data-arch.pdf", type: "PDF" }
            ]
          },
          {
            title: "Data Modeling",
            content: "Learn to design effective data models.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Data Modeling Guide", url: "https://example.com/materials/data-modeling.pdf", type: "PDF" },
              { name: "Schema Design", url: "https://example.com/materials/schema-design.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "Data Pipeline Development",
        lessons: [
          {
            title: "ETL/ELT Processes",
            content: "Build efficient ETL and ELT pipelines.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "ETL Best Practices", url: "https://example.com/materials/etl-practices.pdf", type: "PDF" },
              { name: "Apache Airflow", url: "https://example.com/materials/airflow.pdf", type: "PDF" }
            ]
          },
          {
            title: "Stream Processing",
            content: "Implement real-time data processing pipelines.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Stream Processing Guide", url: "https://example.com/materials/stream-processing.pdf", type: "PDF" },
              { name: "Apache Kafka", url: "https://example.com/materials/kafka.pdf", type: "PDF" }
            ]
          }
        ]
      },
      {
        title: "Data Warehousing & Analytics",
        lessons: [
          {
            title: "Data Warehouse Design",
            content: "Design and implement data warehouses.",
            videoUrl: videoUrls.default[0],
            materials: [
              { name: "DW Architecture", url: "https://example.com/materials/dw-arch.pdf", type: "PDF" },
              { name: "Star Schema Design", url: "https://example.com/materials/star-schema.pdf", type: "PDF" }
            ]
          },
          {
            title: "Big Data Technologies",
            content: "Work with Spark, Hadoop, and other big data tools.",
            videoUrl: videoUrls.default[1],
            materials: [
              { name: "Apache Spark Guide", url: "https://example.com/materials/spark.pdf", type: "PDF" },
              { name: "Big Data Ecosystem", url: "https://example.com/materials/big-data.pdf", type: "PDF" }
            ]
          }
        ]
      }
    ],
    price: 6,
    enrollmentCount: 1300,
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    prerequisites: ["SQL proficiency", "Python programming", "Database fundamentals", "Cloud platform knowledge"],
    tags: ["Data Engineering", "ETL", "Data Pipelines", "Big Data", "Spark", "Data Warehousing"]
  }
};

export default courseDetailsData;
