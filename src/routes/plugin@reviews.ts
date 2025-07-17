import { routeLoader$ } from '@builder.io/qwik-city';
import { tursoClient } from '~/utils/turso';

export const useReviewsLoader = routeLoader$(async (event) => {
  const client = tursoClient(event);
  const result = await client.execute('SELECT * FROM reviews ORDER BY id ASC');
  return result.rows.map(row => ({
    id: typeof row.id === 'bigint'
      ? Number(row.id)
      : row.id instanceof ArrayBuffer
        ? Number(new DataView(row.id).getBigInt64(0, true))
        : Number(row.id),
    name: String(row.name),
    review: String(row.review),
    rating: typeof row.rating === 'bigint'
      ? Number(row.rating)
      : row.rating instanceof ArrayBuffer
        ? Number(new DataView(row.rating).getBigInt64(0, true))
        : Number(row.rating),
    date: String(row.date),
    role: row.role ? String(row.role) : '',
  }));
}); 