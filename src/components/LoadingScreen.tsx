import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const logo = '/assets/logo.png';

  useEffect(() => {
    // Keep splash screen visible for 2 seconds, then trigger fade out
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.6, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream"
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            repeat: Infinity, 
            duration: 3, 
            ease: "linear" 
          }}
          className="absolute w-40 h-40 rounded-full border-t-2 border-b-2 border-gold/40 border-l-2 border-r-0"
        ></motion.div>

        {/* Pulsing Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.95, 1.05, 0.95],
            opacity: 1
          }}
          transition={{
            scale: {
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut"
            },
            opacity: {
              duration: 0.6
            }
          }}
          className="w-40 h-40 flex items-center justify-center relative z-10"
        >
          <img 
            src={logo} 
            alt="Bhavika Catering Logo" 
            className="w-32 h-32 object-contain"
          />
        </motion.div>

        {/* Text presentation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8"
        >
          <h2 className="text-3xl font-serif font-bold text-dark tracking-wide">
            Bhavika Catering
          </h2>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-[2px] bg-gold mx-auto my-3"
          />
          
          <p className="text-text-muted font-sans text-xs uppercase tracking-widest">
            Traditional Sindhi Hospitality
          </p>
        </motion.div>

        {/* Animated Loading Dots */}
        <div className="flex gap-1.5 mt-6">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{ 
                y: [0, -6, 0] 
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
                delay: index * 0.15,
                ease: "easeInOut"
              }}
              className="w-2 h-2 rounded-full bg-gold/75"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
