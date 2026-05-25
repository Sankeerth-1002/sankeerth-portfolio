import { useEffect, useRef, useState } from 'react';

const TRAIL_LENGTH = 12;

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailPointsRef = useRef<{ x: number; y: number }[]>([]);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    // Initialize trail with empty points
    trailPointsRef.current = Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 }));

    const onMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('glass-card') ||
        target.closest('.glass-card') !== null;
      setIsPointer(isClickable);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const animate = () => {
      // Smooth follower
      followerX += (cursorX - followerX) * 0.12;
      followerY += (cursorY - followerY) * 0.12;

      // Update trail points - each point lerps toward the previous point creating a fluid chain
      const trail = trailPointsRef.current;
      trail[0] = { x: cursorX, y: cursorY };
      for (let i = 1; i < trail.length; i++) {
        const prev = trail[i - 1];
        const curr = trail[i];
        const lerp = 0.22 - i * 0.006;
        trail[i] = {
          x: curr.x + (prev.x - curr.x) * lerp,
          y: curr.y + (prev.y - curr.y) * lerp,
        };
      }

      // Build smooth liquid SVG path using quadratic bezier between trail points
      if (pathRef.current && trail.length > 1) {
        let d = `M ${trail[0].x} ${trail[0].y}`;
        for (let i = 1; i < trail.length - 1; i++) {
          const xc = (trail[i].x + trail[i + 1].x) / 2;
          const yc = (trail[i].y + trail[i + 1].y) / 2;
          d += ` Q ${trail[i].x} ${trail[i].y}, ${xc} ${yc}`;
        }
        pathRef.current.setAttribute('d', d);
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerX}px, ${followerY}px)`;
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    const raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* SVG goo / liquid trail filter */}
      <svg
        ref={svgRef}
        className="fixed inset-0 z-[99997] pointer-events-none w-full h-full"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="liquid-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="liquid-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
            <stop offset="35%" stopColor="#a78bfa" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#c084fc" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g filter="url(#liquid-soft-glow)">
          <path
            ref={pathRef}
            stroke={isPointer ? 'rgba(244,114,182,0.5)' : 'url(#liquid-gradient)'}
            strokeWidth={isPointer ? 3.5 : 2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            style={{ transition: 'stroke 0.2s ease, stroke-width 0.2s ease' }}
          />
        </g>
      </svg>

      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{ marginLeft: '-4px', marginTop: '-4px', opacity: isVisible ? 1 : 0 }}
      >
        <div
          className={`rounded-full transition-all duration-200 shadow-[0_0_18px_rgba(168,85,247,0.75)] ${
            isPointer ? 'w-2.5 h-2.5 bg-fuchsia-300' : 'w-2 h-2 bg-white'
          }`}
        />
      </div>

      {/* Follower ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{ marginLeft: '-16px', marginTop: '-16px', opacity: isVisible ? 1 : 0 }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ${
            isPointer
              ? 'w-11 h-11 border-fuchsia-300/45 bg-fuchsia-400/5 shadow-[0_0_28px_rgba(217,70,239,0.16)]'
              : 'w-9 h-9 border-violet-300/25 bg-violet-400/5 shadow-[0_0_24px_rgba(129,140,248,0.12)]'
          }`}
        />
      </div>
    </>
  );
}
