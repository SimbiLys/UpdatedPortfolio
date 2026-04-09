import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const hover = () => ringRef.current?.classList.add('hovered');
    const unhover = () => ringRef.current?.classList.remove('hovered');

    document.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, input, textarea, [data-hover]')
      .forEach(el => { el.addEventListener('mouseenter', hover); el.addEventListener('mouseleave', unhover); });

    let frame;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot {
          position: fixed;
          top: -4px; left: -4px;
          width: 8px; height: 8px;
          background: var(--silver);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
        }
        .cursor-ring {
          position: fixed;
          top: -16px; left: -16px;
          width: 32px; height: 32px;
          border: 1px solid var(--gibraltar-light);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          will-change: transform;
          transition: width 0.2s, height 0.2s, top 0.2s, left 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .cursor-ring.hovered {
          width: 48px; height: 48px;
          top: -24px; left: -24px;
          border-color: var(--gibraltar-light);
          box-shadow: 0 0 12px var(--gibraltar-glow);
        }
        @media (max-width: 768px) {
          .cursor-dot, .cursor-ring { display: none; }
        }
      `}</style>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
