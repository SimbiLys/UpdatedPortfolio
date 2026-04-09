import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let mouse = { x: w / 2, y: h / 2 };

    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3
    }));

    const onMouse = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMouse);
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);

    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(d => {
        d.x += d.vx + (mouse.x - d.x) * 0.00008;
        d.y += d.vy + (mouse.y - d.y) * 0.00008;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(19,57,81,0.6)';
        ctx.fill();
        dots.forEach(d2 => {
          const dx = d.x - d2.x, dy = d.y - d2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.strokeStyle = `rgba(19,57,81,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 0 }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: 'easeOut' }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gibraltar-light)', letterSpacing: '0.2em', marginBottom: '24px' }}>
            &gt; hello_world.exe
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(40px, 7vw, 88px)',
            fontWeight: 500,
            color: 'var(--white)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '24px'
          }}>
            SIMBI Lys<br />
            <span style={{ fontStyle: 'italic', color: 'var(--silver)' }}>Anaïs Christa</span>
          </h1>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(12px, 2vw, 15px)', color: 'var(--gibraltar-light)', marginBottom: '48px', minHeight: '24px' }}>
            <TypeAnimation
              sequence={[
                '> Full-Stack Developer', 2000,
                '> UI/UX Designer', 2000,
                '> Embedded Systems Student', 2000,
                '> AI Enthusiast', 2000,
                '> Creative Technologist', 2000,
              ]}
              repeat={Infinity}
              speed={50}
            />
          </div>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--silver-muted)', marginBottom: '48px', letterSpacing: '0.05em' }}>
            building at the intersection of design, code, and intelligence
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => scrollTo('projects')} style={{
              padding: '12px 32px', border: '1px solid var(--gibraltar-light)',
              color: 'var(--white)', fontFamily: 'var(--font-mono)', fontSize: '11px',
              letterSpacing: '0.1em', transition: 'all 0.3s',
              background: 'transparent'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gibraltar)'; e.currentTarget.style.boxShadow = '0 0 24px var(--gibraltar-glow)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              View My Work
            </button>
            <button onClick={() => scrollTo('contact')} style={{
              padding: '12px 32px', border: '1px solid var(--gibraltar)',
              color: 'var(--white)', fontFamily: 'var(--font-mono)', fontSize: '11px',
              letterSpacing: '0.1em', background: 'var(--gibraltar)', transition: 'all 0.3s'
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px var(--gibraltar-glow)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              Get In Touch
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '24px' }}
      >
        {[
          { label: 'GH', href: 'https://github.com/SimbiLys' },
          { label: 'LI', href: 'https://www.linkedin.com/in/simbi-lys-anais-christa-3939a3401/' }
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--silver-muted)', letterSpacing: '0.15em', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--white)'}
            onMouseLeave={e => e.target.style.color = 'var(--silver-muted)'}
          >
            {label}
          </a>
        ))}
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', color: 'var(--gibraltar-light)', fontSize: '18px' }}
      >
        ↓
      </motion.div>
    </section>
  );
}
