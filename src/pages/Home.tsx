import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Projects from '../components/Projects';
import Timeline from '../components/Timeline';
import DevActivity from '../components/DevActivity';



interface HomeProps {
  startAnimation?: boolean;
}

const Home: React.FC<HomeProps> = ({ startAnimation = false }) => {
  const location = useLocation();

  // When navigated here from another page with a target section (e.g. footer
  // links clicked on /guestbook), scroll to it once the page has rendered.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    const timer = setTimeout(() => {
      if (target === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear the state so it doesn't re-fire on refresh / back navigation.
      window.history.replaceState({}, '');
    }, 400);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div className="relative overflow-x-hidden">
      <Hero startAnimation={startAnimation} />
      <About />
      <Skills />
      <Projects />
      <DevActivity />
      <Timeline />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;