-- Create public storage bucket for course materials (pdfs, videos)
insert into storage.buckets (id, name, public)
values ('course-materials', 'course-materials', true)
on conflict (id) do nothing;

-- Public read access to files in the course-materials bucket
create policy if not exists "Public read access to course materials"
  on storage.objects for select
  using (bucket_id = 'course-materials');

-- Authenticated users can upload into their own folder: <user_id>/...
create policy if not exists "Users can upload to their own folder in course materials"
  on storage.objects for insert
  with check (
    bucket_id = 'course-materials'
    and auth.role() = 'authenticated'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Authenticated users can update files inside their own folder
create policy if not exists "Users can update files in their own folder in course materials"
  on storage.objects for update
  using (
    bucket_id = 'course-materials'
    and auth.role() = 'authenticated'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Authenticated users can delete files inside their own folder
create policy if not exists "Users can delete files in their own folder in course materials"
  on storage.objects for delete
  using (
    bucket_id = 'course-materials'
    and auth.role() = 'authenticated'
    and auth.uid()::text = (storage.foldername(name))[1]
  );