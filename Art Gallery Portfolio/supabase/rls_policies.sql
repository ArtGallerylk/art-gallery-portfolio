-- ============================================
-- Art Gallery LK — Row Level Security Policies
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================

-- 1. Enable RLS on gallery_items
alter table gallery_items enable row level security;

-- 2. Public read policy: anyone can view active items
create policy "Public can view active gallery items"
  on gallery_items
  for select
  using (is_active = true);

-- 3. Authenticated users can view ALL items (for admin panel)
create policy "Authenticated users can view all gallery items"
  on gallery_items
  for select
  to authenticated
  using (true);

-- 4. Authenticated users can insert gallery items
create policy "Authenticated users can insert gallery items"
  on gallery_items
  for insert
  to authenticated
  with check (true);

-- 5. Authenticated users can update gallery items
create policy "Authenticated users can update gallery items"
  on gallery_items
  for update
  to authenticated
  using (true)
  with check (true);

-- 6. Authenticated users can delete gallery items
create policy "Authenticated users can delete gallery items"
  on gallery_items
  for delete
  to authenticated
  using (true);

-- 7. Enable RLS on gallery_categories
alter table gallery_categories enable row level security;

-- 8. Public read for active categories
create policy "Public can view active categories"
  on gallery_categories
  for select
  using (is_active = true);

-- 9. Authenticated full access on categories
create policy "Authenticated users can manage categories"
  on gallery_categories
  for all
  to authenticated
  using (true)
  with check (true);
