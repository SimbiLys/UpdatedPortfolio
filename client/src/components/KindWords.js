import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import pinImage from './pin.jpg';

const inputStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--gibraltar)',
  color: 'var(--silver)',
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  padding: '10px 0',
  outline: 'none',
  transition: 'border-color 0.2s',
  display: 'block',
  marginBottom: '24px',
};

function CommentReel({ comments }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const next = current + dir;

      if (next < 0 || next >= comments.length) return;

      e.preventDefault();
      setDirection(dir);
      setCurrent(next);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [current, comments.length]);

  if (comments.length === 0) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '160px',
        overflow: 'hidden',
        border: '1px solid var(--gibraltar)',
        borderTop: 'none',
      }}
    >
      <div style={{
        position: 'absolute', bottom: '12px', right: '16px',
        display: 'flex', gap: '6px', zIndex: 2
      }}>
        {comments.map((_, i) => (
          <div key={i} style={{
            width: i === current ? '16px' : '4px',
            height: '4px',
            background: i === current ? 'var(--gibraltar-light)' : 'var(--silver-dim)',
            transition: 'all 0.3s',
            borderRadius: '2px'
          }} />
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, y: direction > 0 ? 40 : -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction > 0 ? -40 : 40 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ padding: '20px 24px', height: '100%' }}
        >
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '15px', color: 'var(--white)',
            fontWeight: 700, marginBottom: '2px'
          }}>
            {comments[current].name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px',
            color: 'var(--gibraltar-light)', letterSpacing: '0.08em',
            marginBottom: '10px'
          }}>
            {comments[current].role}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px',
            color: 'var(--silver-muted)', lineHeight: 1.7,
            fontStyle: 'italic'
          }}>
            "{comments[current].message}"
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function KindWords() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: '', role: '', message: '' });
  const [status, setStatus] = useState('idle');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    axios.get('/api/comments/approved')
      .then(res => setComments(res.data))
      .catch(() => { });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.role || !form.message) return;
    setStatus('loading');
    try {
      await axios.post('/api/comments', form);
      setStatus('success');
      setForm({ name: '', role: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="kind-words" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-title">Kind Words</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'start',
            marginTop: '64px'
          }}
        >
          {/* Left — Image + Comment Reel */}
          <div>
            <div style={{
              border: '1px solid var(--gibraltar)',
              overflow: 'hidden',
              height: '340px',
              boxShadow: '0 0 40px var(--gibraltar-glow)'
            }}>
              <img
                src={pinImage}
                alt="kind words"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: 'brightness(0.85) saturate(0.9)'
                }}
              />
            </div>
            <CommentReel comments={comments} />
            {comments.length > 0 && (
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px',
                color: 'var(--silver-dim)', letterSpacing: '0.1em',
                marginTop: '8px', textAlign: 'center'
              }}>
                scroll to read more
              </div>
            )}
          </div>

          {/* Right — Form */}
          <div style={{ paddingTop: '16px' }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '24px', color: 'var(--white)',
              fontWeight: 500, marginBottom: '8px'
            }}>
              Leave a Word
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px',
              color: 'var(--gibraltar-light)', letterSpacing: '0.1em',
              marginBottom: '40px'
            }}>
              worked with me? say something.
            </div>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '13px',
                  color: 'var(--gibraltar-light)', border: '1px solid var(--gibraltar)',
                  padding: '24px', lineHeight: 1.8
                }}
              >
                &gt; Thank you. Your message has been<br />
                &gt; received and will appear here once reviewed.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--gibraltar-light)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Your Name</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = 'var(--silver)'}
                  onBlur={e => e.target.style.borderBottomColor = 'var(--gibraltar)'} />

                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--gibraltar-light)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Your Role / Relation</label>
                <input type="text" placeholder="e.g. Classmate at RCA" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = 'var(--silver)'}
                  onBlur={e => e.target.style.borderBottomColor = 'var(--gibraltar)'} />

                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--gibraltar-light)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Your Message</label>
                <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => e.target.style.borderBottomColor = 'var(--silver)'}
                  onBlur={e => e.target.style.borderBottomColor = 'var(--gibraltar)'} />

                {status === 'error' && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#e05555', marginBottom: '16px' }}>
                    &gt; something went wrong, try again.
                  </div>
                )}

                <button type="submit" disabled={status === 'loading'} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', padding: '12px 32px',
                  border: '1px solid var(--gibraltar)', color: 'var(--silver-muted)',
                  background: 'transparent', transition: 'all 0.3s',
                  opacity: status === 'loading' ? 0.6 : 1
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--gibraltar-light)'; e.currentTarget.style.boxShadow = '0 0 20px var(--gibraltar-glow)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--silver-muted)'; e.currentTarget.style.borderColor = 'var(--gibraltar)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  {status === 'loading' ? '> sending...' : '> Submit'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #kind-words .container > div:nth-child(2) { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}