import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const bioEN = `SIMBI Lys Anaïs Christa is a full-stack developer and creative technologist studying Software Programming & Embedded Systems at Rwanda Coding Academy, Rwanda. She bridges the gap between engineering precision and design intuition — equally comfortable architecting backend systems and crafting pixel-perfect user interfaces. With a deepening focus on Artificial Intelligence and Embedded Systems, and fluency in both English and French, she represents a new generation of African tech talent building at the frontier of what is possible.`;

const bioFR = `SIMBI Lys Anaïs Christa est une développeuse full-stack et technologue créative, étudiante en Programmation Logicielle et Systèmes Embarqués à la Rwanda Coding Academy, au Rwanda. Elle fait le pont entre la précision de l'ingénierie et l'intuition du design — aussi à l'aise dans la conception de systèmes backend que dans la création d'interfaces utilisateur pixel-perfect. Avec un intérêt croissant pour l'Intelligence Artificielle et les Systèmes Embarqués, et maîtrisant l'anglais et le français, elle représente une nouvelle génération de talents tech africains qui construisent à la frontière du possible.`;

const stats = [
  { value: '3', label: 'Languages Spoken' },
  { value: '10+', label: 'Technologies' },
  { value: '∞', label: 'Curiosity' },
];

export default function About() {
  const [lang, setLang] = useState('EN');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-title">About</div>
          
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '80px', alignItems: 'start' }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              aspectRatio: '1',
              border: '1px solid var(--gibraltar)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 0 40px var(--gibraltar-glow)',
              background: 'var(--bg-card)'
            }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '48px', color: 'var(--silver)', fontWeight: 400, letterSpacing: '0.1em' }}>SL</span>
              <div style={{ position: 'absolute', top: '-8px', left: '-8px', width: '24px', height: '24px', borderTop: '1px solid var(--gibraltar-light)', borderLeft: '1px solid var(--gibraltar-light)' }} />
              <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '24px', height: '24px', borderBottom: '1px solid var(--gibraltar-light)', borderRight: '1px solid var(--gibraltar-light)' }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
              {['EN', 'FR'].map(l => (
                <button key={l} onClick={() => setLang(l)} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
                  padding: '4px 12px', border: '1px solid',
                  borderColor: lang === l ? 'var(--gibraltar-light)' : 'var(--silver-dim)',
                  color: lang === l ? 'var(--white)' : 'var(--silver-muted)',
                  background: lang === l ? 'var(--gibraltar)' : 'transparent',
                  transition: 'all 0.2s'
                }}>
                  [ {l} ]
                </button>
              ))}
            </div>

            <p style={{ color: 'var(--silver)', lineHeight: 1.9, fontSize: '13px', marginBottom: '48px', textAlign: 'justify' }}>
              {lang === 'EN' ? bioEN : bioFR}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {stats.map(({ value, label }) => (
                <div key={label} style={{ borderLeft: '1px solid var(--gibraltar)', paddingLeft: '16px' }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', color: 'var(--white)', fontWeight: 500 }}>{value}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--silver-muted)', letterSpacing: '0.08em', marginTop: '4px' }}>{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div:last-child { grid-template-columns: 1fr !important; gap: 40px !important; }
          #about .container > div:last-child > div:first-child { max-width: 200px; }
        }
      `}</style>
    </section>
  );
}
