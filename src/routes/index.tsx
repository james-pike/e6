/**
 * Pottery Studio Theme: Terracotta (#E2725B) and Sage Green (#B2AC88)
 * Now using 'classes' table: id, name, instructor, date, spots, level
 */
import { component$, useSignal } from '@builder.io/qwik';
import { routeLoader$, routeAction$, zod$, z, Form } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import EventAdmin from '~/components/eventAdmin';
import EventCarousel from '~/components/eventCarousel';
import FAQAccordion from '~/components/FAQAccordion';
import Hero from '~/components/Hero';
import ReviewCarousel from '~/components/ReviewCarousel';
import WorkshopsCarousel from '~/components/WorkshopsCarousel';
import { tursoClient } from '~/utils/turso';


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
  const classes = useClassesLoader();
  const workshops = useWorkshopsLoader();
  const addAction = useAddClass();
  const updateAction = useUpdateClass();
  const deleteAction = useDeleteClass();
  const editId = useSignal<string | null>(null);
  const editValue = useSignal<any>({});

  // Theme colors
  const terracotta = '#E2725B';
  const sage = '#B2AC88';
  const tableStyle = {
    width: '100%',
    background: sage,
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(178, 172, 136, 0.15)',
    borderCollapse: 'separate' as any,
    borderSpacing: '0',
    marginTop: '24px',
    overflow: 'hidden',
  };
  const thStyle = {
    background: terracotta,
    color: 'white',
    padding: '12px 20px',
    fontWeight: 600,
    borderBottom: `2px solid ${sage}`,
    textAlign: 'left' as const,
  };
  const tdStyle = {
    background: 'white',
    color: terracotta,
    padding: '12px 20px',
    borderBottom: `1px solid ${sage}`,
    fontSize: '1rem',
    textAlign: 'left' as const,
  };
  const actionBtn = {
    background: terracotta,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '6px 16px',
    margin: '0 4px',
    cursor: 'pointer',
    fontWeight: 500,
    boxShadow: '0 2px 6px rgba(226, 114, 91, 0.10)',
    transition: 'background 0.2s',
  };
  const formStyle = {
    display: 'flex',
    flexWrap: 'wrap' as any,
    gap: '12px',
    margin: '24px 0',
    alignItems: 'center',
    background: sage,
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(178, 172, 136, 0.10)',
  };
  const inputStyle = {
    border: `1px solid ${terracotta}`,
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '1rem',
    outline: 'none',
    color: terracotta,
    background: 'white',
    minWidth: '120px',
    flex: '1 1 200px' as any,
  };

  return (
    <>
<Hero/>
    <WorkshopsCarousel workshops={workshops.value} />
    
      <ReviewCarousel />
<EventCarousel/>
<FAQAccordion/>
<EventAdmin/>

<div class={["container", "hero"]} style={{ background: sage, borderRadius: '24px', boxShadow: '0 8px 32px rgba(178, 172, 136, 0.18)', padding: '32px 24px', marginTop: '32px', marginBottom: '32px', maxWidth: '100%', overflow: 'hidden' }}>
        <h1 style={{ color: terracotta, fontFamily: 'serif', fontWeight: 700, fontSize: '2.5rem', marginBottom: '8px' }}>Pottery Studio Classes</h1>
        <p style={{ color: terracotta, fontSize: '1.2rem', marginBottom: '24px' }}>Manage your pottery classes below.</p>
        <Form action={addAction} spaReset style={formStyle}>
          <input type="text" name="name" placeholder="Class name" required style={inputStyle} />
          <input type="text" name="instructor" placeholder="Instructor" required style={inputStyle} />
          <input type="date" name="date" required style={inputStyle} />
          <input type="number" name="spots" min="1" placeholder="Spots" required style={inputStyle} />
          <select name="level" required style={inputStyle}>
            <option value="">Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="All Levels">All Levels</option>
          </select>
          <button type="submit" style={{ ...actionBtn, flex: '0 0 auto' as any }}>Add</button>
        </Form>
        <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Instructor</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Spots</th>
                <th style={thStyle}>Level</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.value.length ? (
                classes.value.map((cls) => (
                  <tr key={cls.id}>
                    {editId.value === String(cls.id) ? (
                      <>
                        <td style={tdStyle}>
                          <input type="text" name="name" value={editValue.value.name ?? cls.name} onInput$={e => editValue.value = { ...editValue.value, name: (e.target as HTMLInputElement).value }} required style={inputStyle} />
                        </td>
                        <td style={tdStyle}>
                          <input type="text" name="instructor" value={editValue.value.instructor ?? cls.instructor} onInput$={e => editValue.value = { ...editValue.value, instructor: (e.target as HTMLInputElement).value }} required style={inputStyle} />
                        </td>
                        <td style={tdStyle}>
                          <input type="date" name="date" value={editValue.value.date ?? cls.date} onInput$={e => editValue.value = { ...editValue.value, date: (e.target as HTMLInputElement).value }} required style={inputStyle} />
                        </td>
                        <td style={tdStyle}>
                          <input type="number" name="spots" min="1" value={editValue.value.spots ?? cls.spots} onInput$={e => editValue.value = { ...editValue.value, spots: (e.target as HTMLInputElement).value }} required style={inputStyle} />
                        </td>
                        <td style={tdStyle}>
                          <select name="level" value={editValue.value.level ?? cls.level} onInput$={e => editValue.value = { ...editValue.value, level: (e.target as HTMLSelectElement).value }} required style={inputStyle}>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="All Levels">All Levels</option>
                          </select>
                        </td>
                        <td style={tdStyle}>
                          <button type="button" style={actionBtn} onClick$={async () => {
                            const formData = new FormData();
                            formData.append('id', String(cls.id));
                            formData.append('name', editValue.value.name ?? cls.name);
                            formData.append('instructor', editValue.value.instructor ?? cls.instructor);
                            formData.append('date', editValue.value.date ?? cls.date);
                            formData.append('spots', String(editValue.value.spots ?? cls.spots));
                            formData.append('level', editValue.value.level ?? cls.level);
                            await updateAction.submit(formData);
                            editId.value = null;
                            editValue.value = {};
                          }}>Save</button>
                          <button type="button" style={{ ...actionBtn, background: sage, color: terracotta, border: `1px solid ${terracotta}` }} onClick$={() => { editId.value = null; editValue.value = {}; }}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={tdStyle}>{cls.name}</td>
                        <td style={tdStyle}>{cls.instructor}</td>
                        <td style={tdStyle}>{cls.date}</td>
                        <td style={tdStyle}>{cls.spots}</td>
                        <td style={tdStyle}>{cls.level}</td>
                        <td style={tdStyle}>
                          <button style={actionBtn} onClick$={() => { editId.value = String(cls.id); editValue.value = { ...cls }; }}>Edit</button>
                          <Form action={deleteAction} spaReset style={{ display: 'inline' }}>
                            <input type="hidden" name="id" value={cls.id} />
                            <button type="submit" style={{ ...actionBtn, background: '#fff', color: terracotta, border: `1px solid ${terracotta}` }}>Delete</button>
                          </Form>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ ...tdStyle, textAlign: 'center', color: terracotta }}>No classes found in the studio.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    
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
