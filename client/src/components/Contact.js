import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const CVIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/simbi-lys-anais-christa-3939a3401/', Icon: LinkedInIcon },
  { label: 'GitHub', href: 'https://github.com/SimbiLys', Icon: GitHubIcon },
  { label: 'Email', href: 'mailto:simbilys2.0@gmail.com', Icon: EmailIcon },
  { label: 'CV', href: '/assets/cv.pdf', Icon: CVIcon },
];

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      <section id="contact" ref={ref} style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        padding: '80px 24px',
        textAlign: 'center'
      }}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ marginBottom: '48px' }}
        >
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(52px, 10vw, 140px)',
            fontWeight: 500,
            color: 'var(--silver)',
            letterSpacing: '0.06em',
            lineHeight: 1,
            fontStyle: 'normal',
          }}>
            SIMBI LYS
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 7vw, 96px)',
            fontWeight: 500,
            letterSpacing: '0.1em',
            lineHeight: 1,
            fontStyle: 'normal',
            marginTop: '8px',
            WebkitTextStroke: '1px var(--silver)',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
          }}>
            ANAÏS CHRISTA
          </div>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: '120px' } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            height: '1px',
            background: 'var(--gibraltar)',
            marginBottom: '48px'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            marginBottom: '80px'
          }}
        >
          {socials.map(({ label, href, Icon }) => (
            <a

              key={label}
              href={href}
              target={href.startsWith('mailto') || href.startsWith('/') ? undefined : '_blank'}
              rel="noreferrer"
              title={label}
              style={{
                width: '48px', height: '48px',
                border: '1px solid var(--gibraltar)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--silver-muted)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--gibraltar-light)';
                e.currentTarget.style.color = 'var(--white)';
                e.currentTarget.style.boxShadow = '0 0 20px var(--gibraltar-glow)';
                e.currentTarget.style.background = 'var(--gibraltar)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--gibraltar)';
                e.currentTarget.style.color = 'var(--silver-muted)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <Icon />
            </a>
          ))}
        </motion.div>

      </section >

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