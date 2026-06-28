import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  spicyLevel?: number;
  isSpecial?: boolean;
  tags?: string[];
}

interface BookingContextType {
  isModalOpen: boolean;
  selectedService: string;
  quoteItems: MenuItem[];
  openModal: (serviceName?: string) => void;
  closeModal: () => void;
  addToQuote: (item: MenuItem) => void;
  removeFromQuote: (itemId: string) => void;
  clearQuote: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [quoteItems, setQuoteItems] = useState<MenuItem[]>([]);

  // Load quote items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bhavika_quote_cart');
    if (saved) {
      try {
        setQuoteItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse quote items', e);
      }
    }
  }, []);

  const openModal = (serviceName: string = '') => {
    setSelectedService(serviceName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addToQuote = (item: MenuItem) => {
    setQuoteItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) return prev;
      const updated = [...prev, item];
      localStorage.setItem('bhavika_quote_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromQuote = (itemId: string) => {
    setQuoteItems((prev) => {
      const updated = prev.filter((i) => i.id !== itemId);
      localStorage.setItem('bhavika_quote_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const clearQuote = () => {
    setQuoteItems([]);
    localStorage.removeItem('bhavika_quote_cart');
  };

  return (
    <BookingContext.Provider
      value={{
        isModalOpen,
        selectedService,
        quoteItems,
        openModal,
        closeModal,
        addToQuote,
        removeFromQuote,
        clearQuote,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
