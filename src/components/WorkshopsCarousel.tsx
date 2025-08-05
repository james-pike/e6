import { component$ } from "@builder.io/qwik";

interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  duration: string;
  price: string;
  image: string;
  instructor: string;
  spots: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
}

interface WorkshopsCarouselProps {
  workshops: Workshop[];
}

export default component$<WorkshopsCarouselProps>(({ workshops }) => {
  // Don't render if no workshops
  if (!workshops || workshops.length === 0) {
    return (
      <section class="relative overflow-hidden py-16 md:py-20">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div class="text-center">
            <h2 class="text-4xl md:text-5xl font-bold font-serif mb-6">
              <span class="bg-gradient-to-r from-clay-600 via-earth-600 to-sage-600 bg-clip-text text-transparent">
                Upcoming Workshops
              </span>
            </h2>
            <p class="text-xl text-sage-700 dark:text-sage-300 max-w-3xl mx-auto">
              No workshops available at the moment. Check back soon for new pottery classes!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section class="relative overflow-hidden py-16 md:py-20">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 bg-pottery-texture opacity-20" aria-hidden="true"></div>
      
      {/* Gradient background */}
      <div class="absolute inset-0 bg-gradient-to-br from-sage-50/50 via-white to-clay-50/50" aria-hidden="true"></div>
      
      {/* Floating decorative elements */}
      <div class="absolute top-20 left-10 w-24 h-24 bg-clay-300/20 rounded-full blur-xl animate-float"></div>
      <div class="absolute bottom-20 right-10 w-20 h-20 bg-sage-300/20 rounded-full blur-xl animate-float" style="animation-delay: -2s;"></div>
      <div class="absolute top-1/2 left-1/4 w-16 h-16 bg-earth-300/20 rounded-full blur-xl animate-float" style="animation-delay: -4s;"></div>
      
      <div class="relative max-w-[85vw] mx-auto px-0">
        {/* Section Header */}
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold font-serif mb-6">
            <span class="bg-gradient-to-r from-clay-600 via-earth-600 to-sage-600 bg-clip-text text-transparent">
              Upcoming Workshops
            </span>
          </h2>
          <p class="text-xl text-sage-700 dark:text-sage-300 max-w-3xl mx-auto">
            Join our expert artisans for hands-on pottery workshops. Learn traditional techniques, 
            unleash your creativity, and take home your own handcrafted pieces.
          </p>
        </div>

        {/* Workshops Carousel - Single Row */}
        <div class="relative">
          {/* Desktop Carousel - Exactly 4 events */}
          <div class="hidden lg:block">
            <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-4 max-w-[90vw] mx-auto">
              {workshops.map((workshop) => (
                <div key={workshop.id} class="group flex-shrink-0 w-[calc(25%-12px)]">
                  <div
                    class={"flex flex-col h-full rounded-lg shadow transition-transform hover:scale-105 relative overflow-hidden"}
                    style={workshop.image ? { backgroundImage: `url('${workshop.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                  >
                    {/* Lighter overlay for readability */}
                    <div class="absolute inset-0 bg-black/20" />
                    <div class="relative z-10 flex flex-col h-full p-6">
                      <h3 class="text-lg font-bold text-white drop-shadow-lg mb-2 line-clamp-2">{workshop.title}</h3>
                      <p class="mb-4 px-2 py-2 rounded bg-black/40 text-white backdrop-blur-sm shadow text-sm line-clamp-3" style={{wordBreak: 'break-word'}}>{workshop.description}</p>
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
                      {/* CTA Button */}
                      <button class="w-full group relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-clay-600 via-earth-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden mt-4">
                        <span class="relative z-10">Book Workshop</span>
                        <div class="absolute inset-0 bg-gradient-to-r from-clay-700 via-earth-700 to-clay-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tablet Carousel - 2-3 events */}
          <div class="hidden md:block lg:hidden">
            <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-4 max-w-[90vw] mx-auto">
              {workshops.map((workshop) => (
                <div key={workshop.id} class="group flex-shrink-0 w-80">
                  <div
                    class={"flex flex-col h-full rounded-lg shadow transition-transform hover:scale-105 relative overflow-hidden"}
                    style={workshop.image ? { backgroundImage: `url('${workshop.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                  >
                    {/* Lighter overlay for readability */}
                    <div class="absolute inset-0 bg-black/20" />
                    <div class="relative z-10 flex flex-col h-full p-6">
                      <h3 class="text-lg font-bold text-white drop-shadow-lg mb-2 line-clamp-2">{workshop.title}</h3>
                      <p class="mb-4 px-2 py-2 rounded bg-black/40 text-white backdrop-blur-sm shadow text-sm line-clamp-3" style={{wordBreak: 'break-word'}}>{workshop.description}</p>
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
                      {/* CTA Button */}
                      <button class="w-full group relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-clay-600 via-earth-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden mt-4">
                        <span class="relative z-10">Book Workshop</span>
                        <div class="absolute inset-0 bg-gradient-to-r from-clay-700 via-earth-700 to-clay-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Carousel */}
          <div class="md:hidden">
            <div class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4">
              {workshops.map((workshop) => (
                <div key={workshop.id} class="group flex-shrink-0 w-72 snap-center">
                  <div
                    class={"flex flex-col h-full rounded-lg shadow transition-transform hover:scale-105 relative overflow-hidden"}
                    style={workshop.image ? { backgroundImage: `url('${workshop.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                  >
                    {/* Lighter overlay for readability */}
                    <div class="absolute inset-0 bg-black/20" />
                    <div class="relative z-10 flex flex-col h-full p-6">
                      <h3 class="text-lg font-bold text-white drop-shadow-lg mb-2 line-clamp-2">{workshop.title}</h3>
                      <p class="mb-4 px-2 py-2 rounded bg-black/40 text-white backdrop-blur-sm shadow text-sm line-clamp-3" style={{wordBreak: 'break-word'}}>{workshop.description}</p>
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
                      {/* CTA Button */}
                      <button class="w-full group relative inline-flex items-center justify-center px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-clay-600 via-earth-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden mt-4">
                        <span class="relative z-10">Book Workshop</span>
                        <div class="absolute inset-0 bg-gradient-to-r from-clay-700 via-earth-700 to-clay-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Workshops Button */}
        <div class="text-center mt-12">
          <a
            href="#workshops"
            class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-sage-700 bg-gradient-to-r from-white/80 via-sage-50/80 to-clay-50/80 backdrop-blur-sm border-2 border-sage-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-sage-50"
          >
            <span class="relative z-10">View All Workshops</span>
          </a>
        </div>
      </div>
    </section>
  );
}); 