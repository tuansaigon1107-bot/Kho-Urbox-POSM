import React from 'react';
import { motion } from 'motion/react';
import { Zap, Target, Rocket } from 'lucide-react';
import { UrboxLogoFull } from './UrboxLogo';

interface SplashViewProps {
  onStart: () => void;
}

export const SplashView: React.FC<SplashViewProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen max-w-lg mx-auto bg-white px-6 py-8 select-none font-sans overflow-hidden">
      {/* Top Margin/Spacing */}
      <div className="w-full flex justify-center mt-2">
        <UrboxLogoFull size={44} showText={true} />
      </div>

      {/* Main Illustration Area (Warehouse, Truck, Clipboard) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full aspect-[4/3] flex items-center justify-center my-6"
      >
        <div className="absolute inset-0 bg-radial from-purple-50 via-transparent to-transparent rounded-full scale-110 pointer-events-none" />
        
        {/* Customized SVG Artwork replicating the mockup */}
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px]" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stylized background city skyline & clouds */}
          <path d="M20 220 L20 180 L40 180 L40 150 L60 150 L60 190 L90 190 L90 140 L110 140 L110 170 L140 170 L140 120 L160 120 L160 220 Z" fill="#F3F0FA" />
          <path d="M380 220 L380 160 L360 160 L360 130 L330 130 L330 180 L310 180 L310 150 L280 150 L280 220 Z" fill="#F3F0FA" />
          <ellipse cx="200" cy="80" rx="35" ry="12" fill="#EAE5F7" opacity="0.6"/>
          <ellipse cx="60" cy="70" rx="25" ry="8" fill="#EAE5F7" opacity="0.4"/>
          <ellipse cx="340" cy="90" rx="30" ry="10" fill="#EAE5F7" opacity="0.4"/>

          {/* Big Warehouse Building */}
          {/* Base */}
          <rect x="100" y="80" width="180" height="110" rx="8" fill="#ECE9F7" stroke="#7C3AED" strokeWidth="2.5" />
          {/* Roof */}
          <path d="M85 85 L190 25 C195 22 205 22 210 25 L315 85" stroke="#7C3AED" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M85 85 L190 25 C195 22 205 22 210 25 L315 85" fill="#E3DCF5" />
          {/* Triangular gap fill */}
          <path d="M100 80 L190 26.5 C195 23.5 205 23.5 210 26.5 L280 80 Z" fill="#6D28D9" opacity="0.9" />
          
          {/* Warehouse Window */}
          <rect x="180" y="45" width="40" height="25" rx="3" fill="white" stroke="#7C3AED" strokeWidth="2" />
          <line x1="200" y1="45" x2="200" y2="70" stroke="#7C3AED" strokeWidth="2" />

          {/* Large shutter garage door */}
          <rect x="135" y="110" width="110" height="80" rx="4" fill="#1E1E2F" />
          <line x1="135" y1="125" x2="245" y2="125" stroke="#373752" strokeWidth="1.5" />
          <line x1="135" y1="140" x2="245" y2="140" stroke="#373752" strokeWidth="1.5" />
          <line x1="135" y1="155" x2="245" y2="155" stroke="#373752" strokeWidth="1.5" />
          <line x1="135" y1="170" x2="245" y2="170" stroke="#373752" strokeWidth="1.5" />

          {/* Loading dock base ground */}
          <rect x="15" y="190" width="370" height="15" rx="4" fill="#F1EEFA" />
          <line x1="15" y1="190" x2="385" y2="190" stroke="#7C3AED" strokeWidth="3" />

          {/* Stack of boxes on the right loading dock */}
          <rect x="235" y="145" width="25" height="25" rx="2" fill="#E0A96D" stroke="#7C3AED" strokeWidth="2" />
          <line x1="235" y1="151" x2="260" y2="151" stroke="#C69155" strokeWidth="1.5" />
          <rect x="262" y="148" width="22" height="22" rx="2" fill="#D39E5D" stroke="#7C3AED" strokeWidth="2" />
          
          <rect x="225" y="125" width="20" height="20" rx="2" fill="#E2B176" stroke="#7C3AED" strokeWidth="2" />
          <rect x="247" y="122" width="24" height="24" rx="2" fill="#CD9651" stroke="#7C3AED" strokeWidth="2" />
          <rect x="273" y="132" width="18" height="18" rx="2" fill="#D39E5D" stroke="#7C3AED" strokeWidth="2" />

          {/* Checklist clipboard graphic (Mockup far right) */}
          <g transform="translate(300, 110)">
            <rect x="0" y="0" width="60" height="85" rx="6" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2.5" />
            <rect x="15" y="-10" width="30" height="16" rx="3" fill="#D5C9F9" stroke="#7C3AED" strokeWidth="2" />
            {/* Checked items */}
            <circle cx="15" cy="20" r="4" fill="#E9D5FF" stroke="#7C3AED" strokeWidth="1.5" />
            <path d="M13 20 L15 22 L18 17" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="25" y1="20" x2="50" y2="20" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />

            <circle cx="15" cy="40" r="4" fill="#E9D5FF" stroke="#7C3AED" strokeWidth="1.5" />
            <path d="M13 40 L15 42 L18 37" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="25" y1="40" x2="48" y2="40" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />

            <circle cx="15" cy="61" r="4" fill="#E9D5FF" stroke="#7C3AED" strokeWidth="1.5" />
            <path d="M13 61 L15 63 L18 58" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="25" y1="61" x2="45" y2="61" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Purple Urbox Delivery Cargo Truck on left */}
          <g transform="translate(68, 126)">
            {/* Truck Cab / Cabin */}
            <path d="M90 20 L112 20 C118 20 124 25 124 35 L124 58 L90 58 Z" fill="white" stroke="#7C3AED" strokeWidth="2.5" />
            <path d="M106 20 L122 35 L122 42 L106 42 Z" fill="#EAE5F7" />
            <circle cx="114" cy="31" r="3" fill="#7C3AED" />
            {/* Truck bumper/grill */}
            <rect x="118" y="52" width="8" height="6" fill="#9CA3AF" />

            {/* Truck Box Container */}
            <rect x="0" y="0" width="92" height="58" rx="6" fill="#7C3AED" stroke="#4C1D95" strokeWidth="2.5" />
            {/* Accent white stripes like logo layout */}
            <line x1="10" y1="12" x2="82" y2="12" stroke="#D8B4FE" strokeWidth="1.5" opacity="0.3"/>
            
            {/* Small Rainbow hexagon on truck */}
            <g transform="translate(14, 20) scale(0.18)">
              {/* Yellow (Top) */}
              <path d="M60 12 L96 32 L60 52 L24 32 Z" fill="#FBBF24" />
              {/* Green */}
              <path d="M24 38 L60 58 L96 38 V48 L60 68 L24 48 Z" fill="#34D399" />
              {/* Pink */}
              <path d="M24 54 L60 74 L96 54 V64 L60 84 L24 64 Z" fill="#F472B6" />
              {/* Purple */}
              <path d="M24 70 L60 90 L96 70 V80 L60 100 L24 80 Z" fill="#A78BFA" />
            </g>
            
            {/* Custom mini letters URBOX on truck */}
            <text x="36" y="34" fill="white" fontSize="13" fontFamily="Impact, sans-serif" letterSpacing="0.5">URBOX</text>
            <text x="28" y="47" fill="#E9D5FF" fontSize="7" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">POSM</text>

            {/* Wheels & undercarriage details */}
            <rect x="15" y="58" width="15" height="6" fill="#374151" />
            <rect x="70" y="58" width="15" height="6" fill="#374151" />
            <circle cx="25" cy="60" r="11" fill="#1F2937" stroke="#7C3AED" strokeWidth="2.5" />
            <circle cx="25" cy="60" r="4" fill="#D1D5DB" />
            <circle cx="78" cy="60" r="11" fill="#1F2937" stroke="#7C3AED" strokeWidth="2.5" />
            <circle cx="78" cy="60" r="4" fill="#D1D5DB" />
            <circle cx="108" cy="60" r="11" fill="#1F2937" stroke="#7C3AED" strokeWidth="2.5" />
            <circle cx="108" cy="60" r="4" fill="#D1D5DB" />
          </g>

          {/* Plant on Left Dock */}
          <g transform="translate(35, 150)">
            {/* Pot */}
            <path d="M5 25 L8 40 L18 40 L21 25 Z" fill="#E5E7EB" stroke="#7C3AED" strokeWidth="1.5" />
            {/* Leaves */}
            <path d="M13 25 C10 12, 5 15, 3 25" fill="#8B5CF6" />
            <path d="M13 25 C16 8, 22 12, 23 25" fill="#A78BFA" />
            <path d="M13 25 C8 4, 18 4, 13 25" fill="#7C3AED" />
          </g>
        </svg>
      </motion.div>

      {/* Headings */}
      <div className="text-center flex flex-col items-center">
        <h3 className="text-gray-500 text-sm md:text-base font-medium tracking-wide">
          Chào mừng bạn đến với
        </h3>
        <h1 className="text-[#6D28D9] text-3xl md:text-4xl font-extrabold mt-1 tracking-tight">
          URBOX POSM!
        </h1>
        <p className="text-gray-500 text-xs mt-2 max-w-[280px]">
          Giải pháp quản lý kho ấn phẩm hiệu quả – chính xác – nhanh chóng
        </p>
      </div>

      {/* Triplets of icons representing values in circles as shown in mockup */}
      <div className="grid grid-cols-3 gap-1 w-full max-w-sm mt-6 px-1">
        <div className="flex flex-col items-center">
          <div className="w-11 h-11 rounded-2xl bg-[#8B5CF6] text-white flex items-center justify-center shadow-md shadow-purple-200">
            <Zap size={18} />
          </div>
          <span className="text-xs font-semibold text-gray-700 mt-2">Hiệu quả</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-11 h-11 rounded-2xl bg-[#EC4899] text-white flex items-center justify-center shadow-md shadow-pink-200">
            <Target size={18} />
          </div>
          <span className="text-xs font-semibold text-gray-700 mt-2">Chính xác</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-11 h-11 rounded-2xl bg-[#10B981] text-white flex items-center justify-center shadow-md shadow-emerald-200">
            <Rocket size={18} />
          </div>
          <span className="text-xs font-semibold text-gray-700 mt-2">Nhanh chóng</span>
        </div>
      </div>

      {/* Pagination indicators (Carousel visual treatment matching mockup dots) */}
      <div className="flex justify-center items-center gap-1.5 mt-6">
        <span className="w-4 h-1.5 rounded-full bg-[#7C3AED]"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
      </div>

      {/* Bắt đầu Button */}
      <div className="w-full max-w-sm mt-6 mb-2">
        <button
          onClick={onStart}
          id="btn-get-started"
          className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-purple-200 text-center transition-all cursor-pointer"
        >
          Bắt đầu
        </button>
      </div>
    </div>
  );
};
