import { component$, useSignal, $ } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useGalleryLoader, useAddGalleryImage, useDeleteGalleryImage } from '~/routes/dashboard';

interface GalleryImage {
  id: number;
  image: string;
}

export default component$(() => {
  const gallery = useGalleryLoader();
  const addAction = useAddGalleryImage();
  const deleteAction = useDeleteGalleryImage();
  const imageData = useSignal<string>('');

  const handleImageUpload = $((event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageData.value = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  });

  return (
    <div class="space-y-8 mb-8">
      {/* Upload Image */}
      <div class="bg-gradient-to-br from-white to-sage-50/50 rounded-2xl p-6 border border-sage-200/50 shadow-xl">
        <h3 class="text-lg font-semibold text-clay-900 mb-4">Add Gallery Image</h3>
        <Form action={addAction} spaReset onSubmit$={() => { imageData.value = ''; }}>
          <input type="hidden" name="image" value={imageData.value} />
          <input type="file" accept="image/*" onChange$={handleImageUpload} class="mb-4" />
          {imageData.value && (
            <div class="mb-4">
              <img src={imageData.value} alt="Preview" class="max-h-64 rounded-lg border border-gray-200" />
            </div>
          )}
          <button type="submit" class="px-6 py-2 bg-sage-600 text-white rounded-full text-sm font-medium hover:bg-sage-700 transition-colors">
            Upload
          </button>
        </Form>
      </div>

      {/* Gallery List */}
      <div class="bg-gradient-to-br from-white to-clay-50/50 rounded-2xl p-6 border border-clay-200/50 shadow-xl">
        <h3 class="text-lg font-semibold text-clay-900 mb-4">Gallery Images</h3>
        {gallery.value.length === 0 ? (
          <div class="p-8 text-center text-gray-500">No images yet.</div>
        ) : (
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.value.map((img: GalleryImage) => (
              <div key={img.id} class="relative group rounded-lg overflow-hidden border border-clay-100 shadow-sm">
                <img src={img.image} alt={`Gallery image ${img.id}`} class="w-full h-48 object-cover" />
                <Form action={deleteAction} spaReset class="absolute top-2 right-2">
                  <input type="hidden" name="id" value={img.id} />
                  <button type="submit" class="bg-white text-red-600 text-xs rounded-full px-3 py-1 shadow hover:bg-red-50">
                    Delete
                  </button>
                </Form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
