export default function Footer() {
  return (
    <footer className="relative z-10 py-8 px-4 sm:py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600" />
          <span className="text-white/50 text-sm">
            Sankeerth <span className="text-white/20">·</span>{' '}
            <span className="text-white/30">VFX & Video Editor</span>
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <a href="#" className="text-white/20 hover:text-white/50 text-sm transition-colors">
            LinkedIn
          </a>
          <a href="#" className="text-white/20 hover:text-white/50 text-sm transition-colors">
            YouTube
          </a>
          <a href="#" className="text-white/20 hover:text-white/50 text-sm transition-colors">
            Instagram
          </a>
        </div>

        <p className="text-white/15 text-xs">
          &copy; {new Date().getFullYear()} Sankeerth. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
