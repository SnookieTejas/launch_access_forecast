import React from 'react';
import { InfoIcon } from 'lucide-react';
interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  showInfoIcon?: boolean;
}
export function SegmentedControl({
  options,
  value,
  onChange,
  label,
  showInfoIcon = false
}: SegmentedControlProps) {
  return <div className="w-full">
      {label && <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
          {showInfoIcon && <InfoIcon size={14} className="text-gray-500 flex-shrink-0" />}
          {label}
        </label>}
      <div className="inline-flex rounded-lg border border-gray-300 bg-white overflow-hidden">
        {options.map((option, index) => <button key={option} type="button" onClick={() => onChange(option)} className={`px-6 py-2.5 text-sm font-medium transition-all duration-300 ${value === option ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} ${index !== 0 ? 'border-l border-gray-300' : ''}`}>
            {option}
          </button>)}
      </div>
    </div>;
}