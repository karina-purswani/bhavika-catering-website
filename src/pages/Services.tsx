import React from 'react';
import { useBooking } from '../context/BookingContext';
import ScrollReveal from '../components/ScrollReveal';
import { Gift, CheckSquare, Calendar, Flame, Users, Utensils } from 'lucide-react';

interface ServiceDetail {
  id: string;
  title: string;
  desc: string;
  guestRange: string;
  features: string[];
  icon: React.ReactNode;
}

const serviceDetails: ServiceDetail[] = [
  {
    id: 'wedding',
    title: 'Wedding Catering',
    desc: 'Royal banquet services designed for grand weddings and multi-day celebrations. We offer personalized multi-course gourmet spreads, premium linen settings, traditional thali styles, and elegant designer buffet counters.',
    guestRange: '150 - 300+ Guests',
    features: [
      'Tailored menu consultation with executive chefs',
      'Satvik options and live dessert counters'
    ],
    icon: <Gift className="text-gold w-6 h-6" />,
  },
  {
    id: 'sindhi-traditional',
    title: 'Sindhi Traditional Catering',
    desc: 'Authentic Sindhi culinary spreads, featuring family recipes and traditional slow-cooked details like Dal Pakwan, Sindhi Kadhi, Koki, Sai Bhaji, and Meethi Sewayon.',
    guestRange: '30 - 300+ Guests',
    features: [
      'Authentic spice mixes sourced from regional vendors',
      'Traditional recipes passed down from generations',
    ],
    icon: <Flame className="text-gold w-6 h-6" />,
  },
  {
    id: 'family',
    title: 'Family Functions',
    desc: 'Intimate catering for house warmings, get-togethers, kitty parties, Roka ceremonies, and private events. Homely taste designed to make your home events stress-free.',
    guestRange: '25 - 150 Guests',
    features: [
      'Flexible compact buffet layouts',
      'Customized menu based preferences',
      'Warm and homely serving style'
    ],
    icon: <Users className="text-gold w-6 h-6" />,
  },
  {
    id: 'religious',
    title: 'Religious Events',
    desc: 'Specialized pure vegetarian satvik meals honoring regional festivals, Chetichand celebrations, temple gatherings, and house pujas.',
    guestRange: '100 - 400+ Guests',
    features: [
      'Pure satvik (no onion, no garlic) preparation options',
      'Traditional sweets like Munthal, Lolo',
      'Hygienic setup and respectful hospitality',
    ],
    icon: <Utensils className="text-gold w-6 h-6" />,
  },
  {
    id: 'birthday-anniversary',
    title: 'Birthday & Anniversary Catering',
    desc: 'Fun, vibrant, and delicious food layouts for all age groups. From kids snack bars to elegant sit-down dinners for milestone anniversary celebrations.',
    guestRange: '40 - 300+ Guests',
    features: [
      'Interactive food stations (live chaats',
      'Kid-friendly customized menu choices',
    ],
    icon: <Calendar className="text-gold w-6 h-6" />,
  },
  {
    id: 'bulk',
    title: 'Bulk Food Orders',
    desc: 'Large volume food packages packed safely and shipped hot. Ideal for community feeds, temple gatherings, sports events, and travel food logistics.',
    guestRange: '50 - 300+ Guests',
    features: [
      'Food Grade heat-insulated boxes',
      'Simple, hearty, and highly scalable food recipes',
      'Safe spill-proof packaging solutions',
      'Cost-efficient bulk pricing brackets'
    ],
    icon: <CheckSquare className="text-gold w-6 h-6" />,
  },
];

export const Services: React.FC = () => {
  const { openModal } = useBooking();

  return (
    <div className="py-12 space-y-20 bg-cream">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <ScrollReveal className="space-y-4">
          <span className="text-gold font-semibold uppercase tracking-widest text-xs">Royal Hospitality</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-dark">
            Our Catering Services
          </h1>
          <div className="h-0.5 w-20 bg-gold mx-auto mt-4" />
          <p className="text-text-muted max-w-2xl mx-auto text-sm md:text-base leading-relaxed pt-2">
            Explore our custom catering modules tailored to meet your guest lists, setup aesthetics, and authentic culinary preferences.
          </p>
        </ScrollReveal>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceDetails.map((service, index) => (
            <ScrollReveal
              key={service.id}
              delay={index * 0.08}
              className="bg-white border border-gold/15 p-6 rounded-xl flex flex-col justify-between hover:border-gold/30 transition-all text-left shadow-xs"
              id={service.id}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center font-bold">
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-sans font-bold text-brass bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
                    {service.guestRange}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-serif text-dark pt-2">{service.title}</h3>
                <p className="text-text-muted text-xs md:text-sm leading-relaxed">{service.desc}</p>
                <div className="space-y-2 pt-2 border-t border-gold/10">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Service Includes:</span>
                  <ul className="space-y-1.5 pl-1">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-text-muted flex items-start gap-2">
                        <span className="text-gold mt-0.5">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => openModal(service.title)}
                  className="w-full bg-gradient-to-r from-brass to-gold hover:from-gold hover:to-gold-light text-black font-bold uppercase tracking-wider py-2.5 rounded text-xs transition-all cursor-pointer text-center"
                >
                  Book Service / Inquire
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Inquiry CTA Box */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="bg-gradient-to-br from-tan/30 to-gold/15 border border-gold/20 p-8 md:p-12 rounded-2xl text-center space-y-6 shadow-xs">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-dark">Need a Customized Serving Setup?</h2>
          <p className="text-text-muted max-w-xl mx-auto text-xs md:text-sm leading-relaxed">
            Our coordinators will work closely with your event planners to customize theme counters, server attire, customized menu items, and timeline logistics.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => openModal()}
              className="bg-gradient-to-r from-brass to-gold text-black font-bold uppercase tracking-wider py-3 px-8 rounded text-xs transition-all hover:scale-105 cursor-pointer shadow-lg"
            >
              Get Custom Quotation
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Services;
