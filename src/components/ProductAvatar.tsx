import React from 'react';

interface ProductAvatarProps {
  name: string;
  code: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ProductAvatar: React.FC<ProductAvatarProps> = ({
  name,
  code,
  color = 'bg-indigo-100 text-indigo-600',
  size = 'md',
}) => {
  const normalized = name.toLowerCase();

  // Pick suitable SVG illustrative icon based on product keyword
  let svgIcon = (
    // Default Box Icon
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );

  if (normalized.includes('standee') || normalized.includes('bảng') || normalized.includes('biển')) {
    svgIcon = (
      // Standee / Display Icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2">
        <rect x="4" y="3" width="16" height="13" rx="1.5" />
        <line x1="12" y1="16" x2="12" y2="21" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="6" y1="8" x2="18" y2="8" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    );
  } else if (normalized.includes('bình') || normalized.includes('ly') || normalized.includes('cốc')) {
    svgIcon = (
      // Tumbler / Drinkware Icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2">
        <path d="M17 2H7l1 15c0 1.5 1.5 3 4 3s4-1.5 4-3L17 2z" />
        <line x1="6" y1="6" x2="18" y2="6" />
        <path d="M12 2v4" />
      </svg>
    );
  } else if (normalized.includes('sổ') || normalized.includes('sách') || normalized.includes('tập')) {
    svgIcon = (
      // Notebook / Planner Icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <line x1="8" y1="6" x2="16" y2="6" strokeWidth="1.5" />
        <line x1="8" y1="10" x2="16" y2="10" strokeWidth="1.5" />
        <line x1="8" y1="14" x2="14" y2="14" strokeWidth="1.5" />
      </svg>
    );
  } else if (normalized.includes('áo') || normalized.includes('thun') || normalized.includes('t-shirt') || normalized.includes('vải')) {
    svgIcon = (
      // Apparel / T-Shirt Icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2">
        <path d="M20.38 3.46L16 6a2 2 0 0 1-2-2H10a2 2 0 0 1-2 2L3.62 3.46a2 2 0 0 0-2.4 3l4 4a2 2 0 0 1 .78 1.54V19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7a2 2 0 0 1 .78-1.54l4-4a2 2 0 0 0-2.4-3z" />
      </svg>
    );
  } else if (normalized.includes('dù') || normalized.includes('ô') || normalized.includes('mưa')) {
    svgIcon = (
      // Umbrella Icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2">
        <path d="M12 2v20M12 2a10 10 0 0 1 10 10H2a10 10 0 0 1 10-10z" />
        <path d="M12 19a3 3 0 0 1-6 0" />
      </svg>
    );
  } else if (normalized.includes('mũ') || normalized.includes('nón') || normalized.includes('cap')) {
    svgIcon = (
      // Cap / Hat Icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2">
        <path d="M2 18h20" />
        <path d="M12 4a8 8 0 0 1 8 8v6H4v-6a8 8 0 0 1 8-8z" />
        <path d="M12 4V2" />
        <path d="M20 12h3" />
      </svg>
    );
  } else if (normalized.includes('hộp') || normalized.includes('quà') || normalized.includes('box')) {
    svgIcon = (
      // Giftbox Icon
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-1/2 h-1/2">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    );
  }

  const dimensions = {
    sm: 'w-10 h-10 text-xs rounded-xl',
    md: 'w-14 h-14 text-sm rounded-2xl',
    lg: 'w-20 h-20 text-lg rounded-3xl',
  };

  return (
    <div className={`flex items-center justify-center font-bold font-mono tracking-tight shadow-sm overflow-hidden flex-shrink-0 ${dimensions[size]} ${color}`}>
      {svgIcon}
    </div>
  );
};

// Available premium placeholder backdrops for items
export const BG_GRADIENTS = [
  'bg-amber-100 text-amber-600 border border-amber-200/40',
  'bg-emerald-100 text-emerald-600 border border-emerald-200/40',
  'bg-rose-100 text-rose-600 border border-rose-200/40',
  'bg-purple-100 text-purple-600 border border-purple-200/40',
  'bg-indigo-100 text-indigo-600 border border-indigo-200/40',
  'bg-sky-100 text-sky-600 border border-sky-200/40',
  'bg-teal-100 text-teal-600 border border-teal-200/40',
  'bg-pink-100 text-pink-600 border border-pink-200/40',
];
export const getRandomBgColor = (code: string) => {
  const hash = code.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return BG_GRADIENTS[hash % BG_GRADIENTS.length];
};
