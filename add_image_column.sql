-- Add image column to classes table
ALTER TABLE classes ADD COLUMN image TEXT;

-- Verify the changes
SELECT id, name, image FROM classes ORDER BY id; 