import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="relative z-10 py-16 px-4 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="glass-card p-6 md:p-8 lg:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative quote */}
          <Quote className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 sm:w-20 sm:h-20 text-white/3" />

          {/* Glow orbs */}
          <div className="absolute -top-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 rounded-full blur-[100px] opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.8), transparent)' }} />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 rounded-full blur-[100px] opacity-10 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.8), transparent)' }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-10">
            {/* Photo */}
            <motion.div
              className="relative shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl p-1.5 bg-white/5">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="https://sankeerthportfolio.carrd.co/assets/images/image01.jpg"
                    alt="Sankeerth"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                className="mb-6 flex flex-col items-center md:items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">About Me</h2>
                <div className="w-12 h-[3px] bg-gradient-to-r from-violet-500 to-pink-500 rounded-full" />
              </motion.div>

              <motion.p
                className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                I'm a passionate{' '}
                <span className="text-white/90 font-medium">VFX Compositor</span> and{' '}
                <span className="text-white/90 font-medium">Video Editor</span> dedicated to
                crafting cinematic visuals that bring stories to life. Skilled in{' '}
                <span className="text-violet-400 font-medium">After Effects</span>,{' '}
                <span className="text-amber-400 font-medium">Nuke</span>,{' '}
                <span className="text-pink-400 font-medium">Premiere Pro</span>, and{' '}
                <span className="text-cyan-400 font-medium">DaVinci Resolve</span>, I blend creativity
                with technical precision to deliver seamless, visually striking results.
              </motion.p>

              <motion.p
                className="text-white/50 text-xs sm:text-sm md:text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                My focus is on storytelling through motion, color, and visual impact — whether
                for ads, films, or digital content.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
