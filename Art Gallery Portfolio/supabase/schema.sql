-- ============================================
-- Art Gallery LK — Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Gallery Items Table
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  title text not null,
  slug text unique,
  category text not null check (category in ('wedding', 'birthday', 'couple', 'baby', 'family', 'gift', 'custom')),
  image_url text not null,
  storage_path text,
  description text,
  is_featured boolean default false,
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. Indexes for performance
create index if not exists idx_gallery_items_category on gallery_items(category);
create index if not exists idx_gallery_items_is_active on gallery_items(is_active);
create index if not exists idx_gallery_items_is_featured on gallery_items(is_featured);
create index if not exists idx_gallery_items_created_at on gallery_items(created_at desc);
create index if not exists idx_gallery_items_code on gallery_items(code);
create index if not exists idx_gallery_items_slug on gallery_items(slug);

-- 3. Auto-update updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_gallery_items_updated_at on gallery_items;

create trigger trg_gallery_items_updated_at
before update on gallery_items
for each row
execute function update_updated_at_column();

-- 4. Gallery Categories Table (optional, for future scalability)
create table if not exists gallery_categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null,
  cover_image_url text,
  is_active boolean default true,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- 5. Seed default categories
insert into gallery_categories (name, slug, display_order) values
  ('Wedding', 'wedding', 1),
  ('Birthday', 'birthday', 2),
  ('Couple', 'couple', 3),
  ('Baby', 'baby', 4),
  ('Family', 'family', 5),
  ('Gift', 'gift', 6),
  ('Custom', 'custom', 7)
on conflict (name) do nothing;
