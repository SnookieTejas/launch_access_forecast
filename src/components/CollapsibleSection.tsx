import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
interface CollapsibleSectionProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}
export function CollapsibleSection({
  title,
  subtitle,
  icon,
  children,
  defaultOpen = true
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full px-8 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300">
        <div className="flex items-center space-x-4">
          {icon && <div className="text-[#6C5DD3]">{icon}</div>}
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
        </div>
        <ChevronDownIcon size={24} className={`text-gray-400 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-8 py-6 border-t border-gray-100">{children}</div>
      </div>
    </div>;
}