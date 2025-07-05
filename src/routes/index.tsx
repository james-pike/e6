/**
 * Pottery Studio Theme: Terracotta (#E2725B) and Sage Green (#B2AC88)
 * Now using 'classes' table: id, name, instructor, date, spots, level
 */
import { component$, useSignal } from '@builder.io/qwik';
import { routeLoader$, routeAction$, zod$, z, Form } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import { tursoClient } from '~/utils/turso';

import Counter from '~/components/starter/counter/counter';
import Infobox from '~/components/starter/infobox/infobox';
import Starter from '~/components/starter/next-steps/next-steps';
import { TailwindExample } from '~/components/starter/tailwind/tailwind-example';

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

export default component$(() => {
  const classes = useClassesLoader();
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
  };

  return (
    <>
      <div class={["container", "hero"]} style={{ background: sage, borderRadius: '24px', boxShadow: '0 8px 32px rgba(178, 172, 136, 0.18)', padding: '32px 24px', marginTop: '32px', marginBottom: '32px' }}>
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
          <button type="submit" style={actionBtn}>Add</button>
        </Form>
        <div style={{ overflowX: 'auto' }}>
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
                        <Form action={updateAction} spaReset style={{ display: 'flex', gap: '8px' }} onSubmit$={() => { editId.value = null; editValue.value = {}; }}>
                          <input type="hidden" name="id" value={cls.id} />
                          <input type="text" name="name" value={editValue.value.name ?? cls.name} onInput$={e => editValue.value = { ...editValue.value, name: (e.target as HTMLInputElement).value }} required style={inputStyle} />
                          <input type="text" name="instructor" value={editValue.value.instructor ?? cls.instructor} onInput$={e => editValue.value = { ...editValue.value, instructor: (e.target as HTMLInputElement).value }} required style={inputStyle} />
                          <input type="date" name="date" value={editValue.value.date ?? cls.date} onInput$={e => editValue.value = { ...editValue.value, date: (e.target as HTMLInputElement).value }} required style={inputStyle} />
                          <input type="number" name="spots" min="1" value={editValue.value.spots ?? cls.spots} onInput$={e => editValue.value = { ...editValue.value, spots: (e.target as HTMLInputElement).value }} required style={inputStyle} />
                          <select name="level" value={editValue.value.level ?? cls.level} onInput$={e => editValue.value = { ...editValue.value, level: (e.target as HTMLSelectElement).value }} required style={inputStyle}>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="All Levels">All Levels</option>
                          </select>
                          <button type="submit" style={actionBtn}>Save</button>
                          <button type="button" style={{ ...actionBtn, background: sage, color: terracotta, border: `1px solid ${terracotta}` }} onClick$={() => { editId.value = null; editValue.value = {}; }}>Cancel</button>
                        </Form>
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

      <Starter />
      <TailwindExample />

      <div role="presentation" class="ellipsis"></div>
      <div role="presentation" class="ellipsis ellipsis-purple"></div>

      <div class="container container-center container-spacing-xl">
        <h3>
          You can <span class="highlight">count</span>
          <br /> on me
        </h3>
        <Counter />
      </div>

      <div class="container container-flex">
        <Infobox>
          <div q:slot="title" class="icon icon-cli">
            CLI Commands
          </div>
          <>
            <p>
              <code>npm run dev</code>
              <br />
              Starts the development server and watches for changes
            </p>
            <p>
              <code>npm run preview</code>
              <br />
              Creates production build and starts a server to preview it
            </p>
            <p>
              <code>npm run build</code>
              <br />
              Creates production build
            </p>
            <p>
              <code>npm run qwik add</code>
              <br />
              Runs the qwik CLI to add integrations
            </p>
          </>
        </Infobox>

        <div>
          <Infobox>
            <div q:slot="title" class="icon icon-apps">
              Example Apps
            </div>
            <p>
              Have a look at the <a href="/demo/flower">Flower App</a> or the{' '}
              <a href="/demo/todolist">Todo App</a>.
            </p>
          </Infobox>

          <Infobox>
            <div q:slot="title" class="icon icon-community">
              Community
            </div>
            <ul>
              <li>
                <span>Questions or just want to say hi? </span>
                <a href="https://qwik.builder.io/chat" target="_blank">
                  Chat on discord!
                </a>
              </li>
              <li>
                <span>Follow </span>
                <a href="https://twitter.com/QwikDev" target="_blank">
                  @QwikDev
                </a>
                <span> on Twitter</span>
              </li>
              <li>
                <span>Open issues and contribute on </span>
                <a href="https://github.com/BuilderIO/qwik" target="_blank">
                  GitHub
                </a>
              </li>
              <li>
                <span>Watch </span>
                <a href="https://qwik.builder.io/media/" target="_blank">
                  Presentations, Podcasts, Videos, etc.
                </a>
              </li>
            </ul>
          </Infobox>
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
