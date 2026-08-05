CREATE TABLE IF NOT EXISTS public.site_settings (
  id                   integer PRIMARY KEY DEFAULT 1,
  site_name            text    DEFAULT 'Titan Growth Hub',
  site_tagline         text    DEFAULT 'Driving Growth Through Digital Excellence',
  site_url             text    DEFAULT '',
  global_meta_desc     text    DEFAULT '',
  og_title             text    DEFAULT '',
  og_description       text    DEFAULT '',
  favicon_url          text    DEFAULT '',
  logo_url             text    DEFAULT '',
  allow_indexing       boolean DEFAULT true,
  default_title_pattern text   DEFAULT '%s | Titan Growth Hub',
  timezone             text    DEFAULT 'UTC (GMT+00:00)',
  language             text    DEFAULT 'English (US)',
  gsc_api_key          text    DEFAULT '',
  bing_api_key         text    DEFAULT '',
  gemini_api_key       text    DEFAULT '',
  org_name             text    DEFAULT '',
  org_url              text    DEFAULT '',
  org_logo             text    DEFAULT '',
  robots_txt           text    DEFAULT '',
  google_analytics_id  text    DEFAULT '',
  created_at           timestamptz DEFAULT now(),
  updated_at           timestamptz DEFAULT now()
);

INSERT INTO public.site_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

-- Add any missing columns if the table already existed (safe to re-run)
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS site_url             text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS timezone             text DEFAULT 'UTC (GMT+00:00)';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS language             text DEFAULT 'English (US)';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS gsc_api_key          text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS bing_api_key         text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS gemini_api_key       text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS org_name             text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS org_url              text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS org_logo             text DEFAULT '';
ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS robots_txt           text DEFAULT '';

CREATE TABLE IF NOT EXISTS public.blogs (
  id            uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text    NOT NULL DEFAULT '',
  slug          text    NOT NULL DEFAULT '',
  status        text    NOT NULL DEFAULT 'Draft',
  seo_score     integer DEFAULT 0,
  category      text    DEFAULT '',
  meta_desc     text    DEFAULT '',
  content       text    DEFAULT '',
  featured_image text   DEFAULT '',
  tags          text    DEFAULT '',
  is_active     boolean DEFAULT true,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS featured_image text DEFAULT '',
  ADD COLUMN IF NOT EXISTS tags           text DEFAULT '',
  ADD COLUMN IF NOT EXISTS is_active      boolean DEFAULT true;

CREATE TABLE IF NOT EXISTS public.services (
  id            uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  title         text    NOT NULL DEFAULT '',
  slug          text    NOT NULL DEFAULT '',
  status        text    NOT NULL DEFAULT 'Draft',
  seo_score     integer DEFAULT 0,
  short_desc    text    DEFAULT '',
  meta_desc     text    DEFAULT '',
  content       text    DEFAULT '',
  featured_image text   DEFAULT '',
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS short_desc text DEFAULT '';

CREATE TABLE IF NOT EXISTS public.redirects (
  id          uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path   text    NOT NULL,
  to_path     text    NOT NULL,
  status_code integer DEFAULT 301,
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.admins (
  id            uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text    NOT NULL UNIQUE,
  password_hash text    NOT NULL DEFAULT '',
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins        ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow public read blogs"         ON public.blogs;
DROP POLICY IF EXISTS "Allow public read services"      ON public.services;
DROP POLICY IF EXISTS "Allow public read redirects"     ON public.redirects;
DROP POLICY IF EXISTS "Allow all on admins"             ON public.admins;

CREATE POLICY "Allow public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read blogs"         ON public.blogs         FOR SELECT USING (true);
CREATE POLICY "Allow public read services"      ON public.services       FOR SELECT USING (true);
CREATE POLICY "Allow public read redirects"     ON public.redirects      FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all on site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow all on blogs"         ON public.blogs;
DROP POLICY IF EXISTS "Allow all on services"      ON public.services;
DROP POLICY IF EXISTS "Allow all on redirects"     ON public.redirects;

CREATE POLICY "Allow all on site_settings" ON public.site_settings FOR ALL USING (true);
CREATE POLICY "Allow all on blogs"         ON public.blogs         FOR ALL USING (true);
CREATE POLICY "Allow all on services"      ON public.services       FOR ALL USING (true);
CREATE POLICY "Allow all on redirects"     ON public.redirects      FOR ALL USING (true);
CREATE POLICY "Allow all on admins"        ON public.admins        FOR ALL USING (true);
