-- Supabase RLS Fix for page_meta
ALTER TABLE public.page_meta ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on page_meta" ON public.page_meta
FOR ALL
USING (true)
WITH CHECK (true);
