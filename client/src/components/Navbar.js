import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const links = ['About', 'Skills', 'Journey', 'Projects', 'Kind Words', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase().replace(' ', '-'));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: '20px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(10,14,19,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(19,57,81,0.3)' : 'none',
          transition: 'all 0.4s ease'
        }}
      >
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', color: 'var(--white)', letterSpacing: '0.05em', fontWeight: 500 }}>
          SL
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="nav-desktop">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--silver-muted)', letterSpacing: '0.08em', transition: 'color 0.2s', padding: '4px 0', position: 'relative' }}
              onMouseEnter={e => e.target.style.color = 'var(--white)'}
              onMouseLeave={e => e.target.style.color = 'var(--silver-muted)'}
            >
              {l}
            </button>
          ))}
          <button onClick={toggle} title="Toggle theme"
            style={{ color: 'var(--silver-muted)', fontSize: '16px', transition: 'color 0.2s', lineHeight: 1 }}
            onMouseEnter={e => e.target.style.color = 'var(--white)'}
            onMouseLeave={e => e.target.style.color = 'var(--silver-muted)'}
          >
            {theme === 'dark' ? '○' : '●'}
          </button>
        </div>

        <button className="nav-mobile-btn" onClick={() => setOpen(!open)}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }}>
          <span style={{ width: '20px', height: '1px', background: 'var(--silver)', display: 'block', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span style={{ width: '20px', height: '1px', background: 'var(--silver)', display: 'block', opacity: open ? 0 : 1 }} />
          <span style={{ width: '20px', height: '1px', background: 'var(--silver)', display: 'block', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(10,14,19,0.98)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '32px'
            }}
          >
            {links.map((l, i) => (
              <motion.button key={l}
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(l)}
                style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', color: 'var(--white)', fontWeight: 400 }}
              >
                {l}
              </motion.button>
            ))}
            <button onClick={toggle} style={{ color: 'var(--silver-muted)', fontFamily: 'var(--font-mono)', fontSize: '12px', marginTop: '16px' }}>
              {theme === 'dark' ? '[ light mode ]' : '[ dark mode ]'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
