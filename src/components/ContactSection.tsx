import { component$, useSignal, $ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

export default component$(() => {
  const formData = useSignal({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const isSubmitting = useSignal(false);
  const isSubmitted = useSignal(false);

  const handleInputChange = $((field: string, value: string) => {
    formData.value = { ...formData.value, [field]: value };
  });

  const handleSubmit = $(async (event: Event) => {
    event.preventDefault();
    isSubmitting.value = true;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    isSubmitting.value = false;
    isSubmitted.value = true;
    
    // Reset form after 3 seconds
    setTimeout(() => {
      isSubmitted.value = false;
      formData.value = { name: '', email: '', phone: '', subject: '', message: '' };
    }, 3000);
  });

  const contactInfo = [
    {
      icon: (
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      ),
      title: "Visit Our Studio",
      details: "123 Clay Street, Artisan District, Portland, OR 97201",
      link: "https://maps.google.com"
    },
    {
      icon: (
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
        </svg>
      ),
      title: "Call Us",
      details: "+1 (503) 555-0123",
      link: "tel:+15035550123"
    },
    {
      icon: (
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      title: "Email Us",
      details: "hello@terrapottery.com",
      link: "mailto:hello@terrapottery.com"
    },
    {
      icon: (
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: "Studio Hours",
      details: "Tue-Sat: 10AM-6PM, Sun: 12PM-5PM",
      link: "#"
    }
  ];

  const studioFeatures = [
    {
      icon: (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      text: "Professional pottery wheels"
    },
    {
      icon: (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      text: "High-temperature kilns"
    },
    {
      icon: (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      text: "Premium clay and glazes"
    },
    {
      icon: (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      text: "Expert instruction"
    }
  ];

  return (
    <section id="contact" class="relative overflow-hidden py-16 md:py-20">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 bg-pottery-texture opacity-20" aria-hidden="true"></div>
      
      {/* Gradient background */}
      <div class="absolute inset-0 bg-gradient-to-br from-sage-50/50 via-white to-clay-50/50" aria-hidden="true"></div>
      
      {/* Floating decorative elements */}
      <div class="absolute top-20 left-10 w-24 h-24 bg-clay-300/20 rounded-full blur-xl animate-float"></div>
      <div class="absolute bottom-20 right-10 w-20 h-20 bg-sage-300/20 rounded-full blur-xl animate-float" style="animation-delay: -2s;"></div>
      <div class="absolute top-1/3 right-1/4 w-16 h-16 bg-earth-300/20 rounded-full blur-xl animate-float" style="animation-delay: -4s;"></div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold font-serif mb-6">
            <span class="bg-gradient-to-r from-clay-600 via-earth-600 to-sage-600 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <p class="text-xl text-sage-700 dark:text-sage-300 max-w-3xl mx-auto">
            Have questions about our pottery, want to book a workshop, or interested in a custom piece? 
            We'd love to hear from you!
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Contact Info & Studio Features */}
          <div class="space-y-8">
            {/* Studio Image */}
            <div class="relative rounded-2xl overflow-hidden shadow-xl border-2 border-clay-200/50">
              <Image
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                layout="constrained"
                width={600}
                height={400}
                alt="Terra Pottery Studio"
                class="w-full h-64 object-cover"
                breakpoints={[320, 480, 640, 768, 1024]}
              />
              <div class="absolute inset-0 bg-gradient-to-t from-clay-900/60 via-transparent to-transparent"></div>
              <div class="absolute bottom-6 left-6 text-white">
                <h3 class="text-xl font-bold font-serif mb-2">Visit Our Studio</h3>
                <p class="text-clay-100">Experience the magic of pottery making</p>
              </div>
            </div>

            {/* Studio Features */}
            <div class="bg-gradient-to-br from-white/90 via-sage-50/30 to-clay-50/30 backdrop-blur-sm rounded-2xl p-6 border-2 border-clay-100 dark:border-clay-700 shadow-lg">
              <h3 class="text-xl font-bold text-clay-900 dark:text-clay-100 font-serif mb-4">
                Studio Amenities
              </h3>
              <div class="space-y-3">
                {studioFeatures.map((feature, index) => (
                  <div key={index} class="flex items-center space-x-3">
                    <div class="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-sage-100 to-sage-200 dark:from-sage-700 dark:to-sage-800 rounded-full flex items-center justify-center text-sage-600 dark:text-sage-300 shadow-sm">
                      {feature.icon}
                    </div>
                    <span class="text-sage-700 dark:text-sage-300">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info Cards */}
            <div class="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  class="group flex items-start space-x-4 p-4 bg-gradient-to-br from-white/80 via-sage-50/20 to-clay-50/20 backdrop-blur-sm rounded-xl border-2 border-clay-100 dark:border-clay-700 hover:bg-gradient-to-br hover:from-white/90 hover:via-sage-50/40 hover:to-clay-50/40 hover:shadow-lg transition-all duration-300 hover:border-clay-200"
                >
                  <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-clay-100 to-clay-200 dark:from-clay-700 dark:to-clay-800 rounded-xl flex items-center justify-center text-clay-600 dark:text-clay-300 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {info.icon}
                  </div>
                  <div class="flex-1">
                    <h3 class="text-sm font-semibold text-clay-900 dark:text-clay-100 font-serif mb-1">
                      {info.title}
                    </h3>
                    <p class="text-xs text-sage-700 dark:text-sage-300">
                      {info.details}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Contact CTA */}
            <div class="bg-gradient-to-r from-clay-50 via-earth-50 to-sage-50 rounded-2xl p-6 border-2 border-clay-100 dark:border-clay-700 shadow-lg">
              <h3 class="text-lg font-bold text-clay-900 dark:text-clay-100 font-serif mb-3">
                Need Immediate Help?
              </h3>
              <p class="text-sm text-sage-700 dark:text-sage-300 mb-4">
                For urgent inquiries or workshop bookings, call us directly.
              </p>
              <a
                href="tel:+15035550123"
                class="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-clay-600 via-earth-600 to-clay-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                Call Now
              </a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div class="relative">
            <div class="bg-gradient-to-br from-white/90 via-sage-50/30 to-clay-50/30 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-clay-100 dark:border-clay-700">
              {!isSubmitted ? (
                <form onSubmit$={handleSubmit} class="space-y-6">
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label for="name" class="block text-sm font-semibold text-clay-800 dark:text-clay-200 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.value.name}
                        onInput$={(_, el) => handleInputChange('name', el.value)}
                        required
                        class="w-full px-4 py-3 border-2 border-clay-200 dark:border-clay-600 rounded-xl bg-white/50 dark:bg-clay-800/50 text-clay-900 dark:text-clay-100 placeholder-sage-500 focus:outline-none focus:ring-2 focus:ring-clay-500 focus:border-clay-400 transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label for="email" class="block text-sm font-semibold text-clay-800 dark:text-clay-200 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.value.email}
                        onInput$={(_, el) => handleInputChange('email', el.value)}
                        required
                        class="w-full px-4 py-3 border-2 border-clay-200 dark:border-clay-600 rounded-xl bg-white/50 dark:bg-clay-800/50 text-clay-900 dark:text-clay-100 placeholder-sage-500 focus:outline-none focus:ring-2 focus:ring-clay-500 focus:border-clay-400 transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label for="phone" class="block text-sm font-semibold text-clay-800 dark:text-clay-200 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.value.phone}
                        onInput$={(_, el) => handleInputChange('phone', el.value)}
                        class="w-full px-4 py-3 border-2 border-clay-200 dark:border-clay-600 rounded-xl bg-white/50 dark:bg-clay-800/50 text-clay-900 dark:text-clay-100 placeholder-sage-500 focus:outline-none focus:ring-2 focus:ring-clay-500 focus:border-clay-400 transition-all duration-200"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label for="subject" class="block text-sm font-semibold text-clay-800 dark:text-clay-200 mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        value={formData.value.subject}
                        onChange$={(_, el) => handleInputChange('subject', el.value)}
                        required
                        class="w-full px-4 py-3 border-2 border-clay-200 dark:border-clay-600 rounded-xl bg-white/50 dark:bg-clay-800/50 text-clay-900 dark:text-clay-100 focus:outline-none focus:ring-2 focus:ring-clay-500 focus:border-clay-400 transition-all duration-200"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="workshop">Workshop Booking</option>
                        <option value="custom">Custom Order</option>
                        <option value="wholesale">Wholesale Inquiry</option>
                        <option value="support">Customer Support</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label for="message" class="block text-sm font-semibold text-clay-800 dark:text-clay-200 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.value.message}
                      onInput$={(_, el) => handleInputChange('message', el.value)}
                      required
                      class="w-full px-4 py-3 border-2 border-clay-200 dark:border-clay-600 rounded-xl bg-white/50 dark:bg-clay-800/50 text-clay-900 dark:text-clay-100 placeholder-sage-500 focus:outline-none focus:ring-2 focus:ring-clay-500 focus:border-clay-400 transition-all duration-200 resize-none"
                      placeholder="Tell us about your pottery needs, workshop interests, or any questions you have..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting.value}
                    class="w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-clay-600 via-earth-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span class="relative z-10">
                      {isSubmitting.value ? 'Sending...' : 'Send Message'}
                    </span>
                    <div class="absolute inset-0 bg-gradient-to-r from-clay-700 via-earth-700 to-clay-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </form>
              ) : (
                <div class="text-center py-12">
                  <div class="w-16 h-16 bg-gradient-to-br from-sage-500 to-sage-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 class="text-2xl font-bold text-clay-900 dark:text-clay-100 font-serif mb-4">
                    Message Sent!
                  </h3>
                  <p class="text-sage-700 dark:text-sage-300">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}); 