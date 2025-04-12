import { useState, useEffect } from 'react';

export default function ParallaxLayer({ className = '', children, offset = 0, scale = 1 }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <div
        className={`${scale > 0 ? 'absolute' : ''} ` + className}
        style={{ transform: `translate3d(0, ${offset + scrollY * scale}px, 0)` }}
      >
        {children}
      </div>
  );
};
