import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Film, Monitor, Palette, Play, X } from 'lucide-react';

// Helper to extract YouTube video ID and get thumbnail
const getYouTubeThumbnail = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/.*v=|youtube\.com\/embed\/)([^&?\s]+)/);
  const videoId = match ? match[1] : null;
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
};

// Helper to get thumbnail for LinkedIn posts
const getLinkedInThumbnail = (_url: string, index: number) => {
  const matteImages = [
    'https://sankeerthportfolio.carrd.co/assets/images/gallery02/e1228cdd.jpg?v=9419a584',
    'https://sankeerthportfolio.carrd.co/assets/images/gallery02/aa6698cb.jpg?v=9419a584',
  ];
  return matteImages[index % matteImages.length];
};

const portfolioItems = [
  {
    title: 'VFX Showreel',
    category: 'VFX',
    description: 'Cinematic visual effects compilation',
    icon: Film,
    color: 'from-violet-500/20 to-indigo-600/20',
    accentColor: 'from-violet-500 to-indigo-600',
    size: 'large',
    link: 'https://youtu.be/NjjLt6wFhmY?si=F_SOPkR-imGNYjGQ',
    embedUrl: 'https://www.youtube.com/embed/NjjLt6wFhmY?autoplay=1&rel=0',
    platform: 'YouTube',
    thumbnail: getYouTubeThumbnail('https://youtu.be/NjjLt6wFhmY?si=F_SOPkR-imGNYjGQ'),
  },
  {
    title: 'Chroma Keying Showreel',
    category: 'VFX',
    description: 'Advanced keying & compositing',
    icon: Monitor,
    color: 'from-blue-500/20 to-cyan-600/20',
    accentColor: 'from-blue-500 to-cyan-600',
    size: 'medium',
    link: 'https://www.youtube.com/watch?v=9KDYRHGgE_c',
    embedUrl: 'https://www.youtube.com/embed/9KDYRHGgE_c?autoplay=1&rel=0',
    platform: 'YouTube',
    thumbnail: getYouTubeThumbnail('https://www.youtube.com/watch?v=9KDYRHGgE_c'),
  },
  {
    title: 'Video Editing Showreel',
    category: 'Editing',
    description: 'Storytelling through editing',
    icon: Film,
    color: 'from-pink-500/20 to-rose-600/20',
    accentColor: 'from-pink-500 to-rose-600',
    size: 'medium',
    link: 'https://www.youtube.com/watch?v=tBH_ts86tYs',
    embedUrl: 'https://www.youtube.com/embed/tBH_ts86tYs?autoplay=1&rel=0',
    platform: 'YouTube',
    thumbnail: getYouTubeThumbnail('https://www.youtube.com/watch?v=tBH_ts86tYs'),
  },
  {
    title: 'iPhone 16 Advertisement',
    category: 'Motion Graphics',
    description: '3D Motion Graphics with 3D Model',
    icon: Play,
    color: 'from-amber-500/20 to-orange-600/20',
    accentColor: 'from-amber-500 to-orange-600',
    size: 'large',
    link: 'https://youtu.be/JwUVdzgUbpI?si=9KOkIqKHkx0kGE7V',
    embedUrl: 'https://www.youtube.com/embed/JwUVdzgUbpI?autoplay=1&rel=0',
    platform: 'YouTube',
    thumbnail: getYouTubeThumbnail('https://youtu.be/JwUVdzgUbpI?si=9KOkIqKHkx0kGE7V'),
  },
  {
    title: 'App Ad Concept',
    category: 'Motion Graphics',
    description: 'Motion Graphics Demo',
    icon: Play,
    color: 'from-emerald-500/20 to-teal-600/20',
    accentColor: 'from-emerald-500 to-teal-600',
    size: 'small',
    link: 'https://www.youtube.com/watch?v=bopUiVL3Kuc',
    embedUrl: 'https://www.youtube.com/embed/bopUiVL3Kuc?autoplay=1&rel=0',
    platform: 'YouTube',
    thumbnail: getYouTubeThumbnail('https://www.youtube.com/watch?v=bopUiVL3Kuc'),
  },
  {
    title: 'After Effects Composition',
    category: 'Motion Graphics',
    description: 'AE composition showcase',
    icon: Monitor,
    color: 'from-purple-500/20 to-violet-600/20',
    accentColor: 'from-purple-500 to-violet-600',
    size: 'small',
    link: 'https://www.youtube.com/watch?v=IYnHkfExnx4',
    embedUrl: 'https://www.youtube.com/embed/IYnHkfExnx4?autoplay=1&rel=0',
    platform: 'YouTube',
    thumbnail: getYouTubeThumbnail('https://www.youtube.com/watch?v=IYnHkfExnx4'),
  },
  {
    title: "McDonald's Motion Graphics",
    category: 'Motion Graphics',
    description: 'Brand motion graphics showreel',
    icon: Play,
    color: 'from-red-500/20 to-yellow-600/20',
    accentColor: 'from-red-500 to-yellow-600',
    size: 'medium',
    link: 'https://www.youtube.com/watch?v=7-tr-hEP1X4',
    embedUrl: 'https://www.youtube.com/embed/7-tr-hEP1X4?autoplay=1&rel=0',
    platform: 'YouTube',
    thumbnail: getYouTubeThumbnail('https://www.youtube.com/watch?v=7-tr-hEP1X4'),
  },
  {
    title: 'Matte Painting I',
    category: 'Artwork',
    description: 'Digital matte painting artwork',
    icon: Palette,
    color: 'from-indigo-500/20 to-blue-600/20',
    accentColor: 'from-indigo-500 to-blue-600',
    size: 'small',
    link: 'https://www.linkedin.com/posts/kalva-sankeerth-4a712b339_mattepainting-cinematicart-vfx-activity-7389247273660227584-88ab?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFTqCv8BZ2asUHAbxfJD2fbwOona1ym133Q',
    embedUrl: '',
    platform: 'LinkedIn',
    thumbnail: getLinkedInThumbnail('', 0),
  },
  {
    title: 'Matte Painting II',
    category: 'Artwork',
    description: 'Digital matte painting artwork',
    icon: Palette,
    color: 'from-sky-500/20 to-indigo-600/20',
    accentColor: 'from-sky-500 to-indigo-600',
    size: 'small',
    link: 'https://www.linkedin.com/posts/kalva-sankeerth-4a712b339_mattepainting-digitalart-vfxartist-activity-7389247037890002944-rk-N?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFTqCv8BZ2asUHAbxfJD2fbwOona1ym133Q',
    embedUrl: '',
    platform: 'LinkedIn',
    thumbnail: getLinkedInThumbnail('', 1),
  },
];

