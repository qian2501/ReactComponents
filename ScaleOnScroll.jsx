import { useState, useEffect, useMemo, useCallback } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

const breakpointOrder = ['2xl', 'xl', 'lg', 'md', 'sm'];

export default function ScaleOnScroll({
  children,
  className = '',
  scale = 3, // Number, responsive object, or Tailwind string (e.g. '2 sm:3 md:4')
  offset = '10vh', // Number, string with units, responsive object, or Tailwind string (e.g. '5vh sm:10vh')
  maxScroll = '30vh' // Number, string with units, responsive object, or Tailwind string (e.g. '20vh md:30vh')
}) {
  const [scrollY, setScrollY] = useState(0);
  const [breakpoint, setBreakpoint] = useState('');

  // Memoized breakpoint detection
  const detectBreakpoint = useCallback((width) => {
    for (const bp of breakpointOrder) {
      if (width >= breakpoints[bp]) return bp;
    }
    return '';
  }, []);

  // Get active breakpoint
  useEffect(() => {
    const updateBreakpoint = () => {
      setBreakpoint(detectBreakpoint(window.innerWidth));
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, [detectBreakpoint]);

  // Optimized responsive value parser
  const parseResponsiveValue = useCallback((value) => {
    if (typeof value !== 'string' || !value.includes(':')) return value;
    
    return value.trim().split(/\s+/).reduce((acc, part) => {
      const [bp, val] = part.includes(':') ? part.split(':') : ['default', part];
      acc[bp] = isNaN(val) ? val : parseFloat(val);
      return acc;
    }, {});
  }, []);

  // Get responsive value with memoization
  const getResponsiveValue = useCallback((value) => {
    const parsedValue = parseResponsiveValue(value);
    
    if (typeof parsedValue === 'object' && parsedValue !== null) {
      for (const bp of breakpointOrder) {
        if (breakpoint && breakpoints[bp] <= breakpoints[breakpoint] && parsedValue[bp] !== undefined) {
          return parsedValue[bp];
        }
      }
      return parsedValue.default || Object.values(parsedValue)[0] || 1;
    }
    return parsedValue;
  }, [breakpoint, parseResponsiveValue]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || document.documentElement.scrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoized responsive values
  const responsiveScale = useMemo(() => getResponsiveValue(scale), [getResponsiveValue, scale]);
  const responsiveOffset = useMemo(() => getResponsiveValue(offset), [getResponsiveValue, offset]);
  const responsiveMaxScroll = useMemo(() => getResponsiveValue(maxScroll), [getResponsiveValue, maxScroll]);

  // Memoized transform calculations
  const { currentScale, currentTranslateY } = useMemo(() => {
    const maxScrollPx = typeof responsiveMaxScroll === 'string' && responsiveMaxScroll.endsWith('vh') 
      ? (parseFloat(responsiveMaxScroll) / 100) * window.innerHeight
      : responsiveMaxScroll;
      
    const progress = Math.min(scrollY / maxScrollPx, 1);
    const baseScale = responsiveScale;
    const scale = baseScale - (baseScale - 1) * progress;
    
    const translateY = typeof responsiveOffset === 'string' && responsiveOffset.endsWith('vh')
      ? `calc(${responsiveOffset} - ${parseFloat(responsiveOffset) * progress}vh)`
      : `${responsiveOffset - responsiveOffset * progress}px`;

    return { currentScale: scale, currentTranslateY: translateY };
  }, [scrollY, responsiveMaxScroll, responsiveScale, responsiveOffset]);

  return (
    <div
      className={`absolute top-0 ${className}`}
      style={{
        transform: `${className.includes('-translate-x-1/2') ? 'translateX(-50%) ' : ''}scale(${currentScale}) translate3d(0, ${currentTranslateY}, 0)`,
      }}
    >
      {children}
    </div>
  );
};
