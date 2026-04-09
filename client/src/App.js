import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Journey from './components/Journey';
import Projects from './components/Projects';
import KindWords from './components/KindWords';
import Contact from './components/Contact';
import Admin from './pages/Admin';
import { ScrollProgress, BackToTop } from './components/ScrollUtils';
import './index.css';

function Portfolio() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Journey />
      <Projects />
      <KindWords />
      <Contact />
      <BackToTop />
    </>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Cursor />
        <ScrollProgress />
        <Loader done={loaded} />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
