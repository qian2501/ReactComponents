import { useState, useEffect, useMemo } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export default function ScaleOnScroll({
  children,
  className = '',
  scale = 3, // Number, responsive object, or Tailwind string (e.g. '2 sm:3 md:4')
  offset = '10vh', // Number, string with units, responsive object, or Tailwind string (e.g. '5vh sm:10vh')
  maxScroll = '30vh' // Number, string with units, responsive object, or Tailwind string (e.g. '20vh md:30vh')
}) {
  const [scrollY, setScrollY] = useState(0);
  const [breakpoint, setBreakpoint] = useState('');

  // Get active breakpoint
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      let bp = '';
      if (width >= breakpoints['2xl']) bp = '2xl';
      else if (width >= breakpoints.xl) bp = 'xl';
      else if (width >= breakpoints.lg) bp = 'lg';
      else if (width >= breakpoints.md) bp = 'md';
      else if (width >= breakpoints.sm) bp = 'sm';
      setBreakpoint(bp);
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  // Parse Tailwind-style responsive string (e.g. '2 sm:3 md:4')
  const parseResponsiveString = (str) => {
    if (typeof str !== 'string') return str;
    
    const parts = str.trim().split(/\s+/);
    const result = {};
    
    parts.forEach(part => {
      if (part.includes(':')) {
        const [bp, val] = part.split(':');
        result[bp] = isNaN(val) ? val : parseFloat(val);
      } else {
        result.default = isNaN(part) ? part : parseFloat(part);
      }
    });
    
    return result;
  };

  // Get responsive value (Tailwind-style min-width matching)
  const getValue = (value) => {
    // Handle Tailwind string syntax
    const parsedValue = typeof value === 'string' && value.includes(':') 
      ? parseResponsiveString(value)
      : value;

    if (typeof parsedValue === 'object' && parsedValue !== null) {
      // Check breakpoints from largest to smallest
      const breakpointsOrder = ['2xl', 'xl', 'lg', 'md', 'sm'];
      
      // Find the largest matching breakpoint
      for (const bp of breakpointsOrder) {
        if (breakpoint && breakpoints[bp] <= breakpoints[breakpoint]) {
          if (parsedValue[bp] !== undefined) return parsedValue[bp];
        }
      }
      
      // Fallback to default or first value
      return parsedValue.default || Object.values(parsedValue)[0] || 1;
    }
    return parsedValue;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || document.documentElement.scrollTop);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get responsive values
  const responsiveScale = useMemo(() => getValue(scale), [breakpoint, scale]);
  const responsiveOffset = useMemo(() => getValue(offset), [breakpoint, offset]);
  const responsiveMaxScroll = useMemo(() => getValue(maxScroll), [breakpoint, maxScroll]);

  // Calculate progress based on scroll position
  const maxScrollPx = typeof responsiveMaxScroll === 'string' && responsiveMaxScroll.endsWith('vh') 
    ? (parseFloat(responsiveMaxScroll) / 100) * window.innerHeight
    : responsiveMaxScroll;
    
  const progress = Math.min(scrollY / maxScrollPx, 1);
  
  // Calculate responsive scale
  const baseScale = responsiveScale;
  
  const currentScale = baseScale - (baseScale - 1) * progress;
  
  // Calculate translateY
  const currentTranslateY = typeof responsiveOffset === 'string' && responsiveOffset.endsWith('vh')
    ? `calc(${responsiveOffset} - ${parseFloat(responsiveOffset) * progress}vh)`
    : `${responsiveOffset - responsiveOffset * progress}px`;

  return (
    <div
      className={'absolute top-0 '+className}
      style={{
        transform: `${className.includes('-translate-x-1/2') ? 'translateX(-50%) ' : ''}scale(${currentScale}) translateY(${currentTranslateY})`,
      }}
    >
      {children}
    </div>
  );
};
