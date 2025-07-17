import { component$, useSignal, $ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useReviewsLoader, useAddReview, useUpdateReview, useDeleteReview } from '~/routes/dashboard';

interface Review {
  id: number;
  name: string;
  review: string;
  rating: number;
  date: string;
}

export default component$(() => {
  const reviews = useReviewsLoader();
  const addAction = useAddReview();
  const updateAction = useUpdateReview();
  const deleteAction = useDeleteReview();
  const editingId = useSignal<string | null>(null);
  const form = useSignal<Partial<Review>>({});

  // Handle form input changes
  const handleInput = $((e: any) => {
    form.value = { ...form.value, [e.target.name]: e.target.value };
  });

  // Edit review
  const handleEdit = $((review: Review) => {
    editingId.value = String(review.id);
    form.value = { ...review };
  });

  return (
    <div class="space-y-8 mb-8">
      {/* Add/Edit Review Panel */}
      <div class="bg-gradient-to-br from-white to-sage-50/50 rounded-2xl p-6 border border-sage-200/50 shadow-xl">
        <h3 class="text-lg font-semibold text-clay-900 mb-4">
          {editingId.value ? 'Edit Review' : 'Add Review'}
        </h3>
        <Form action={editingId.value ? updateAction : addAction} spaReset onSubmit$={() => { editingId.value = null; form.value = {}; }}>
          {editingId.value && <input type="hidden" name="id" value={editingId.value} />}
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input name="name" value={form.value.name || ''} onInput$={handleInput} placeholder="Name" required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300 w-full" />
            <input name="date" type="date" value={form.value.date || ''} onInput$={handleInput} required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300 w-full" />
            <select name="rating" value={form.value.rating || ''} onInput$={handleInput} required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300 w-full">
              <option value="">Rating</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
            <textarea name="review" value={form.value.review || ''} onInput$={handleInput} placeholder="Review text" required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300 w-full min-h-[40px]" />
          </div>
          <div class="flex gap-2 flex-wrap">
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

      {/* Review Table Panel */}
      <div class="bg-gradient-to-br from-white to-clay-50/50 rounded-2xl p-4 border border-clay-200/50 shadow-xl max-w-full w-full mx-0">
        <h3 class="text-lg font-semibold text-clay-900 mb-4">Current Reviews</h3>
        {reviews.value.length === 0 ? (
          <div class="p-8 text-center text-gray-500">
            <p>No reviews found.</p>
          </div>
        ) : (
          <div class="overflow-x-auto w-full">
            <table class="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {reviews.value.map((review) => (
                  <tr key={review.id}>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{review.name}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{review.date}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{review.rating}</td>
                    <td class="px-4 py-3 max-w-xs truncate text-sm text-gray-900" title={review.review}>{review.review}</td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 flex gap-2 sticky right-0 bg-white z-10">
                      <button
                        class="text-blue-600 hover:underline mr-2"
                        onClick$={() => handleEdit(review)}
                      >
                        Edit
                      </button>
                      <Form action={deleteAction} spaReset style={{ display: 'inline' }}>
                        <input type="hidden" name="id" value={review.id} />
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