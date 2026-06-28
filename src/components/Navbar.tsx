import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Menu as MenuIcon, X, ChevronDown, ClipboardList } from 'lucide-react';
const logo = '/assets/logo.png';

interface DropdownItem {
  name: string;
  path: string;
}

const servicesItems: DropdownItem[] = [
  { name: 'Wedding Catering', path: '/services#wedding' },
  { name: 'Sindhi Traditional Catering', path: '/services#sindhi-traditional' },
  { name: 'Family Functions', path: '/services#family' },
  { name: 'Religious Events', path: '/services#religious' },
  { name: 'Birthday & Anniversary Catering', path: '/services#birthday-anniversary' },
  { name: 'Bulk Food Orders', path: '/services#bulk' },
];

const menuItems: DropdownItem[] = [
  { name: 'Signature Sindhi Specials', path: '/menu?category=Sindhi Specials' },
  { name: 'North Indian', path: '/menu?category=North Indian' },
  { name: 'Chinese', path: '/menu?category=Chinese' },
  { name: 'South Indian', path: '/menu?category=South Indian' },
  { name: 'Street Food', path: '/menu?category=Street Food' },
  { name: 'Desserts & Sweets', path: '/menu?category=Desserts' },
  { name: 'Beverages', path: '/menu?category=Beverages' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'menu' | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { openModal, quoteItems } = useBooking();
  const location = useLocation();

  // Handle scroll shadow/opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActiveLink = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 ${scrolled
        ? 'glass-nav shadow-sm py-3'
        : 'bg-[#F1E8D8] border-b border-gold/15 py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 gap-1">
          {/* Logo Left */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Bhavika Catering Logo" className="h-14 md:h-20 w-auto object-contain scale-[1.7] translate-x-1 translate-y-1" />
              <div className="flex flex-col">
                <span className="text-black text-lg font-semibold tracking-wider font-serif uppercase">
                  Bhavika
                </span>
                <span className="text-black/80 text-[10px] tracking-[0.25em] font-sans -mt-1.5 uppercase">
                  Catering
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-all rounded-md ${isActiveLink('/') ? 'bg-black/15 text-black font-extrabold' : 'text-black/80 hover:text-black hover:bg-black/5'
                }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-all rounded-md ${isActiveLink('/about') ? 'bg-black/15 text-black font-extrabold' : 'text-black/80 hover:text-black hover:bg-black/5'
                }`}
            >
              About Us
            </Link>

            {/* Catering Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-all rounded-md flex items-center gap-1 focus:outline-none cursor-pointer ${isActiveLink('/services') ? 'bg-black/15 text-black font-extrabold' : 'text-black/80 hover:text-black hover:bg-black/5'
                  }`}
              >
                Catering Services <ChevronDown size={12} />
              </button>
              {activeDropdown === 'services' && (
                <div className="absolute left-0 mt-0 w-56 rounded-md shadow-lg bg-white border border-gold/15 py-2 z-50">
                  {servicesItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-2.5 text-xs tracking-wider text-dark hover:text-gold hover:bg-gold/5 transition-colors font-semibold"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('menu')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-all rounded-md flex items-center gap-1 focus:outline-none cursor-pointer ${isActiveLink('/menu') ? 'bg-black/15 text-black font-extrabold' : 'text-black/80 hover:text-black hover:bg-black/5'
                  }`}
              >
                Menu <ChevronDown size={12} />
              </button>
              {activeDropdown === 'menu' && (
                <div className="absolute left-0 mt-0 w-64 rounded-md shadow-lg bg-white border border-gold/15 py-2 z-50">
                  {menuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-2.5 text-xs tracking-wider text-dark hover:text-gold hover:bg-gold/5 transition-colors font-semibold"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/gallery"
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-all rounded-md ${isActiveLink('/gallery') ? 'bg-black/15 text-black font-extrabold' : 'text-black/80 hover:text-black hover:bg-black/5'
                }`}
            >
              Gallery
            </Link>
            <Link
              to="/testimonials"
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-all rounded-md ${isActiveLink('/testimonials') ? 'bg-black/15 text-black font-extrabold' : 'text-black/80 hover:text-black hover:bg-black/5'
                }`}
            >
              Testimonials
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-widest transition-all rounded-md ${isActiveLink('/contact') ? 'bg-black/15 text-black font-extrabold' : 'text-black/80 hover:text-black hover:bg-black/5'
                }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Quote Cart Badge */}
            {quoteItems.length > 0 && (
              <button
                onClick={() => openModal()}
                className="relative p-2 text-black hover:bg-black/10 rounded-full transition-colors cursor-pointer flex items-center justify-center"
                title="View Quote Request List"
              >
                <ClipboardList size={20} />
                <span className="absolute -top-1 -right-1 bg-black text-white font-bold text-[9px] rounded-full w-4 h-4 flex items-center justify-center shadow-md animate-bounce">
                  {quoteItems.length}
                </span>
              </button>
            )}

            <button
              onClick={() => openModal()}
              className="bg-black hover:bg-black/80 text-[#B08D57] hover:text-[#9A7847] text-xs uppercase tracking-widest font-bold px-4 py-2.5 rounded shadow-md transition-all hover:scale-105 cursor-pointer"
            >
              Get Free Quote
            </button>
          </div>

          {/* Mobile menu button and cart */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Quote cart for mobile */}
            {quoteItems.length > 0 && (
              <button
                onClick={() => openModal()}
                className="relative p-2 text-black rounded-full flex items-center justify-center"
              >
                <ClipboardList size={18} />
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white font-bold text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  {quoteItems.length}
                </span>
              </button>
            )}

            <button
              onClick={toggleMenu}
              className="text-black hover:bg-black/10 p-2 rounded-full focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-[#F1E8D8] z-40 overflow-y-auto border-t border-gold/15">
          <div className="px-4 py-6 space-y-3 flex flex-col text-left">
            <Link
              to="/"
              className={`py-3 border-b border-gold/10 text-sm uppercase tracking-widest font-bold ${isActiveLink('/') ? 'text-gold' : 'text-dark'
                }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`py-3 border-b border-gold/10 text-sm uppercase tracking-widest font-bold ${isActiveLink('/about') ? 'text-gold' : 'text-dark'
                }`}
            >
              About Us
            </Link>

            {/* Mobile Catering Services Accordion */}
            <div className="flex flex-col border-b border-gold/10 py-2">
              <span className="text-gold text-[10px] uppercase tracking-widest font-bold mb-1.5">
                Catering Services
              </span>
              <div className="grid grid-cols-2 gap-2 pl-2">
                {servicesItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="py-1.5 text-xs text-dark hover:text-gold font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Menu Categories Accordion */}
            <div className="flex flex-col border-b border-gold/10 py-2">
              <span className="text-gold text-[10px] uppercase tracking-widest font-bold mb-1.5">
                Menu Categories
              </span>
              <div className="grid grid-cols-2 gap-2 pl-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="py-1.5 text-xs text-dark hover:text-gold font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/gallery"
              className={`py-3 border-b border-gold/10 text-sm uppercase tracking-widest font-bold ${isActiveLink('/gallery') ? 'text-gold' : 'text-dark'
                }`}
            >
              Gallery
            </Link>
            <Link
              to="/testimonials"
              className={`py-3 border-b border-gold/10 text-sm uppercase tracking-widest font-bold ${isActiveLink('/testimonials') ? 'text-gold' : 'text-dark'
                }`}
            >
              Testimonials
            </Link>
            <Link
              to="/contact"
              className={`py-3 border-b border-gold/10 text-sm uppercase tracking-widest font-bold ${isActiveLink('/contact') ? 'text-gold' : 'text-dark'
                }`}
            >
              Contact
            </Link>

            <button
              onClick={() => openModal()}
              className="w-full text-center bg-[#B08D57] hover:bg-[#9A7847] text-black hover:text-white font-bold uppercase tracking-widest py-3 rounded text-xs mt-4 transition-colors duration-200"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
