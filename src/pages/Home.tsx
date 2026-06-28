import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import AnimatedCounter from '../components/AnimatedCounter';
import ScrollReveal from '../components/ScrollReveal';
import GoogleReviewsWidget from '../components/GoogleReviewsWidget';

// Paste your third-party Google Reviews widget code here (e.g. from Elfsight, Trustindex, etc.)
const GOOGLE_REVIEWS_WIDGET_CODE = `<!-- Elfsight Google Reviews | Untitled Google Reviews -->
<script src="https://elfsightcdn.com/platform.js" async></script>
<div class="elfsight-app-8cf46bac-cb36-4ce8-8786-f61cff9d5f4e" data-elfsight-app-lazy></div>`;
import {
  Award,
  Users,
  Clock,
  ShieldCheck,
  Flame,
  Utensils,
  ChevronRight,
  Star,
  ArrowRight,
  Phone,
  MapPin,
} from 'lucide-react';

const dalPakwanImg = '/assets/dal_pakwan.webp';
const sindhiKadhiImg = '/assets/sindhi_kadhi.webp';
const kokiDahiImg = '/assets/koki_dahi.webp';
const saiBhajiImg = '/assets/sai_bhaji.webp';
const seviyonPatataImg = '/assets/seviyon_patata.webp';
const bheeBhajiImg = '/assets/bhee_bhaji.webp';

interface SpecialDish {
  name: string;
  image: string;
  desc: string;
  tag: string;
}

const specialDishes: SpecialDish[] = [
  {
    name: 'Dal Pakwan',
    image: dalPakwanImg,
    desc: 'The quintessential Sindhi breakfast. Hard, crisp flour flatbreads paired with perfectly spiced split chana dal, laced with sweet-sour tamarind and fiery mint chutneys.',
    tag: 'Signature Dish',
  },
  {
    name: 'Sindhi Kadhi',
    image: sindhiKadhiImg,
    desc: 'A celebrated gram flour and tamarind broth slow-simmered with a variety of vegetables like okra, drumsticks, and gavar, offering a complex tangy-spicy kick.',
    tag: 'Festive Classic',
  },
  {
    name: 'Koki & Dahi',
    image: kokiDahiImg,
    desc: 'Hearty unleavened wheat flatbread kneaded with onions, green chilies, coriander, and generous ghee, slow-roasted on griddle till golden brown.',
    tag: 'All-Time Favorite',
  },
];

interface FeaturedDish {
  name: string;
  image: string;
  desc: string;
}

const featuredDishes: FeaturedDish[] = [
  {
    name: 'Dal Pakwan',
    image: dalPakwanImg,
    desc: 'Traditional Sindhi breakfast featuring crispy pakwan served with spiced chana dal and chutneys.',
  },
  {
    name: 'Koki with Dahi',
    image: kokiDahiImg,
    desc: 'Thick, griddle-roasted wheat flatbread kneaded with onions, green chilies, and ghee, served with fresh yogurt.',
  },
  {
    name: 'Sindhi Kadhi',
    image: sindhiKadhiImg,
    desc: 'Tamarind-based gram flour curry loaded with seasonal vegetables like okra, drumsticks, and potatoes.',
  },
  {
    name: 'Sai Bhaji',
    image: saiBhajiImg,
    desc: 'Nutritious slow-cooked spinach stew mixed with dill leaves, split Bengal gram, and local spices.',
  },
  {
    name: 'Meethi Sewayon',
    image: seviyonPatataImg,
    desc: 'Sweet vermicelli cooked with cardamom, saffron, and ghee, topped with silver leaf and dry fruits.',
  },
  {
    name: 'Bhee Bhaji',
    image: bheeBhajiImg,
    desc: 'Lotus stem rounds slow-cooked in a spicy onion-tomato gravy with traditional spices.',
  },
];

interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  imageClass: string;
  anchor: string;
}

