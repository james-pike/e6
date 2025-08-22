import { component$, useSignal, $ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import {
  useAddClass,
  useUpdateClass,
  useDeleteClass,
  useClassesLoader,
} from '~/routes/dashboard';

interface Workshop {
  id: number;
  name: string;
  instructor: string;
  date: string;
  description?: string;
  duration?: string;
  price?: string;
  image?: string; // base64 string
  url?: string;   // external booking link
}

export default component$(() => {
  const workshops = useClassesLoader();
  const addAction = useAddClass();
  const updateAction = useUpdateClass();
  const deleteAction = useDeleteClass();
  const editingId = useSignal<string | null>(null);
  const form = useSignal<Partial<Workshop>>({});

  const handleInput = $((e: any) => {
    form.value = { ...form.value, [e.target.name]: e.target.value };
  });

  const handleImageUpload = $((e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image must be smaller than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        form.value = { ...form.value, image: reader.result as string };
      };
      reader.readAsDataURL(file);
    }
  });

  const removeImage = $(() => {
    form.value = { ...form.value, image: undefined };
  });

  const handleEdit = $((workshop: Workshop) => {
    editingId.value = String(workshop.id);
    form.value = { ...workshop };
  });

  return (
    <div class="space-y-8 mb-8">
      {/* Form Section */}
      <div class="bg-white rounded-xl p-6 shadow border">
        <h3 class="text-lg font-semibold mb-4">
          {editingId.value ? 'Edit Workshop' : 'Add Workshop'}
        </h3>
        <Form
          action={editingId.value ? updateAction : addAction}
          spaReset
          onSubmit$={() => {
            editingId.value = null;
            form.value = {};
          }}
        >
          {editingId.value && (
            <input type="hidden" name="id" value={editingId.value} />
          )}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <input name="name" value={form.value.name || ''} onInput$={handleInput} placeholder="Class name" required class="form-input" />
            <input name="instructor" value={form.value.instructor || ''} onInput$={handleInput} placeholder="Instructor" required class="form-input" />
            <input name="date" type="date" value={form.value.date || ''} onInput$={handleInput} required class="form-input" />
            <input name="duration" value={form.value.duration || ''} onInput$={handleInput} placeholder="Duration" class="form-input" />
            <input name="price" value={form.value.price || ''} onInput$={handleInput} placeholder="Price" class="form-input" />
            <input name="url" value={form.value.url || ''} onInput$={handleInput} placeholder="Booking URL" type="url" class="form-input" />
          </div>

          {/* Description */}
          <div class="mb-4">
            <textarea
              name="description"
              value={form.value.description || ''}
              onInput$={handleInput}
              placeholder="Workshop description"
              rows={3}
              class="form-textarea"
            />
          </div>

          {/* Image Upload */}
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium">Workshop Image</label>
            <div class="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange$={handleImageUpload}
                class="form-input max-w-xs"
              />
              {form.value.image && (
                <button
                  type="button"
                  onClick$={removeImage}
                  class="bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            {form.value.image && (
              <div class="mt-3">
                <img src={form.value.image} alt="Preview" class="h-32 w-32 object-cover rounded border" />
              </div>
            )}
            <input type="hidden" name="image" value={form.value.image || ''} />
          </div>

          <div class="flex gap-2 mt-4">
            <button type="submit" class="bg-sage-600 text-white px-6 py-2 rounded-full text-sm hover:bg-sage-700">
              {editingId.value ? 'Update' : 'Add'}
            </button>
            {editingId.value && (
              <button type="button" class="bg-white text-sage-700 border border-sage-300 px-6 py-2 rounded-full text-sm" onClick$={() => { editingId.value = null; form.value = {}; }}>
                Cancel
              </button>
            )}
          </div>
        </Form>
      </div>

      {/* Table Display */}
      <div class="bg-white rounded-xl p-6 shadow border">
        <h3 class="text-lg font-semibold mb-4">Current Workshops</h3>
        {workshops.value.length === 0 ? (
          <div class="text-center text-gray-500">No workshops found.</div>
        ) : (
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 text-sm">
              <thead>
                <tr class="bg-gray-100 text-left">
                  <th class="px-4 py-3">Image</th>
                  <th class="px-4 py-3">Name</th>
                  <th class="px-4 py-3">Instructor</th>
                  <th class="px-4 py-3">Date</th>
                  <th class="px-4 py-3">Duration</th>
                  <th class="px-4 py-3">Price</th>
                  <th class="px-4 py-3">Description</th>
                  <th class="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                {workshops.value.map((workshop) => (
                  <tr key={workshop.id} class={editingId.value === String(workshop.id) ? 'bg-sage-50' : ''}>
                    <td class="px-4 py-3">
                      {workshop.image ? (
                        <img src={workshop.image} alt={workshop.name} class="h-12 w-12 object-cover rounded" />
                      ) : (
                        <span class="text-xs text-gray-400 italic">No image</span>
                      )}
                    </td>
                    <td class="px-4 py-3">{workshop.name}</td>
                    <td class="px-4 py-3">{workshop.instructor}</td>
                    <td class="px-4 py-3">{workshop.date}</td>
                    <td class="px-4 py-3">{workshop.duration}</td>
                    <td class="px-4 py-3">{workshop.price}</td>
                    <td class="px-4 py-3">{workshop.description}</td>
                    <td class="px-4 py-3 flex flex-col gap-2">
                      <button type="button" onClick$={() => handleEdit(workshop)} class="text-blue-600 hover:underline">
                        Edit
                      </button>
                      {workshop.url && (
                        <a
                          href={workshop.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-green-600 hover:underline"
                        >
                          Book
                        </a>
                      )}
                      <Form action={deleteAction} spaReset>
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
