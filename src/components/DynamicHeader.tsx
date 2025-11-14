import React from 'react';
import { InfoIcon, BellIcon, HomeIcon } from 'lucide-react';
interface Subsection {
  id: string;
  label: string;
}
interface DynamicHeaderProps {
  moduleTitle: string;
  subsections: Subsection[];
  activeSubsection: string;
  onSubsectionChange: (id: string) => void;
  onBack?: () => void;
  onHomeClick?: () => void;
}
export function DynamicHeader({
  moduleTitle,
  subsections,
  activeSubsection,
  onSubsectionChange,
  onBack,
  onHomeClick
}: DynamicHeaderProps) {
  return <header className="bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar with Home Icon */}
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">{moduleTitle}</h1>
        </div>

        {/* Right side with Home Icon */}
        <div className="flex items-center space-x-4">
          {onHomeClick && <button onClick={onHomeClick} className="home-icon-button" aria-label="Go to Dashboard">
              <HomeIcon className="w-5 h-5" />
            </button>}
        </div>
      </div>

      {/* Subsection Tabs */}
      {subsections.length > 0 && <div className="px-4 flex items-center space-x-1 border-t border-gray-100">
          {subsections.map(subsection => {
        const isActive = activeSubsection === subsection.id;
        return <button key={subsection.id} onClick={() => onSubsectionChange(subsection.id)} className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 ${isActive ? 'text-[#FF5A5F]' : 'text-gray-600 hover:text-gray-900'}`}>
                {subsection.label}

                {/* Active underline */}
                {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF5A5F] rounded-t-full animate-slide-in" />}
              </button>;
      })}
        </div>}

      <style>{`
        .home-icon-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 90, 95, 0.1);
          border: 1px solid rgba(255, 90, 95, 0.2);
          border-radius: 8px;
          color: #FF5A5F;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .home-icon-button:hover {
          background: rgba(255, 90, 95, 0.2);
          border-color: rgba(255, 90, 95, 0.3);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(255, 90, 95, 0.2);
        }

        .home-icon-button:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .home-icon-button {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </header>;
}