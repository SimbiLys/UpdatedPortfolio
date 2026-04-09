import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const inputStyle = {
  background: '#0f1923', border: '1px solid #133951',
  color: '#CFD2D3', fontFamily: "'JetBrains Mono', monospace",
  fontSize: '13px', padding: '12px 20px', outline: 'none',
  width: '100%', maxWidth: '320px', display: 'block'
};

const btnStyle = (color) => ({
  fontFamily: "'JetBrains Mono', monospace", fontSize: '10px',
  letterSpacing: '0.08em', padding: '6px 14px',
  border: `1px solid ${color}`, color, background: 'transparent',
  transition: 'all 0.2s', cursor: 'pointer'
});

export default function Admin() {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(!!localStorage.getItem('adminToken'));
  const [error, setError] = useState('');
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  const fetchAll = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get('/api/comments/admin', { headers: { 'x-admin-password': token } });
      setPending(res.data.filter(c => c.status === 'pending'));
      setApproved(res.data.filter(c => c.status === 'approved'));
    } catch { logout(); }
  }, [token]);

  useEffect(() => { if (unlocked) fetchAll(); }, [unlocked, fetchAll]);

  const login = async () => {
    setLoading(true);
    try {
      await axios.get('/api/comments/admin', { headers: { 'x-admin-password': password } });
      localStorage.setItem('adminToken', password);
      setUnlocked(true);
      setError('');
    } catch {
      setError('> access denied');
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setUnlocked(false);
    setPending([]); setApproved([]);
  };

  const approve = async (id) => {
    await axios.patch(`/api/comments/admin/${id}/approve`, {}, { headers: { 'x-admin-password': token } });
    fetchAll();
  };

  const remove = async (id) => {
    await axios.delete(`/api/comments/admin/${id}`, { headers: { 'x-admin-password': token } });
    fetchAll();
  };

  if (!unlocked) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0a0e13',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '24px', padding: '24px'
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '64px', color: '#CFD2D3', letterSpacing: '0.1em' }}>SL</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#133951', letterSpacing: '0.15em' }}>ADMIN ACCESS</div>
        <input
          type="password" placeholder="enter password"
          value={password} onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={inputStyle}
        />
        {error && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#e05555' }}>{error}</div>}
        <button onClick={login} disabled={loading} style={{
          ...btnStyle('#CFD2D3'), padding: '10px 32px',
          opacity: loading ? 0.6 : 1
        }}>
          {loading ? '> checking...' : '> Enter'}
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0e13', padding: '40px', fontFamily: "'JetBrains Mono', monospace" }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px', borderBottom: '1px solid #133951', paddingBottom: '24px' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#FFFFFF' }}>Admin Panel</div>
            <div style={{ fontSize: '11px', color: '#133951', letterSpacing: '0.1em', marginTop: '4px' }}>&gt; control_center.exe</div>
          </div>
          <button onClick={logout} style={btnStyle('#CFD2D3')}>[ logout ]</button>
        </div>

        <Section title={`Pending (${pending.length})`} color="#e0a855">
          {pending.length === 0
            ? <Empty text="No pending comments" />
            : pending.map(c => (
              <CommentRow key={c._id} comment={c}>
                <button onClick={() => approve(c._id)} style={btnStyle('#4caf82')}>[ Approve ]</button>
                <button onClick={() => remove(c._id)} style={btnStyle('#e05555')}>[ Delete ]</button>
              </CommentRow>
            ))
          }
        </Section>

        <Section title={`Approved (${approved.length})`} color="#4caf82">
          {approved.length === 0
            ? <Empty text="No approved comments" />
            : approved.map(c => (
              <CommentRow key={c._id} comment={c}>
                <button onClick={() => remove(c._id)} style={btnStyle('#e05555')}>[ Delete ]</button>
              </CommentRow>
            ))
          }
        </Section>
      </div>
    </div>
  );
}

function Section({ title, color, children }) {
  return (
    <div style={{ marginBottom: '48px' }}>
      <div style={{ fontSize: '12px', color, letterSpacing: '0.12em', marginBottom: '20px', borderLeft: `2px solid ${color}`, paddingLeft: '12px' }}>
        {title.toUpperCase()}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>{children}</div>
    </div>
  );
}

function CommentRow({ comment, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      style={{ background: '#0f1923', border: '1px solid #133951', padding: '20px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#FFFFFF', fontSize: '14px', marginBottom: '2px' }}>{comment.name}</div>
          <div style={{ color: '#1d526e', fontSize: '10px', letterSpacing: '0.08em', marginBottom: '10px' }}>{comment.role}</div>
          <div style={{ color: 'rgba(207,210,211,0.6)', fontSize: '12px', lineHeight: 1.7, fontStyle: 'italic' }}>"{comment.message}"</div>
          <div style={{ color: '#133951', fontSize: '10px', marginTop: '10px' }}>{new Date(comment.createdAt).toLocaleDateString()}</div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>{children}</div>
      </div>
    </motion.div>
  );
}

function Empty({ text }) {
  return <div style={{ color: 'rgba(207,210,211,0.3)', fontSize: '12px', padding: '20px 0' }}>&gt; {text}</div>;
}
