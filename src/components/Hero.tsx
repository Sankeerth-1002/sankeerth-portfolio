import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-white/60 tracking-wide">Open to Work</span>
        </motion.div>

        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <span className="text-white">SANK</span>
          <span className="gradient-text">EERTH</span>
        </motion.h1>

        <motion.div
          className="text-xl sm:text-2xl md:text-3xl font-light text-white/80 tracking-wide mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          VFX <span className="text-white/40">&</span> Video Editor
        </motion.div>

        <motion.p
          className="text-base sm:text-lg text-white/40 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Passionate about crafting cinematic visuals through VFX and editing.
        </motion.p>

          <motion.div
            className="mt-10 sm:mt-16 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/30">Scroll to explore</span>
          <motion.div
            className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
