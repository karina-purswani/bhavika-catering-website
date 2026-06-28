import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import galleryData from '../data/gallery.json';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Food Items' | 'Event Setups' | 'Live Counters';
  image: string;
  desc: string;
  isPng?: boolean;
}

const galleryItems = galleryData as GalleryItem[];

export const Gallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Food Items' | 'Event Setups' | 'Live Counters'>('All');

  const filteredItems = galleryItems.filter(
    (item) => selectedFilter === 'All' || item.category === selectedFilter
  );

  return (
    <div className="py-12 space-y-12 bg-cream">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <ScrollReveal className="space-y-4">
          <span className="text-gold font-semibold uppercase tracking-widest text-xs">Visual Display</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-dark">
            Our Photo Gallery
          </h1>
          <div className="h-0.5 w-20 bg-gold mx-auto mt-4" />
          <p className="text-text-muted max-w-2xl mx-auto text-sm md:text-base leading-relaxed pt-2">
            A visual feast of our signature culinary platters, live counters, and high-end banquet setups.
          </p>
        </ScrollReveal>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {(['All', 'Food Items', 'Event Setups', 'Live Counters'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap tracking-wider transition-colors cursor-pointer border ${
                selectedFilter === filter
                  ? 'bg-gold border-gold text-black shadow-md shadow-gold/15'
                  : 'bg-white border-gold/15 text-text-muted hover:text-dark hover:bg-gold/5'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {filteredItems.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              delay={idx * 0.05}
              className="break-inside-avoid relative rounded-xl overflow-hidden border border-gold/15 group bg-white hover:border-gold/30 transition-all flex flex-col items-center p-6 text-center shadow-xs"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] flex items-center justify-center bg-tan/10 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)]"
                />
              </div>

              {/* Title Info */}
              <div className="w-full text-left pt-4 space-y-1">
                <span className="text-[9px] uppercase tracking-widest text-gold font-bold">
                  {item.category}
                </span>
                <h3 className="text-sm md:text-base font-bold font-serif text-dark group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed truncate">
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
