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

  // Handle form input changes
  const handleInput = $((e: any) => {
    form.value = { ...form.value, [e.target.name]: e.target.value };
  });

  // Edit workshop
  const handleEdit = $((workshop: Workshop) => {
    editingId.value = String(workshop.id);
    form.value = { ...workshop };
  });

  return (
    <div class="grid md:grid-cols-2 gap-8 mb-8">
      {/* Add/Edit Event Panel */}
      <div class="bg-gradient-to-br from-white to-sage-50/50 rounded-2xl p-6 border border-sage-200/50 shadow-xl flex flex-col justify-between">
        <h3 class="text-lg font-semibold text-clay-900 mb-4">
          {editingId.value ? 'Edit Workshop' : 'Add Workshop'}
        </h3>
        <Form action={editingId.value ? updateAction : addAction} spaReset onSubmit$={() => { editingId.value = null; form.value = {}; }}>
          {editingId.value && <input type="hidden" name="id" value={editingId.value} />}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input name="name" value={form.value.name || ''} onInput$={handleInput} placeholder="Class name" required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300" />
            <input name="instructor" value={form.value.instructor || ''} onInput$={handleInput} placeholder="Instructor" required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300" />
            <input name="date" type="date" value={form.value.date || ''} onInput$={handleInput} required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300" />
            <input name="spots" type="number" min="1" value={form.value.spots || ''} onInput$={handleInput} placeholder="Spots" required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300" />
            <select name="level" value={form.value.level || ''} onInput$={handleInput} required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300">
              <option value="">Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>
          <div class="flex gap-2">
            <button type="submit" class="px-6 py-2 bg-sage-600 text-white rounded-full text-sm font-medium hover:bg-sage-700 transition-colors">
              {editingId.value ? 'Update' : 'Add'}
            </button>
            {editingId.value && (
              <button type="button" class="px-6 py-2 bg-white text-sage-700 border border-sage-300 rounded-full text-sm font-medium hover:bg-sage-50 transition-colors" onClick$={() => { editingId.value = null; form.value = {}; }}>
                Cancel
              </button>
            )}
          </div>
        </Form>
      </div>

      {/* Event Table Panel */}
      <div class="bg-gradient-to-br from-white to-clay-50/50 rounded-2xl p-6 border border-clay-200/50 shadow-xl">
        <h3 class="text-lg font-semibold text-clay-900 mb-4">Current Workshops</h3>
        {workshops.value.length === 0 ? (
          <div class="p-8 text-center text-gray-500">
            <p>No workshops found.</p>
          </div>
        ) : (
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spots</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {workshops.value.map((workshop) => (
                  <tr key={workshop.id} class={editingId.value === String(workshop.id) ? 'bg-sage-50' : 'hover:bg-gray-50'}>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{workshop.name}</div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{workshop.instructor}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{workshop.date}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{workshop.spots}</td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span class={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        workshop.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        workshop.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        workshop.level === 'Advanced' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {workshop.level}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 flex gap-2">
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
    </div>
  );
}); 