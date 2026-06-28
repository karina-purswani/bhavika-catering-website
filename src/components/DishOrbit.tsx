import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SteamParticles from './SteamParticles';

// Import images
const centerThali = '/assets/center_thali.webp';
const dalPakwan = '/assets/dal_pakwan.webp';
const kokiDahi = '/assets/koki_dahi.webp';
const sindhiKadhi = '/assets/sindhi_kadhi.webp';
const saiBhaji = '/assets/sai_bhaji.webp';
const bheeBhaji = '/assets/bhee_bhaji.webp';
const seviyonPatata = '/assets/seviyon_patata.webp';

interface DishData {
  id: string;
  name: string;
  image: string;
  description: string;
}

const dishes: DishData[] = [
  {
    id: 'dal_pakwan',
    name: 'Dal Pakwan',
    image: dalPakwan,
    description: 'Crispy deep-fried pakwan served with spiced chana dal, sweet-sour tamarind chutney, and fresh mint chutney.',
  },
  {
    id: 'koki_dahi',
    name: 'Koki & Dahi',
    image: kokiDahi,
    description: 'Traditional thick flatbread kneaded with onions, green chilies, coriander, and ghee, roasted to perfection, served with curd.',
  },
  {
    id: 'sindhi_kadhi',
    name: 'Sindhi Kadhi Thali',
    image: sindhiKadhi,
    description: 'Tangy and spicy roasted gram flour curry loaded with okra, potatoes, drumsticks, and cluster beans, served with steamed rice.',
  },
  {
    id: 'sai_bhaji',
    name: 'Sai Bhaji Thali',
    image: saiBhaji,
    description: 'Nutritious slow-cooked mash of spinach, dill leaves, split Bengal gram, and garden-fresh vegetables, paired with bhuga chawal.',
  },
  {
    id: 'bhee_bhaji',
    name: 'Bhee Bhaji Thali',
    image: bheeBhaji,
    description: 'Lotus root (bhee) cooked in a rich, slow-simmered onion-tomato gravy infused with classic Sindhi dry spices.',
  },
  {
    id: 'seviyon_patata',
    name: 'Meethi Sewayon Thali',
    image: seviyonPatata,
    description: 'Golden roasted vermicelli sweetened with cardamom, garnished with nuts, served alongside savory, crispy fried potato chunks.',
  },
];

