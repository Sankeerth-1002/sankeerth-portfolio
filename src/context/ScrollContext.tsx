import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Lenis from 'lenis';

const ScrollContext = createContext<number>(0);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ({ scroll }) => {
      setScrollY(scroll);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <ScrollContext.Provider value={scrollY}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollPosition() {
  return useContext(ScrollContext);
}
