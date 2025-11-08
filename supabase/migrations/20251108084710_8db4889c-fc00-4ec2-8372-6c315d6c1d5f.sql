
-- Insert missing courses into the courses table
INSERT INTO courses (id, title, description, level, rating, students, thumbnail, price, original_price, video_hours, articles, resources, rating_count, instructor, outcomes)
VALUES 
('devops', 'DevOps & CI/CD', 'Master modern DevOps practices and tools', 'Advanced', 4.8, 1500, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6', 6, 7.5, 65, 45, 30, 350, 
'{"name": "Robert Martinez", "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e", "bio": "DevOps Expert with 10+ years", "rating": 4.9}'::jsonb,
ARRAY['Master CI/CD pipelines', 'Docker and Kubernetes', 'Infrastructure as Code', 'Automated deployments', 'Monitoring and logging']),

('blockchain', 'Blockchain Development', 'Build decentralized apps and smart contracts', 'Advanced', 4.6, 1200, 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0', 6, 7.5, 70, 40, 25, 280, 
'{"name": "Alex Thompson", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", "bio": "Blockchain Developer & Instructor", "rating": 4.7}'::jsonb,
ARRAY['Blockchain fundamentals', 'Smart contract development with Solidity', 'DApp creation', 'Web3 integration', 'Security best practices']),

('data-science', 'Data Science', 'Master data analysis and visualization', 'Intermediate', 4.8, 2200, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 3, 3.75, 68, 50, 35, 420, 
'{"name": "Dr. Lisa Anderson", "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330", "bio": "PhD in Data Science", "rating": 4.9}'::jsonb,
ARRAY['Python for data science', 'Data visualization', 'Statistical analysis', 'Machine learning basics', 'Real-world projects']),

('cybersecurity', 'Cybersecurity', 'Learn ethical hacking and security practices', 'Advanced', 4.7, 1600, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b', 6, 7.5, 75, 48, 32, 310, 
'{"name": "James Wilson", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", "bio": "Cybersecurity Expert & Ethical Hacker", "rating": 4.8}'::jsonb,
ARRAY['Network security', 'Ethical hacking techniques', 'Penetration testing', 'Security monitoring', 'Incident response']),

('mobile-dev', 'Mobile App Development', 'Build iOS and Android apps with React Native', 'Intermediate', 4.8, 2800, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c', 3, 3.75, 58, 42, 28, 520, 
'{"name": "Maria Garcia", "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80", "bio": "Mobile Development Specialist", "rating": 4.8}'::jsonb,
ARRAY['React Native fundamentals', 'Cross-platform development', 'Mobile UI/UX', 'API integration', 'App store deployment']),

('digital-marketing', 'Digital Marketing', 'Learn SEO, SEM, and social media marketing', 'Beginner', 4.7, 2600, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f', 0, 0, 52, 55, 40, 480, 
'{"name": "Jennifer Lee", "avatar": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f", "bio": "Digital Marketing Strategist", "rating": 4.7}'::jsonb,
ARRAY['SEO optimization', 'Content marketing', 'Social media strategies', 'Analytics and reporting', 'Marketing campaigns']),

('iot', 'IoT Development', 'Build smart devices and IoT solutions', 'Advanced', 4.6, 1100, 'https://images.unsplash.com/photo-1518770660439-4636190af475', 6, 7.5, 62, 38, 30, 220, 
'{"name": "Kevin Zhang", "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", "bio": "IoT Solutions Architect", "rating": 4.6}'::jsonb,
ARRAY['IoT architecture', 'Sensor integration', 'MQTT protocols', 'Cloud connectivity', 'Smart home systems']),

('game-dev', 'Game Development', 'Create games with Unity and C#', 'Intermediate', 4.8, 1900, 'https://images.unsplash.com/photo-1556438064-2d7646166914', 3, 3.75, 64, 44, 33, 380, 
'{"name": "Chris Morgan", "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7", "bio": "Game Developer & Unity Expert", "rating": 4.8}'::jsonb,
ARRAY['Unity game engine', 'C# programming', 'Game physics', '3D graphics', 'Game publishing']),

('cloud-native', 'Cloud Native Development', 'Master Kubernetes and microservices', 'Advanced', 4.7, 1400, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa', 6, 7.5, 70, 46, 31, 290, 
'{"name": "Steven Clark", "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce", "bio": "Cloud Native Architect", "rating": 4.8}'::jsonb,
ARRAY['Cloud-native architecture', 'Kubernetes orchestration', 'Microservices design', 'Service mesh', 'DevOps practices']),

('data-engineering', 'Data Engineering', 'Build robust data pipelines and infrastructure', 'Advanced', 4.8, 1300, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', 6, 7.5, 72, 48, 34, 270, 
'{"name": "Dr. Amanda Roberts", "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956", "bio": "Data Engineering Lead", "rating": 4.9}'::jsonb,
ARRAY['Data pipeline development', 'ETL processes', 'Big data technologies', 'Data warehousing', 'Apache Spark'])
ON CONFLICT (id) DO NOTHING;
