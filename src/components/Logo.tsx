'use client';

import React from 'react';

export default function Logo({ className = '', size = 36 }: { className?: string; size?: number }) {
  // Unique ID for the gradient to prevent conflicts if rendered multiple times
  const gradientId = "rainbow-logo-grad";

  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff0055">
            <animate
              attributeName="stop-color"
              values="#ff0055;#ff5500;#ffcc00;#00cc44;#0099ff;#aa00ff;#ff0055"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="35%" stopColor="#ff7700">
            <animate
              attributeName="stop-color"
              values="#ff7700;#ffee00;#00cc44;#0099ff;#aa00ff;#ff0055;#ff7700"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="70%" stopColor="#00cc44">
            <animate
              attributeName="stop-color"
              values="#00cc44;#0099ff;#aa00ff;#ff0055;#ff7700;#ffee00;#00cc44"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#0099ff">
            <animate
              attributeName="stop-color"
              values="#0099ff;#aa00ff;#ff0055;#ff7700;#ffee00;#00cc44;#0099ff"
              dur="6s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g
        filter="url(#logo-glow)"
        style={{
          fill: 'none',
          stroke: `url(#${gradientId})`,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeMiterlimit: 10,
          strokeWidth: 16,
        }}
      >
        <path d="m295.387 316.601c0-13.582-11.01-24.593-24.592-24.593h-8.407l-24.424-41.281 27.454-25.452v-98.179h46.262c56.124 0 101.621 37.375 101.621 93.499l-34.781 30.132"/>
        <path d="m303.694 250.728h109.607"/>
        <circle cx="328.257" cy="190.165" r="20.443"/>
        <path d="m265.418 159.105h-97.367c-52.884 0-95.755 42.871-95.755 95.755v90.159c0 23.224 18.826 42.05 42.05 42.05h21.794c15.772 0 28.557-12.785 28.557-28.557v-1.393c0-15.772-12.785-28.557-28.557-28.557-15.772 0-28.557 12.785-28.557 28.557"/>
        <path d="m154.794 214.73c21.34 0 38.639 17.299 38.639 38.639s-17.299 38.639-38.639 38.639"/>
        <path d="m121.995 292.009h140.393"/>
        <path d="m18.801 292.009h53.495"/>
        <path d="m491.447 289.314h-169.849"/>
        <path d="m412.674 289.314 32.052 40.578"/>
      </g>
    </svg>
  );
}
