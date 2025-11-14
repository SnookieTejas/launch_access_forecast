import React, { useState } from 'react';
import { InfoIcon } from 'lucide-react';
interface RangeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  showValue?: boolean;
  showInfoIcon?: boolean;
}
export function RangeSlider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  showValue = true,
  showInfoIcon = false
}: RangeSliderProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const percentage = (value - min) / (max - min) * 100;
  // Calculate gradient color based on value
  const getGradientColor = (val: number) => {
    if (val < 25) return '#EF4444'; // red
    if (val < 50) return '#F97316'; // orange
    if (val < 75) return '#EAB308'; // yellow
    return '#10B981'; // green
  };
  const currentColor = getGradientColor(value);
  return <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
          {showInfoIcon && <InfoIcon size={14} className="text-gray-500 flex-shrink-0" />}
          {label}
        </label>
        {showValue && <span className="text-lg font-bold text-gray-900 transition-all duration-300">
            {value}
          </span>}
      </div>
      <div className="relative">
        {/* Tooltip */}
        {showTooltip && <div className="absolute -top-10 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg animate-fadeIn" style={{
        left: `calc(${percentage}% - 40px)`
      }}>
            Current value: {value}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
          </div>}

        {/* Slider Track */}
        <div className="relative h-2 rounded-full bg-gray-200 overflow-hidden">
          <div className="absolute h-full rounded-full transition-all duration-300 ease-in-out" style={{
          width: `${percentage}%`,
          background: `linear-gradient(to right, #EF4444 0%, #F97316 25%, #EAB308 50%, #10B981 100%)`
        }} />
        </div>

        {/* Slider Input */}
        <input type="range" min={min} max={max} value={value} onChange={e => onChange(Number(e.target.value))} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} className="absolute top-0 w-full h-2 opacity-0 cursor-pointer" style={{
        marginTop: '0'
      }} />

        {/* Custom Handle */}
        <div className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 ease-in-out" style={{
        left: `${percentage}%`,
        filter: showTooltip ? 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' : 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
      }}>
          <div className="w-5 h-5 rounded-full bg-white border-3 transition-all duration-300" style={{
          borderWidth: '3px',
          borderColor: currentColor,
          transform: showTooltip ? 'scale(1.2)' : 'scale(1)'
        }} />
        </div>

        {/* Labels */}
        <div className="flex justify-between text-xs text-gray-500 mt-3 px-1">
          <span>Very low</span>
          <span>At parity</span>
          <span>High</span>
        </div>
      </div>
    </div>;
}