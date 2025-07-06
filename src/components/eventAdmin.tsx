import { component$, useSignal, $ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useAddClass, useUpdateClass, useDeleteClass, useClassesLoader } from '~/routes/dashboard';

interface Workshop {
  id: number;
  name: string;
  instructor: string;
  date: string;
  spots: number;
  level: string;
}

export default component$(() => {
  const workshops = useClassesLoader();
  const addAction = useAddClass();
  const updateAction = useUpdateClass();
  const deleteAction = useDeleteClass();
  const editingId = useSignal<string | null>(null);
  const form = useSignal<Partial<Workshop>>({});

  // Theme colors
  const terracotta = '#E2725B';
  const sage = '#B2AC88';

  // Handle form input changes
  const handleInput = $((e: any) => {
    form.value = { ...form.value, [e.target.name]: e.target.value };
  });

  // Edit workshop
  const handleEdit = $((workshop: Workshop) => {
    editingId.value = String(workshop.id);
    form.value = { ...workshop };
  });

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

  return (
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-clay-900 mb-4">Workshop Management</h1>
        <div class="mb-2 text-sm text-yellow-700 bg-yellow-100 border border-yellow-300 rounded p-2">
          If you don't see your latest changes, try a hard refresh (Ctrl+Shift+R) or clear your browser cache. Ensure your production environment variables point to the correct Turso database.
        </div>
      </div>

      <div class="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">{editingId.value ? 'Edit Workshop' : 'Add Workshop'}</h3>
          </div>
          <Form action={editingId.value ? updateAction : addAction} spaReset style={formStyle} onSubmit$={() => { editingId.value = null; form.value = {}; }}>
            {editingId.value && <input type="hidden" name="id" value={editingId.value} />}
            <input name="name" value={form.value.name || ''} onInput$={handleInput} placeholder="Class name" required style={inputStyle} />
            <input name="instructor" value={form.value.instructor || ''} onInput$={handleInput} placeholder="Instructor" required style={inputStyle} />
            <input name="date" type="date" value={form.value.date || ''} onInput$={handleInput} required style={inputStyle} />
            <input name="spots" type="number" min="1" value={form.value.spots || ''} onInput$={handleInput} placeholder="Spots" required style={inputStyle} />
            <select name="level" value={form.value.level || ''} onInput$={handleInput} required style={inputStyle}>
              <option value="">Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
            <div class="flex gap-2" style={{ flex: '0 0 auto' as any }}>
              <button type="submit" style={actionBtn}>{editingId.value ? 'Update' : 'Add'}</button>
              {editingId.value && (
                <button type="button" style={{ ...actionBtn, background: sage, color: terracotta, border: `1px solid ${terracotta}` }} onClick$={() => { editingId.value = null; form.value = {}; }}>Cancel</button>
              )}
            </div>
          </Form>
        </div>
      {/* Vertically stacked layout for all screen sizes */}
      <div class="flex flex-col gap-8">
        {/* Table area */}
        <div class="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900">Current Workshops</h3>
          </div>
          {workshops.value.length === 0 ? (
            <div class="p-8 text-center text-gray-500">
              <p>No workshops found.</p>
            </div>
          ) : (
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spots</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {workshops.value.map((workshop) => (
                    <tr key={workshop.id} class={editingId.value === String(workshop.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{workshop.name}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workshop.instructor}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workshop.date}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{workshop.spots}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          workshop.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                          workshop.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          workshop.level === 'Advanced' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {workshop.level}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex gap-2">
                        <button
                          class="text-blue-600 hover:underline mr-2"
                          onClick$={() => handleEdit(workshop)}
                        >
                          Edit
                        </button>
                        <Form action={deleteAction} spaReset style={{ display: 'inline' }}>
                          <input type="hidden" name="id" value={workshop.id} />
                          <button type="submit" class="text-red-600 hover:underline">
                            Delete
                          </button>
                        </Form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Form area */}

      </div>
    </div>
  );
}); 