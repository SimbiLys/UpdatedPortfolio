import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" style={{
      position: 'relative', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', padding: 0,
      background: 'var(--bg-primary)'
    }}>

      {/* SVG filters for mercury effect */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="mercury" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="saturate"
              values="0"
              in="noise"
              result="grayNoise"
            />
            <feBlend
              in="SourceGraphic"
              in2="grayNoise"
              mode="overlay"
              result="blended"
            />
            <feComposite
              in="blended"
              in2="SourceGraphic"
              operator="in"
            />
          </filter>

          <filter id="mercuryGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.8  0 1 0 0 0.8  0 0 1 0 0.85  0 0 0 1 0"
              in="blur"
              result="coloredBlur"
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Noise texture overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
        opacity: 0.4,
        pointerEvents: 'none'
      }} />

      {/* Signature frame */}
      <div style={{
        position: 'absolute', zIndex: 1,
        top: '20px', left: '20px', right: '20px', bottom: '20px',
        pointerEvents: 'none'

      }}>
        {/* Full border */}
        <div style={{
          position: 'absolute', inset: 0,
          border: '1px solid rgba(19,57,81,0.5)',
        }} />
        {/* Corner notches — top left */}
        <div style={{ position: 'absolute', top: -4, left: -4, width: 16, height: 16, background: 'var(--bg-primary)' }} />
        <div style={{ position: 'absolute', top: -1, left: 12, width: 20, height: 1, background: 'var(--gibraltar-light)' }} />
        <div style={{ position: 'absolute', top: 12, left: -1, width: 1, height: 20, background: 'var(--gibraltar-light)' }} />
        {/* Corner notches — top right */}
        <div style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, background: 'var(--bg-primary)' }} />
        <div style={{ position: 'absolute', top: -1, right: 12, width: 20, height: 1, background: 'var(--gibraltar-light)' }} />
        <div style={{ position: 'absolute', top: 12, right: -1, width: 1, height: 20, background: 'var(--gibraltar-light)' }} />
        {/* Corner notches — bottom left */}
        <div style={{ position: 'absolute', bottom: -4, left: -4, width: 16, height: 16, background: 'var(--bg-primary)' }} />
        <div style={{ position: 'absolute', bottom: -1, left: 12, width: 20, height: 1, background: 'var(--gibraltar-light)' }} />
        <div style={{ position: 'absolute', bottom: 12, left: -1, width: 1, height: 20, background: 'var(--gibraltar-light)' }} />
        {/* Corner notches — bottom right */}
        <div style={{ position: 'absolute', bottom: -4, right: -4, width: 16, height: 16, background: 'var(--bg-primary)' }} />
        <div style={{ position: 'absolute', bottom: -1, right: 12, width: 20, height: 1, background: 'var(--gibraltar-light)' }} />
        <div style={{ position: 'absolute', bottom: 12, right: -1, width: 1, height: 20, background: 'var(--gibraltar-light)' }} />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&display=swap');

        @keyframes mercuryShimmer {
          0% { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes mercuryShimmer2 {
          0% { background-position: 300% center; }
          100% { background-position: -300% center; }
        }
        @keyframes floatName {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulseFrame {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .mercury-1 {
          font-family: 'Unbounded', sans-serif;
          font-weight: 900;
          font-size: clamp(38px, 7.5vw, 100px);
          letter-spacing: 0.08em;
          line-height: 1;
          background: linear-gradient(
            115deg,
            #2d3748 0%,
            #4a5568 8%,
            #718096 15%,
            #a0aec0 22%,
            #e2e8f0 28%,
            #ffffff 33%,
            #f7fafc 38%,
            #CFD2D3 44%,
            #e2e8f0 50%,
            #ffffff 55%,
            #CFD2D3 62%,
            #a0aec0 70%,
            #718096 78%,
            #e2e8f0 85%,
            #ffffff 92%,
            #CFD2D3 100%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: mercuryShimmer 6s linear infinite;
          filter: drop-shadow(0 0 20px rgba(207,210,211,0.2)) drop-shadow(0 2px 4px rgba(0,0,0,0.5));
        }

        .mercury-2 {
          font-family: 'Unbounded', sans-serif;
          font-weight: 700;
          font-size: clamp(24px, 5vw, 68px);
          letter-spacing: 0.14em;
          line-height: 1;
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(207,210,211,0.15) 10%,
            rgba(160,174,192,0.4) 20%,
            rgba(226,232,240,0.7) 30%,
            rgba(255,255,255,0.85) 38%,
            rgba(207,210,211,0.9) 45%,
            rgba(160,174,192,0.6) 55%,
            rgba(255,255,255,0.8) 65%,
            rgba(207,210,211,0.5) 75%,
            rgba(160,174,192,0.3) 85%,
            transparent 100%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: mercuryShimmer2 8s linear infinite;
          -webkit-text-stroke: 1px rgba(207,210,211,0.4);
          filter: drop-shadow(0 0 12px rgba(207,210,211,0.1));
        }

        .name-float {
          animation: floatName 7s ease-in-out infinite;
        }

        .frame-border {
          animation: pulseFrame 4s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .mercury-1 { font-size: clamp(26px, 9vw, 52px) !important; letter-spacing: 0.05em !important; }
          .mercury-2 { font-size: clamp(18px, 6vw, 36px) !important; letter-spacing: 0.08em !important; }
        }
      `}</style>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 32px', width: '100%', marginTop: '100px' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Name block */}
          <div className="name-float" style={{ marginBottom: '0' }}>
            <div className="mercury-1">SIMBI LYS</div>
            <div style={{ height: '10px' }} />
            <div className="mercury-2">ANAÏS CHRISTA</div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ duration: 1, delay: 2.8, ease: 'easeOut' }}
            style={{
              height: '1px',
              background: 'linear-gradient(to right, transparent, var(--gibraltar-light), transparent)',
              margin: '52px auto 40px',
            }}
          />

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(9px, 1.1vw, 11px)',
              color: 'var(--gibraltar-light)',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              marginBottom: '52px'
            }}
          >
            <TypeAnimation
              sequence={[
                'Full-Stack Developer', 2400,
                'UI/UX Designer', 2400,
                'Embedded Systems Student', 2400,
                'AI Enthusiast', 2400,
                'Creative Technologist', 2400,
              ]}
              repeat={Infinity}
              speed={60}
            />
          </motion.div>

          {/* Single CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.4 }}
          >
            <button
              onClick={() => scrollTo('projects')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--silver-muted)',
                border: '1px solid rgba(19,57,81,0.5)',
                background: 'transparent',
                padding: '13px 40px',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--white)';
                e.currentTarget.style.borderColor = 'var(--gibraltar-light)';
                e.currentTarget.style.boxShadow = '0 0 24px var(--gibraltar-glow)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--silver-muted)';
                e.currentTarget.style.borderColor = 'rgba(19,57,81,0.5)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              View My Work
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8, duration: 1 }}
        style={{
          position: 'absolute', bottom: '44px',
          left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: '48px', alignItems: 'center'
        }}
      >
        {[
          { label: 'GitHub', href: 'https://github.com/SimbiLys' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/simbi-lys-anais-christa-3939a3401/' },
          { label: 'Email', href: 'mailto:simbilys2.0@gmail.com' },
        ].map(({ label, href }) => (
          <a key={label} href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              color: 'var(--silver-muted)', letterSpacing: '0.2em',
              textTransform: 'uppercase', transition: 'color 0.3s'
            }}
            onMouseEnter={e => e.target.style.color = 'var(--white)'}
            onMouseLeave={e => e.target.style.color = 'var(--silver-muted)'}
          >
            {label}
          </a>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: '92px',
          left: '50%', transform: 'translateX(-50%)',
          color: 'var(--gibraltar-light)', fontSize: '12px',
          fontFamily: 'var(--font-mono)'
        }}
      >
        ↓
      </motion.div>
    </section>
  );
}