export const DishOrbit: React.FC = () => {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [scrollSpeedMultiplier, setScrollSpeedMultiplier] = useState(1);
  const orbitRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const lastTime = useRef<number>(0);

  // Check mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track mouse movement for subtle tilt/parallax
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2); // -1 to 1
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2); // -1 to 1
      setMouseOffset({ x: x * 10, y: y * 8 }); // Max 10px / 8px offset
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Handle scroll to slow rotation and determine active front dish
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Slow down orbit when scrolling down
      const multiplier = Math.max(0.08, 1 - scrollY / 600);
      setScrollSpeedMultiplier(multiplier);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slow orbit rotation animation loop
  useEffect(() => {
    if (isMobile) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      return;
    }

    const animate = (time: number) => {
      if (!lastTime.current) lastTime.current = time;
      const delta = time - lastTime.current;
      lastTime.current = time;

      // Rotate 8 degrees per second, scaled by scroll multiplier
      const speed = (0.08 * scrollSpeedMultiplier) * delta;
      setRotation((prev) => {
        const nextRotation = (prev + speed) % 360;
        // Determine frontmost dish (closest to 180 degrees in orbit space)
        // Orbit positions are layout relative to index. We want the one closest to camera (which is 180 deg)
        let closestIndex = 0;
        let minDiff = 360;

        dishes.forEach((_, idx) => {
          const dishAngle = (idx * (360 / dishes.length) + nextRotation) % 360;
          // Distance to 180 deg
          const diff = Math.min(
            Math.abs(dishAngle - 180),
            Math.abs(dishAngle - 180 - 360),
            Math.abs(dishAngle - 180 + 360)
          );
          if (diff < minDiff) {
            minDiff = diff;
            closestIndex = idx;
          }
        });

        setActiveIndex(closestIndex);
        return nextRotation;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [scrollSpeedMultiplier, isMobile]);

  // Mobile navigation handler
  const handleNextMobile = () => {
    setActiveIndex((prev) => (prev + 1) % dishes.length);
  };

  const handlePrevMobile = () => {
    setActiveIndex((prev) => (prev - 1 + dishes.length) % dishes.length);
  };

  // Orbit radius (responsive)
  const radius = 240;

  if (isMobile) {
    // Mobile Layout: Elegant Stacked Carousel
    return (
      <div className="flex flex-col items-center py-6 w-full max-w-sm mx-auto">
        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          {/* Main Shadow */}
          <div className="absolute bottom-4 w-44 h-6 bg-black/40 blur-lg rounded-full" />
          <SteamParticles />
          <motion.img
            key={dishes[activeIndex].id}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 100 }}
            src={dishes[activeIndex].image}
            alt={dishes[activeIndex].name}
            className="w-56 h-56 object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] z-10"
          />
          {/* Subtle Golden ring frame behind */}
          <div className="absolute w-60 h-60 border border-gold/20 rounded-full animate-pulse-slow" />
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-between w-full px-8 mb-4">
          <button
            onClick={handlePrevMobile}
            className="w-10 h-10 border border-gold/30 hover:border-gold rounded-full flex items-center justify-center text-gold bg-white hover:bg-gold/5 transition-colors shadow-xs"
          >
            &#8592;
          </button>
          <div className="flex gap-1.5">
            {dishes.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-gold w-4' : 'bg-gold/20'
                  }`}
              />
            ))}
          </div>
          <button
            onClick={handleNextMobile}
            className="w-10 h-10 border border-gold/30 hover:border-gold rounded-full flex items-center justify-center text-gold bg-white hover:bg-gold/5 transition-colors shadow-xs"
          >
            &#8594;
          </button>
        </div>

        {/* Details Card */}
        <div className="text-center px-4">
          <h3 className="text-xl font-bold font-serif text-black">{dishes[activeIndex].name}</h3>
          <p className="text-xs uppercase tracking-widest text-black/90 font-extrabold mt-0.5">Signature Sindhi Special</p>
          <p className="text-sm text-black/80 font-medium mt-2 min-h-[70px] leading-relaxed">
            {dishes[activeIndex].description}
          </p>
        </div>
      </div>
    );
  }

  // Desktop Layout: 3D Orbit
  return (
    <div className="relative w-full h-[550px] flex flex-col items-center justify-center" ref={orbitRef}>
      {/* 3D Perspective Orbit Space */}
      <div
        className="perspective-container relative w-full h-[360px] flex items-center justify-center"
        style={{
          transform: `rotateX(${-mouseOffset.y}deg) rotateY(${mouseOffset.x}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        <div className="preserve-3d relative w-full h-full flex items-center justify-center">
          {/* Tilted Path Wrapper */}
          <div
            className="absolute preserve-3d w-full h-full flex items-center justify-center"
            style={{
              transform: 'rotateX(70deg)',
            }}
          >
            {/* Orbit Circle Helper */}
            <div
              className="absolute border border-gold/15 rounded-full pointer-events-none"
              style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
              }}
            />

            {/* Orbit Rotation Wrapper */}
            <div
              className="absolute preserve-3d w-full h-full flex items-center justify-center"
              style={{
                transform: `rotateZ(${-rotation}deg)`,
              }}
            >
              {/* Orbital Dishes */}
              {dishes.map((dish, idx) => {
                const dishAngle = idx * (360 / dishes.length);
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={dish.id}
                    className="absolute preserve-3d cursor-pointer"
                    style={{
                      // Position at equal angles around circle, cancel orbital Z rotation, cancel path X tilt
                      transform: `rotateZ(${dishAngle}deg) translateY(${-radius}px) rotateZ(${-dishAngle}deg) rotateZ(${rotation}deg) rotateX(-70deg)`,
                      width: '120px',
                      height: '120px',
                    }}
                    onClick={() => {
                      // Click to rotate this dish to the front
                      // Front is at angle 180. The current position of this dish is: (dishAngle - rotation) % 360.
                      // We can target rotation to align it.
                      const targetRot = (dishAngle - 180 + 360) % 360;
                      setRotation(targetRot);
                      setActiveIndex(idx);
                    }}
                  >
                    {/* Shadow for individual dish */}
                    <div className="absolute -bottom-1 left-4 w-20 h-4 bg-black/45 blur-md rounded-full transform -skew-x-12" />

                    {/* Dish Image */}
                    <motion.div
                      animate={{
                        scale: isActive ? 1.35 : 0.95,
                        y: isActive ? -12 : 0,
                      }}
                      transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                      className={`relative w-full h-full flex items-center justify-center rounded-full hover:scale-110 transition-transform ${isActive ? 'z-20 drop-shadow-[0_12px_20px_rgba(212,175,55,0.45)]' : 'drop-shadow-[0_8px_12px_rgba(0,0,0,0.6)]'
                        }`}
                    >
                      {isActive && <SteamParticles />}
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-[105px] h-[105px] object-contain select-none"
                      />
                    </motion.div>

                    {/* Miniature overlay text */}
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white border border-gold/25 px-3 py-1 rounded text-[10px] uppercase tracking-widest text-black font-bold whitespace-nowrap z-25 shadow-md"
                      >
                        {dish.name}
                      </motion.span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Thali */}
          <div className="absolute preserve-3d z-10 flex flex-col items-center justify-center select-none pointer-events-none">
            {/* Center Thali Shadow */}
            <div className="absolute w-[220px] h-12 bg-black/65 blur-xl rounded-full translate-y-36" />
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative w-[270px] h-[270px] md:w-[320px] md:h-[320px] flex items-center justify-center drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
            >
              <img
                src={centerThali}
                alt="Center Golden Thali"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Active Details Panel below the orbit */}
      <div className="h-[100px] mt-6 flex flex-col items-center justify-center max-w-lg text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={dishes[activeIndex].id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-2xl font-bold font-serif text-black flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              {dishes[activeIndex].name}
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
            </h3>
            <p className="text-xs uppercase tracking-widest text-black/90 font-extrabold mt-0.5">
              Traditional Sindhi Special
            </p>
            <p className="text-sm text-black/80 font-medium mt-2 max-w-md leading-relaxed">
              {dishes[activeIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DishOrbit;
