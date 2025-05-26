import { useState, useEffect, useRef } from 'react';

export default function ParallaxLayer({ className = '', children, offset = 0, scale = 1 }) {
  const [scrollY, setScrollY] = useState(0);
  const rafId = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return;
      
      rafId.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafId.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
      <div
        className={`${scale > 0 ? 'absolute' : ''} ` + className}
        style={{ 
          transform: `translate3d(0, ${offset + scrollY * scale}px, 0)`,
          willChange: 'transform'
        }}
      >
        {children}
      </div>
  );
};
