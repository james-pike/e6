# FAQ Database Migration

This document explains how to migrate your existing FAQ database to support the new category feature.

## Overview

The FAQAccordion component has been updated to fetch FAQs from the database instead of using hardcoded data. The database now includes a `category` field to organize FAQs into different sections.

## Migration Steps

### 1. Run the Database Migration

Execute the SQL migration script in your Turso database:

```bash
# If using Turso CLI
turso db shell your-database-name < migrate_faqs.sql

# Or connect to your database and run the SQL commands manually
```

### 2. Verify the Migration

After running the migration, verify that the category column was added:

```sql
SELECT id, question, category FROM faqs ORDER BY id;
```

### 3. Update Existing FAQs (Optional)

You can update existing FAQs with appropriate categories by running SQL commands like:

```sql
-- Update FAQs based on content
UPDATE faqs SET category = 'Care' WHERE question LIKE '%care%' OR question LIKE '%wash%';
UPDATE faqs SET category = 'Shipping' WHERE question LIKE '%shipping%' OR question LIKE '%delivery%';
UPDATE faqs SET category = 'Workshops' WHERE question LIKE '%workshop%' OR question LIKE '%class%';
UPDATE faqs SET category = 'Custom' WHERE question LIKE '%custom%' OR question LIKE '%special%';
```

## Available Categories

The system supports the following categories:

- **General** - General questions about the pottery studio
- **Care** - Questions about caring for pottery pieces
- **Shipping** - Questions about shipping and delivery
- **Custom** - Questions about custom orders and special requests
- **Workshops** - Questions about pottery classes and workshops

## New Features

### Frontend Changes

1. **FAQAccordion Component**: Now fetches data from the database using `useFaqsLoader()`
2. **Loading State**: Shows a loading spinner while FAQs are being fetched
3. **Dynamic Categories**: Categories are now stored in the database and can be managed through the admin panel

### Admin Panel Changes

1. **Category Field**: Added a dropdown to select categories when creating/editing FAQs
2. **Category Display**: Categories are now shown in the admin table with color-coded badges
3. **Mobile Support**: Category badges are also displayed in the mobile card view

## Database Schema

The `faqs` table now has the following structure:

```sql
CREATE TABLE faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General'
);
```

## Testing

1. Start your development server: `pnpm dev`
2. Navigate to the homepage to see the FAQ section
3. Check that FAQs are loading from the database
4. Test the admin panel at `/dashboard` to add/edit FAQs with categories

## Troubleshooting

### No FAQs Showing

If no FAQs are displayed:
1. Check that the `faqs` table exists in your database
2. Verify that there are records in the table
3. Check the browser console for any errors

### Category Not Saving

If categories are not being saved:
1. Ensure the migration script was run successfully
2. Check that the `category` column exists in the `faqs` table
3. Verify the admin form is submitting the category field correctly

### Database Connection Issues

If you encounter database connection issues:
1. Check your environment variables (`PRIVATE_TURSO_DATABASE_URL`, `PRIVATE_TURSO_AUTH_TOKEN`)
2. Verify your Turso database is accessible
3. Check the network tab in browser dev tools for failed requests 