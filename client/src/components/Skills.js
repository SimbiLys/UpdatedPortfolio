import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const groups = [
  {
    label: 'Backend',
    skills: ['Node.js', 'JavaScript', 'Python', 'PHP', 'C']
  },
  {
    label: 'Design & Creative',
    skills: ['Figma', 'Adobe Suite', 'Blender', 'Canva', 'Dribbble']
  },
  {
    label: 'Tools I Use',
    skills: ['Git', 'VS Code', 'GitHub', 'Postman']
  },
  {
    label: 'Frontend',
    skills: ['React', 'HTML5', 'CSS3']
  },
  {
    label: 'Databases',
    skills: ['MongoDB', 'MySQL']
  },
  {
    label: 'Soft Skills',
    skills: ['English & French Communication', 'Project Management', 'Creative Problem Solving', 'Team Collaboration', 'UI/UX Thinking']
  },
];

export default function Skills() {
  const [open, setOpen] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" ref={ref} style={{ background: 'var(--bg-secondary)', padding: '120px 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-title">Skills & Stack</div>
        </motion.div>

        <div style={{ marginTop: '64px' }}>
          {groups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {/* Row */}
              <div
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '24px 0',
                  borderBottom: '1px solid var(--silver-dim)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.paddingLeft = '8px'}
                onMouseLeave={e => e.currentTarget.style.paddingLeft = '0px'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--gibraltar-light)',
                    letterSpacing: '0.1em',
                    minWidth: '24px'
                  }}>
                    0{i + 1}
                  </span>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(18px, 3vw, 26px)',
                    color: open === i ? 'var(--white)' : 'var(--silver)',
                    fontWeight: 500,
                    transition: 'color 0.2s'
                  }}>
                    {group.label}
                  </span>
                </div>

                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '18px',
                    color: 'var(--gibraltar-light)',
                    lineHeight: 1
                  }}
                >
                  +
                </motion.span>
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '24px 0 32px 44px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}>
                      {group.skills.map((skill, j) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: j * 0.05 }}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            color: 'var(--silver)',
                            border: '1px solid var(--gibraltar)',
                            padding: '6px 16px',
                            letterSpacing: '0.08em',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'var(--gibraltar)';
                            e.currentTarget.style.color = 'var(--white)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--silver)';
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}