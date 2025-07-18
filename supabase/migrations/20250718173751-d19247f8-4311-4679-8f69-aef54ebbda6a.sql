-- Create courses table
CREATE TABLE public.courses (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  level text,
  instructor jsonb,
  price numeric,
  original_price numeric,
  rating numeric DEFAULT 0,
  rating_count integer DEFAULT 0,
  students integer DEFAULT 0,
  outcomes text[],
  video_hours integer DEFAULT 0,
  articles integer DEFAULT 0,
  resources integer DEFAULT 0,
  thumbnail text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to view courses
CREATE POLICY "Anyone can view courses" 
ON public.courses 
FOR SELECT 
USING (true);