import { useRef, useEffect } from 'react';

export default function ParallaxLayer({ className = '', children, offset = 0, scale = 1 }) {
  const layerRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (layerRef.current) {
          layerRef.current.style.transform = `translate3d(0, ${offset + y * scale}px, 0)`;
        }
      });
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset, scale]);

  return (
    <div
      ref={layerRef}
      className={`${scale > 0 ? 'absolute' : ''} ` + className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
