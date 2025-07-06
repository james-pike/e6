import { component$, useSignal, $ } from "@builder.io/qwik";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'General' | 'Care' | 'Shipping' | 'Custom' | 'Workshops';
}

export default component$(() => {
  const openItems = useSignal<number[]>([]);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How do I care for my pottery?",
      answer: "Hand wash with warm water and mild soap. Avoid harsh chemicals and abrasive scrubbers. Most pieces are dishwasher safe, but hand washing preserves the finish longer. Store in a dry place away from direct sunlight.",
      category: "Care"
    },
    {
      id: 2,
      question: "Are your pieces food safe?",
      answer: "Yes, all our functional pieces are food safe and lead-free. We use only food-grade glazes and fire our pottery to the proper temperature to ensure safety and durability.",
      category: "General"
    },
    {
      id: 3,
      question: "Can I use your pottery in the oven?",
      answer: "Most of our pieces are oven safe up to 350°F (175°C). However, we recommend checking the specific care instructions that come with each piece, as some decorative items may not be suitable for oven use.",
      category: "Care"
    },
    {
      id: 4,
      question: "Do you offer custom pieces?",
      answer: "Yes, we love creating custom pieces! Whether it's a special gift, wedding registry, or unique design, we work closely with you to bring your vision to life. Contact us to discuss your project.",
      category: "Custom"
    },
    {
      id: 5,
      question: "What makes terracotta special?",
      answer: "Terracotta clay has been used for thousands of years due to its natural beauty, durability, and ability to retain heat. It's also porous, which helps regulate humidity and keeps food fresh longer.",
      category: "General"
    },
    {
      id: 6,
      question: "How long does shipping take?",
      answer: "We carefully pack each piece to ensure safe delivery. Standard shipping takes 5-7 business days, while expedited shipping is available for 2-3 business days. International shipping varies by location.",
      category: "Shipping"
    },
    {
      id: 7,
      question: "What's included in a workshop?",
      answer: "All workshops include materials, tools, instruction, and firing. You'll take home your finished pieces after they're fired and ready. Some workshops also include refreshments and a studio tour.",
      category: "Workshops"
    },
    {
      id: 8,
      question: "Can I bring my own clay to workshops?",
      answer: "We provide all materials for workshops to ensure consistency and quality. However, if you have specific clay you'd like to work with, please contact us in advance to discuss compatibility.",
      category: "Workshops"
    },
    {
      id: 9,
      question: "Do you offer gift certificates?",
      answer: "Yes! Gift certificates are available for any amount and can be used for pottery purchases or workshops. They make perfect gifts for pottery enthusiasts and creative souls.",
      category: "General"
    },
    {
      id: 10,
      question: "What's your return policy?",
      answer: "We accept returns within 30 days for unused items in original condition. Custom pieces and workshops are non-refundable. Damaged items during shipping are covered by our insurance.",
      category: "General"
    }
  ];

  const toggleItem = $((id: number) => {
    const currentOpenItems = openItems.value;
    if (currentOpenItems.includes(id)) {
      openItems.value = currentOpenItems.filter(itemId => itemId !== id);
    } else {
      openItems.value = [...currentOpenItems, id];
    }
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Care': return 'bg-gradient-to-r from-sage-100 to-sage-200 text-sage-700 border-sage-300 shadow-sage-200/50';
      case 'General': return 'bg-gradient-to-r from-clay-100 to-clay-200 text-clay-700 border-clay-300 shadow-clay-200/50';
      case 'Shipping': return 'bg-gradient-to-r from-earth-100 to-earth-200 text-earth-700 border-earth-300 shadow-earth-200/50';
      case 'Custom': return 'bg-gradient-to-r from-clay-100 to-earth-100 text-clay-700 border-clay-300 shadow-clay-200/50';
      case 'Workshops': return 'bg-gradient-to-r from-sage-100 to-clay-100 text-sage-700 border-sage-300 shadow-sage-200/50';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-gray-300 shadow-gray-200/50';
    }
  };

  return (
    <section class="relative overflow-hidden py-16 md:py-20">
      {/* Background with pottery texture */}
      <div class="absolute inset-0 bg-pottery-texture opacity-20" aria-hidden="true"></div>
      
      {/* Gradient background */}
      <div class="absolute inset-0 bg-gradient-to-br from-clay-50/50 via-white to-sage-50/50" aria-hidden="true"></div>
      
      {/* Floating decorative elements */}
      <div class="absolute top-20 right-10 w-24 h-24 bg-clay-300/20 rounded-full blur-xl animate-float"></div>
      <div class="absolute bottom-20 left-10 w-20 h-20 bg-sage-300/20 rounded-full blur-xl animate-float" style="animation-delay: -3s;"></div>
      <div class="absolute top-1/2 left-1/3 w-16 h-16 bg-earth-300/20 rounded-full blur-xl animate-float" style="animation-delay: -1s;"></div>
      
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold font-serif mb-6">
            <span class="bg-gradient-to-r from-clay-600 via-earth-600 to-sage-600 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p class="text-xl text-sage-700 dark:text-sage-300 max-w-3xl mx-auto">
            Find answers to common questions about our pottery, workshops, and services. 
            Can't find what you're looking for? Contact us directly.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div class="space-y-4">
          {faqItems.map((item) => (
            <div key={item.id} class="group">
              <div class="bg-gradient-to-br from-white/90 via-sage-50/30 to-clay-50/30 backdrop-blur-sm border-2 border-clay-100 dark:border-clay-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-clay-200">
                {/* Question Header */}
                <button
                  onClick$={() => toggleItem(item.id)}
                  class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-clay-50/50 hover:to-sage-50/50 dark:hover:bg-clay-800/50 transition-all duration-200"
                  aria-expanded={openItems.value.includes(item.id)}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div class="flex items-center space-x-4">
                    {/* Category Badge */}
                    <span class={`px-3 py-1 rounded-full text-xs font-semibold border-2 shadow-lg ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    
                    {/* Question */}
                    <h3 class="text-lg font-semibold text-clay-900 dark:text-clay-100 font-serif pr-4">
                      {item.question}
                    </h3>
                  </div>
                  
                  {/* Expand/Collapse Icon */}
                  <div class="flex-shrink-0">
                    <div class={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openItems.value.includes(item.id) 
                        ? 'bg-gradient-to-r from-clay-500 to-earth-500 text-white shadow-lg' 
                        : 'bg-gradient-to-r from-clay-100 to-sage-100 text-clay-600'
                    }`}>
                      <svg 
                        class={`w-5 h-5 transition-transform duration-300 ${
                          openItems.value.includes(item.id) ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </button>
                
                {/* Answer */}
                <div 
                  id={`faq-answer-${item.id}`}
                  class={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems.value.includes(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!openItems.value.includes(item.id)}
                >
                  <div class="px-6 pb-5">
                    <div class="border-t-2 border-gradient-to-r from-clay-100 to-sage-100 pt-4">
                      <p class="text-sage-700 dark:text-sage-300 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div class="text-center mt-12">
          <div class="bg-gradient-to-r from-clay-50 via-earth-50 to-sage-50 rounded-3xl p-8 md:p-12 border-2 border-clay-100 dark:border-clay-700 shadow-xl">
            <h3 class="text-2xl md:text-3xl font-bold text-clay-900 dark:text-clay-100 font-serif mb-4">
              Still Have Questions?
            </h3>
            <p class="text-sage-700 dark:text-sage-300 mb-6 max-w-2xl mx-auto">
              Our pottery experts are here to help! Reach out to us for personalized assistance with your pottery needs.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-clay-600 via-earth-600 to-clay-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span class="relative z-10">Contact Us</span>
                <div class="absolute inset-0 bg-gradient-to-r from-clay-700 via-earth-700 to-clay-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="mailto:hello@terrapottery.com"
                class="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-sage-700 bg-gradient-to-r from-white/80 via-sage-50/80 to-clay-50/80 backdrop-blur-sm border-2 border-sage-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-sage-50"
              >
                <span class="relative z-10">Send Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}); 