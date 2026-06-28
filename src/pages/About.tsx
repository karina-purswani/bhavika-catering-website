import React from 'react';
import { useBooking } from '../context/BookingContext';
import ScrollReveal from '../components/ScrollReveal';
import { Heart, Compass, Shield } from 'lucide-react';
const logo = '/assets/logo.png';

const values = [
  {
    icon: <Heart className="text-gold w-6 h-6" />,
    title: 'Passion for Authenticity',
    desc: 'We replicate heritage cooking methods and source authentic regional ingredients to protect original tastes.',
  },
  {
    icon: <Compass className="text-gold w-6 h-6" />,
    title: 'Impeccable Hospitality',
    desc: 'From uniform aesthetics of servers to buffet alignments, we represent host dignity on every dining table.',
  },
  {
    icon: <Shield className="text-gold w-6 h-6" />,
    title: 'Highest Safety Standards',
    desc: 'We follow strict sanitation rules, clean workspace lab controls, and FSSAI guidelines without compromise.',
  },
];

export const About: React.FC = () => {
  const { openModal } = useBooking();

  return (
    <div className="py-12 space-y-24 bg-cream">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <ScrollReveal className="space-y-4">
          <span className="text-gold font-semibold uppercase tracking-widest text-xs">Our Heritage</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-dark">
            The Story of Bhavika Catering
          </h1>
          <div className="h-0.5 w-20 bg-gold mx-auto mt-4" />
          <p className="text-text-muted max-w-2xl mx-auto text-sm md:text-base leading-relaxed pt-2">
            A family-owned catering label dedicated to preserving authentic Sindhi flavors and creating luxurious experiences.
          </p>
        </ScrollReveal>
      </section>

      {/* Family Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Logo Frame representation */}
          <div className="lg:col-span-5 flex justify-center">
            <ScrollReveal direction="left" className="relative p-8 rounded-2xl border border-gold/20 bg-white flex flex-col items-center max-w-sm w-full text-center shadow-md">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cream p-3 border border-gold/20 rounded-full">
                <img src={logo} alt="Bhavika Logo" className="w-20 h-20 object-contain scale-[2.2] translate-x-2 translate-y-1" />
              </div>
              <span className="text-gold font-serif text-xl uppercase tracking-widest mt-6 font-bold">Est. 2018</span>
              <h3 className="text-2xl font-serif text-dark mt-2 font-bold">A Legacy of Taste</h3>
              <p className="text-text-muted text-xs mt-3 leading-relaxed">
                "We do not just cook. We replicate our family traditions, spices, and cultural heritage on guest plates, ensuring memories that last a lifetime."
              </p>
              <span className="text-gold text-xs italic mt-4 font-semibold font-serif">— Smt. Bhavika Purswani, Founder</span>
            </ScrollReveal>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            <ScrollReveal direction="right" className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-dark">Starting from a Small Home Kitchen</h2>
              <p className="text-text-muted leading-relaxed text-sm md:text-base">
                Bhavika Catering was born out of a deep-seated love for traditional Sindhi gastronomy. Smt. Bhavika Purswani & Manoj Purswani began cooking customized lunch thalis for festivals and small family functions from her home kitchen in Tapovan, Panchavati, Nashik. Her signature Sindhi cuisine quickly captured hearts.
              </p>
              <p className="text-text-muted leading-relaxed text-sm md:text-base">
                Word-of-mouth recommendations grew, and soon, Bhavika, joined by her family, established a professional catering hub. By staying loyal to time-honored recipes, spice grinders, and traditional slow-cooked details, the brand expanded into a premium catering name trusted for large-scale weddings and prestigious corporate events.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => openModal()}
                  className="bg-gradient-to-r from-brass to-gold hover:from-gold hover:to-gold-light text-black font-bold uppercase tracking-wider py-3 px-6 rounded text-xs transition-all hover:scale-105 cursor-pointer shadow-md shadow-gold/10"
                >
                  Book Our Services
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="bg-tan/20 py-20 border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {values.map((val, idx) => (
              <ScrollReveal
                key={val.title}
                delay={idx * 0.15}
                className="bg-white border border-gold/15 p-8 rounded-xl space-y-4 hover:border-gold/30 transition-all shadow-xs"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold font-serif text-dark">{val.title}</h3>
                <p className="text-text-muted text-xs md:text-sm leading-relaxed">{val.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
