import React from 'react';
import { InfoIcon } from 'lucide-react';
interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  yesLabel?: string;
  noLabel?: string;
  showInfoIcon?: boolean;
}
export function Toggle({
  label,
  checked,
  onChange,
  yesLabel = 'Yes',
  noLabel = 'No',
  showInfoIcon = false
}: ToggleProps) {
  return <div className="w-full">
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
        {showInfoIcon && <InfoIcon size={14} className="text-gray-500 flex-shrink-0" />}
        {label}
      </label>
      <div className="inline-flex rounded-lg border border-gray-300 bg-white overflow-hidden">
        <button type="button" onClick={() => onChange(true)} className={`px-8 py-2.5 text-sm font-medium transition-all duration-300 ${checked ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
          {yesLabel}
        </button>
        <button type="button" onClick={() => onChange(false)} className={`px-8 py-2.5 text-sm font-medium transition-all duration-300 border-l border-gray-300 ${!checked ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
          {noLabel}
        </button>
      </div>
    </div>;
}