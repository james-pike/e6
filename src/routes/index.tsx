/**
 * Pottery Studio Theme: Terracotta (#E2725B) and Sage Green (#B2AC88)
 * Now using 'classes' table: id, name, instructor, date, spots, level
 */
import { component$} from '@builder.io/qwik';
import { routeLoader$, routeAction$, zod$, z } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import FAQAccordion from '~/components/FAQAccordion';
import Hero from '~/components/Hero';
import ReviewCarousel from '~/components/ReviewCarousel';
import WorkshopsCarousel from '~/components/WorkshopsCarousel';
import { tursoClient } from '~/utils/turso';

// Add FAQ loader
export const useFaqsLoader = routeLoader$(async (event) => {
  const client = tursoClient(event);
  const result = await client.execute('SELECT * FROM faqs ORDER BY id ASC');
  return result.rows.map(row => ({
    id: (row as any).id,
    question: (row as any).question,
    answer: (row as any).answer,
    category: (row as any).category || 'General', // Default to 'General' if no category
  })) as Array<{ id: number; question: string; answer: string; category: string }>;
});

export const useClassesLoader = routeLoader$(async (event) => {
  const client = tursoClient(event);
  const result = await client.execute('SELECT * FROM classes ORDER BY date ASC');
  return result.rows.map(row => ({
    id: (row as any).id,
    name: (row as any).name,
    instructor: (row as any).instructor,
    date: (row as any).date,
    spots: (row as any).spots,
    level: (row as any).level,
  })) as Array<{ id: number; name: string; instructor: string; date: string; spots: number; level: string }>;
});

export const useWorkshopsLoader = routeLoader$(async (event) => {
  const client = tursoClient(event);
  const result = await client.execute('SELECT * FROM classes ORDER BY date ASC');
  return result.rows.map(row => ({
    id: (row as any).id,
    title: (row as any).name,
    description: (row as any).description || `Join our ${(row as any).level.toLowerCase()} pottery class with ${(row as any).instructor}. Learn the fundamentals of pottery in a hands-on workshop.`,
    date: (row as any).date,
    duration: (row as any).duration || '3 hours',
    price: (row as any).price || '$85',
    image: (row as any).image || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    instructor: (row as any).instructor,
    spots: (row as any).spots,
    level: (row as any).level as 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels',
  })) as Array<{ 
    id: number; 
    title: string; 
    description: string; 
    date: string; 
    duration: string; 
    price: string; 
    image: string; 
    instructor: string; 
    spots: number; 
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'; 
  }>;
});

export const useAddClass = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute(
      'INSERT INTO classes (name, instructor, date, spots, level) VALUES (?, ?, ?, ?, ?)',
      [data.name, data.instructor, data.date, Number(data.spots), data.level]
    );
    return { success: true };
  },
  zod$({
    name: z.string().min(1),
    instructor: z.string().min(1),
    date: z.string().min(1),
    spots: z.string().min(1),
    level: z.string().min(1),
  })
);

export const useUpdateClass = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute(
      'UPDATE classes SET name = ?, instructor = ?, date = ?, spots = ?, level = ? WHERE id = ?',
      [data.name, data.instructor, data.date, Number(data.spots), data.level, data.id]
    );
    return { success: true };
  },
  zod$({
    id: z.string().min(1),
    name: z.string().min(1),
    instructor: z.string().min(1),
    date: z.string().min(1),
    spots: z.string().min(1),
    level: z.string().min(1),
  })
);

export const useDeleteClass = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute('DELETE FROM classes WHERE id = ?', [data.id]);
    return { success: true };
  },
  zod$({ id: z.string().min(1) })
);

export const useAddWorkshop = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute(
      'INSERT INTO classes (name, instructor, date, spots, level, description, duration, price, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [data.title, data.instructor, data.date, Number(data.spots), data.level, data.description || null, data.duration || null, data.price || null, data.image || null]
    );
    return { success: true };
  },
  zod$({
    title: z.string().min(1),
    instructor: z.string().min(1),
    date: z.string().min(1),
    spots: z.string().min(1),
    level: z.string().min(1),
    description: z.string().optional(),
    duration: z.string().optional(),
    price: z.string().optional(),
    image: z.string().optional(),
  })
);

export const useUpdateWorkshop = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute(
      'UPDATE classes SET name = ?, instructor = ?, date = ?, spots = ?, level = ?, description = ?, duration = ?, price = ?, image = ? WHERE id = ?',
      [data.title, data.instructor, data.date, Number(data.spots), data.level, data.description || null, data.duration || null, data.price || null, data.image || null, data.id]
    );
    return { success: true };
  },
  zod$({
    id: z.string().min(1),
    title: z.string().min(1),
    instructor: z.string().min(1),
    date: z.string().min(1),
    spots: z.string().min(1),
    level: z.string().min(1),
    description: z.string().optional(),
    duration: z.string().optional(),
    price: z.string().optional(),
    image: z.string().optional(),
  })
);

export const useDeleteWorkshop = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute('DELETE FROM classes WHERE id = ?', [data.id]);
    return { success: true };
  },
  zod$({ id: z.string().min(1) })
);

export default component$(() => {
  const workshops = useWorkshopsLoader();

  // Theme colors
 


 

  return (
    <>
<Hero/>
    <WorkshopsCarousel workshops={workshops.value} />
    
      <ReviewCarousel />
<FAQAccordion/>
   

    
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
