import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    name: 'MindCare Connect',
    role: 'Frontend Developer',
    type: 'Team Project',
    desc: 'A mental health support platform designed to make professional guidance private, anonymous, and accessible to everyone. Powered by AI for self-checks and emotional guidance, and connected to curated mental health resources available anytime, anywhere.',
    tags: ['React', 'AI', 'Frontend', 'UI/UX'],
    category: ['Frontend', 'AI'],
    status: 'Live',
    statusColor: '#4caf82',
    github: null,
    live: 'https://epic-neural-4572.netlify.app/',
    linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7451285788325175296/',
  },
  {
    name: 'HireX',
    role: 'AI Software Engineer',
    type: 'Team Project · 5 members',
    desc: 'An intelligent recruitment platform that uses AI to shortlist and rank job applicants, reducing hiring time and bias. Built to help companies find the right talent faster through smart filtering and candidate scoring.',
    tags: ['AI', 'Python', 'Node.js', 'Machine Learning'],
    category: ['AI', 'Backend'],
    status: 'In Development',
    statusColor: 'var(--gibraltar-light)',
    github: null,
    live: null,
    linkedin: null,
  },
  {
    name: 'Piezoelectric Energy Tiles',
    role: 'Embedded Systems Engineer',
    type: 'Team Project · Rwanda',
    desc: 'An embedded systems initiative to harvest kinetic energy from human motion using piezoelectric tiles. Designed to generate sustainable electricity from high-footfall areas — a solution with real social and environmental impact for Rwanda and beyond.',
    tags: ['Embedded Systems', 'C', 'Hardware', 'IoT'],
    category: ['Embedded'],
    status: 'In Development',
    statusColor: 'var(--gibraltar-light)',
    github: null,
    live: null,
    linkedin: null,
  },
];

const filters = ['All', 'Frontend', 'Backend', 'AI', 'Embedded'];

export default function Projects() {
  const [active, setActive] = useState('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filtered = projects.filter(p => active === 'All' || p.category.includes(active));

  return (
    <section id="projects" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-title">Projects</div>

        </motion.div>

        {/* Filters */}
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

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--gibraltar)',
                  padding: '32px',
                  transition: 'all 0.3s',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '24px',
                  alignItems: 'start'
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 32px var(--gibraltar-glow)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div>
                  {/* Top row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', color: 'var(--white)', fontWeight: 500 }}>
                      {p.name}
                    </h3>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em',
                      padding: '3px 10px', border: '1px solid',
                      borderColor: p.statusColor, color: p.statusColor,
                      whiteSpace: 'nowrap'
                    }}>
                      {p.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Role & type */}
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gibraltar-light)', letterSpacing: '0.1em' }}>
                      {p.role}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--silver-dim)', letterSpacing: '0.08em' }}>
                      {p.type}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--silver-muted)', lineHeight: 1.8, marginBottom: '20px', maxWidth: '680px', textAlign: 'justify' }}>
                    {p.desc}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '10px',
                        color: 'var(--silver-muted)', border: '1px solid var(--silver-dim)',
                        padding: '2px 10px'
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end' }}>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--silver-muted)', letterSpacing: '0.1em', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
                      onMouseEnter={e => e.target.style.color = 'var(--white)'}
                      onMouseLeave={e => e.target.style.color = 'var(--silver-muted)'}
                    >
                      [ Live ↗ ]
                    </a>
                  )}
                  {p.linkedin && (
                    <a href={p.linkedin} target="_blank" rel="noreferrer"
                      style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--silver-muted)', letterSpacing: '0.1em', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
                      onMouseEnter={e => e.target.style.color = 'var(--white)'}
                      onMouseLeave={e => e.target.style.color = 'var(--silver-muted)'}
                    >
                      [ Post ↗ ]
                    </a>
                  )}

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>


      </div>

      <style>{`
        @media (max-width: 768px) {
          #projects .container > div:last-child > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}