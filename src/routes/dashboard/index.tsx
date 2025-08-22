import { component$, useSignal } from "@builder.io/qwik";
import { type RequestHandler, routeLoader$, routeAction$, zod$, z } from "@builder.io/qwik-city";
import { useSession, useSignOut } from "~/routes/plugin@auth";
import EventAdmin from '~/components/eventAdmin';
import FaqAdmin from '~/components/FaqAdmin';
import ReviewAdmin from '~/components/ReviewAdmin';
import { tursoClient } from '~/utils/turso';
import GalleryAdmin from "~/components/GalleryAdmin";
import NewsletterAdmin from "~/components/NewsletterAdmin";

// CRUD Loaders/Actions for dashboard
// Class Loader - without spots and level
// Load newsletter from DB
export const usenewsletterLoader = routeLoader$(async (event) => {
  const client = tursoClient(event);
  const result = await client.execute('SELECT * FROM newsletter ORDER BY date DESC');
  return result.rows.map(row => ({
    id: (row as any).id as number,
    title: (row as any).title as string,
    slug: (row as any).slug as string,
    date: (row as any).date as string,
    content: (row as any).content as string,
    image: (row as any).image as string | null,
  }));
});

// Add a newsletter
export const useAddNewsletter = routeAction$(async (formData: any, event) => {
  const client = tursoClient(event);
  // Type cast formData fields explicitly
  const title = String(formData.title);
  const slug = String(formData.slug);
  const date = String(formData.date);
  const content = String(formData.content);
  const image = formData.image ? String(formData.image) : null;

  await client.execute(
    'INSERT INTO newsletter (title, slug, date, content, image) VALUES (?, ?, ?, ?, ?)',
    [title, slug, date, content, image]
  );

  return { success: true };
});

// Delete newsletter
export const useDeleteNewsletter = routeAction$(async (formData: any, event) => {
  const client = tursoClient(event);
  const id = Number(formData.id);

  if (isNaN(id)) {
    return { success: false, error: 'Invalid id' };
  }

  await client.execute('DELETE FROM newsletter WHERE id = ?', [id]);

  return { success: true };
});


export const useClassesLoader = routeLoader$(async (event) => {
  const client = tursoClient(event);
  const result = await client.execute('SELECT * FROM classes ORDER BY date ASC');
  return result.rows.map(row => ({
    id: (row as any).id,
    name: (row as any).name,
    instructor: (row as any).instructor,
    date: (row as any).date,
    image: (row as any).image,
    description: (row as any).description,
    duration: (row as any).duration,
    price: (row as any).price,
    url: (row as any).url,
  })) as Array<{
    id: number;
    name: string;
    instructor: string;
    date: string;
    image?: string;
    description?: string;
    duration?: string;
    price?: string;
    url?: string;
  }>;
});



// Add Class action
export const useAddClass = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute(
      'INSERT INTO classes (name, instructor, date, image, description, duration, price, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        data.name,
        data.instructor,
        data.date,
        data.image || null,
        data.description || null,
        data.duration || null,
        data.price || null,
        data.url || null,
      ]
    );
    return { success: true };
  },
  zod$({
    name: z.string().min(1),
    instructor: z.string().min(1),
    date: z.string().min(1),
    image: z.string().optional(),
    description: z.string().optional(),
    duration: z.string().optional(),
    price: z.string().optional(),
    url: z.string().url().optional(),
  })
);

// Update Class action
export const useUpdateClass = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute(
      'UPDATE classes SET name = ?, instructor = ?, date = ?, image = ?, description = ?, duration = ?, price = ?, url = ? WHERE id = ?',
      [
        data.name,
        data.instructor,
        data.date,
        data.image || null,
        data.description || null,
        data.duration || null,
        data.price || null,
        data.url || null,
        data.id,
      ]
    );
    return { success: true };
  },
  zod$({
    id: z.string().min(1),
    name: z.string().min(1),
    instructor: z.string().min(1),
    date: z.string().min(1),
    image: z.string().optional(),
    description: z.string().optional(),
    duration: z.string().optional(),
    price: z.string().optional(),
    url: z.string().url().optional(),
  })
);

