import { component$, useSignal, $, useTask$} from "@builder.io/qwik";
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
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export default component$(() => {
  const currentIndex = useSignal(0);
  const isAutoPlaying = useSignal(true);

  const workshops: Workshop[] = [
    {
      id: 1,
      title: "Introduction to Wheel Throwing",
      description: "Learn the fundamentals of pottery wheel throwing in this hands-on workshop. Perfect for beginners who want to experience the magic of creating with clay.",
      date: "March 15, 2024",
      duration: "3 hours",
      price: "$85",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      instructor: "Sarah Chen",
      spots: 8,
      level: "Beginner"
    },
    {
      id: 2,
      title: "Advanced Glazing Techniques",
      description: "Master the art of glazing with advanced techniques including layering, wax resist, and creating unique surface textures.",
      date: "March 22, 2024",
      duration: "4 hours",
      price: "$120",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      instructor: "Michael Rodriguez",
      spots: 6,
      level: "Advanced"
    },
    {
      id: 3,
      title: "Hand-Building Fundamentals",
      description: "Discover the versatility of hand-building techniques including pinch pots, coil building, and slab construction.",
      date: "March 29, 2024",
      duration: "3.5 hours",
      price: "$95",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      instructor: "Emma Thompson",
      spots: 10,
      level: "Beginner"
    },
    {
      id: 4,
      title: "Raku Firing Workshop",
      description: "Experience the excitement of raku firing, a traditional Japanese technique that creates unique, unpredictable glaze effects.",
      date: "April 5, 2024",
      duration: "5 hours",
      price: "$150",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      instructor: "David Kim",
      spots: 4,
      level: "Intermediate"
    },
    {
      id: 5,
      title: "Pottery for Kids",
      description: "A fun, creative workshop designed specifically for children ages 8-12. Kids will learn basic hand-building techniques and create their own pottery masterpieces.",
      date: "April 12, 2024",
      duration: "2 hours",
      price: "$65",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      instructor: "Lisa Park",
      spots: 12,
      level: "Beginner"
    }
  ];

  const nextSlide = $(() => {
    currentIndex.value = (currentIndex.value + 1) % workshops.length;
  });

  const prevSlide = $(() => {
    currentIndex.value = currentIndex.value === 0 ? workshops.length - 1 : currentIndex.value - 1;
  });

  const goToSlide = $((index: number) => {
    currentIndex.value = index;
  });

  // Auto-play functionality
  const startAutoPlay = $(() => {
    isAutoPlaying.value = true;
  });

  const stopAutoPlay = $(() => {
    isAutoPlaying.value = false;
  });

  // Auto-advance slides - only run on client
  useTask$(({ track, cleanup }) => {
    track(() => isAutoPlaying.value);
    
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        if (isAutoPlaying.value) {
          nextSlide();
        }
      }, 5000);

      cleanup(() => clearInterval(interval));
    }
  });

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
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
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

        {/* Carousel Container */}
        <div class="relative max-w-6xl mx-auto">
          {/* Desktop Carousel */}
          <div class="hidden md:block relative overflow-hidden rounded-3xl shadow-2xl border-2 border-clay-200/50">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              style={`transform: translateX(-${currentIndex.value * 100}%)`}
            >
              {workshops.map((workshop) => (
                <div key={workshop.id} class="w-full flex-shrink-0">
                  <div class="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div class="relative h-64 md:h-full overflow-hidden">
                      <Image
                        src={workshop.image}
                        layout="constrained"
                        width={600}
                        height={400}
                        alt={workshop.title}
                        class="w-full h-full object-cover"
                        breakpoints={[320, 480, 640, 768, 1024]}
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-clay-900/40 via-transparent to-transparent"></div>
                      
                      {/* Level Badge */}
                      <div class="absolute top-4 left-4">
                        <span class={`px-3 py-1 rounded-full text-xs font-semibold ${
                          workshop.level === 'Beginner' ? 'bg-sage-500 text-white shadow-lg' :
                          workshop.level === 'Intermediate' ? 'bg-clay-500 text-white shadow-lg' :
                          'bg-earth-600 text-white shadow-lg'
                        }`}>
                          {workshop.level}
                        </span>
                      </div>
                      
                      {/* Spots Available */}
                      <div class="absolute top-4 right-4">
                        <span class="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-clay-800 shadow-lg">
                          {workshop.spots} spots left
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div class="bg-gradient-to-br from-white via-sage-50/30 to-clay-50/30 backdrop-blur-sm p-8 md:p-12 flex flex-col justify-center border-l border-clay-100">
                      <div class="mb-4">
                        <h3 class="text-2xl md:text-3xl font-bold text-clay-900 dark:text-clay-100 font-serif mb-3">
                          {workshop.title}
                        </h3>
                        <p class="text-sage-700 dark:text-sage-300 leading-relaxed mb-6">
                          {workshop.description}
                        </p>
                      </div>

                      {/* Workshop Details */}
                      <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="flex items-center">
                          <svg class="w-5 h-5 text-clay-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span class="text-sm text-sage-700 dark:text-sage-300">{workshop.date}</span>
                        </div>
                        <div class="flex items-center">
                          <svg class="w-5 h-5 text-clay-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span class="text-sm text-sage-700 dark:text-sage-300">{workshop.duration}</span>
                        </div>
                        <div class="flex items-center">
                          <svg class="w-5 h-5 text-clay-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <span class="text-sm text-sage-700 dark:text-sage-300">{workshop.instructor}</span>
                        </div>
                        <div class="flex items-center">
                          <svg class="w-5 h-5 text-clay-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                          </svg>
                          <span class="text-sm text-sage-700 dark:text-sage-300">{workshop.price}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-clay-600 via-earth-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                        <span class="relative z-10">Book Workshop</span>
                        <div class="absolute inset-0 bg-gradient-to-r from-clay-700 via-earth-700 to-clay-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Scrollable Carousel */}
          <div class="md:hidden">
            <div class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              {workshops.map((workshop) => (
                <div key={workshop.id} class="flex-shrink-0 w-80 snap-center mr-6 last:mr-0">
                  <div class="bg-gradient-to-br from-white via-sage-50/30 to-clay-50/30 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border-2 border-clay-200/50">
                    {/* Image Section */}
                    <div class="relative h-48 overflow-hidden">
                      <Image
                        src={workshop.image}
                        layout="constrained"
                        width={320}
                        height={192}
                        alt={workshop.title}
                        class="w-full h-full object-cover"
                        breakpoints={[320, 480, 640]}
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-clay-900/40 via-transparent to-transparent"></div>
                      
                      {/* Level Badge */}
                      <div class="absolute top-3 left-3">
                        <span class={`px-2 py-1 rounded-full text-xs font-semibold ${
                          workshop.level === 'Beginner' ? 'bg-sage-500 text-white shadow-lg' :
                          workshop.level === 'Intermediate' ? 'bg-clay-500 text-white shadow-lg' :
                          'bg-earth-600 text-white shadow-lg'
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
                      <h3 class="text-xl font-bold text-clay-900 dark:text-clay-100 font-serif mb-2">
                        {workshop.title}
                      </h3>
                      <p class="text-sm text-sage-700 dark:text-sage-300 mb-4 line-clamp-3">
                        {workshop.description}
                      </p>

                      {/* Workshop Details */}
                      <div class="space-y-2 mb-4">
                        <div class="flex items-center text-sm">
                          <svg class="w-4 h-4 text-clay-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300">{workshop.date}</span>
                        </div>
                        <div class="flex items-center text-sm">
                          <svg class="w-4 h-4 text-clay-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300">{workshop.duration}</span>
                        </div>
                        <div class="flex items-center text-sm">
                          <svg class="w-4 h-4 text-clay-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300">{workshop.instructor}</span>
                        </div>
                        <div class="flex items-center text-sm">
                          <svg class="w-4 h-4 text-clay-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                          </svg>
                          <span class="text-sage-700 dark:text-sage-300 font-semibold">{workshop.price}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button class="w-full group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-clay-600 via-earth-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                        <span class="relative z-10">Book Workshop</span>
                        <div class="absolute inset-0 bg-gradient-to-r from-clay-700 via-earth-700 to-clay-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Desktop Only */}
          <button
            onClick$={prevSlide}
            onMouseEnter$={stopAutoPlay}
            onMouseLeave$={startAutoPlay}
            class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-white/90 to-sage-50/90 backdrop-blur-sm rounded-full shadow-lg items-center justify-center text-clay-600 hover:text-clay-800 hover:scale-110 transition-all duration-200 z-10 border border-clay-200/50"
            aria-label="Previous workshop"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button
            onClick$={nextSlide}
            onMouseEnter$={stopAutoPlay}
            onMouseLeave$={startAutoPlay}
            class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-white/90 to-sage-50/90 backdrop-blur-sm rounded-full shadow-lg items-center justify-center text-clay-600 hover:text-clay-800 hover:scale-110 transition-all duration-200 z-10 border border-clay-200/50"
            aria-label="Next workshop"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          {/* Dots Indicator - Desktop Only */}
          <div class="hidden md:flex justify-center mt-8 space-x-2">
            {workshops.map((_, index) => (
              <button
                key={index}
                onClick$={() => goToSlide(index)}
                onMouseEnter$={stopAutoPlay}
                onMouseLeave$={startAutoPlay}
                class={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex.value
                    ? 'bg-gradient-to-r from-clay-600 to-earth-600 scale-125 shadow-lg'
                    : 'bg-clay-300 hover:bg-clay-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
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