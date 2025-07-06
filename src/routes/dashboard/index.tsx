import { component$, useSignal } from "@builder.io/qwik";
import { type RequestHandler, routeLoader$, routeAction$, zod$, z, Form } from "@builder.io/qwik-city";
import { useSession, useSignOut } from "~/routes/plugin@auth";
import EventAdmin from '~/components/eventAdmin';
import { tursoClient } from '~/utils/turso';

// CRUD Loaders/Actions for dashboard
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
                Pottery Studio Dashboard
              </h1>
            </div>
            
            {/* User Menu */}
            <div class="flex items-center space-x-4">
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
                    class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-full hover:bg-sage-50 hover:border-sage-400 transition-colors duration-200 disabled:opacity-50"
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
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-clay-200/50 p-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-clay-900 font-serif mb-4">
              Welcome to Your Dashboard
            </h2>
            <p class="text-lg text-sage-700 max-w-2xl mx-auto">
              You've successfully signed in with Twitter! This is a protected page that only authenticated users can access.
            </p>
          </div>

          {/* User Info Card */}
          <div class="bg-gradient-to-br from-sage-50 to-clay-50 rounded-2xl p-6 mb-8">
            <h3 class="text-xl font-semibold text-clay-900 mb-4">Your Profile</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="space-y-3">
                <div class="flex items-center">
                  <span class="text-sm font-medium text-sage-700 w-20">Name:</span>
                  <span class="text-clay-900">{session.value?.user?.name || 'N/A'}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-sm font-medium text-sage-700 w-20">Email:</span>
                  <span class="text-clay-900">{session.value?.user?.email || 'N/A'}</span>
                </div>
                <div class="flex items-center">
                  <span class="text-sm font-medium text-sage-700 w-20">Provider:</span>
                  <span class="text-clay-900">Twitter</span>
                </div>
              </div>
              {session.value?.user?.image && (
                <div class="flex justify-center md:justify-end">
                  <img
                    src={session.value.user.image}
                    alt="Profile"
                    class="w-24 h-24 rounded-full border-4 border-clay-200 shadow-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Event Admin Section - Only visible to authenticated users */}
          <div class="mb-12">
            <EventAdmin />
          </div>

          {/* Dashboard Content */}
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Workshop Management */}
            <div class="bg-gradient-to-br from-white to-sage-50/50 rounded-2xl p-6 border border-sage-200/50">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-clay-900">Workshops</h3>
              </div>
              <p class="text-sage-700 text-sm mb-4">
                Manage your pottery workshops and class schedules.
              </p>
              <button class="w-full px-4 py-2 bg-sage-600 text-white rounded-full text-sm font-medium hover:bg-sage-700 transition-colors">
                View Workshops
              </button>
            </div>

            {/* Bookings */}
            <div class="bg-gradient-to-br from-white to-clay-50/50 rounded-2xl p-6 border border-clay-200/50">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-clay-100 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-clay-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-clay-900">Bookings</h3>
              </div>
              <p class="text-sage-700 text-sm mb-4">
                View and manage your workshop bookings and reservations.
              </p>
              <button class="w-full px-4 py-2 bg-clay-600 text-white rounded-full text-sm font-medium hover:bg-clay-700 transition-colors">
                View Bookings
              </button>
            </div>

            {/* Profile Settings */}
            <div class="bg-gradient-to-br from-white to-earth-50/50 rounded-2xl p-6 border border-earth-200/50">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-earth-100 rounded-full flex items-center justify-center mr-3">
                  <svg class="w-5 h-5 text-earth-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-clay-900">Settings</h3>
              </div>
              <p class="text-sage-700 text-sm mb-4">
                Manage your account settings and preferences.
              </p>
              <button class="w-full px-4 py-2 bg-earth-600 text-white rounded-full text-sm font-medium hover:bg-earth-700 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

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