import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

const resumeItems = [
  {
    title: 'VFX Resume',
    description: 'Compositing • Nuke • After Effects',
    color: 'from-violet-500 to-indigo-600',
    icon: FileText,
    link: 'https://drive.google.com/file/d/1vWXAkyndeucSE-oS2Mba92iC91Lgkq_g/view',
  },
  {
    title: 'Video Editing Resume',
    description: 'Editing • Premiere Pro • Color Grading',
    color: 'from-pink-500 to-rose-600',
    icon: FileText,
    link: 'https://drive.google.com/file/d/1sHKlttw1mYN7v1YdGjHoEwLF5qyaoTIq/view',
  },
];

export default function ResumeSection() {
  return (
    <section id="resume" className="relative z-10 py-16 px-4 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Resume</h2>
          <p className="text-white/40">Download my professional resumes</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {resumeItems.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative glass-card p-5 sm:p-6 flex items-center gap-4 sm:gap-5 overflow-hidden glow-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient accent */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-base sm:text-lg truncate">{item.title}</h3>
                <p className="text-white/40 text-xs sm:text-sm truncate">{item.description}</p>
              </div>

              <Download className="w-5 h-5 text-white/30 group-hover:text-white/70 transition-colors flex-shrink-0" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
