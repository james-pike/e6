-- Migration script to add category column to faqs table
-- Run this in your Turso database

-- Add category column to faqs table
ALTER TABLE faqs ADD COLUMN category TEXT DEFAULT 'General';

-- Update existing FAQs with appropriate categories based on their content
UPDATE faqs SET category = 'Care' WHERE question LIKE '%care%' OR question LIKE '%wash%' OR question LIKE '%oven%';
UPDATE faqs SET category = 'Shipping' WHERE question LIKE '%shipping%' OR question LIKE '%delivery%' OR question LIKE '%return%';
UPDATE faqs SET category = 'Workshops' WHERE question LIKE '%workshop%' OR question LIKE '%class%' OR question LIKE '%clay%';
UPDATE faqs SET category = 'Custom' WHERE question LIKE '%custom%' OR question LIKE '%special%' OR question LIKE '%gift%';

-- Verify the changes
SELECT id, question, category FROM faqs ORDER BY id; 