import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UtensilsCrossed, ArrowLeft, Compass } from 'lucide-react';

const NotFound: React.FC = () => {
  const logo = '/assets/logo.png';

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-cream text-dark">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl w-full text-center px-8 py-12 rounded-2xl bg-white border border-gold/15 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative corner borders */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/30 rounded-tl-2xl"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/30 rounded-tr-2xl"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/30 rounded-bl-2xl"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/30 rounded-br-2xl"></div>

        {/* Brand Logo */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-gold/10 to-copper/10 rounded-full blur-md"></div>
            <img 
              src={logo} 
              alt="Bhavika Catering" 
              className="h-20 w-auto object-contain relative z-10 filter drop-shadow-md"
            />
          </div>
        </motion.div>

        {/* Error Code & Graphic */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-8xl font-serif font-bold text-gold-gradient select-none">4</span>
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1.1, 1, 1] 
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "mirror", 
              duration: 4, 
              ease: "easeInOut" 
            }}
            className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/30"
          >
            <UtensilsCrossed size={32} />
          </motion.div>
          <span className="text-8xl font-serif font-bold text-gold-gradient select-none">4</span>
        </div>

        {/* Typography */}
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-dark mb-4">
          Recipe Not Found
        </h1>
        <p className="text-text-muted font-sans text-base max-w-md mx-auto mb-10 leading-relaxed">
          It seems the page you are looking for has simmered away or doesn't exist. Don't worry, we have plenty of other delicious options ready for you.
        </p>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/" 
            className="w-full sm:w-auto px-6 py-3 bg-dark hover:bg-gold text-cream hover:text-dark font-sans font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
            <span>Return Home</span>
          </Link>
          <Link 
            to="/menu" 
            className="w-full sm:w-auto px-6 py-3 bg-transparent hover:bg-gold/10 text-gold hover:text-copper border border-gold/50 hover:border-gold font-sans font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Compass size={18} />
            <span>Explore Our Menu</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