const services: ServiceItem[] = [
  {
    id: 'wedding',
    title: 'Wedding Catering',
    desc: 'Exquisite multi-course menus and royal buffet setups tailored for your special day. Custom wedding thali and buffet dining curated for Nashik celebrations.',
    imageClass: 'bg-gradient-to-br from-copper/20 to-gold/25',
    anchor: 'wedding',
  },
  {
    id: 'sindhi-traditional',
    title: 'Sindhi Traditional Catering',
    desc: 'Authentic Sindhi culinary spreads, featuring family recipes and traditional slow-cooked details like Dal Pakwan, Sindhi Kadhi, and Meethi Sewayon.',
    imageClass: 'bg-gradient-to-br from-tan/30 to-copper/30',
    anchor: 'sindhi-traditional',
  },
  {
    id: 'family',
    title: 'Family Functions',
    desc: 'Intimate catering for house warmings, get-togethers, birthday celebrations, and family functions, designed to be completely stress-free.',
    imageClass: 'bg-gradient-to-br from-copper/15 to-gold/30',
    anchor: 'family',
  },
  {
    id: 'religious',
    title: 'Religious Catering',
    desc: 'Specialized pure vegetarian satvik meals honoring regional festivals, Chetichand celebrations, temple gatherings, and house pujas.',
    imageClass: 'bg-gradient-to-br from-tan/40 to-gold/20',
    anchor: 'religious',
  }
];

const reasons = [
  {
    icon: <Flame className="text-gold w-6 h-6" />,
    title: 'Authentic Sindhi Taste',
    desc: 'We use age-old family recipes and authentic spice blends sourced directly from heritage regional vendors.',
  },
  {
    icon: <Users className="text-gold w-6 h-6" />,
    title: 'Experienced Chef Team',
    desc: 'Our chef specialize in catering grand banquets as well as intimate gatherings with professional service.',
  },
  {
    icon: <ShieldCheck className="text-gold w-6 h-6" />,
    title: 'Hygienic Preparation',
    desc: 'FSSAI certified practices. We maintain clean food preparation labs and follow strict sanitization rules.',
  },
  {
    icon: <Utensils className="text-gold w-6 h-6" />,
    title: 'Customized Menus',
    desc: 'From pure vegetarian spreads to mixed menus, we curate layouts tailored specifically to your guests and budget.',
  },
  {
    icon: <Clock className="text-gold w-6 h-6" />,
    title: 'On-Time Execution',
    desc: 'Punctuality is our brand promise. From setup timelines to fresh food refills, we ensure seamless scheduling.',
  },
  {
    icon: <Award className="text-gold w-6 h-6" />,
    title: 'Affordable Luxury',
    desc: 'Get transparent pricing structures with customizable service levels to fit your budget beautifully.',
  },
];

