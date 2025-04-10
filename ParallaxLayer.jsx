import { useState, useEffect } from 'react';

export default function ParallaxLayer({ className, children, offset = 0, scale = 1 }) {
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
        className={`${scale > 0 && 'absolute'} w-full h-full ` + className}
        style={{ transform: `translateY(${offset + scrollY * scale}px)` }}
      >
        {children}
      </div>
  );
};