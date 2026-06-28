import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { Star, MessageSquare, Heart, Quote, Compass } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import GoogleReviewsWidget from '../components/GoogleReviewsWidget';

// Paste your third-party Google Reviews widget code here (e.g. from Elfsight, Trustindex, etc.)
// Example: const GOOGLE_REVIEWS_WIDGET_CODE = `<script src="https://static.elfsight.com/platform/platform.js" async defer></script><div class="elfsight-app-xxxx"></div>`;
const GOOGLE_REVIEWS_WIDGET_CODE = `<!-- Elfsight Google Reviews | Untitled Google Reviews -->
<script src="https://elfsightcdn.com/platform.js" async></script>
<div class="elfsight-app-8cf46bac-cb36-4ce8-8786-f61cff9d5f4e" data-elfsight-app-lazy></div>`;

interface TestimonialCard {
  name: string;
  quote: string;
  rating: number;
}

const detailedReviews: TestimonialCard[] = [
  {
    name: 'Karina Purswani',
    quote: "Best Catering food in Nashik! 😋",
    rating: 5,
  },
  {
    name: 'Saburi Yeola',
    quote: "Amazing food and Great taste!!",
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  const { openModal } = useBooking();

  return (
    <div className="py-12 space-y-20 bg-cream min-h-[90vh]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <ScrollReveal className="space-y-4">
          <span className="text-gold font-semibold uppercase tracking-widest text-xs">Guest Experience</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-dark">
            Client Testimonials
          </h1>
          <div className="h-0.5 w-20 bg-gold mx-auto mt-4" />
          <p className="text-text-muted max-w-2xl mx-auto text-sm md:text-base leading-relaxed pt-2">
            Read stories of how we bring authentic tastes, luxurious setups, and professional service to client milestone events.
          </p>
        </ScrollReveal>
      </section>

      {/* Stats trust indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-white border border-gold/15 p-8 rounded-2xl shadow-sm">
          <ScrollReveal delay={0.1} className="space-y-2">
            <h3 className="text-3xl font-black font-serif text-gold-gradient">4.9 / 5.0</h3>
            <div className="flex justify-center gap-1 text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Average Client Rating</p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="space-y-2 border-y md:border-y-0 md:border-x border-gold/10 py-6 md:py-0">
            <h3 className="text-3xl font-black font-serif text-gold-gradient">98%</h3>
            <div className="flex justify-center gap-1.5 text-gold">
              <Heart size={16} fill="currentColor" />
            </div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Recommendation Rate</p>
          </ScrollReveal>

          <ScrollReveal delay={0.3} className="space-y-2">
            <h3 className="text-3xl font-black font-serif text-gold-gradient">100%</h3>
            <div className="flex justify-center gap-1.5 text-gold">
              <Compass size={16} />
            </div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Authentic Recipe Guarantee</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Review List Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {GOOGLE_REVIEWS_WIDGET_CODE ? (
          <GoogleReviewsWidget embedCode={GOOGLE_REVIEWS_WIDGET_CODE} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {detailedReviews.map((review, idx) => (
              <ScrollReveal
                key={review.name}
                delay={idx * 0.08}
                className="bg-white border border-gold/15 p-8 rounded-xl flex flex-col justify-between hover:border-gold/30 transition-all shadow-sm relative overflow-hidden group"
              >
                {/* Giant background quote icon */}
                <Quote className="absolute right-6 top-6 text-gold/5 w-24 h-24 pointer-events-none group-hover:text-gold/10 transition-colors duration-500" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-1 text-gold">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="text-sm md:text-base text-dark italic leading-relaxed font-serif">
                    "{review.quote}"
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-gold/10 mt-6 flex items-center justify-between relative z-10">
                  <h4 className="font-bold text-gold uppercase tracking-wider text-sm">
                    {review.name}
                  </h4>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* Bottom Booking Invitation */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-16">
        <ScrollReveal className="space-y-6">
          <MessageSquare className="text-gold w-8 h-8 mx-auto" />
          <h2 className="text-3xl font-bold font-serif text-dark">Let Us Cater Your Milestone Event</h2>
          <p className="text-text-muted max-w-md mx-auto text-xs md:text-sm leading-relaxed">
            Ready to give your guests a delicious experience? Connect with our menu designers to curating authentic tastes.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openModal()}
              className="bg-gradient-to-r from-brass to-gold text-black font-bold uppercase tracking-wider py-3.5 px-8 rounded text-xs transition-all hover:scale-105 cursor-pointer shadow-lg"
            >
              Get Free Quote Now
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Testimonials;