// Delete Class action (unchanged)
export const useDeleteClass = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute('DELETE FROM classes WHERE id = ?', [data.id]);
    return { success: true };
  },
  zod$({ id: z.string().min(1) })
);

// Gallery CRUD Loaders/Actions
export const useGalleryLoader = routeLoader$(async (event) => {
  const client = tursoClient(event);
  const result = await client.execute('SELECT * FROM gallery ORDER BY id ASC');
  return result.rows.map(row => ({
    id: (row as any).id,
    image: (row as any).image,
  })) as Array<{ id: number; image: string }>;
});

export const useAddGalleryImage = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute(
      'INSERT INTO gallery (image) VALUES (?)',
      [data.image]
    );
    return { success: true };
  },
  zod$({
    image: z.string().min(1),
  })
);

export const useDeleteGalleryImage = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute('DELETE FROM gallery WHERE id = ?', [data.id]);
    return { success: true };
  },
  zod$({
    id: z.string().min(1),
  })
);






// FAQ Loaders/Actions
export const useFaqsLoader = routeLoader$(async (event) => {
  const client = tursoClient(event);
  const result = await client.execute('SELECT id, question, answer FROM faqs ORDER BY id ASC');
  return result.rows.map(row => ({
    id: (row as any).id,
    question: (row as any).question,
    answer: (row as any).answer,
  })) as Array<{ id: number; question: string; answer: string }>;
});

export const useAddFaq = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute(
      'INSERT INTO faqs (question, answer) VALUES (?, ?)',
      [data.question, data.answer]
    );
    return { success: true };
  },
  zod$({
    question: z.string().min(1),
    answer: z.string().min(1),
  })
);

export const useUpdateFaq = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute(
      'UPDATE faqs SET question = ?, answer = ? WHERE id = ?',
      [data.question, data.answer, data.id]
    );
    return { success: true };
  },
  zod$({
    id: z.string().min(1),
    question: z.string().min(1),
    answer: z.string().min(1),
  })
);

export const useDeleteFaq = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute('DELETE FROM faqs WHERE id = ?', [data.id]);
    return { success: true };
  },
  zod$({
    id: z.string().min(1),
  })
);


// Reviews CRUD Loaders/Actions
export const useReviewsLoader = routeLoader$(async (event) => {
  const client = tursoClient(event);
  const result = await client.execute('SELECT * FROM reviews ORDER BY id ASC');
  return result.rows.map(row => ({
    id: (row as any).id,
    name: (row as any).name,
    review: (row as any).review,
    rating: (row as any).rating,
    date: (row as any).date,
    role: (row as any).role, // ✅ Include role
  })) as Array<{ id: number; name: string; review: string; rating: number; date: string; role: string }>;
});

export const useAddReview = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    let reviewDate = data.date;
    // If date is missing or is a short YYYY-MM-DD string, use current ISO timestamp
    if (!reviewDate || /^\d{4}-\d{2}-\d{2}$/.test(reviewDate)) {
      reviewDate = new Date().toISOString();
    }
    await client.execute(
<<<<<<< HEAD
      'INSERT INTO reviews (name, review, rating, date) VALUES (?, ?, ?, ?)',
      [data.name, data.review, Number(data.rating), reviewDate]
=======
      'INSERT INTO reviews (name, review, rating, date, role) VALUES (?, ?, ?, ?, ?)',
      [data.name, data.review, Number(data.rating), data.date, data.role] // ✅ Include role
>>>>>>> temp-branch
    );
    return { success: true };
  },
  zod$({
    name: z.string().min(1),
    review: z.string().min(1),
    rating: z.string().min(1),
    date: z.string().min(1),
    role: z.string().min(1), // ✅ Validate role
  })
);

