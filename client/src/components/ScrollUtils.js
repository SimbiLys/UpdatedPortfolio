import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="scroll-progress" style={{ width: `${progress}%` }} />
  );
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed', bottom: '32px', right: '32px',
            width: '40px', height: '40px',
            border: '1px solid var(--gibraltar)',
            background: 'var(--bg-card)',
            color: 'var(--silver)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', zIndex: 500,
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 16px var(--gibraltar-glow)'; e.currentTarget.style.borderColor = 'var(--gibraltar-light)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--gibraltar)'; }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
