import { component$, useSignal, $ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useAddClass, useUpdateClass, useDeleteClass, useClassesLoader } from '~/routes/dashboard';
import { useUploadImage } from '~/routes/api/upload';

interface Workshop {
  id: number;
  name: string;
  instructor: string;
  date: string;
  spots: number;
  level: string;
  image?: string | null;
}

export default component$(() => {
  const workshops = useClassesLoader();
  const addAction = useAddClass();
  const updateAction = useUpdateClass();
  const deleteAction = useDeleteClass();
  const uploadAction = useUploadImage();
  const editingId = useSignal<string | null>(null);
  const form = useSignal<Partial<Workshop>>({});
  const isUploading = useSignal(false);
  const previewUrl = useSignal<string>('');

  // Handle form input changes
  const handleInput = $((e: any) => {
    form.value = { ...form.value, [e.target.name]: e.target.value };
  });

  // Handle file selection
  const handleFileSelect = $((e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const url = URL.createObjectURL(file);
      previewUrl.value = url;
      
      // Upload immediately when file is selected
      handleImageUpload(file);
    }
  });

  // Handle image upload
  const handleImageUpload = $(async (file: File) => {
    isUploading.value = true;
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const result = await uploadAction.submit(formData);
      
      if (result.value?.success) {
        form.value = { ...form.value, image: result.value.url };
        // Clear the preview
        previewUrl.value = '';
      } else {
        console.error('Upload failed:', result.value?.error);
        alert('Upload failed: ' + (result.value?.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      isUploading.value = false;
    }
  });

  // Edit workshop
  const handleEdit = $((workshop: Workshop) => {
    editingId.value = String(workshop.id);
    form.value = { ...workshop };
    previewUrl.value = workshop.image || '';
  });

  return (
    <div class="space-y-8 mb-8">
      {/* Add/Edit Event Panel - Full Width */}
      <div class="bg-gradient-to-br from-white to-sage-50/50 rounded-2xl p-6 border border-sage-200/50 shadow-xl">
        <h3 class="text-lg font-semibold text-clay-900 mb-4">
          {editingId.value ? 'Edit Workshop' : 'Add Workshop'}
        </h3>
        <Form action={editingId.value ? updateAction : addAction} spaReset onSubmit$={() => { editingId.value = null; form.value = {}; previewUrl.value = ''; }}>
          {editingId.value && <input type="hidden" name="id" value={editingId.value} />}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <input name="name" value={form.value.name || ''} onInput$={handleInput} placeholder="Class name" required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300 w-full" />
            <input name="instructor" value={form.value.instructor || ''} onInput$={handleInput} placeholder="Instructor" required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300 w-full" />
            <input name="date" type="date" value={form.value.date || ''} onInput$={handleInput} required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300 w-full" />
            <input name="spots" type="number" min="1" value={form.value.spots || ''} onInput$={handleInput} placeholder="Spots" required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300 w-full" />
            <select name="level" value={form.value.level || ''} onInput$={handleInput} required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300 w-full">
              <option value="">Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>

          {/* Image Upload Section */}
          <div class="mb-4">
            <label class="block text-sm font-medium text-clay-900 mb-2">Workshop Image</label>
            <div class="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange$={handleFileSelect}
                class="border border-clay-300 rounded-lg px-4 py-2 bg-white w-full max-w-xs"
              />
              {isUploading.value && (
                <span class="text-sage-600">Uploading...</span>
              )}
            </div>
            
            {/* Image Preview */}
            {(previewUrl.value || form.value.image) && (
              <div class="mt-3">
                <img 
                  src={previewUrl.value || form.value.image || ''} 
                  alt="Preview" 
                  class="h-32 w-32 object-cover rounded-lg border border-clay-200"
                />
                {form.value.image && (
                  <p class="text-sm text-sage-600 mt-1">Current image: {form.value.image}</p>
                )}
              </div>
            )}
            
            {/* Hidden input for the image URL */}
            <input type="hidden" name="image" value={form.value.image || ''} />
          </div>

          <div class="flex gap-2 flex-wrap">
            <button type="submit" class="px-6 py-2 bg-sage-600 text-white rounded-full text-sm font-medium hover:bg-sage-700 transition-colors">
              {editingId.value ? 'Update' : 'Add'}
            </button>
            {editingId.value && (
              <button type="button" class="px-6 py-2 bg-white text-sage-700 border border-sage-300 rounded-full text-sm font-medium hover:bg-sage-50 transition-colors" onClick$={() => { editingId.value = null; form.value = {}; previewUrl.value = ''; }}>
                Cancel
              </button>
            )}
          </div>
        </Form>
      </div>

      {/* Event Table Panel - Full Width */}
      <div class="bg-gradient-to-br from-white to-clay-50/50 rounded-2xl p-6 border border-clay-200/50 shadow-xl">
        <h3 class="text-lg font-semibold text-clay-900 mb-4">Current Workshops</h3>
        {workshops.value.length === 0 ? (
          <div class="p-8 text-center text-gray-500">
            <p>No workshops found.</p>
          </div>
        ) : (
          <>
            {/* Table for md+ screens */}
            <div class="hidden md:block overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
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
                        {workshop.image ? (
                          <img src={workshop.image} alt={workshop.name} class="h-12 w-12 object-cover rounded-lg" />
                        ) : (
                          <div class="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span class="text-gray-400 text-xs">No image</span>
                          </div>
                        )}
                      </td>
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
            {/* Card list for mobile screens */}
            <div class="md:hidden flex flex-col gap-4">
              {workshops.value.map((workshop) => (
                <div key={workshop.id} class="bg-white rounded-xl shadow border border-clay-100 p-4 flex flex-col gap-2">
                  <div class="flex items-center space-x-3 mb-2">
                    {workshop.image ? (
                      <img src={workshop.image} alt={workshop.name} class="h-16 w-16 object-cover rounded-lg" />
                    ) : (
                      <div class="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span class="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                    <div class="flex-1">
                      <div class="font-semibold text-clay-900 text-base">{workshop.name}</div>
                      <span class={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        workshop.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        workshop.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        workshop.level === 'Advanced' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {workshop.level}
                      </span>
                    </div>
                  </div>
                  <div class="text-sm text-sage-700 mb-1">Instructor: <span class="text-clay-900 font-medium">{workshop.instructor}</span></div>
                  <div class="text-sm text-sage-700 mb-1">Date: <span class="text-clay-900 font-medium">{workshop.date}</span></div>
                  <div class="text-sm text-sage-700 mb-1">Spots: <span class="text-clay-900 font-medium">{workshop.spots}</span></div>
                  <div class="flex gap-3 mt-2">
                    <button
                      class="flex-1 px-3 py-2 bg-sage-600 text-white rounded-full text-xs font-medium hover:bg-sage-700 transition-colors"
                      onClick$={() => handleEdit(workshop)}
                    >
                      Edit
                    </button>
                    <Form action={deleteAction} spaReset class="flex-1">
                      <input type="hidden" name="id" value={workshop.id} />
                      <button type="submit" class="w-full px-3 py-2 bg-red-600 text-white rounded-full text-xs font-medium hover:bg-red-700 transition-colors">
                        Delete
                      </button>
                    </Form>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}); 