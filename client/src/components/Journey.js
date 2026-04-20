import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const milestones = [
  { year: '2025', title: 'Rwanda Coding Academy', desc: 'Joined RCA to pursue Software Programming & Embedded Systems — the beginning of everything.' },
  { year: '2025', title: 'First Line of Code', desc: 'Wrote my first lines of code and immediately knew this was where I belonged.' },
  { year: '2025', title: 'Design Awakening', desc: 'Discovered Figma and UI/UX design — the realization that great software must be both functional and beautiful.' },
  { year: '2025', title: 'Frontend Development', desc: 'Dove into HTML, CSS and React, building interfaces that brought my designs to life.' },
  { year: '2026', title: 'Going Backend', desc: 'Expanded into backend development with Node.js, PHP, JavaScript, and both relational and non-relational databases.' },
  { year: '2026', title: 'The AI Chapter', desc: 'Found my deepest passion in Artificial Intelligence — the technology I believe will define the next era of human progress.' },
];

function Milestone({ year, title, desc, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 40px 1fr',
        gap: '0',
        alignItems: 'center',
        marginBottom: '8px'
      }}
    >
      <div style={{ textAlign: 'right', paddingRight: '32px', ...(isLeft ? {} : { visibility: 'hidden' }) }}>
        {isLeft && <Card year={year} title={title} desc={desc} />}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          animate={inView ? { boxShadow: '0 0 16px var(--gibraltar-glow)' } : {}}
          style={{
            width: '12px', height: '12px',
            background: 'var(--gibraltar-light)',
            transform: 'rotate(45deg)',
            flexShrink: 0,
            border: '1px solid var(--silver-dim)'
          }}
        />
      </div>

      <div style={{ paddingLeft: '32px', ...(!isLeft ? {} : { visibility: 'hidden' }) }}>
        {!isLeft && <Card year={year} title={title} desc={desc} />}
      </div>
    </motion.div>
  );
}

function Card({ year, title, desc }) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--gibraltar)',
      padding: '20px 24px', position: 'relative',
      transition: 'box-shadow 0.3s'
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 24px var(--gibraltar-glow)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gibraltar-light)', letterSpacing: '0.15em', marginBottom: '8px' }}>{year}</div>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '18px', color: 'var(--white)', fontWeight: 500, marginBottom: '8px' }}>{title}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--silver-muted)', lineHeight: 1.7 }}>{desc}</div>
    </div>
  );
}

export default function Journey() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="journey" ref={ref}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="section-title">My Journey</div>

        </motion.div>

        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: '1px', background: 'var(--gibraltar)', transform: 'translateX(-50%)'
          }} />
          {milestones.map((m, i) => <Milestone key={i} {...m} index={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #journey .container > div:last-child > div {
            grid-template-columns: 0 40px 1fr !important;
          }
          #journey .container > div:last-child > div > div:first-child {
            display: none !important;
          }
          #journey .container > div:last-child > div > div:last-child {
            visibility: visible !important;
          }
        }
      `}</style>
    </section>
  );
}