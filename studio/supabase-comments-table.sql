-- Run this in your Supabase project's SQL editor
-- https://app.supabase.com → your project → SQL Editor

create table if not exists comments (
  id          uuid primary key default gen_random_uuid(),
  post_slug   text not null,
  author_name text not null,
  content     text not null,
  created_at  timestamptz not null default now()
);

-- Index for fast per-post lookups
create index if not exists comments_post_slug_idx on comments (post_slug);

-- Enable Row Level Security
alter table comments enable row level security;

-- Allow anyone to read all comments
create policy "Anyone can read comments"
  on comments for select
  using (true);

-- Allow anyone to insert (no auth required — name-only comments)
create policy "Anyone can post a comment"
  on comments for insert
  with check (true);
