import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <section class="relative overflow-hidden">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 bg-pottery-texture opacity-30" aria-hidden="true"></div>
      
      {/* Gradient background */}
      <div class="absolute inset-0 bg-gradient-to-br from-clay-50 via-sage-50 to-earth-50" aria-hidden="true"></div>
      
      {/* Floating decorative elements */}
      <div class="absolute top-10 left-10 w-20 h-20 bg-clay-300/20 rounded-full blur-xl animate-float"></div>
      <div class="absolute bottom-10 right-10 w-16 h-16 bg-sage-300/20 rounded-full blur-xl animate-float" style="animation-delay: -3s;"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="py-12 md:py-20">
          <div class="relative max-w-4xl mx-auto text-center p-8 md:p-12 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm border border-clay-100 dark:bg-clay-900/80 dark:border-clay-700">
            {/* Decorative border */}
            <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-clay-500/10 via-sage-500/10 to-earth-500/10 p-[1px]">
              <div class="absolute inset-0 rounded-3xl bg-white dark:bg-clay-900"></div>
            </div>
            
            <div class="relative">
              <h2 class="text-4xl md:text-5xl font-bold leading-tighter tracking-tighter mb-6 font-serif">
                <span class="bg-gradient-to-r from-clay-600 to-sage-600 bg-clip-text text-transparent">
                  Bring Earth's Beauty
                </span>{" "}
                <br class="block sm:hidden" />
                <span class="bg-gradient-to-r from-sage-600 to-clay-600 bg-clip-text text-transparent sm:whitespace-nowrap">
                  Into Your Home
                </span>
              </h2>
              <p class="text-xl text-sage-700 dark:text-sage-300 mb-8 leading-relaxed">
                Each handcrafted piece tells a story of tradition, creativity, and the natural world.{" "}
                <br class="hidden md:inline" />
                Start your collection today and experience the warmth of authentic pottery.
              </p>

              <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-clay-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                  href="#collection"
                >
                  <span class="relative z-10">Explore Collection</span>
                  <div class="absolute inset-0 bg-gradient-to-r from-clay-700 to-clay-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                  class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-sage-700 bg-white/80 backdrop-blur-sm border border-sage-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-sage-50"
                  href="#contact"
                >
                  <span class="relative z-10">Contact Us</span>
                </a>
              </div>
              
              {/* Feature highlights */}
              <div class="mt-12 grid grid-cols-3 gap-6 text-center">
                <div class="group">
                  <div class="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-clay-100 to-clay-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-5 h-5 text-clay-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                  </div>
                  <p class="text-sm font-medium text-clay-800 dark:text-clay-200">Free Shipping</p>
                </div>
                <div class="group">
                  <div class="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <p class="text-sm font-medium text-sage-800 dark:text-sage-200">Handcrafted</p>
                </div>
                <div class="group">
                  <div class="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-earth-100 to-earth-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg class="w-5 h-5 text-earth-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <p class="text-sm font-medium text-earth-800 dark:text-earth-200">Made with Love</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});