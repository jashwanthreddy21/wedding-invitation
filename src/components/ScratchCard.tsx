import { useEffect, useRef, useState, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check } from 'lucide-react';

interface ScratchCardProps {
  revealText?: string;
  onScratchComplete?: () => void;
  lang?: 'en' | 'te';
}

export default function ScratchCard({ 
  revealText = "July 01, 2026", 
  onScratchComplete,
  lang = 'te'
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  useEffect(() => {
    initCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Match parent sizing
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || 320;
    canvas.height = rect.height || 160;

    // Clear and draw luxurious golden background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create gold linear gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#bf953f');
    gradient.addColorStop(0.25, '#fcf6ba');
    gradient.addColorStop(0.5, '#b38728');
    gradient.addColorStop(0.75, '#fbf5b7');
    gradient.addColorStop(1, '#aa771c');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative inner gold border
    ctx.strokeStyle = '#3D0303';
    ctx.lineWidth = 1;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    // Add gold glitter spots
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 40; i++) {
       const x = Math.random() * canvas.width;
       const y = Math.random() * canvas.height;
       const r = Math.random() * 2;
       ctx.beginPath();
       ctx.arc(x, y, r, 0, Math.PI * 2);
       ctx.fill();
    }

    // Add instructional text
    ctx.fillStyle = '#4A0404';
    ctx.font = 'bold 12px "Outfit", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
    ctx.shadowBlur = 4;
    
    const scratchTitle = lang === 'te' ? '✨ ప్రేమతో స్క్రాచ్ చేయండి 💍' : '✨ SCRATCH WITH LOVE 💍';
    ctx.fillText(scratchTitle, canvas.width / 2, canvas.height / 2 - 12);
    
    ctx.fillStyle = '#6E4712';
    ctx.font = '500 10.5px "Outfit", sans-serif';
    const scratchSub = lang === 'te' ? 'వేదికను తెలుసుకోవడానికి రుద్దండి' : 'Rub gold to reveal secret venue/date';
    ctx.fillText(scratchSub, canvas.width / 2, canvas.height / 2 + 15);
  };

  // Coordinates helper
  const getCoordinates = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    // Account for responsive scaling
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check progress periodically (debounce check)
    if (Math.random() < 0.15) {
      calculateScratchPercentage();
    }
  };

  const calculateScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentCount = 0;

      // Sample every 4th pixel for speed
      for (let i = 0; i < pixels.length; i += 16) {
        if (pixels[i + 3] === 0) {
          transparentCount++;
        }
      }

      const totalSampledPixels = pixels.length / 16;
      const percentage = (transparentCount / totalSampledPixels) * 100;

      setScratchedPercent(percentage);

      if (percentage > 45 && !isFullyRevealed) {
        revealFully();
      }
    } catch {
      // Fallback
    }
  };

  const revealFully = () => {
    setIsFullyRevealed(true);
    setScratchedPercent(100);
    if (onScratchComplete) {
      onScratchComplete();
    }
  };

  // Mouse Handlers
  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    const coords = getCoordinates(e.clientX, e.clientY);
    scratch(coords.x, coords.y);
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching || isFullyRevealed) return;
    const coords = getCoordinates(e.clientX, e.clientY);
    scratch(coords.x, coords.y);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
    calculateScratchPercentage();
  };

  // Touch Handlers for Mobile Phones
  const handleTouchStart = (e: TouchEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    if (e.touches[0]) {
      const coords = getCoordinates(e.touches[0].clientX, e.touches[0].clientY);
      scratch(coords.x, coords.y);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching || isFullyRevealed) return;
    if (e.touches[0]) {
      const coords = getCoordinates(e.touches[0].clientX, e.touches[0].clientY);
      scratch(coords.x, coords.y);
    }
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
    calculateScratchPercentage();
  };

  return (
    <div className="flex flex-col items-center justify-center my-6">
      <div 
        ref={containerRef}
        id="scratch-card-box"
        className="relative w-80 h-40 bg-gradient-to-tr from-[#FCF8F2] to-[#FFF] rounded-2xl shadow-xl border border-[#D4AF37]/30 flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Underlay (Secret Content Area) */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center p-4 bg-[radial-gradient(#eed2a4_1px,transparent_1px)] bg-[size:16px_16px] bg-[#FCF8F2]/70">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isFullyRevealed ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0.85 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex p-1 bg-amber-100 rounded-full text-[#b38728] mb-1.5 border border-amber-200">
              <Sparkles className="w-5 h-5 animate-spin-slow text-amber-600" />
            </div>
            
            <p className="font-serif-luxury uppercase text-xs tracking-widest text-[#4A0404] font-bold">
              {lang === 'te' ? '💍 మీకు సాదర ఆహ్వానం!' : "💍 You're Cordially Invited"}
            </p>
            
            <h4 className="font-display text-[#aa771c] text-base mt-1 tracking-wider font-semibold leading-tight">
              {revealText}
            </h4>

            <p className="font-serif-luxury italic text-[10px] text-stone-600 mt-1">
              {lang === 'te' ? 'విశ్వక్సేన్ రిట్రీట్ & కన్వెన్షన్, హైదరాబాద్' : 'Vishwaksen Retreat & Convention, Hyderabad'}
            </p>
          </motion.div>
        </div>

        {/* Overlay scratch canvas */}
        <AnimatePresence>
          {!isFullyRevealed && (
            <motion.canvas
              ref={canvasRef}
              id="scratch-scratch-canvas"
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
              transition={{ duration: 0.6 }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="scratch-canvas absolute inset-0 w-full h-full z-20 select-none touch-none touch-pan-y"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Progress feedback bar */}
      <div className="w-64 mt-3 flex items-center justify-between text-[11px] text-stone-500 font-sans px-2">
        <span>{lang === 'te' ? 'పూర్తి శాతము:' : 'Scratch reveal:'} {Math.min(100, Math.round(scratchedPercent))}%</span>
        {isFullyRevealed ? (
          <span className="text-emerald-600 font-semibold inline-flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> {lang === 'te' ? 'కనిపించింది!' : 'Revealed!'}
          </span>
        ) : (
          <button 
            id="reveal-btn"
            onClick={revealFully} 
            className="text-[#4A0404] font-medium underline hover:text-[#8B0000] cursor-pointer"
          >
            {lang === 'te' ? 'స్క్రాచ్ దాటవేయి' : 'Skip Scratch'}
          </button>
        )}
      </div>
    </div>
  );
}
