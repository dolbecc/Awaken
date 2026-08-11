import React from 'react';

/**
 * Logo 4: Emoldurado (Squircle Frame + Diamond + Chevron A + Diamond Core)
 */
export const AwakenFramedIcon = ({ className = "w-10 h-10", glow = true }) => {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none ${glow ? 'drop-shadow-[0_0_12px_rgba(0,255,17,0.6)]' : ''}`}
    >
      <defs>
        {/* Neon Glow Filter */}
        <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Frame Gradient */}
        <linearGradient id="frame-grad" x1="0" y1="0" x2="0" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E2320" />
          <stop offset="50%" stopColor="#0F1210" />
          <stop offset="100%" stopColor="#080A09" />
        </linearGradient>

        <linearGradient id="stroke-grad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00FF11" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#00FF11" stopOpacity="0.2" />
          <stop offset="70%" stopColor="#00FF11" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00FF11" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Outer Squircle Container Frame (Emoldurado) */}
      <rect
        x="6"
        y="6"
        width="108"
        height="108"
        rx="26"
        fill="url(#frame-grad)"
        stroke="url(#stroke-grad)"
        strokeWidth="2.5"
      />

      {/* Top Gloss Edge Highlight */}
      <path
        d="M 28 8 L 92 8"
        stroke="#00FF11"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />

      {/* Inner Emblema Group */}
      <g filter={glow ? "url(#neon-glow)" : undefined}>
        {/* Outer Diamond Ring */}
        <path
          d="M 60 22 L 92 56 L 60 90 L 28 56 Z"
          fill="none"
          stroke="#00FF11"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Inner Chevron Arrowhead 'A' */}
        <path
          d="M 60 30 L 82 72 L 70 72 L 60 52 L 50 72 L 38 72 Z"
          fill="#00FF11"
        />

        {/* Center Diamond Core Dot */}
        <polygon
          points="60,61 66,68 60,75 54,68"
          fill="#00FF11"
        />
      </g>
    </svg>
  );
};

/**
 * Full Brand Logo (Framed Icon + AWAKEN Typography + Subtitle)
 */
export const AwakenBrandLogo = ({ className = "h-10", showSubtitle = true }) => {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Emoldurado Logo Icon */}
      <AwakenFramedIcon className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0" />

      {/* Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="font-black text-2xl sm:text-3xl tracking-wider text-[#00FF11] leading-none drop-shadow-[0_0_12px_rgba(0,255,17,0.45)]">
            AWAKEN
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#A0A0A0] uppercase leading-tight mt-0.5">
            WAKE UP. BUILD. REPEAT.
          </span>
        )}
      </div>
    </div>
  );
};
