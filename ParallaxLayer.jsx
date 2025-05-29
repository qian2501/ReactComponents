import { useRef, useEffect } from 'react';

export default function ParallaxLayer({ className = '', children, offset = 0, scale = 1 }) {
  const layerRef = useRef();
  const lastY = useRef(0);

  useEffect(() => {
    let animationFrameId;

    const update = () => {
      const y = window.scrollY;
      if (y !== lastY.current && layerRef.current) {
        layerRef.current.style.transform = `translate3d(0, ${offset + y * scale}px, 0)`;
        lastY.current = y;
      }
      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(animationFrameId);
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