export const useUpdateReview = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    let reviewDate = data.date;
    // If date is missing or is a short YYYY-MM-DD string, use current ISO timestamp
    if (!reviewDate || /^\d{4}-\d{2}-\d{2}$/.test(reviewDate)) {
      reviewDate = new Date().toISOString();
    }
    await client.execute(
<<<<<<< HEAD
      'UPDATE reviews SET name = ?, review = ?, rating = ?, date = ? WHERE id = ?',
      [data.name, data.review, Number(data.rating), reviewDate, data.id]
=======
      'UPDATE reviews SET name = ?, review = ?, rating = ?, date = ?, role = ? WHERE id = ?',
      [data.name, data.review, Number(data.rating), data.date, data.role, data.id] // ✅ Include role
>>>>>>> temp-branch
    );
    return { success: true };
  },
  zod$({
    id: z.string().min(1),
    name: z.string().min(1),
    review: z.string().min(1),
    rating: z.string().min(1),
    date: z.string().min(1),
    role: z.string().min(1), // ✅ Validate role
  })
);

export const useDeleteReview = routeAction$(
  async (data, event) => {
    const client = tursoClient(event);
    await client.execute('DELETE FROM reviews WHERE id = ?', [data.id]);
    return { success: true };
  },
  zod$({ id: z.string().min(1) })
);

// Route protection - redirect to signin if not authenticated
export const onRequest: RequestHandler = (event) => {
  const session = event.sharedMap.get('session');
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, `/auth/signin?callbackUrl=${event.url.pathname}`);
  }
};

export default component$(() => {
  const session = useSession();
  const signOut = useSignOut();
  const isLoading = useSignal(false);

  return (
    <div class="min-h-screen bg-gradient-to-br from-sage-50 via-white to-clay-50">
      {/* Header */}
      <header class="bg-white/80 backdrop-blur-sm border-b border-clay-200/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div class="flex items-center">
              <h1 class="text-2xl font-bold text-clay-900 font-serif">
                Earthen Vessels Admin
              </h1>
            </div>
            
            {/* User Menu */}
            <div class="flex items-center space-x-4 relative">
              {session.value?.user && (
                <div class="flex items-center space-x-3">
                  <div class="text-right">
                    <p class="text-sm font-medium text-clay-900">
                      {session.value.user.name}
                    </p>
                    <p class="text-xs text-sage-600">
                      {session.value.user.email}
                    </p>
                  </div>
                  {session.value.user.image && (
                    <img
                      src={session.value.user.image}
                      alt="Profile"
                      class="w-10 h-10 rounded-full border-2 border-clay-200"
                    />
                  )}
                  <button
                    onClick$={() => {
                      isLoading.value = true;
                      signOut.submit({ redirectTo: '/' });
                    }}
                    disabled={isLoading.value}
                    class="ml-2 px-4 py-2 bg-clay-600 text-white rounded-full text-sm font-medium hover:bg-clay-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading.value ? 'Signing out...' : 'Sign Out'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-clay-200/50 p-8">
          {/* <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-clay-900 font-serif mb-4">
              Welcome to Your Dashboard
            </h2>
            <p class="text-lg text-sage-700 max-w-2xl mx-auto">
              You've successfully signed in with Twitter! This is a protected page that only authenticated users can access.
            </p>
          </div> */}

          {/* User Info Card */}
          {/* Removed profile info card as requested */}

          {/* Event Admin Section - Only visible to authenticated users */}
          <div class="mb-12">
            <EventAdmin />
          </div>
          {/* FAQ Admin Section */}
          <div class="mb-12">
            <FaqAdmin />
          </div>
          {/* Review Admin Section */}
          <div class="mb-12">
            <ReviewAdmin />
          </div>

          <div class="mb-12">
            <GalleryAdmin />
          </div>

          <NewsletterAdmin/>



          {/* Dashboard Content */}
          {/* Session Info */}
          <div class="mt-8 p-4 bg-sage-50 rounded-xl">
            <h4 class="text-sm font-medium text-sage-800 mb-2">Session Information</h4>
            <div class="text-xs text-sage-600 space-y-1">
              <p>Session expires: {session.value?.expires ? new Date(session.value.expires).toLocaleString() : 'N/A'}</p>
              <p>Provider: Twitter OAuth</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}); 