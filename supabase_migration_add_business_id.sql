-- Add business_id to appointments table
ALTER TABLE appointments ADD COLUMN business_id uuid REFERENCES users(id);

-- Optionally, if you want to use business_name instead:
-- ALTER TABLE appointments ADD COLUMN business_name text;

-- Make sure to backfill or update existing rows if needed.