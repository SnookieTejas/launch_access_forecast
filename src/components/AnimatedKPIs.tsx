import React, { useEffect, useState } from 'react';
import { TrendingUpIcon, LightbulbIcon, BrainCircuitIcon } from 'lucide-react';
const kpis = [{
  icon: TrendingUpIcon,
  label: 'Robust Access Prediction',
  color: '#10B981' // Green
}, {
  icon: LightbulbIcon,
  label: 'Dynamic Demand Estimation',
  color: '#F59E0B' // Amber
}, {
  icon: BrainCircuitIcon,
  label: 'AI-enabled Data Integration',
  color: '#3B82F6' // Blue
}];
export function AnimatedKPIs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % kpis.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  return <div className="space-y-6 mt-16">
      {kpis.map((kpi, index) => {
      const Icon = kpi.icon;
      const isActive = index === currentIndex;
      return <div key={index} className={`flex items-center space-x-4 transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0 scale-100' : 'opacity-50 translate-x-4 scale-95'}`}>
            <div className={`icon-container ${isActive ? 'active' : ''}`} style={{
          '--icon-color': kpi.color
        } as React.CSSProperties}>
              <Icon className="icon" size={32} strokeWidth={2} />
            </div>
            <span className="text-base font-medium text-white/90">
              {kpi.label}
            </span>
          </div>;
    })}

      <style>{`
        .icon-container {
          position: relative;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .icon-container .icon {
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .icon-container.active {
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .icon-container.active .icon {
          color: var(--icon-color);
          filter: drop-shadow(0 0 8px var(--icon-color));
          animation: icon-bounce 0.7s ease-in-out;
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
          }
        }

        @keyframes icon-bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          25% {
            transform: translateY(-8px) scale(1.1);
          }
          50% {
            transform: translateY(0) scale(1);
          }
          75% {
            transform: translateY(-4px) scale(1.05);
          }
        }
      `}</style>
    </div>;
}