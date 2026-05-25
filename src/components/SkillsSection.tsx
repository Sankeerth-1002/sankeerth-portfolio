import { motion } from 'framer-motion';

const software = [
  { name: 'After Effects', badge: 'Ae', meta: 'Motion / Compositing', color: '#a78bfa', bg: 'rgba(88,28,135,0.32)' },
  { name: 'Premiere Pro', badge: 'Pr', meta: 'Editing Timeline', color: '#f0abfc', bg: 'rgba(112,26,117,0.28)' },
  { name: 'Nuke', badge: 'N', meta: 'Node Compositing', color: '#facc15', bg: 'rgba(113,63,18,0.28)' },
  { name: 'DaVinci Resolve', badge: 'DR', meta: 'Color / Finishing', color: '#38bdf8', bg: 'rgba(8,47,73,0.32)' },
  { name: 'Photoshop', badge: 'Ps', meta: 'Matte Painting', color: '#60a5fa', bg: 'rgba(30,64,175,0.26)' },
  { name: 'Figma', badge: 'Fi', meta: 'UI / Layout', color: '#c084fc', bg: 'rgba(109,40,217,0.24)' },
];

const expertise = [
  { name: 'Video Editing', value: 93, bar: 'from-emerald-400 to-teal-500' },
  { name: 'VFX Compositing', value: 90, bar: 'from-blue-400 to-cyan-500' },
  { name: 'Chroma Keying', value: 91, bar: 'from-green-400 to-emerald-500' },
  { name: 'Motion Graphics', value: 87, bar: 'from-orange-400 to-red-500' },
  { name: 'Matte Painting', value: 82, bar: 'from-indigo-400 to-violet-500' },
  { name: 'AI Thumbnail Workflow', value: 88, bar: 'from-fuchsia-400 to-pink-500' },
];

export default function SkillsSection() {
  return (
    <section className="relative z-10 px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-10 text-center sm:mb-14"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-violet-300/65">
            Production Toolchain
          </p>
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Skills <span className="gradient-text">& Tools</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/45 sm:text-base">
            A focused post-production stack for VFX compositing, editing, motion design, matte painting, and AI-assisted content creation.
          </p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/25 p-5 backdrop-blur-2xl sm:p-7 lg:p-8"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-violet-500/14 blur-[110px]" />
          <div className="pointer-events-none absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[120px]" />

          <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
            <div>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">Primary Software</h3>
                  <p className="mt-1 text-sm text-white/38">Main tools used in production workflow</p>
                </div>
                <span className="hidden rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/35 sm:inline-flex">
                  06 tools
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {software.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    className="group relative rounded-2xl border border-white/8 bg-white/[0.035] p-4 transition-colors duration-300 hover:border-white/16 hover:bg-white/[0.06]"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div
                      className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 sm:h-16 sm:w-16"
                      style={{ background: tool.bg, boxShadow: `0 0 28px ${tool.color}2d` }}
                    >
                      <span
                        className="text-xl font-black tracking-tight sm:text-2xl"
                        style={{ color: tool.color, textShadow: `0 0 18px ${tool.color}80` }}
                      >
                        {tool.badge}
                      </span>
                    </div>
                    <h4 className="truncate text-sm font-semibold text-white sm:text-base">{tool.name}</h4>
                    <p className="mt-1 truncate text-xs text-white/35">{tool.meta}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-5 sm:p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white">Core Expertise</h3>
                <p className="mt-1 text-sm text-white/38">Production capability and creative focus</p>
              </div>

              <div className="space-y-5">
                {expertise.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.16 + index * 0.06 }}
                  >
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="truncate text-sm font-medium text-white/82 sm:text-base">{item.name}</span>
                      <span className="font-mono text-xs font-semibold text-white/45">{item.value}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/7">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${item.bar}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.15, delay: 0.35 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}