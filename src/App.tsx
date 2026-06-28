import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InquiryModal from './components/InquiryModal';
import LoadingScreen from './components/LoadingScreen';

// Pages lazy/import
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Scroll to top on navigation helper
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is an anchor hash in the URL (e.g. #wedding), scroll to that element
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }
    // Otherwise scroll to the top
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Lock scrolling when loading screen is active
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <BookingProvider>
      {/* Brand Loading Splash Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loading-screen" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-cream text-dark selection:bg-gold selection:text-black">
          {/* Header */}
          <Navbar />

          {/* Main Content */}
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} /> {/* Custom 404 fallback */}
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Booking / Inquiry Modal */}
          <InquiryModal />
        </div>
      </Router>
    </BookingProvider>
  );
};

export default App;
