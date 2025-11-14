import React from 'react';
import { HomeIcon } from 'lucide-react';
interface HeaderProps {
  onHomeClick?: () => void;
}
export function Header({
  onHomeClick
}: HeaderProps) {
  return <header className="bg-gradient-to-r from-[#0D0C24] via-[#141438] to-[#0D0C24] text-white px-8 py-4 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        {/* Left: Logo + App Name */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {/* ZS Logo */}
            <div className="w-16 h-16 rounded flex items-center justify-center">
              <img src="/image.png" alt="ZS Logo" className="w-16 h-16 object-contain" />
            </div>
            <div className="h-8 w-px bg-white/30" />
          </div>
          <h1 className="text-xl tracking-tight">
            Launch Access Prediction & Demand Forecasting
          </h1>
        </div>

        {/* Right: Home Icon + User Avatar */}
        <div className="flex items-center space-x-4">
          {/* Home Icon Button - Only show if onHomeClick is provided */}
          {onHomeClick && <button onClick={onHomeClick} className="home-icon-button" aria-label="Go to Dashboard">
              <HomeIcon className="w-5 h-5" />
            </button>}

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-white/90">Username</span>
            <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold">
              U
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .home-icon-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .home-icon-button:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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