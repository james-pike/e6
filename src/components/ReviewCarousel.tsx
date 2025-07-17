import { component$, useSignal, $, useTask$ } from "@builder.io/qwik";
import { useReviewsLoader } from '~/routes/plugin@reviews';

export default component$(() => {
  const currentIndex = useSignal(0);
  const isAutoPlaying = useSignal(true);
  const reviews = useReviewsLoader();

  const nextSlide = $(() => {
    currentIndex.value = (currentIndex.value + 1) % reviews.value.length;
  });

  const prevSlide = $(() => {
    currentIndex.value = currentIndex.value === 0 ? reviews.value.length - 1 : currentIndex.value - 1;
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
        if (isAutoPlaying.value && reviews.value.length > 0) {
          nextSlide();
        }
      }, 4000);
      cleanup(() => clearInterval(interval));
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        class={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section class="relative overflow-hidden py-16 md:py-20">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 bg-pottery-texture opacity-20" aria-hidden="true"></div>
      
      {/* Gradient background */}
      <div class="absolute inset-0 bg-gradient-to-br from-clay-50/50 via-white to-sage-50/50" aria-hidden="true"></div>
      
      {/* Floating decorative elements */}
      <div class="absolute top-20 right-10 w-24 h-24 bg-clay-300/20 rounded-full blur-xl animate-float"></div>
      <div class="absolute bottom-20 left-10 w-20 h-20 bg-sage-300/20 rounded-full blur-xl animate-float" style="animation-delay: -2s;"></div>
      <div class="absolute top-1/3 right-1/4 w-16 h-16 bg-earth-300/20 rounded-full blur-xl animate-float" style="animation-delay: -4s;"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold font-serif mb-6">
            <span class="bg-gradient-to-r from-clay-600 via-earth-600 to-sage-600 bg-clip-text text-transparent">
              What Our Customers Say
            </span>
          </h2>
          <p class="text-xl text-sage-700 dark:text-sage-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what pottery lovers, chefs, and artisans 
            have to say about their Terra Pottery experience.
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
              {reviews.value.map((review) => (
                <div key={review.id} class="w-full flex-shrink-0">
                  <div class="bg-gradient-to-br from-white via-sage-50/30 to-clay-50/30 backdrop-blur-sm p-12 md:p-16">
                    <div class="max-w-4xl mx-auto text-center">
                      {/* Stars */}
                      <div class="flex justify-center mb-6">
                        <div class="flex space-x-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      {/* Review Text */}
                      <blockquote class="text-2xl md:text-3xl font-serif text-clay-900 dark:text-clay-100 mb-8 leading-relaxed">
                        "{review.review}"
                      </blockquote>
                      {/* Customer Info */}
                      <div class="flex items-center justify-center space-x-4 mb-6">
                        <div class="text-left">
                          <h4 class="text-lg font-bold text-clay-900 dark:text-clay-100 font-serif">
                            {review.name}
                          </h4>
                          {review.role && <p class="text-sage-600 dark:text-sage-400 text-sm">{review.role}</p>}
                        </div>
                      </div>
                      {/* Date */}
                      <p class="text-sage-500 dark:text-sage-400 text-sm mt-4">
                        {review.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Scrollable Carousel */}
          <div class="md:hidden">
            <div class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              {reviews.value.map((review) => (
                <div key={review.id} class="flex-shrink-0 w-80 snap-center mr-6 last:mr-0">
                  <div class="bg-gradient-to-br from-white via-sage-50/30 to-clay-50/30 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-clay-200/50">
                    {/* Stars */}
                    <div class="flex justify-center mb-4">
                      <div class="flex space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>

                    {/* Review Text */}
                    <blockquote class="text-lg font-serif text-clay-900 dark:text-clay-100 mb-6 leading-relaxed">
                      "{review.review}"
                    </blockquote>

                    {/* Customer Info */}
                    <div class="flex items-center space-x-3 mb-4">
                      <div class="text-left">
                        <h4 class="text-base font-bold text-clay-900 dark:text-clay-100 font-serif">
                          {review.name}
                        </h4>
                        {review.role && <p class="text-sage-600 dark:text-sage-400 text-xs">{review.role}</p>}
                      </div>
                    </div>

                    {/* Date */}
                    <p class="text-sage-500 dark:text-sage-400 text-xs mt-3">
                      {review.date}
                    </p>
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
            aria-label="Previous review"
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
            aria-label="Next review"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          {/* Dots Indicator - Desktop Only */}
          <div class="hidden md:flex justify-center mt-8 space-x-2">
            {reviews.value.map((_, index) => (
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
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div class="text-center mt-12">
          <div class="bg-gradient-to-r from-clay-50 to-sage-50 rounded-3xl p-8 md:p-12 border-2 border-clay-100 dark:border-clay-700">
            <h3 class="text-2xl md:text-3xl font-bold text-clay-900 dark:text-clay-100 font-serif mb-4">
              Join Our Happy Customers
            </h3>
            <p class="text-sage-700 dark:text-sage-300 mb-6 max-w-2xl mx-auto">
              Experience the quality and craftsmanship that our customers love. 
              Start your pottery journey today!
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-clay-600 via-earth-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span class="relative z-10">Shop Now</span>
                <div class="absolute inset-0 bg-gradient-to-r from-clay-700 via-earth-700 to-clay-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="#workshops"
                class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-sage-700 bg-gradient-to-r from-white/80 via-sage-50/80 to-clay-50/80 backdrop-blur-sm border-2 border-sage-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-sage-50"
              >
                <span class="relative z-10">Book Workshop</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}); 