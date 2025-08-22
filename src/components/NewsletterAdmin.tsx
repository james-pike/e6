import { component$, useStore } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useAddNewsletter, useDeleteNewsletter, usenewsletterLoader } from '~/routes/dashboard';

export default component$(() => {
  const newsletter = usenewsletterLoader().value;
  const addNewsletter = useAddNewsletter();
  const deleteNewsletter = useDeleteNewsletter();

  const store = useStore({
    newTitle: '',
    newSlug: '',
    newDate: '',
    newContent: '',
    newImage: '',
  });

  // Reset form fields after successful add
  if (addNewsletter.value?.success) {
    store.newTitle = '';
    store.newSlug = '';
    store.newDate = '';
    store.newContent = '';
    store.newImage = '';
  }

  return (
    <div class="max-w-3xl mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Manage newsletter</h1>

      <Form
        action={addNewsletter}
        spaReset
        class="mb-8 space-y-4"
      >
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={store.newTitle}
          onInput$={(e) => (store.newTitle = (e.target as HTMLInputElement).value)}
          required
          class="w-full border rounded px-3 py-2"
        />
        <input
          name="slug"
          type="text"
          placeholder="Slug"
          value={store.newSlug}
          onInput$={(e) => (store.newSlug = (e.target as HTMLInputElement).value)}
          required
          class="w-full border rounded px-3 py-2"
        />
        <input
          name="date"
          type="date"
          value={store.newDate}
          onInput$={(e) => (store.newDate = (e.target as HTMLInputElement).value)}
          required
          class="w-full border rounded px-3 py-2"
        />
        <textarea
          name="content"
          placeholder="Content (Markdown)"
          value={store.newContent}
          onInput$={(e) => (store.newContent = (e.target as HTMLTextAreaElement).value)}
          required
          rows={6}
          class="w-full border rounded px-3 py-2"
        />
        <input
          name="image"
          type="text"
          placeholder="Image URL or base64"
          value={store.newImage}
          onInput$={(e) => (store.newImage = (e.target as HTMLInputElement).value)}
          class="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          disabled={addNewsletter.isRunning}
          class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {addNewsletter.isRunning ? 'Adding...' : 'Add Newsletter'}
        </button>
      </Form>

      <h2 class="text-xl font-semibold mb-4">Existing newsletter</h2>

      {newsletter.length === 0 ? (
        <p class="text-gray-500">No newsletter available.</p>
      ) : (
        <ul class="space-y-6">
          {newsletter.map((n) => (
            <li key={n.id} class="border p-4 rounded shadow-sm flex flex-col md:flex-row md:items-center md:justify-between">
              <div class="mb-4 md:mb-0 md:flex-1">
                <h3 class="text-lg font-semibold">{n.title}</h3>
                <p class="text-sm text-gray-600">Date: {n.date}</p>
                {n.image && (
                  <img
                    src={n.image}
                    alt={`Image for ${n.title}`}
                    class="mt-2 max-w-xs rounded"
                  />
                )}
              </div>
              <div>
                <Form action={deleteNewsletter} spaReset>
                  <input type="hidden" name="id" value={n.id} />
                  <button
                    type="submit"
                    disabled={deleteNewsletter.isRunning}
                    class="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </Form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
