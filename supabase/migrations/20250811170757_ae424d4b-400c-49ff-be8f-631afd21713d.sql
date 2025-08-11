-- Create public storage bucket for course materials (pdfs, videos)
insert into storage.buckets (id, name, public)
values ('course-materials', 'course-materials', true)
on conflict (id) do nothing;

-- Public read policy
do $$ begin
  create policy "Public read access to course materials"
    on storage.objects for select
    using (bucket_id = 'course-materials');
exception when duplicate_object then null; end $$;

-- Insert policy: authenticated users can upload to their own folder
do $$ begin
  create policy "Users can upload to their own folder in course materials"
    on storage.objects for insert
    with check (
      bucket_id = 'course-materials'
      and auth.role() = 'authenticated'
      and auth.uid()::text = (storage.foldername(name))[1]
    );
exception when duplicate_object then null; end $$;

-- Update policy: authenticated users can update files in their own folder
do $$ begin
  create policy "Users can update files in their own folder in course materials"
    on storage.objects for update
    using (
      bucket_id = 'course-materials'
      and auth.role() = 'authenticated'
      and auth.uid()::text = (storage.foldername(name))[1]
    );
exception when duplicate_object then null; end $$;

-- Delete policy: authenticated users can delete files in their own folder
do $$ begin
  create policy "Users can delete files in their own folder in course materials"
    on storage.objects for delete
    using (
      bucket_id = 'course-materials'
      and auth.role() = 'authenticated'
      and auth.uid()::text = (storage.foldername(name))[1]
    );
exception when duplicate_object then null; end $$;