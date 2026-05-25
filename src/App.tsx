import { useState, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import RealisticEarth from './components/RealisticEarth';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import ResumeSection from './components/ResumeSection';
import PortfolioGrid from './components/PortfolioGrid';
import AboutSection from './components/AboutSection';
import CurrentFocus from './components/CurrentFocus';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { ScrollProvider } from './context/ScrollContext';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(false);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
    if (!mountedRef.current) {
      mountedRef.current = true;
    }
  }, []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {!loading && (
        <main className="relative min-h-screen overflow-x-hidden">
          <RealisticEarth />

          <div className="relative z-10">
            <Hero />
            <ResumeSection />
            <PortfolioGrid />
            <AboutSection />
            <CurrentFocus />
            <SkillsSection />
            <ContactSection />
            <Footer />
          </div>

          <div className="noise-overlay" />
        </main>
      )}
    </>
  );
}

export default function App() {
  return (
    <ScrollProvider>
      <AppContent />
    </ScrollProvider>
  );
}
