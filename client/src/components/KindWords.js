import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

function CommentCard({ name, role, message, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--gibraltar)',
        padding: '28px',
        breakInside: 'avoid',
        marginBottom: '16px',
        transition: 'box-shadow 0.3s'
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 24px var(--gibraltar-glow)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '17px', color: 'var(--white)', fontWeight: 700, marginBottom: '4px' }}>{name}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--gibraltar-light)', letterSpacing: '0.08em', marginBottom: '16px' }}>{role}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--silver-muted)', lineHeight: 1.8, fontStyle: 'italic' }}>"{message}"</div>
    </motion.div>
  );
}

const inputStyle = {
  width: '100%',
  background: 'var(--bg-card)',
  border: '1px solid var(--gibraltar)',
  color: 'var(--silver)',
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  padding: '12px 16px',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  display: 'block'
};

export default function KindWords() {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: '', role: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    axios.get('/api/comments/approved')
      .then(res => setComments(res.data))
      .catch(() => {});
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
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="section-title">Kind Words</div>
          <div className="section-sub">&gt; what_people_say.log</div>
        </motion.div>

        {comments.length > 0 ? (
          <div style={{ columns: '2 300px', columnGap: '16px', marginBottom: '80px' }}>
            {comments.map((c, i) => (
              <CommentCard key={c._id} name={c.name} role={c.role} message={c.message} delay={i * 0.1} />
            ))}
          </div>
        ) : (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--silver-muted)', marginBottom: '80px', opacity: 0.6 }}>
            &gt; no entries yet — be the first to leave a word.
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '560px' }}
        >
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '22px', color: 'var(--white)', marginBottom: '8px', fontWeight: 500 }}>
            Leave a Word
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gibraltar-light)', marginBottom: '32px' }}>
            &gt; leave_a_word.exe
          </div>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--gibraltar-light)', border: '1px solid var(--gibraltar)', padding: '24px', lineHeight: 1.8 }}
            >
              &gt; Thank you. Your message has been received<br />
              &gt; and will appear here once reviewed.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                type="text"
                placeholder="your name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--gibraltar-light)'; e.target.style.boxShadow = '0 0 12px var(--gibraltar-glow)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--gibraltar)'; e.target.style.boxShadow = 'none'; }}
              />
              <input
                type="text"
                placeholder="your role / relation (e.g. Classmate at RCA)"
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--gibraltar-light)'; e.target.style.boxShadow = '0 0 12px var(--gibraltar-glow)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--gibraltar)'; e.target.style.boxShadow = 'none'; }}
              />
              <textarea
                placeholder="say something kind..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                rows={5}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => { e.target.style.borderColor = 'var(--gibraltar-light)'; e.target.style.boxShadow = '0 0 12px var(--gibraltar-glow)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--gibraltar)'; e.target.style.boxShadow = 'none'; }}
              />
              {status === 'error' && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#e05555' }}>&gt; error — please try again.</div>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em',
                  padding: '14px 32px', border: '1px solid var(--gibraltar-light)',
                  color: 'var(--white)', background: 'var(--gibraltar)',
                  transition: 'all 0.3s', alignSelf: 'flex-start',
                  opacity: status === 'loading' ? 0.6 : 1
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 24px var(--gibraltar-glow)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                {status === 'loading' ? '> sending...' : '> Submit'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
