import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBooking, type MenuItem } from '../context/BookingContext';
import ScrollReveal from '../components/ScrollReveal';
import { Search, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import menuList from '../data/menu.json';

const categories = [
  'All',
  'Sindhi Specials',
  'North Indian',
  'Chinese',
  'South Indian',
  'Street Food',
  'Desserts',
  'Beverages',
];

export const Menu: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { quoteItems, addToQuote, removeFromQuote, openModal } = useBooking();

  // Handle URL Category query syncing
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam && categories.includes(catParam)) {
      setSelectedCategory(catParam);
    } else if (catParam === 'Desserts & Sweets') {
      setSelectedCategory('Desserts');
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // update URL
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  // Filter logic
  const filteredMenu = (menuList as MenuItem[]).filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 space-y-12 bg-cream min-h-[90vh]">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <ScrollReveal className="space-y-4">
          <span className="text-gold font-semibold uppercase tracking-widest text-xs">Royal Flavors</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-dark">
            Our Catering Menu
          </h1>
          <div className="h-0.5 w-20 bg-gold mx-auto mt-4" />
          <p className="text-text-muted max-w-2xl mx-auto text-sm md:text-base leading-relaxed pt-2">
            Browse our wide selection of authentic Sindhi specials, street delicacies, desserts, and multi-cuisine spreads.
          </p>
        </ScrollReveal>
      </section>

      {/* Filters & Search Control Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between bg-white border border-gold/15 p-4 rounded-xl shadow-xs">
          {/* Search Box */}
          <div className="relative w-full lg:max-w-[260px] text-left">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/60" size={16} />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gold/20 rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-gold transition-colors text-dark"
            />
          </div>

          {/* Category Scroller */}
          <div className="w-full lg:w-auto flex-1 min-w-0 flex gap-2 overflow-x-auto no-scrollbar py-1 justify-start lg:justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap tracking-wider transition-colors cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-gold border-gold text-black shadow-xs'
                    : 'bg-white border-gold/15 text-text-muted hover:text-dark hover:bg-gold/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredMenu.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.map((item, index) => {
              return (
                <ScrollReveal
                  key={item.id}
                  delay={(index % 6) * 0.05}
                  className="bg-white border border-gold/15 p-5 rounded-xl flex flex-col justify-start hover:border-gold/35 transition-all text-left shadow-xs card-hover-border group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[9px] uppercase tracking-widest text-brass font-bold bg-gold/10 border border-gold/25 px-2.5 py-0.5 rounded whitespace-nowrap">
                        {item.category}
                      </span>
                      <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                        {item.tags && item.tags.map((tag) => (
                          <span key={tag} className="text-[9px] uppercase tracking-widest text-white bg-gold font-bold px-2 py-0.5 rounded shadow-xs whitespace-nowrap">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-base md:text-lg font-bold font-serif text-dark group-hover:text-gold transition-colors pt-1">
                      {item.name}
                    </h3>
                    
                    <p className="text-text-muted text-xs leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {/* Add to Quote Button */}
                    <div className="pt-3 mt-auto border-t border-gold/10 flex justify-between items-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const isInQuote = quoteItems.some((qi) => qi.id === item.id);
                          if (isInQuote) {
                            removeFromQuote(item.id);
                          } else {
                            addToQuote(item);
                          }
                        }}
                        className={`text-[10px] font-bold uppercase tracking-wider py-1.5 px-3.5 rounded-lg transition-all duration-200 cursor-pointer border flex items-center gap-1 ${
                          quoteItems.some((qi) => qi.id === item.id)
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                            : 'bg-white border-gold/30 hover:border-gold hover:bg-gold/5 text-gold hover:text-brass'
                        }`}
                      >
                        {quoteItems.some((qi) => qi.id === item.id) ? '✓ Selected' : '+ Add to Quote'}
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gold/15 rounded-xl max-w-md mx-auto">
            <ShoppingBag className="text-gold/60 mx-auto mb-4" size={32} />
            <h3 className="text-lg font-bold text-dark font-serif">No Dishes Found</h3>
            <p className="text-xs text-text-muted mt-2">
              We couldn't find matches for your search. Try resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                searchParams.delete('category');
                setSearchParams(searchParams);
              }}
              className="mt-6 border border-gold/40 hover:bg-gold/5 text-gold text-xs font-bold uppercase tracking-widest py-2 px-6 rounded transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}
      </section>

      {/* Floating Bottom Quote Bar */}
      <AnimatePresence>
        {quoteItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed bottom-6 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none"
          >
            <div className="bg-white/95 border border-gold/30 backdrop-blur-md py-4 px-6 rounded-2xl shadow-xl flex items-center justify-between gap-8 max-w-lg w-full pointer-events-auto relative z-50">
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Your Custom Menu</p>
                <h4 className="text-sm font-bold text-dark font-serif mt-0.5">
                  {quoteItems.length} {quoteItems.length === 1 ? 'item' : 'items'} selected
                </h4>
              </div>
              <button
                onClick={() => openModal()}
                className="bg-gradient-to-r from-brass to-gold hover:from-gold hover:to-gold-light text-black font-bold uppercase tracking-wider py-2.5 px-5 rounded-lg text-xs transition-all hover:scale-105 cursor-pointer shadow-md shadow-gold/15"
              >
                Proceed to Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
