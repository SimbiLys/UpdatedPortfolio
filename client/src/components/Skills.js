import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const groups = [
  {
    label: 'Design & Creative',
    skills: [
      { name: 'Figma', note: 'UI/UX prototyping & design systems', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
      { name: 'Adobe Suite', note: 'Photoshop, Illustrator & beyond', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg' },
      { name: 'Blender', note: '3D modeling & rendering', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/blender/blender-original.svg' },
      { name: 'Canva', note: 'Rapid visual communication', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg' },
    ]
  },
  {
    label: 'Frontend',
    skills: [
      { name: 'React', note: 'Component architecture & hooks', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'HTML5', note: 'Semantic, accessible markup', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', note: 'Animations, grid & responsive design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    ]
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', note: 'Server-side JavaScript runtime', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'JavaScript', note: 'ES6+, async/await, APIs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'Python', note: 'Scripting, AI & data exploration', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'PHP', note: 'Server-side web development', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
      { name: 'C', note: 'Systems & embedded programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
    ]
  },
  {
    label: 'Databases',
    skills: [
      { name: 'MongoDB', note: 'NoSQL document databases', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', note: 'Relational data & complex queries', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'MariaDB', note: 'Open-source SQL database engine', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mariadb/mariadb-original.svg' },
    ]
  }
];

const softSkills = ['English & French Communication', 'Project Management', 'Creative Problem Solving', 'Team Collaboration', 'UI/UX Thinking'];

function SkillCard({ name, note, icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--gibraltar)',
        padding: '24px 20px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.3s ease', cursor: 'default'
      }}
      whileHover={{ y: -4, boxShadow: '0 0 32px var(--gibraltar-glow)', borderColor: 'var(--gibraltar-light)' }}
    >
      <img src={icon} alt={name} width={32} height={32} style={{ marginBottom: '12px', filter: 'brightness(0.9)' }} onError={e => { e.target.style.display = 'none'; }} />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--white)', letterSpacing: '0.05em', marginBottom: '8px' }}>{name}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--silver-muted)', lineHeight: 1.5 }}>{note}</div>
    </motion.div>
  );
}

export default function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" ref={ref} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div className="section-title">Skills & Stack</div>
          <div className="section-sub">&gt; what_i_work_with</div>
        </motion.div>

        {groups.map((group, gi) => (
          <div key={group.label} style={{ marginBottom: '56px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gibraltar-light)', letterSpacing: '0.15em', marginBottom: '20px', borderLeft: '2px solid var(--gibraltar)', paddingLeft: '12px' }}>
              {group.label.toUpperCase()}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
              {group.skills.map((skill, i) => (
                <SkillCard key={skill.name} {...skill} delay={gi * 0.1 + i * 0.06} />
              ))}
            </div>
          </div>
        ))}

        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--gibraltar-light)', letterSpacing: '0.15em', marginBottom: '20px', borderLeft: '2px solid var(--gibraltar)', paddingLeft: '12px' }}>
            SOFT SKILLS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {softSkills.map(s => (
              <span key={s} style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--silver)',
                border: '1px solid var(--gibraltar)', padding: '6px 16px',
                letterSpacing: '0.05em', transition: 'all 0.2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--gibraltar)'; e.currentTarget.style.color = 'var(--white)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--silver)'; }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
