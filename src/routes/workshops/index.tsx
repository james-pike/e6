import { component$, useSignal } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { tursoClient } from '~/utils/turso';

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
    image: (row as any).image,
    description: (row as any).description,
  }));
});



export default component$(() => {
  const workshops = useClassesLoader();
  const sortBy = useSignal('date');

  const sortedWorkshops = workshops.value.slice().sort((a, b) => {
    if (sortBy.value === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sortBy.value === 'level') {
      return a.level.localeCompare(b.level);
    }
    if (sortBy.value === 'instructor') {
      return a.instructor.localeCompare(b.instructor);
    }
    return 0;
  });

  return (
    <section class="max-w-6xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 text-center">All Workshops</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedWorkshops.map((workshop: any) => (
          <div
            key={workshop.id}
            class={"flex flex-col h-full rounded-lg shadow transition-transform hover:scale-105 relative overflow-hidden"}
            style={workshop.image ? { backgroundImage: `url('${workshop.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
            {/* Lighter overlay for readability */}
            <div class="absolute inset-0 bg-black/20" />
            <div class="relative z-10 flex flex-col h-full p-6">
              <h2 class="text-xl font-semibold mb-2 text-white drop-shadow-lg">{workshop.name || workshop.title}</h2>
              <p class="mb-4 px-2 py-2 rounded bg-black/40 text-white backdrop-blur-sm shadow text-sm" style={{wordBreak: 'break-word'}}>{workshop.description}</p>
              <div class="space-y-1 mb-4">
                {workshop.duration && (
                  <div class="flex items-center text-xs text-white/90">
                    <svg class="w-4 h-4 mr-1 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{workshop.duration}</span>
                  </div>
                )}
                {workshop.instructor && (
                  <div class="flex items-center text-xs text-white/90">
                    <svg class="w-4 h-4 mr-1 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <span>{workshop.instructor}</span>
                  </div>
                )}
                {workshop.price && (
                  <div class="flex items-center text-xs text-white/90">
                    <svg class="w-4 h-4 mr-1 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg>
                    <span>{workshop.price}</span>
                  </div>
                )}
                {workshop.spots && (
                  <div class="flex items-center text-xs text-white/90">
                    <svg class="w-4 h-4 mr-1 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <span>{workshop.spots} spots</span>
                  </div>
                )}
              </div>
              <div class="mt-auto">
                <span class="text-sm text-gray-100 drop-shadow">
                  {workshop.date
                    ? new Date(workshop.date).toLocaleDateString()
                    : ""}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}); 