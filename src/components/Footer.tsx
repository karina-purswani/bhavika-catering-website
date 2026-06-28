import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
const logo = '/assets/logo.png';

// Social links configuration - Set INSTAGRAM_URL to a valid link when available
const INSTAGRAM_URL = "https://www.instagram.com/bhavika_catering/";
const WHATSAPP_URL = "https://wa.me/919011622225";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-tan border-t border-gold/15 text-dark text-sm font-sans pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Brand Info & Socials */}
          <div className="space-y-4 text-left">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Bhavika Catering Logo" className="h-12 w-auto object-contain scale-[2] translate-x-1 translate-y-1" />
              <div className="flex flex-col">
                <span className="text-dark text-xl font-semibold tracking-wider font-serif uppercase">
                  Bhavika
                </span>
                <span className="text-gold text-xs tracking-[0.25em] font-sans -mt-1 uppercase">
                  Catering
                </span>
              </div>
            </Link>
            <p className="text-text-muted leading-relaxed pt-2">
              Authentic Sindhi Catering for Weddings, Celebrations & Corporate Events in Nashik.
            </p>
            <div className="flex space-x-3 pt-2">
              {INSTAGRAM_URL && (
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-gold/15 flex items-center justify-center text-dark hover:text-[#9A7847] hover:border-gold hover:bg-gold/5 transition-all"
                  aria-label="Instagram link"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
              {WHATSAPP_URL && (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-gold/15 flex items-center justify-center text-dark hover:text-[#9A7847] hover:border-gold hover:bg-gold/5 transition-all"
                  aria-label="WhatsApp link"
                >
                  <MessageCircle size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-left md:pl-12">
            <h4 className="text-dark font-serif font-bold text-base tracking-wider uppercase mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-gold">
              Quick Links
            </h4>
            <ul className="space-y-3 font-medium">
              <li>
                <Link to="/" className="hover:text-[#9A7847] transition-colors block py-0.5">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#9A7847] transition-colors block py-0.5">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#9A7847] transition-colors block py-0.5">Services</Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-[#9A7847] transition-colors block py-0.5">Menu</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#9A7847] transition-colors block py-0.5">Gallery</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-[#9A7847] transition-colors block py-0.5">Testimonials</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#9A7847] transition-colors block py-0.5">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info & Business Hours */}
          <div className="text-left">
            <h4 className="text-dark font-serif font-bold text-base tracking-wider uppercase mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-gold">
              Contact & Hours
            </h4>
            <ul className="space-y-4 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="text-gold mt-1 flex-shrink-0" size={16} />
                <span className="leading-relaxed">
                  Yogeshwar Krupa Apartment,<br />
                  14 Tapovan Road,<br />
                  Behind Vrudhaashram,<br />
                  Panchavati,<br />
                  Nashik 422003
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-gold flex-shrink-0" size={16} />
                <a href="tel:+919011622225" className="hover:text-[#9A7847] transition-colors font-semibold">
                  +91 90116 22225
                </a>
              </li>
              <li className="flex items-start gap-3 border-t border-gold/10 pt-3 mt-3">
                <Clock className="text-gold mt-0.5 flex-shrink-0" size={16} />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">Business Hours</span>
                  <span>Monday – Sunday</span>
                  <span className="font-semibold text-gold">8:00 AM – 10:00 PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gold/15 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>
            &copy; 2026 Bhavika Catering. All Rights Reserved. <span className="mx-2">|</span> Designed with Tradition & Hospitality.
          </p>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-gray-700">Terms of Service</Link>
            <Link to="/contact" className="hover:text-gray-700">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
