import { motion } from 'framer-motion';
import { Clapperboard, Cpu, WandSparkles } from 'lucide-react';

const experiencePoints = [
  {
    label: 'Video + Content',
    text: 'Currently working on professional video editing, AI-assisted thumbnail creation, AI image generation, and digital content production for modern platforms.',
    icon: Clapperboard,
  },
  {
    label: 'AI Creative Tools',
    text: 'Experienced in using AI-powered tools for creative workflows, including thumbnail design, visual content generation, and UI/UX design using Figma make, Google AI Studio, and modern AI technologies.',
    icon: Cpu,
  },
  {
    label: 'Digital Experience',
    text: 'Focused on creating visually engaging, innovative, and user-centric digital experiences while continuously exploring emerging AI tools and creative techniques.',
    icon: WandSparkles,
  },
];

export default function CurrentFocus() {
  return (
    <section className="relative z-10 px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Liquid glass card wrapper */}
        <motion.div
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl p-[1px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.45) 0%, rgba(192,132,252,0.18) 40%, rgba(244,114,182,0.22) 80%, rgba(99,102,241,0.35) 100%)',
          }}
        >
          {/* Inner liquid glass surface */}
          <div
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden px-5 py-10 sm:px-8 sm:py-12 md:px-14 md:py-16"
            style={{
              background: 'rgba(10, 8, 22, 0.55)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
            }}
          >
            {/* Liquid blobs inside */}
            <div className="pointer-events-none absolute -top-20 -left-20 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-violet-500/20 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 sm:h-64 sm:w-64 rounded-full bg-fuchsia-500/18 blur-[90px]" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 sm:h-48 sm:w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/12 blur-[80px]" />

            {/* Scanline shimmer overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px)',
              }}
            />

            <div className="relative z-10 grid gap-8 lg:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <motion.div
                className="lg:sticky lg:top-28"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="max-w-md text-3xl sm:text-4xl font-black leading-[0.95] tracking-tight md:text-5xl">
                  <span className="text-white">Current </span>
                  <span className="gradient-text">Experience</span>
                </h2>
                <p className="mt-5 max-w-md text-sm sm:text-base leading-relaxed text-white/55 md:text-lg">
                  Creative production with modern AI workflows across video, design, content, and AI-assisted digital creation.
                </p>
                <div className="mt-7 h-px w-24 sm:w-32 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-transparent" />
              </motion.div>

              <div className="relative">
                <div className="absolute left-5 sm:left-6 top-0 hidden h-full w-px bg-gradient-to-b from-violet-400/0 via-violet-400/50 to-violet-400/0 md:block" />

                <div className="space-y-8 sm:space-y-10">
                  {experiencePoints.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="relative grid gap-4 sm:gap-5 md:grid-cols-[3.5rem_1fr] md:items-start"
                      initial={{ opacity: 0, x: 36 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.55, delay: index * 0.12 }}
                    >
                      <div className="relative z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-violet-400/25 bg-violet-500/15 backdrop-blur-md shadow-[0_0_35px_rgba(139,92,246,0.3)]">
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-violet-200" />
                      </div>

                      <div className="pb-2">
                        <div className="mb-3 flex items-center gap-3">
                          <span className="font-mono text-xs text-white/25">0{index + 1}</span>
                          <h3 className="text-lg sm:text-xl font-semibold">
                            <span className="gradient-text">{item.label}</span>
                          </h3>
                        </div>
                        <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-white/60 md:text-lg">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}