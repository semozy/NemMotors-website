import React from 'react';

export default function Logo({ className = "w-32", animated = false, color = "currentColor" }) {
  const uniqueId = React.useId().replace(/:/g, "");
  const maskId = `logoCutMask-${uniqueId}`;
  const gradId = `logoKoplampGrad-${uniqueId}`;

  return (
    <svg viewBox="-5 -5 345 160" className={className} aria-label="NEM Motors Logo">
      <defs>
        {animated && (
          <linearGradient id={gradId} x1="200%" y1="0%" x2="400%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="50%" stopColor="rgba(255,255,255,1)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            <animate attributeName="x1" values="200%; -50%" dur="1.8s" calcMode="spline" keyTimes="0; 1" keySplines="0.42 0 0.58 1" fill="freeze" />
            <animate attributeName="x2" values="400%; 150%" dur="1.8s" calcMode="spline" keyTimes="0; 1" keySplines="0.42 0 0.58 1" fill="freeze" />
          </linearGradient>
        )}
        <mask id={maskId}>
          <rect x="-10" y="-10" width="380" height="120" fill="white" />
          <line x1="-10" y1="27.5" x2="40" y2="77.5" stroke="black" strokeWidth="5.5" />
          <line x1="75" y1="27.5" x2="125" y2="77.5" stroke="black" strokeWidth="5.5" />
          <line x1="215" y1="27.5" x2="265" y2="77.5" stroke="black" strokeWidth="5.5" />
          <line x1="300" y1="72.5" x2="350" y2="22.5" stroke="black" strokeWidth="5.5" />
        </mask>
      </defs>
      
      {/* NEM Hoofdletters */}
      <g mask={`url(#${maskId})`} fill={animated ? `url(#${gradId})` : color}>
        {/* N */}
        <path d="M0,90 v-80 h25 l60,55 v-55 h25 v80 h-25 l-60,-55 v55 z" />
        {/* E */}
        <path d="M125,90 v-80 h85 v20 h-60 v10 h50 v20 h-50 v10 h60 v20 z" />
        {/* M */}
        <path d="M225,90 v-80 h25 l25,40 h10 l25,-40 h25 v80 h-25 v-55 l-20,30 h-20 l-20,-30 v55 z" />
      </g>

      {/* MOTORS Ondertitel */}
      <g fill={color} opacity={animated ? "0" : "1"}>
        {animated && (
          <animate attributeName="opacity" values="0; 1" begin="0.8s" dur="0.8s" fill="freeze" />
        )}
        {/* Linker speerpunt */}
        <polygon points="70,134 70,138 0,136" opacity="0.6" />
        {/* Tekst */}
        <text x="175" y="143" fontFamily="system-ui, -apple-system, sans-serif" fontSize="22" fontWeight="800" letterSpacing="0.4em" textAnchor="middle" opacity="0.8">
          MOTORS
        </text>
        {/* Rechter speerpunt */}
        <polygon points="265,134 265,138 335,136" opacity="0.6" />
      </g>
    </svg>
  );
}
