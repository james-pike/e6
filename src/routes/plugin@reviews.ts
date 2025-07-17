import { routeLoader$ } from '@builder.io/qwik-city';
import { tursoClient } from '~/utils/turso';

export const useReviewsLoader = routeLoader$(async (event) => {
  const client = tursoClient(event);
  const result = await client.execute('SELECT * FROM reviews ORDER BY id ASC');
  return result.rows.map(row => ({
    id: typeof row.id === 'bigint' ? Number(row.id) : row.id,
    name: String(row.name),
    review: String(row.review),
    rating: typeof row.rating === 'bigint' ? Number(row.rating) : Number(row.rating),
    date: String(row.date),
    role: row.role ? String(row.role) : '',
  }));
}); 