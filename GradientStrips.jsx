export default function GradientStrips({ 
  className = '',
  fromColor = 'rgba(255, 255, 255, 1)', 
  toColor = 'rgba(0, 0, 0, 1)',
  steps = 10, 
}) {
  const parseColor = (rgba) => {
    const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    return match ? {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
      a: match[4] ? parseFloat(match[4]) : 1
    } : null;
  };

  const start = parseColor(fromColor);
  const end = parseColor(toColor);

  const colors = Array.from({ length: steps }, (_, i) => {
    const ratio = i / (steps - 1);
    const r = Math.round(start.r + (end.r - start.r) * ratio);
    const g = Math.round(start.g + (end.g - start.g) * ratio);
    const b = Math.round(start.b + (end.b - start.b) * ratio);
    const a = start.a + (end.a - start.a) * ratio;
    return `rgba(${r},${g},${b},${a})`;
  });

  return (
    <div className={className}>
      {colors.map((color, index) => (
        <div 
          key={index}
          className="w-full"
          style={{ 
            height: `${100/steps}%`,
            backgroundColor: color
          }}
        />
      ))}
    </div>
  );
};
