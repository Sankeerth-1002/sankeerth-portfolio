import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';

const socials = [
  {
    label: 'Email',
    icon: Mail,
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=sankeerthkalva1@gmail.com',
    color: 'from-violet-500 to-indigo-600',
    isSvg: false,
  },
  {
    label: 'LinkedIn',
    icon: null,
    href: 'https://www.linkedin.com/in/kalva-sankeerth-4a712b339/',
    color: 'from-blue-500 to-blue-700',
    isSvg: true,
    svgPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'YouTube',
    icon: null,
    href: 'https://www.youtube.com/@Mr.Smart2448',
    color: 'from-red-500 to-red-700',
    isSvg: true,
    svgPath: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    label: 'Instagram',
    icon: null,
    href: 'https://www.instagram.com/_mr_sankeerth_10?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    color: 'from-pink-500 to-purple-600',
    isSvg: true,
    svgPath: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  },
];

export default function ContactSection() {
  return (
    <section className="relative z-10 py-16 px-4 sm:py-20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Get In Touch</h2>
          <p className="text-white/40">Let's collaborate on something amazing</p>
        </motion.div>

        <motion.div
          className="glass-card p-6 md:p-8 relative overflow-hidden text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full blur-[120px] opacity-8 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.4), transparent)' }}
          />

          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl text-white font-semibold mb-5 sm:mb-6">Connect with me</h3>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {socials.map((social, i) => (
                <motion.button
                  key={social.label}
                  type="button"
                  onClick={() => {
                    // Workaround to bypass restrictive iframe/sandbox environments blocking external popups
                    const link = document.createElement('a');
                    link.href = social.href;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="group flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl glass border border-white/5 hover:border-white/15 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br ${social.color} flex items-center justify-center shadow-lg`}>
                    {social.isSvg ? (
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                        <path d={social.svgPath!} />
                      </svg>
                    ) : social.icon ? (
                      <social.icon className="w-4 h-4 text-white" />
                    ) : null}
                  </div>
                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                    {social.label}
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white/60 transition-colors" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
