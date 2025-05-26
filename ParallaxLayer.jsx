import { useRef, useEffect } from 'react';

export default function ParallaxLayer({ className = '', children, offset = 0, scale = 1 }) {
  const layerRef = useRef();
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (layerRef.current) {
            layerRef.current.style.transform = `translate3d(0, ${offset + y * scale}px, 0)`;
          }
          ticking.current = false;
        });
        ticking.current = true;
      }
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
