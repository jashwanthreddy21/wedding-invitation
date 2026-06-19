import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

interface GateScreenProps {
  onOpen: () => void;
  lang?: 'en' | 'te';
}

export default function GateScreen({ onOpen, lang = 'te' }: GateScreenProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Let the animations run then trigger parent callback
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <div id="gate-container" className="absolute inset-0 z-50 flex overflow-hidden bg-stone-900 select-none">
          {/* Left panel */}
          <motion.div
            id="gate-left"
            initial={{ x: 0 }}
            animate={isOpen ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
            className="w-1/2 h-full bg-[#3d0303] border-r border-[#D4AF37]/30 relative flex items-center justify-end overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(circle at right, #4A0404 0%, #200000 100%)',
            }}
          >
            {/* Elegant royal background patterns */}
            <div className="absolute inset-x-0 top-0 bottom-0 opacity-10 bg-[radial-gradient(#FAF0E6_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute right-0 top-12 bottom-12 w-1 border-r border-dashed border-[#D4AF37]/20"></div>

            {/* Left Monogram half */}
            <div className="mr-[-22px] z-10 text-right">
              <span className="font-display text-5xl sm:text-6xl text-[#D4AF37] opacity-95 select-none font-extrabold tracking-tighter">S</span>
            </div>
          </motion.div>

          {/* Right panel */}
          <motion.div
            id="gate-right"
            initial={{ x: 0 }}
            animate={isOpen ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
            className="w-1/2 h-full bg-[#3d0303] border-l border-[#D4AF37]/30 relative flex items-center justify-start overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(circle at left, #4A0404 0%, #200000 100%)',
            }}
          >
            <div className="absolute inset-x-0 top-0 bottom-0 opacity-10 bg-[radial-gradient(#FAF0E6_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute left-0 top-12 bottom-12 w-1 border-l border-dashed border-[#D4AF37]/20"></div>

            {/* Right Monogram half */}
            <div className="ml-[-21px] z-10 text-left">
              <span className="font-display text-5xl sm:text-6xl text-[#D4AF37] opacity-95 select-none font-extrabold tracking-tighter">P</span>
            </div>
          </motion.div>

          {/* Center glowing wax seal / medallion button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-50 pointer-events-none">
            <motion.div
              id="medallion-pulse"
              animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="pointer-events-auto flex flex-col items-center"
            >
              <button
                id="open-medallion-btn"
                onClick={handleOpen}
                className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#aa771c] via-[#fcf6ba] to-[#bf953f] hover:scale-105 transition-transform duration-300 shadow-2xl flex items-center justify-center cursor-pointer border-4 border-[#3D0303] relative group"
                aria-label="Unlock Invitation"
              >
                {/* Embedded pulsating heart */}
                <span className="absolute inset-0 rounded-full bg-white/20 animate-ping group-hover:hidden"></span>
                <div className="w-16 h-16 rounded-full bg-[#4A0404] flex items-center justify-center text-[#D4AF37] border border-[#bf953f]/30">
                  <Heart className="w-8 h-8 fill-current text-[#D4AF37] animate-pulse" />
                </div>
              </button>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mt-6 px-4 pointer-events-none select-none"
              >
                <p className="font-display text-xs tracking-[0.2em] text-[#D4AF37] uppercase drop-shadow font-bold">
                  {lang === 'te' ? 'శుభ ముహూర్త పత్రిక' : 'The Wedding Invitation'}
                </p>
                <p className="font-serif-luxury text-xs text-stone-300 mt-2">
                  {lang === 'te' ? 'తెరవడానికి సీలును నొక్కండి' : 'Tap the seal to open'}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
