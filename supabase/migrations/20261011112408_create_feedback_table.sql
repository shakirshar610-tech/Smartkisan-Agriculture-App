/*
# Create feedback table (single-tenant, no auth)

1. New Tables
- `feedback`
  - `id` (uuid, primary key)
  - `page` (text, which page the feedback was submitted from: crops, irrigation, problems, tips, advisory)
  - `crop` (text, optional — which crop was selected)
  - `stage` (text, optional — which growth stage was selected)
  - `symptom` (text, optional — which symptom was selected)
  - `language` (text, which language the user was using: en, ur, sd)
  - `helpful` (boolean, whether the user found the advice helpful)
  - `created_at` (timestamp)

2. Security
- Enable RLS on `feedback`.
- Allow anon + authenticated to INSERT (farmers submit feedback without signing in).
- Allow anon + authenticated to SELECT (so the app could show aggregate counts if needed later).
- No UPDATE or DELETE policies — feedback is immutable once submitted.

3. Important Notes
- This is a single-tenant app with no sign-in screen, so policies use `TO anon, authenticated`.
- `USING (true)` on SELECT is acceptable because all feedback is intentionally shared/public.
- `WITH CHECK (true)` on INSERT is acceptable because any visitor can submit feedback.
*/

CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  crop text,
  stage text,
  symptom text,
  language text NOT NULL DEFAULT 'en',
  helpful boolean NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_feedback" ON feedback;
CREATE POLICY "anon_insert_feedback" ON feedback FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_feedback" ON feedback;
CREATE POLICY "anon_select_feedback" ON feedback FOR SELECT
  TO anon, authenticated USING (true);