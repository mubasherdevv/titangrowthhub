-- Run this in the Supabase Dashboard → SQL Editor
-- Adds columns used by the "Create Blog Post" admin feature.

ALTER TABLE blogs
  ADD COLUMN IF NOT EXISTS featured_image text DEFAULT '',
  ADD COLUMN IF NOT EXISTS tags text DEFAULT '';
