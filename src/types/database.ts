
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  preferences: Record<string, any>;
  strengths: string[];
  weaknesses: string[];
  created_at: string;
  updated_at: string;
}

export interface CourseReview {
  id: string;
  course_id: string;
  user_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface LiveSession {
  id: string;
  course_id: string;
  title: string;
  description: string;
  instructor: string;
  date: string;
  time: string;
  duration: number;
  zoom_link: string;
}

export interface ProfessorReview {
  id: string;
  professor_name: string;
  institution: string;
  profile_image: string;
  comment: string;
  rating: number;
}
