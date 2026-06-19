import { useEffect, useState, useMemo } from 'react';
import { motion } from 'motion/react';

interface CountdownTimerProps {
  targetDate?: string; // Default to July 01, 2026
  lang?: 'en' | 'te';
}

export default function CountdownTimer({ targetDate = "2027-04-30T15:27:00", lang = 'te' }: CountdownTimerProps) {
  // Memoize weddingTime to avoid triggers on re-render
  const weddingTime = useMemo(() => new Date(targetDate).getTime(), [targetDate]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = weddingTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [weddingTime]);

  const rawUnits = [
    { labelEn: 'Days', labelTe: 'రోజులు', value: timeLeft.days },
    { labelEn: 'Hours', labelTe: 'గంటలు', value: timeLeft.hours },
    { labelEn: 'Minutes', labelTe: 'నిమిషాలు', value: timeLeft.minutes },
    { labelEn: 'Seconds', labelTe: 'సెకన్లు', value: timeLeft.seconds },
  ];

  const headerTitle = lang === 'te' ? 'శుభ ముహూర్తానికి సమయం' : 'Counting Down to Forever';

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <h3 className="font-display text-[#4A0404] text-xs font-bold tracking-[0.15em] uppercase text-center mb-5 px-3">
        {headerTitle}
      </h3>
      
      <div id="countdown-grid" className="grid grid-cols-4 gap-2 px-4 w-full max-w-sm">
        {rawUnits.map((unit, index) => {
          const displayedLabel = lang === 'te' ? unit.labelTe : unit.labelEn;
          return (
            <motion.div
              key={unit.labelEn}
              id={`countdown-item-${unit.labelEn.toLowerCase()}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center bg-white rounded-xl py-3 px-1 border border-[#D4AF37]/20 shadow-md relative group overflow-hidden"
            >
              {/* Elegant tiny line ornament on top/bottom of each slot */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500/20 via-amber-400 to-amber-500/20"></div>
              
              <span className="font-display text-2xl font-semibold text-[#8B0000] tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              
              <span className="font-sans text-[9px] text-[#b38728] font-semibold uppercase tracking-wider mt-1 text-center">
                {displayedLabel}
              </span>
              
              {/* Background design glow */}
              <div className="absolute -bottom-8 -right-8 w-12 h-12 bg-[#FCF8F2]/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
