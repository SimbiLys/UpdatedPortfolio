import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0,
            background: '#0a0e13',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 99999,
            flexDirection: 'column', gap: '16px'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(48px, 10vw, 96px)',
              color: '#CFD2D3',
              letterSpacing: '0.1em',
              fontWeight: 500,
              lineHeight: 1
            }}
          >
            SL
          </motion.div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '48px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            style={{
              height: '1px',
              background: '#133951',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
