import { component$, useSignal, $, useTask$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

interface Review {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
  product: string;
  date: string;
}

export default component$(() => {
  const currentIndex = useSignal(0);
  const isAutoPlaying = useSignal(true);

  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Home Chef",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "The terracotta baking dish I purchased has transformed my cooking! It retains heat perfectly and gives my breads that authentic artisan crust. The quality is exceptional and it's become my go-to for all my baking needs.",
      product: "Terracotta Baking Dish",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Restaurant Owner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "We use Terra Pottery's serving bowls in our restaurant and our customers love them! The rustic beauty adds character to our dishes, and the quality is outstanding. Highly recommend for any food service business.",
      product: "Artisan Serving Bowls",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Pottery Enthusiast",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "I attended the wheel throwing workshop and it was incredible! The instructor was patient and knowledgeable, and I created pieces I'm actually proud to display. The studio is beautiful and well-equipped.",
      product: "Wheel Throwing Workshop",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Interior Designer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "I've been sourcing pottery for my clients' homes for years, and Terra Pottery consistently delivers the highest quality pieces. Their custom orders are always perfect and their attention to detail is unmatched.",
      product: "Custom Dinnerware Set",
      date: "2 months ago"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Wedding Planner",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "The custom wedding registry pieces we ordered were absolutely stunning! Each piece was unique and beautifully crafted. Our clients were thrilled with the quality and the personal touch it added to their special day.",
      product: "Wedding Registry Collection",
      date: "1 month ago"
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Home Decor Blogger",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      review: "I've featured Terra Pottery in several of my home decor posts and my followers love their pieces! The combination of traditional craftsmanship and modern design is perfect for contemporary homes.",
      product: "Decorative Vases",
      date: "3 weeks ago"
    }
  ];

  const nextSlide = $(() => {
    currentIndex.value = (currentIndex.value + 1) % reviews.length;
  });

  const prevSlide = $(() => {
    currentIndex.value = currentIndex.value === 0 ? reviews.length - 1 : currentIndex.value - 1;
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
              {reviews.map((review) => (
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
                        <div class="relative">
                          <Image
                            src={review.avatar}
                            layout="constrained"
                            width={60}
                            height={60}
                            alt={review.name}
                            class="w-15 h-15 rounded-full object-cover border-4 border-white shadow-lg"
                            breakpoints={[320, 480, 640, 768, 1024]}
                          />
                          <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-clay-500 to-earth-500 rounded-full flex items-center justify-center">
                            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div class="text-left">
                          <h4 class="text-lg font-bold text-clay-900 dark:text-clay-100 font-serif">
                            {review.name}
                          </h4>
                          <p class="text-sage-600 dark:text-sage-400 text-sm">{review.role}</p>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-clay-100 to-sage-100 dark:from-clay-800 dark:to-sage-800 rounded-full text-sm font-semibold text-clay-700 dark:text-clay-300">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                        </svg>
                        {review.product}
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
              {reviews.map((review) => (
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
                      <div class="relative">
                        <Image
                          src={review.avatar}
                          layout="constrained"
                          width={50}
                          height={50}
                          alt={review.name}
                          class="w-12 h-12 rounded-full object-cover border-3 border-white shadow-md"
                          breakpoints={[320, 480, 640]}
                        />
                        <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-clay-500 to-earth-500 rounded-full flex items-center justify-center">
                          <svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 class="text-base font-bold text-clay-900 dark:text-clay-100 font-serif">
                          {review.name}
                        </h4>
                        <p class="text-sage-600 dark:text-sage-400 text-xs">{review.role}</p>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div class="inline-flex items-center px-3 py-1 bg-gradient-to-r from-clay-100 to-sage-100 dark:from-clay-800 dark:to-sage-800 rounded-full text-xs font-semibold text-clay-700 dark:text-clay-300">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                      </svg>
                      {review.product}
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
            {reviews.map((_, index) => (
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