const categories = ['All', 'VFX', 'Editing', 'Motion Graphics', 'Artwork'];

const sizeClasses: Record<string, string> = {
  large: 'sm:col-span-2 sm:row-span-2',
  medium: 'sm:col-span-1 sm:row-span-1',
  small: 'sm:col-span-1 sm:row-span-1',
};

type PortfolioItem = (typeof portfolioItems)[number];

function TiltCard({ item, index }: { item: PortfolioItem; index: number }) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const glareX = useTransform(smoothX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      aria-label={`Preview ${item.title}`}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={() => {
        if (item.platform === 'LinkedIn') {
          const link = document.createElement('a');
          link.href = item.link;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          // Dispatch custom event to parent
          window.dispatchEvent(new CustomEvent('open-portfolio', { detail: item }));
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative glass-card flex flex-col overflow-hidden text-left ${sizeClasses[item.size]}`}
    >
      {/* Dynamic 3D Glare */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          transform: 'translateZ(1px)',
        }}
      />

      {/* Thumbnail Background */}
      <div className="absolute inset-0 z-0">
        {item.thumbnail ? (
          <>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-50`} />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-5 justify-between" style={{ transform: 'translateZ(40px)' }}>
        <div className="flex items-start justify-end">
          {item.platform === 'YouTube' && (
            <motion.div
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20"
              animate={{ scale: 1.1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Play className="w-4 h-4 text-white fill-white" />
            </motion.div>
          )}
        </div>

        <div className="mt-auto">
          <span className="text-[10px] tracking-[0.15em] uppercase text-white/50 mb-1.5 block font-medium">
            {item.category}
          </span>
          <h3 className="text-white font-semibold text-lg leading-tight transition-colors line-clamp-2">
            {item.title}
          </h3>
          <p className="text-white/50 text-xs mt-1.5 line-clamp-2 transition-colors">
            {item.description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Listen for custom open event from cards
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioItem>;
      setSelectedItem(customEvent.detail);
    };
    window.addEventListener('open-portfolio', handler);
    return () => window.removeEventListener('open-portfolio', handler);
  }, []);

  const filteredItems = activeCategory === 'All' ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="relative z-10 py-16 px-4 sm:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">Portfolio</h2>
          <p className="text-white/40">Showcasing my best work in VFX, editing, and motion graphics</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'text-white/40 hover:text-white/70 border border-transparent hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[200px]" layout style={{ perspective: '1000px' }}>
          {filteredItems.map((item, i) => (
            <TiltCard key={item.title} item={item} index={i} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#05050b] shadow-2xl shadow-black/70"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/35">{selectedItem.platform}</p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{selectedItem.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/25 hover:text-white"
                  aria-label="Close preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {selectedItem.platform === 'LinkedIn' ? (
                <div className="aspect-video bg-gradient-to-br from-[#0077B5]/20 to-[#0a0a0a] flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-[#0077B5] flex items-center justify-center mb-6 shadow-lg shadow-[#0077B5]/25">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">View on LinkedIn</h4>
                  <p className="text-white/50 text-sm max-w-md mb-6">
                    This matte painting artwork is hosted on LinkedIn. Click below to view the full post.
                  </p>
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0077B5] px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
                  >
                    Open on LinkedIn
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ) : (
                <div className="aspect-video bg-black">
                  <iframe
                    key={selectedItem.embedUrl}
                    src={selectedItem.embedUrl}
                    title={selectedItem.title}
                    className="h-full w-full"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-4">
                <p className="text-sm text-white/40">
                  {selectedItem.platform === 'LinkedIn'
                    ? 'LinkedIn posts open externally due to embedding restrictions.'
                    : 'Preview opens inside the portfolio to avoid blocked external popups.'}
                </p>
                <a
                  href={selectedItem.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
                >
                  Open original
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
