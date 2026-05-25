import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Ease out progress
        const remaining = 100 - prev;
        const increment = Math.max(remaining * 0.08, 1);
        return Math.min(prev + increment, 100);
      });
    }, 40);

    setTimeout(() => setShowText(true), 300);
    setTimeout(() => onComplete(), 2200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#030303]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Background glow */}
        <div
          className="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-[120px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(129,140,248,0.6), transparent)',
          }}
        />

        {/* Cinematic bars */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[10vh] sm:h-[15vh] bg-black"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: 'top' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[10vh] sm:h-[15vh] bg-black"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: 'bottom' }}
        />

        {/* Loading content */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-6 sm:gap-8"
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Name */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter gradient-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            SANKEERTH
          </motion.h1>

          {/* Progress bar */}
          <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #818cf8, #c084fc, #f472b6)',
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-xs sm:text-sm text-white/40 tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: showText ? 1 : 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            VFX & Video Editor
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
