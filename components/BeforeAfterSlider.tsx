
import React, { useState, useRef, useEffect } from 'react';

interface Props {
  before: string;
  after: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<Props> = ({ before, after, className = '' }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const relativeX = x - rect.left;
    const newPosition = (relativeX / rect.width) * 100;

    setPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-col-resize select-none touch-none ${className}`}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image */}
      <img src={after} alt="After" className="w-full h-full object-cover" />

      {/* Before Image (Clipped) */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden border-r-2 border-white"
        style={{ width: `${position}%` }}
      >
        <img src={before} alt="Before" className="absolute top-0 left-0 h-full w-auto max-w-none object-cover" style={{ width: containerRef.current?.offsetWidth }} />
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 text-xs rounded-full">Before</div>
      </div>

      <div className="absolute top-4 right-4 bg-white/80 text-black px-3 py-1 text-xs rounded-full">After</div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-col-resize pointer-events-none"
        style={{ left: `${position}%`, marginLeft: '-1px' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-gray-400 rounded-full" />
            <div className="w-0.5 h-3 bg-gray-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
