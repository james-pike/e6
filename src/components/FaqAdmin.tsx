import { component$, useSignal, $ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useAddFaq, useUpdateFaq, useDeleteFaq, useFaqsLoader } from '~/routes/dashboard/index';

interface Faq {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default component$(() => {
  const faqs = useFaqsLoader();
  const addAction = useAddFaq();
  const updateAction = useUpdateFaq();
  const deleteAction = useDeleteFaq();
  const editingId = useSignal<string | null>(null);
  const form = useSignal<Partial<Faq>>({});

  // Handle form input changes
  const handleInput = $((e: any) => {
    form.value = { ...form.value, [e.target.name]: e.target.value };
  });

  // Edit FAQ
  const handleEdit = $((faq: Faq) => {
    editingId.value = String(faq.id);
    form.value = { ...faq };
  });

  const categories = ['General', 'Care', 'Shipping', 'Custom', 'Workshops'];

  return (
    <div class="space-y-8 mb-8">
      {/* Add/Edit FAQ Panel - Full Width */}
      <div class="bg-gradient-to-br from-white to-sage-50/50 rounded-2xl p-6 border border-sage-200/50 shadow-xl">
        <h3 class="text-lg font-semibold text-clay-900 mb-4">
          {editingId.value ? 'Edit FAQ' : 'Add FAQ'}
        </h3>
        <Form action={editingId.value ? updateAction : addAction} spaReset onSubmit$={() => { editingId.value = null; form.value = {}; }}>
          {editingId.value && <input type="hidden" name="id" value={editingId.value} />}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input name="question" value={form.value.question || ''} onInput$={handleInput} placeholder="Question" required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300 w-full" />
            <select name="category" value={form.value.category || 'General'} onInput$={handleInput} required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300 w-full">
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input name="answer" value={form.value.answer || ''} onInput$={handleInput} placeholder="Answer" required class="border border-clay-300 rounded-lg px-4 py-2 text-clay-900 bg-white focus:ring-2 focus:ring-sage-300 w-full" />
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

      {/* FAQ Table Panel - Full Width */}
      <div class="bg-gradient-to-br from-white to-clay-50/50 rounded-2xl p-6 border border-clay-200/50 shadow-xl">
        <h3 class="text-lg font-semibold text-clay-900 mb-4">Current FAQs</h3>
        {faqs.value.length === 0 ? (
          <div class="p-8 text-center text-gray-500">
            <p>No FAQs found.</p>
          </div>
        ) : (
          <>
            {/* Table for md+ screens */}
            <div class="hidden md:block overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answer</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {faqs.value.map((faq: Faq) => (
                    <tr key={faq.id} class={editingId.value === String(faq.id) ? 'bg-sage-50' : 'hover:bg-gray-50'}>
                      <td class="px-4 py-3 whitespace-pre-line text-sm font-medium text-gray-900 max-w-xs break-words">{faq.question}</td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        <span class={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(faq.category)}`}>
                          {faq.category}
                        </span>
                      </td>
                      <td class="px-4 py-3 whitespace-pre-line text-sm text-gray-900 max-w-lg break-words">{faq.answer}</td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 flex gap-2">
                        <button
                          class="text-blue-600 hover:underline mr-2"
                          onClick$={() => handleEdit(faq)}
                        >
                          Edit
                        </button>
                        <Form action={deleteAction} spaReset style={{ display: 'inline' }}>
                          <input type="hidden" name="id" value={faq.id} />
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
              {faqs.value.map((faq: Faq) => (
                <div key={faq.id} class="bg-white rounded-xl shadow border border-clay-100 p-4 flex flex-col gap-2">
                  <div class="font-semibold text-clay-900 text-base mb-1">{faq.question}</div>
                  <div class="mb-2">
                    <span class={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(faq.category)}`}>
                      {faq.category}
                    </span>
                  </div>
                  <div class="text-sm text-sage-700 mb-2">{faq.answer}</div>
                  <div class="flex gap-3 mt-2">
                    <button
                      class="flex-1 px-3 py-2 bg-sage-600 text-white rounded-full text-xs font-medium hover:bg-sage-700 transition-colors"
                      onClick$={() => handleEdit(faq)}
                    >
                      Edit
                    </button>
                    <Form action={deleteAction} spaReset class="flex-1">
                      <input type="hidden" name="id" value={faq.id} />
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

// Helper function to get category colors (same as in FAQAccordion)
function getCategoryColor(category: string) {
  switch (category) {
    case 'Care': return 'bg-gradient-to-r from-sage-100 to-sage-200 text-sage-700 border-sage-300 shadow-sage-200/50';
    case 'General': return 'bg-gradient-to-r from-clay-100 to-clay-200 text-clay-700 border-clay-300 shadow-clay-200/50';
    case 'Shipping': return 'bg-gradient-to-r from-earth-100 to-earth-200 text-earth-700 border-earth-300 shadow-earth-200/50';
    case 'Custom': return 'bg-gradient-to-r from-clay-100 to-earth-100 text-clay-700 border-clay-300 shadow-clay-200/50';
    case 'Workshops': return 'bg-gradient-to-r from-sage-100 to-clay-100 text-sage-700 border-sage-300 shadow-sage-200/50';
    default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300 shadow-gray-200/50';
  }
} 