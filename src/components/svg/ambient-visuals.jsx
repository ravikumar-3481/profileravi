import React from 'react';

export function ContourGraphic({ className = '', opacity = 0.4 }) {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto pointer-events-none select-none ${className}`}
      style={{ opacity }}
    >
      <path
        d="M-50 150 C 150 80, 250 250, 450 180 C 650 110, 750 280, 950 200"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="4 6"
      />
      <path
        d="M-50 220 C 120 160, 280 320, 480 250 C 680 180, 780 340, 950 280"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M-50 290 C 180 220, 320 380, 520 310 C 720 240, 820 400, 950 350"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="2 4"
      />
      <circle cx="450" cy="180" r="3" fill="currentColor" />
      <circle cx="480" cy="250" r="2.5" fill="currentColor" />
      <circle cx="520" cy="310" r="2" fill="currentColor" />
    </svg>
  );
}

export function SignalWaveform({ className = '', bars = 24 }) {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-6 w-auto inline-block ${className}`}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const height = 8 + Math.sin(i * 0.45) * 14 + (i % 3) * 4;
        const y = (40 - height) / 2;
        const x = i * (200 / bars) + 2;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="3"
            height={height}
            rx="1.5"
            fill="currentColor"
            opacity={0.3 + (i % 5) * 0.15}
          />
        );
      })}
    </svg>
  );
}

export function GeometricMatrix({ className = '', rows = 4, cols = 8 }) {
  return (
    <svg
      viewBox={`0 0 ${cols * 24} ${rows * 24}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={c * 24 + 12}
            cy={r * 24 + 12}
            r={r === 1 && c === 4 ? 2.5 : 1}
            fill="currentColor"
            opacity={(r + c) % 3 === 0 ? 0.6 : 0.2}
          />
        ))
      )}
    </svg>
  );
}

export function AbstractSparkle({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );
}
