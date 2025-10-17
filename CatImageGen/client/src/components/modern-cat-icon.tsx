interface ModernCatIconProps {
  className?: string;
}

export default function ModernCatIcon({ className = "w-7 h-7" }: ModernCatIconProps) {
  return (
    <svg 
      viewBox="0 0 28 28" 
      className={`${className} text-white drop-shadow-lg`}
      fill="none"
    >
      {/* British Cat head with dark gradient */}
      <defs>
        <linearGradient id="catGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(60,60,80,0.9)" />
          <stop offset="50%" stopColor="rgba(80,80,100,0.8)" />
          <stop offset="100%" stopColor="rgba(40,40,60,0.9)" />
        </linearGradient>
        <radialGradient id="furGradient" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="rgba(100,100,120,0.4)" />
          <stop offset="100%" stopColor="rgba(60,60,80,0.2)" />
        </radialGradient>
      </defs>
      
      {/* Main head shape - rounder for British breed */}
      <ellipse cx="14" cy="16" rx="10" ry="9" fill="url(#catGradient)" />
      <ellipse cx="14" cy="16" rx="10" ry="9" fill="url(#furGradient)" />
      
      {/* Ears - smaller and rounder for British breed */}
      <path d="M6 11 L4 6 L10 9 Z" fill="url(#catGradient)" />
      <path d="M22 11 L24 6 L18 9 Z" fill="url(#catGradient)" />
      
      {/* Inner ear details - darker pink */}
      <path d="M7 10 L5.5 7.5 L9 8.5 Z" fill="rgba(180,140,150,0.7)" />
      <path d="M21 10 L22.5 7.5 L19 8.5 Z" fill="rgba(180,140,150,0.7)" />
      
      {/* Eyes - British cat style, rounder and bigger */}
      <ellipse cx="11.5" cy="14" rx="2.2" ry="2.8" fill="rgba(255,255,255,0.95)" />
      <ellipse cx="16.5" cy="14" rx="2.2" ry="2.8" fill="rgba(255,255,255,0.95)" />
      
      {/* Eye pupils - more intense, amber/copper colored */}
      <ellipse cx="11.5" cy="14.2" rx="1.2" ry="1.8" fill="rgba(200,120,50,0.9)" />
      <ellipse cx="16.5" cy="14.2" rx="1.2" ry="1.8" fill="rgba(200,120,50,0.9)" />
      <ellipse cx="11.5" cy="14" rx="0.6" ry="1" fill="rgba(0,0,0,0.8)" />
      <ellipse cx="16.5" cy="14" rx="0.6" ry="1" fill="rgba(0,0,0,0.8)" />
      <ellipse cx="11.8" cy="13.5" rx="0.2" ry="0.4" fill="rgba(255,255,255,0.9)" />
      <ellipse cx="16.8" cy="13.5" rx="0.2" ry="0.4" fill="rgba(255,255,255,0.9)" />
      
      {/* British cat nose - darker and more prominent */}
      <path d="M14 17.5 L12.5 19 L15.5 19 Z" fill="rgba(120,80,90,0.9)" />
      
      {/* Mouth - subtle British cat expression */}
      <path d="M14 19 Q12 20.5 10.5 19.5" stroke="rgba(200,200,220,0.6)" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M14 19 Q16 20.5 17.5 19.5" stroke="rgba(200,200,220,0.6)" strokeWidth="1" fill="none" strokeLinecap="round"/>
      
      {/* Whiskers - lighter colored for dark fur */}
      <line x1="5" y1="14.5" x2="8.5" y2="14" stroke="rgba(200,200,220,0.8)" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="5" y1="16.5" x2="8.5" y2="16.5" stroke="rgba(200,200,220,0.8)" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="5" y1="18.5" x2="8.5" y2="19" stroke="rgba(200,200,220,0.8)" strokeWidth="0.8" strokeLinecap="round"/>
      
      <line x1="19.5" y1="14" x2="23" y2="14.5" stroke="rgba(200,200,220,0.8)" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="19.5" y1="16.5" x2="23" y2="16.5" stroke="rgba(200,200,220,0.8)" strokeWidth="0.8" strokeLinecap="round"/>
      <line x1="19.5" y1="19" x2="23" y2="18.5" stroke="rgba(200,200,220,0.8)" strokeWidth="0.8" strokeLinecap="round"/>
      
      {/* British cat cheek tufts */}
      <ellipse cx="8.5" cy="18" rx="1.5" ry="1" fill="rgba(80,80,100,0.5)" />
      <ellipse cx="19.5" cy="18" rx="1.5" ry="1" fill="rgba(80,80,100,0.5)" />
    </svg>
  );
}