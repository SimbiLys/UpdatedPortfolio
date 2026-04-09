import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    name: 'NeuroUI Kit',
    desc: 'A React component library designed with accessibility and visual precision in mind. Built for developers who care about the details.',
    tags: ['React', 'CSS3', 'Figma', 'UI/UX'],
    category: ['Frontend', 'Design'],
    github: '#', live: '#'
  },
  {
    name: 'EchoAPI',
    desc: 'A RESTful API service built with Node.js and Express, featuring JWT authentication, rate limiting, and MongoDB integration.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JavaScript'],
    category: ['Backend'],
    github: '#', live: '#'
  },
  {
    name: 'PulseAI',
    desc: 'An early-stage AI-powered tool exploring natural language interfaces for embedded system monitoring and diagnostics.',
    tags: ['Python', 'AI', 'Embedded Systems', 'C'],
    category: ['AI'],
    github: '#', live: '#'
  }
];

const filters = ['All', 'Frontend', 'Backend', 'Design', 'AI'];

export default function Projects() {
  const [active, setActive] = useState('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = projects.filter(p => active === 'All' || p.category.includes(active));

  return (
    <section id="projects" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="section-title">Projects</div>
          <div className="section-sub">&gt; ls ./my-work</div>
        </motion.div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)} style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.08em',
              padding: '6px 18px', border: '1px solid',
              borderColor: active === f ? 'var(--gibraltar-light)' : 'var(--silver-dim)',
              color: active === f ? 'var(--white)' : 'var(--silver-muted)',
              background: active === f ? 'var(--gibraltar)' : 'transparent',
              transition: 'all 0.2s'
            }}>
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: 'var(--bg-card)', border: '1px solid var(--gibraltar)',
                  padding: '28px', transition: 'all 0.3s'
                }}
                whileHover={{ y: -6, boxShadow: '0 0 32px var(--gibraltar-glow)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', color: 'var(--white)', fontWeight: 500 }}>{p.name}</h3>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.1em',
                    padding: '3px 8px', border: '1px solid var(--gibraltar-light)',
                    color: 'var(--gibraltar-light)', whiteSpace: 'nowrap'
                  }}>
                    IN DEV
                  </span>
                </div>

                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--silver-muted)', lineHeight: 1.7, marginBottom: '20px' }}>{p.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--silver-muted)', border: '1px solid var(--silver-dim)', padding: '2px 8px' }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  {[{ label: 'GitHub', href: p.github }, { label: 'Live', href: p.live }].map(({ label, href }) => (
                    <a key={label} href={href}
                      title="Coming Soon"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--silver-muted)', letterSpacing: '0.08em', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--white)'}
                      onMouseLeave={e => e.target.style.color = 'var(--silver-muted)'}
                    >
                      [ {label} ↗ ]
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--silver-muted)', fontStyle: 'italic', marginTop: '40px', opacity: 0.7 }}>
          &gt; More projects are currently in development. This section will be updated soon.
        </p>
      </div>
    </section>
  );
}
