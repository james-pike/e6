import { component$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

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
                  <div class="bg-gradient-to-br from-white via-sage-50/30 to-clay-50/30 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border-2 border-clay-200/50 hover:border-clay-300/70 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                    {/* Image Section */}
                    <div class="relative h-48 overflow-hidden">
                      <Image
                        src={workshop.image}
                        layout="constrained"
                        width={320}
                        height={192}
                        alt={workshop.title}
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        breakpoints={[320, 480, 640]}
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-clay-900/40 via-transparent to-transparent"></div>
                      
                      {/* Level Badge */}
                      <div class="absolute top-3 left-3">
                        <span class={`px-2 py-1 rounded-full text-xs font-semibold ${
                          workshop.level === 'Beginner' ? 'bg-sage-500 text-white shadow-lg' :
                          workshop.level === 'Intermediate' ? 'bg-clay-500 text-white shadow-lg' :
                          workshop.level === 'Advanced' ? 'bg-earth-600 text-white shadow-lg' :
                          'bg-sage-600 text-white shadow-lg'
                        }`}>
                          {workshop.level}
                        </span>
                      </div>
                      
                      {/* Spots Available */}
                      <div class="absolute top-3 right-3">
                        <span class="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-clay-800 shadow-lg">
                          {workshop.spots} spots
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div class="p-6">
                      <h3 class="text-lg font-bold text-clay-900 dark:text-clay-100 font-serif mb-2 line-clamp-2">
                        {workshop.title}
                      </h3>
                      <p class="text-sm text-sage-700 dark:text-sage-300 mb-4 line-clamp-3">
                        {workshop.description}
                      </p>

                      {/* Workshop Details */}
                      <div class="space-y-2 mb-4">
                        <div class="flex items-center text-sm">
                          <svg class="w-4 h-4 text-clay-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300 truncate">{workshop.date}</span>
                        </div>
                        <div class="flex items-center text-sm">
                          <svg class="w-4 h-4 text-clay-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300 truncate">{workshop.duration}</span>
                        </div>
                        <div class="flex items-center text-sm">
                          <svg class="w-4 h-4 text-clay-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300 truncate">{workshop.instructor}</span>
                        </div>
                        <div class="flex items-center text-sm">
                          <svg class="w-4 h-4 text-clay-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300 font-semibold">{workshop.price}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button class="w-full group relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-clay-600 via-earth-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
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
                  <div class="bg-gradient-to-br from-white via-sage-50/30 to-clay-50/30 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border-2 border-clay-200/50 hover:border-clay-300/70 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                    {/* Image Section */}
                    <div class="relative h-48 overflow-hidden">
                      <Image
                        src={workshop.image}
                        layout="constrained"
                        width={320}
                        height={192}
                        alt={workshop.title}
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        breakpoints={[320, 480, 640]}
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-clay-900/40 via-transparent to-transparent"></div>
                      
                      {/* Level Badge */}
                      <div class="absolute top-3 left-3">
                        <span class={`px-2 py-1 rounded-full text-xs font-semibold ${
                          workshop.level === 'Beginner' ? 'bg-sage-500 text-white shadow-lg' :
                          workshop.level === 'Intermediate' ? 'bg-clay-500 text-white shadow-lg' :
                          workshop.level === 'Advanced' ? 'bg-earth-600 text-white shadow-lg' :
                          'bg-sage-600 text-white shadow-lg'
                        }`}>
                          {workshop.level}
                        </span>
                      </div>
                      
                      {/* Spots Available */}
                      <div class="absolute top-3 right-3">
                        <span class="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-clay-800 shadow-lg">
                          {workshop.spots} spots
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div class="p-6">
                      <h3 class="text-lg font-bold text-clay-900 dark:text-clay-100 font-serif mb-2 line-clamp-2">
                        {workshop.title}
                      </h3>
                      <p class="text-sm text-sage-700 dark:text-sage-300 mb-4 line-clamp-3">
                        {workshop.description}
                      </p>

                      {/* Workshop Details */}
                      <div class="space-y-2 mb-4">
                        <div class="flex items-center text-sm">
                          <svg class="w-4 h-4 text-clay-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300 truncate">{workshop.date}</span>
                        </div>
                        <div class="flex items-center text-sm">
                          <svg class="w-4 h-4 text-clay-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300 truncate">{workshop.duration}</span>
                        </div>
                        <div class="flex items-center text-sm">
                          <svg class="w-4 h-4 text-clay-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300 truncate">{workshop.instructor}</span>
                        </div>
                        <div class="flex items-center text-sm">
                          <svg class="w-4 h-4 text-clay-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300 font-semibold">{workshop.price}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button class="w-full group relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-clay-600 via-earth-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
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
                  <div class="bg-gradient-to-br from-white via-sage-50/30 to-clay-50/30 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border-2 border-clay-200/50 hover:border-clay-300/70 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                    {/* Image Section */}
                    <div class="relative h-40 overflow-hidden">
                      <Image
                        src={workshop.image}
                        layout="constrained"
                        width={288}
                        height={160}
                        alt={workshop.title}
                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        breakpoints={[288, 320, 480]}
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-clay-900/40 via-transparent to-transparent"></div>
                      
                      {/* Level Badge */}
                      <div class="absolute top-2 left-2">
                        <span class={`px-2 py-1 rounded-full text-xs font-semibold ${
                          workshop.level === 'Beginner' ? 'bg-sage-500 text-white shadow-lg' :
                          workshop.level === 'Intermediate' ? 'bg-clay-500 text-white shadow-lg' :
                          workshop.level === 'Advanced' ? 'bg-earth-600 text-white shadow-lg' :
                          'bg-sage-600 text-white shadow-lg'
                        }`}>
                          {workshop.level}
                        </span>
                      </div>
                      
                      {/* Spots Available */}
                      <div class="absolute top-2 right-2">
                        <span class="px-2 py-1 rounded-full text-xs font-semibold bg-white/90 text-clay-800 shadow-lg">
                          {workshop.spots} spots
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div class="p-4">
                      <h3 class="text-base font-bold text-clay-900 dark:text-clay-100 font-serif mb-2 line-clamp-2">
                        {workshop.title}
                      </h3>
                      <p class="text-xs text-sage-700 dark:text-sage-300 mb-3 line-clamp-2">
                        {workshop.description}
                      </p>

                      {/* Workshop Details */}
                      <div class="space-y-1 mb-3">
                        <div class="flex items-center text-xs">
                          <svg class="w-3 h-3 text-clay-600 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300 truncate">{workshop.date}</span>
                        </div>
                        <div class="flex items-center text-xs">
                          <svg class="w-3 h-3 text-clay-600 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300 truncate">{workshop.duration}</span>
                        </div>
                        <div class="flex items-center text-xs">
                          <svg class="w-3 h-3 text-clay-600 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300 truncate">{workshop.instructor}</span>
                        </div>
                        <div class="flex items-center text-xs">
                          <svg class="w-3 h-3 text-clay-600 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300 font-semibold">{workshop.price}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button class="w-full group relative inline-flex items-center justify-center px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-clay-600 via-earth-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
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