const testimonials = [
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

// Procedural SVG Mandala Component for traditional backgrounds
const IndianMandala: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      className={`absolute pointer-events-none mix-blend-multiply opacity-[0.04] text-gold ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.3"
    >
      <circle cx="50" cy="50" r="45" strokeDasharray="1,2" />
      <circle cx="50" cy="50" r="40" />
      <circle cx="50" cy="50" r="32" strokeDasharray="2,1" />
      <circle cx="50" cy="50" r="24" />
      <circle cx="50" cy="50" r="14" />
      <circle cx="50" cy="50" r="6" />
      {/* Ray lines */}
      {[...Array(16)].map((_, i) => {
        const angle = (i * Math.PI) / 8;
        return (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 44 * Math.cos(angle)}
            y2={50 + 44 * Math.sin(angle)}
          />
        );
      })}
      {/* Petals */}
      {[...Array(32)].map((_, i) => {
        const angle = (i * Math.PI) / 16;
        return (
          <circle
            key={i}
            cx={50 + 36 * Math.cos(angle)}
            cy={50 + 36 * Math.sin(angle)}
            r="1.2"
            fill="currentColor"
          />
        );
      })}
    </svg>
  );
};

// Helper component for floating particles
const FloatingParticles: React.FC<{ colorClass?: string; count?: number }> = ({
  colorClass = 'bg-gold/20',
  count = 15,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(count)].map((_, i) => {
        const size = Math.random() * 5 + 3;
        const delay = Math.random() * 6;
        const duration = Math.random() * 10 + 10;
        const left = Math.random() * 100;
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full ${colorClass}`}
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              bottom: `-20px`,
            }}
            animate={{
              y: ['0vh', '-85vh'],
              x: ['0px', `${(Math.random() - 0.5) * 40}px`],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
};

export const Home: React.FC = () => {
  const { openModal } = useBooking();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [currentDishIndex, setCurrentDishIndex] = useState(0);

  // Preload all featured dish images on mount for instant transitions
  useEffect(() => {
    featuredDishes.forEach((dish) => {
      const img = new Image();
      img.src = dish.image;
    });
  }, []);

  // Auto scroll featured dishes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDishIndex((prev) => (prev + 1) % featuredDishes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* SECTION 1: HERO SECTION - Warm Ivory, Premium Banquet Layout */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-2 pb-12 bg-cream overflow-hidden">
        <FloatingParticles count={18} />

        {/* Faint Indian mandala motifs in background corners (5% opacity) */}
        <IndianMandala className="w-[450px] h-[450px] -top-20 -left-20 opacity-5" />
        <IndianMandala className="w-[450px] h-[450px] bottom-10 -right-20 opacity-5" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Headline details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="lg:col-span-5 space-y-6 text-left order-2 lg:order-1"
            >
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/25 text-brass text-xs uppercase tracking-widest font-bold font-sans">
                  Royal Sindhi Heritage Catering
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif text-dark leading-[1.12]">
                  Authentic Sindhi Flavors <br />
                  <span className="text-gold-gradient font-serif">Crafted For Every Celebration</span>
                </h1>
                <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-xl">
                  Elevate your wedding, family celebration, or religious event with the heritage taste of Bhavika Catering. We present a royal Sindhi banquet curation crafted from family spice recipes and styled with traditional hospitality.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/menu"
                  className="bg-gradient-to-r from-brass to-gold hover:from-gold hover:to-gold-light text-black font-bold uppercase tracking-wider py-3.5 px-8 rounded text-xs transition-all hover:scale-105 shadow-lg shadow-gold/15 cursor-pointer"
                >
                  Explore Catering Menu
                </Link>
                <button
                  onClick={() => openModal()}
                  className="bg-white hover:bg-gold/5 border border-gold/30 hover:border-gold text-brass font-bold uppercase tracking-wider py-3.5 px-8 rounded text-xs transition-all hover:scale-105 cursor-pointer shadow-xs"
                >
                  Request Free Quote
                </button>
              </div>
            </motion.div>

            {/* Right Column: Premium Dish Showcase (Slideshow) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center w-full min-h-[420px] lg:min-h-[560px] relative order-1 lg:order-2">

              {/* Radial glow centered behind the dish */}
              <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gold/10 rounded-full blur-[80px] pointer-events-none z-0" />

              {/* Slideshow Display Container */}
              <div className="relative w-full flex flex-col items-center z-10 text-center">
                <div className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[460px] lg:h-[460px] relative flex items-center justify-center select-none order-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDishIndex}
                      initial={{ opacity: 0, scale: 0.92, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.05, y: -20 }}
                      transition={{ duration: 0.8 }}
                      className="absolute w-full h-full flex flex-col items-center justify-end pb-4 lg:pb-6"
                    >
                      <img
                        src={featuredDishes[currentDishIndex].image}
                        alt={featuredDishes[currentDishIndex].name}
                        className="max-w-[85%] max-h-[85%] object-contain pointer-events-none z-10 animate-float"
                        style={{
                          filter: 'drop-shadow(0px 25px 45px rgba(0,0,0,0.18)) drop-shadow(0px 0px 40px rgba(200,155,60,0.15))'
                        }}
                      />
                      {/* Realistic 3D Floor Shadow under the dish */}
                      <div
                        className="absolute bottom-[3%] lg:bottom-[4%] w-3/5 h-4 bg-black/20 blur-md rounded-full pointer-events-none z-0"
                        style={{
                          filter: 'blur(8px)',
                          boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Content block: Title & Description + Progress Bar Group */}
                <div className="w-full flex flex-col items-center mt-0 order-2">
                  {/* Content block: Title & Description */}
                  <div className="text-center max-w-lg px-4 min-h-[85px] flex flex-col justify-start items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentDishIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-1.5"
                      >
                        <h3 className="text-xl md:text-2xl font-bold font-serif text-dark tracking-wide">
                          {featuredDishes[currentDishIndex].name}
                        </h3>
                        <p className="text-text-muted text-xs md:text-sm leading-relaxed max-w-md">
                          {featuredDishes[currentDishIndex].desc}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Progress Indicator container */}
                  <div className="w-full max-w-xs mt-3 px-4">
                    <div className="w-full h-[3px] bg-gold/10 rounded-full overflow-hidden">
                      <motion.div
                        key={currentDishIndex}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4, ease: 'linear' }}
                        className="h-full bg-gradient-to-r from-brass to-gold"
                      />
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* QUICK BUSINESS INFO BAR */}
      <section className="bg-white border-y border-gold/15 py-8 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                <Clock size={18} />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Business Hours</span>
                <p className="text-xs text-dark font-semibold mt-0.5">Mon – Sun: 8:00 AM – 10:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Call Now</span>
                <a href="tel:+919011622225" className="text-xs text-dark font-semibold mt-0.5 hover:text-gold block transition-colors">
                  +91 90116 22225
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Address</span>
                <p className="text-xs text-dark font-semibold mt-0.5 leading-relaxed">
                  Tapovan, Panchavati, Nashik 422003
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                <Utensils size={18} />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Service Modes</span>
                <p className="text-xs text-dark font-semibold mt-0.5">
                  Delivery, Takeaway & Onsite Catering
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SIGNATURE SINDHI SPECIALS CARDS */}
      <section className="py-20 bg-tan border-y border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-black font-extrabold uppercase tracking-widest text-xs">Royal Recipes</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-black mt-2">Traditional Cuisine Classics</h2>
            <div className="h-0.5 w-16 bg-black mx-auto mt-4" />
            <p className="text-black/85 mt-4 leading-relaxed text-sm font-medium">
              We replicate authentic Sindhi catering favorites using home-ground spices, slow-cooking techniques, and traditional metals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialDishes.map((dish, index) => (
              <ScrollReveal
                key={dish.name}
                delay={index * 0.15}
                className="bg-white border border-gold/15 hover:border-gold/40 rounded-xl overflow-hidden shadow-md transition-all duration-300 card-hover-border group"
              >
                <div className="h-52 relative overflow-hidden flex items-center justify-center p-6 bg-tan/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    className="w-40 h-40 object-contain drop-shadow-[0_10px_15px_rgba(44,44,44,0.12)] group-hover:scale-105 transition-transform duration-500 z-5"
                  />
                  <span className="absolute top-4 left-4 bg-gold text-white text-[9px] uppercase tracking-widest font-bold py-1 px-2.5 rounded-full z-15">
                    {dish.tag}
                  </span>
                </div>
                <div className="p-6 space-y-3 text-left">
                  <h3 className="text-lg font-bold font-serif text-dark group-hover:text-gold transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-text-muted text-xs leading-relaxed min-h-[72px]">
                    {dish.desc}
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/menu"
                      className="text-gold hover:text-brass text-xs font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer"
                    >
                      Explore Menu <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: TRUST INDICATORS */}
      <section className="py-12 bg-white border-b border-gold/10 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <ScrollReveal delay={0.1} className="text-center flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black font-serif text-gold-gradient mb-1">
                <AnimatedCounter end={1000} suffix="+" />
              </span>
              <span className="text-xs uppercase tracking-widest text-text-muted font-bold">Events Served</span>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="text-center flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black font-serif text-gold-gradient mb-1">
                <AnimatedCounter end={10000} suffix="+" />
              </span>
              <span className="text-xs uppercase tracking-widest text-text-muted font-bold">Guests Catered</span>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="text-center flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black font-serif text-gold-gradient mb-1">
                <AnimatedCounter end={7} suffix="+" />
              </span>
              <span className="text-xs uppercase tracking-widest text-text-muted font-bold">Years Experience</span>
            </ScrollReveal>

            <ScrollReveal delay={0.4} className="text-center flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-black font-serif text-gold-gradient mb-1">
                <AnimatedCounter end={100} suffix="+" />
              </span>
              <span className="text-xs uppercase tracking-widest text-text-muted font-bold">Menu Options</span>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: CATERING SERVICES */}
      <section className="py-20 bg-tan/20 border-t border-gold/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold font-semibold uppercase tracking-widest text-xs">Event Expertise</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-dark mt-2">Catering Operations</h2>
            <div className="h-0.5 w-16 bg-gold mx-auto mt-4" />
            <p className="text-text-muted mt-4 leading-relaxed text-sm md:text-base">
              Every occasion is a family gathering. We design elegant, custom catering setups, buffet displays, and service teams for gatherings of all scales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((srv, index) => (
              <ScrollReveal
                key={srv.id}
                delay={index * 0.1}
                className={`relative rounded-xl overflow-hidden min-h-[220px] flex flex-col justify-end p-8 border border-gold/15 group ${srv.imageClass} hover:border-gold/30 transition-all`}
              >
                {/* Warm background tint */}
                <div className="absolute inset-0 bg-white/70 group-hover:bg-white/50 transition-colors duration-300 z-0" />

                <div className="relative z-10 space-y-3 text-left">
                  <h3 className="text-xl font-bold font-serif text-dark group-hover:text-gold transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-text-muted text-xs md:text-sm leading-relaxed max-w-md">
                    {srv.desc}
                  </p>
                  <div className="pt-2 flex gap-4 items-center">
                    <Link
                      to={`/services#${srv.anchor}`}
                      className="text-xs font-bold text-dark hover:text-gold uppercase tracking-wider flex items-center gap-1"
                    >
                      Learn More <ArrowRight size={12} />
                    </Link>
                    <button
                      onClick={() => openModal(srv.title)}
                      className="text-xs font-bold text-gold hover:text-brass uppercase tracking-wider cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-gold hover:text-brass font-bold text-xs uppercase tracking-widest border-b border-gold/30 pb-1 hover:border-gold transition-all"
            >
              View All Catering Services <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHY CHOOSE US */}
      <section className="py-20 bg-tan border-y border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-black font-extrabold uppercase tracking-widest text-xs">Our Ethics</span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-black mt-2">Why Host Families Trust Us</h2>
            <div className="h-0.5 w-16 bg-black mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((item, index) => (
              <ScrollReveal
                key={item.title}
                delay={index * 0.08}
                className="bg-white border border-gold/15 p-6 rounded-xl space-y-4 hover:border-gold/30 transition-all text-left shadow-xs"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold font-serif text-dark">
                  {item.title}
                </h3>
                <p className="text-text-muted text-xs md:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: GALLERY PREVIEW */}
      <section className="py-20 bg-cream border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="text-left max-w-2xl">
              <span className="text-gold font-semibold uppercase tracking-widest text-xs">Wedding Visuals</span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-dark mt-2">Catering Gallery</h2>
              <div className="h-0.5 w-16 bg-gold mt-4" />
            </div>
            <Link
              to="/gallery"
              className="text-gold hover:text-brass font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 mt-4 md:mt-0"
            >
              Browse Full Gallery <ArrowRight size={14} />
            </Link>
          </div>

          {/* Elegant grid preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollReveal delay={0.1} className="relative group overflow-hidden rounded-xl h-64 border border-gold/15 bg-white flex items-center justify-center">
              <img
                src={dalPakwanImg}
                alt="Dal Pakwan Setup"
                loading="lazy"
                className="w-36 h-36 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
              />
              <div className="absolute inset-0 bg-cream/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-xs uppercase text-gold font-bold">Catering Display</span>
                <h4 className="text-sm font-bold text-dark font-serif mt-1">Live Dal Pakwan Counter</h4>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="relative group overflow-hidden rounded-xl h-64 border border-gold/15 bg-white flex items-center justify-center">
              <img
                src={sindhiKadhiImg}
                alt="Sindhi Kadhi Setup"
                loading="lazy"
                className="w-36 h-36 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
              />
              <div className="absolute inset-0 bg-cream/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-xs uppercase text-gold font-bold">Thali Service</span>
                <h4 className="text-sm font-bold text-dark font-serif mt-1">Heritage Sindhi Kadhi</h4>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="relative group overflow-hidden rounded-xl h-64 border border-gold/15 bg-white flex items-center justify-center">
              <img
                src={kokiDahiImg}
                alt="Koki Dahi Setup"
                loading="lazy"
                className="w-36 h-36 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
              />
              <div className="absolute inset-0 bg-cream/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-xs uppercase text-gold font-bold">Traditional Tastes</span>
                <h4 className="text-sm font-bold text-dark font-serif mt-1">Koki & Dahi Platter</h4>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} className="relative group overflow-hidden rounded-xl h-64 border border-gold/15 bg-white flex items-center justify-center">
              <img
                src={seviyonPatataImg}
                alt="Meethi Sewayon Setup"
                loading="lazy"
                className="w-36 h-36 object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
              />
              <div className="absolute inset-0 bg-cream/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-left">
                <span className="text-xs uppercase text-gold font-bold">Dessert Service</span>
                <h4 className="text-sm font-bold text-dark font-serif mt-1">Meethi Sewayon</h4>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 8: TESTIMONIALS - Warm Tan Card, Dark Text */}
      <section className="py-20 bg-tan border-y border-black/10 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative text-black">
          <span className="text-black font-extrabold uppercase tracking-widest text-xs">Kind Words</span>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-black mt-2">Family Testimonials</h2>
          <div className="h-0.5 w-16 bg-black mx-auto mt-4 mb-16" />

          {GOOGLE_REVIEWS_WIDGET_CODE ? (
            <div className="bg-white border border-gold/15 p-6 rounded-2xl shadow-md">
              <GoogleReviewsWidget embedCode={GOOGLE_REVIEWS_WIDGET_CODE} />
            </div>
          ) : (
            <>
              {/* Active Review Panel */}
              <div className="relative min-h-[220px] flex items-center justify-center bg-white border border-gold/15 p-8 rounded-2xl shadow-md text-dark">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-center gap-1 text-gold">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <blockquote className="text-lg md:text-xl font-serif text-dark leading-relaxed italic max-w-2xl mx-auto">
                      "{testimonials[activeTestimonial].quote}"
                    </blockquote>
                    <div className="text-sm">
                      <cite className="not-italic font-bold text-gold uppercase tracking-wider">
                        {testimonials[activeTestimonial].name}
                      </cite>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slide Indicator bullets */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${index === activeTestimonial ? 'bg-gold w-6' : 'bg-gold/20'
                      }`}
                    aria-label={`Testimonial slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* SECTION 9: CALL TO ACTION - Tan Background, Warm Gold styling */}
      <section className="py-24 bg-gradient-to-b from-cream to-tan border-t border-gold/10 text-center relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-gold font-semibold uppercase tracking-widest text-xs">Planning an Event?</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-dark">Let's Make It Memorable.</h2>
          <p className="text-text-muted max-w-md mx-auto text-sm leading-relaxed">
            Curate an extraordinary dining environment with custom menus, luxury presentations, and authentic taste details. Contact us for a custom catering estimate today.
          </p>
          <div className="pt-4">
            <button
              onClick={() => openModal()}
              className="bg-gradient-to-r from-brass to-gold hover:from-gold hover:to-gold-light text-black font-bold uppercase tracking-wider py-4 px-10 rounded text-xs transition-all hover:scale-105 shadow-xl shadow-gold/10 cursor-pointer"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919011622225?text=I%20want%20to%20inquire%20about%20catering%20order%20and%20I%20got%20your%20contact%20details%20from%20your%20website"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:bg-[#20ba5a] transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
          <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.764.46 3.42 1.268 4.877L2 22l5.244-1.233A9.957 9.957 0 0012.004 22C17.528 22 22 17.528 22 12.004 22 6.48 17.528 2 12.004 2zm.004 18.257c-1.636 0-3.176-.43-4.524-1.184l-.324-.183-3.13.736.75-3.05-.205-.326a8.225 8.225 0 0 1-1.265-4.42c0-4.545 3.7-8.243 8.243-8.243 4.545 0 8.244 3.7 8.244 8.243 0 4.545-3.7 8.247-8.244 8.247zm4.35-6.03c-.238-.118-1.41-.692-1.627-.77-.217-.08-.375-.118-.533.118-.158.238-.613.77-.75.927-.139.158-.277.178-.515.06a6.5 6.5 0 0 1-1.91-1.176 7.16 7.16 0 0 1-1.32-1.638c-.238-.415-.025-.638.183-.845.188-.188.415-.494.623-.74.207-.248.277-.416.415-.693.139-.277.07-.514-.035-.73-.104-.218-.83-2.003-1.137-2.743-.3-.72-.603-.623-.83-.633-.213-.01-.455-.01-.697-.01a1.336 1.336 0 00-.968.455c-.337.376-1.286 1.256-1.286 3.064 0 1.808 1.315 3.558 1.498 3.805.183.248 2.588 3.95 6.27 5.54.874.377 1.558.602 2.09.77.88.28 1.68.24 2.313.146.707-.105 1.41-.532 1.61-1.026.2-.494.2-.917.14-1.026-.06-.11-.218-.178-.456-.296z"/>
        </svg>
        
        {/* Tooltip Description */}
        <span className="absolute right-16 bg-dark text-cream text-[10px] uppercase font-bold tracking-wider py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gold/20 shadow-lg">
          Inquire on WhatsApp
        </span>
      </a>
    </div>
  );
};

export default Home;
