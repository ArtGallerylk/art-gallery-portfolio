-- ============================================
-- Art Gallery LK — Storage Setup
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Create the storage bucket
-- NOTE: You may need to create the bucket via Supabase Dashboard:
--   Storage → New Bucket → Name: "art-gallery-samples" → Public: ON
-- If the SQL below works in your version, great:

insert into storage.buckets (id, name, public)
values ('art-gallery-samples', 'art-gallery-samples', true)
on conflict (id) do nothing;

-- 2. Storage RLS Policies

-- Allow public read access to all files in the bucket
create policy "Public can view gallery images"
  on storage.objects
  for select
  using (bucket_id = 'art-gallery-samples');

-- Allow authenticated users to upload images
create policy "Authenticated users can upload gallery images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'art-gallery-samples');

-- Allow authenticated users to update their uploads
create policy "Authenticated users can update gallery images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'art-gallery-samples');

-- Allow authenticated users to delete images
create policy "Authenticated users can delete gallery images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'art-gallery-samples');
