import React from 'react';

interface UrboxLogoProps {
  className?: string;
  size?: number;
}

export const UrboxLogoSymbol: React.FC<UrboxLogoProps> = ({ className = '', size = 48 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Yellow / Orange Top Layer */}
      <path
        d="M60 12L96 32L60 52L24 32L60 12Z"
        fill="#FBBF24"
      />
      <path
        d="M60 12V32L24 32L60 12Z"
        fill="#F59E0B"
        opacity="0.3"
      />
      <path
        d="M60 12V32L96 32L60 12Z"
        fill="#FFF"
        opacity="0.15"
      />

      {/* Green Second Layer */}
      <path
        d="M24 38L60 58L96 38V48L60 68L24 48V38Z"
        fill="#10B981"
      />
      <path
        d="M60 58V68L24 48V38L60 58Z"
        fill="#059669"
        opacity="0.3"
      />
      <path
        d="M96 38V48L60 68V58L96 38Z"
        fill="#FFF"
        opacity="0.15"
      />

      {/* Pink Third Layer */}
      <path
        d="M24 54L60 74L96 54V64L60 84L24 64V54Z"
        fill="#EC4899"
      />
      <path
        d="M60 74V84L24 64V54L60 74Z"
        fill="#DB2777"
        opacity="0.3"
      />
      <path
        d="M96 54V64L60 84V74L96 54Z"
        fill="#FFF"
        opacity="0.15"
      />

      {/* Purple Bottom Layer */}
      <path
        d="M24 70L60 90L96 70V80L60 100L24 80V70Z"
        fill="#8B5CF6"
      />
      <path
        d="M60 90V100L24 80V70L60 90Z"
        fill="#7C3AED"
        opacity="0.3"
      />
      <path
        d="M96 70V80L60 100V90L96 70Z"
        fill="#FFF"
        opacity="0.15"
      />
    </svg>
  );
};

export const UrboxLogoFull: React.FC<UrboxLogoProps & { showText?: boolean }> = ({
  className = '',
  size = 48,
  showText = true,
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <UrboxLogoSymbol size={size} />
      {showText && (
        <div className="flex items-baseline relative">
          <span className="font-sans text-3xl font-extrabold tracking-tight text-[#7C3AED] select-none">
            URBOX
          </span>
          <span className="text-xs font-semibold text-[#7C3AED] self-start ml-0.5 select-none font-sans">
            ®
          </span>
        </div>
      )}
    </div>
  );
};
