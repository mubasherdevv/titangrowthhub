ALTER TABLE public.site_settings 
ADD COLUMN IF NOT EXISTS gcp_client_email TEXT,
ADD COLUMN IF NOT EXISTS gcp_private_key TEXT,
ADD COLUMN IF NOT EXISTS gsc_property_url TEXT;
