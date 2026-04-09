import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const contacts = [
  { label: 'Email', value: 'simbilys2.0@gmail.com', href: 'mailto:simbilys2.0@gmail.com', icon: '✉' },
  { label: 'GitHub', value: 'github.com/SimbiLys', href: 'https://github.com/SimbiLys', icon: '⌥' },
  { label: 'LinkedIn', value: 'simbi-lys-anais-christa', href: 'https://www.linkedin.com/in/simbi-lys-anais-christa-3939a3401/', icon: '◈' },
];

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      <section id="contact" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <div className="section-title">Let's Connect</div>
            <div className="section-sub">&gt; ping simbi</div>
          </motion.div>

          <div style={{ maxWidth: '480px' }}>
            {contacts.map(({ label, value, href, icon }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '20px',
                  padding: '20px 0',
                  borderBottom: '1px solid var(--silver-dim)',
                  transition: 'all 0.3s', color: 'inherit'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.paddingLeft = '8px';
                  e.currentTarget.style.borderBottomColor = 'var(--gibraltar-light)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.paddingLeft = '0';
                  e.currentTarget.style.borderBottomColor = 'var(--silver-dim)';
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', color: 'var(--gibraltar-light)', width: '20px', textAlign: 'center' }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--silver-muted)', letterSpacing: '0.1em', marginBottom: '2px' }}>{label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--white)' }}>{value}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: 'var(--silver-muted)', fontSize: '12px' }}>↗</span>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{ marginTop: '40px' }}
            >
              <a
                href="/assets/cv.pdf"
                download
                style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
                  padding: '14px 32px', border: '1px solid var(--gibraltar)',
                  color: 'var(--white)', transition: 'all 0.3s', background: 'transparent'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--gibraltar)'; e.currentTarget.style.boxShadow = '0 0 24px var(--gibraltar-glow)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                [ Download CV ↓ ]
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <footer style={{
        borderTop: '1px solid var(--gibraltar)',
        padding: '24px 40px',
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--silver-muted)',
        letterSpacing: '0.05em',
        background: 'var(--bg-primary)'
      }}>
        © 2025 SIMBI Lys Anaïs Christa — Designed & Built with intention
      </footer>
    </>
  );
}
