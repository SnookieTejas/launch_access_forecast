import React from 'react';
import { ChevronLeft, ChevronRight, FlaskConical, TrendingUp, Database, Settings } from 'lucide-react';
interface LeftNavigationProps {
  activeModule: 'simulation' | 'access' | 'integration';
  onModuleChange: (module: 'simulation' | 'access' | 'integration') => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}
const modules = [{
  id: 'simulation' as const,
  label: 'Simulation Inputs',
  icon: FlaskConical
}, {
  id: 'access' as const,
  label: 'Prediction',
  icon: TrendingUp
}, {
  id: 'integration' as const,
  label: 'Data Integration',
  icon: Database
}];
export function LeftNavigation({
  activeModule,
  onModuleChange,
  isCollapsed,
  onToggleCollapse
}: LeftNavigationProps) {
  return <nav className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-[#0D0C24] to-[#1B1B35] text-white shadow-2xl transition-all duration-300 ease-in-out z-40 ${isCollapsed ? 'w-[72px]' : 'w-[222px]'}`}>
      {/* Collapse/Expand Arrow Button on Edge */}
      <button onClick={onToggleCollapse} className="absolute -right-3 top-14 w-6 h-10 bg-gradient-to-b from-[#0D0C24] to-[#1B1B35] border border-[#2E2E45] rounded-r-lg hover:bg-[#FF5A5F]/10 transition-all duration-200 hover:scale-105 flex items-center justify-center shadow-lg z-50" title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
        {isCollapsed ? <ChevronRight className="w-4 h-4 text-white" /> : <ChevronLeft className="w-4 h-4 text-white" />}
      </button>

      {/* Top Section - Header */}
      <div className="px-4 py-3 border-b border-[#2E2E45]">
        <div className="flex items-center gap-3">
          {!isCollapsed && <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <img src="/image.png" alt="ZS Logo" className="w-12 h-12 object-contain" />
              </div>
              <div className="overflow-hidden">
                {/* <h1 className="text-white  text-sm leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Launch Access Prediction
                </h1> */}
                <div className="relative group">
                  <p className="text-gray-400 text-xs leading-tight whitespace-nowrap overflow-hidden text-ellipsis group-hover:opacity-60" title="Launch Access Prediction & Demand Forecasting">
                    Launch Access Prediction<br />
                    & Demand Forecasting
                  </p>
                  <span className="absolute left-0 top-full mt-1 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    Launch Access Prediction & Demand Forecasting
                  </span>
                </div>
              </div>
            </div>}

          {isCollapsed && <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
              <img src="/image.png" alt="ZS Logo" className="w-12 h-12 object-contain" />
            </div>}
        </div>
      </div>

      {/* Main Navigation Section */}
      <div className={`py-6 px-3 space-y-2 flex-1 ${isCollapsed ? 'overflow-hidden' : 'overflow-y-auto'}`}>
        {modules.map(module => {
        const Icon = module.icon;
        const isActive = activeModule === module.id;
        return <button key={module.id} onClick={() => onModuleChange(module.id)} className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative ${isActive ? 'bg-[#FF5A5F]/10 text-white font-semibold' : 'text-[#B5B5C5] hover:text-white hover:bg-white/5 font-medium'} ${!isCollapsed && 'hover:scale-[1.02]'}`} title={isCollapsed ? module.label : ''}>
              {/* Active indicator - left border */}
              {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FF5A5F] rounded-r-full" />}

              <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${isActive ? 'text-[#FF5A5F]' : 'text-[#B5B5C5] group-hover:text-white'} ${isCollapsed ? 'mx-auto' : ''}`} />

              {!isCollapsed && <span className="text-sm truncate">{module.label}</span>}

              {/* Tooltip for collapsed state */}
              {isCollapsed && <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                  {module.label}
                </div>}
            </button>;
      })}
      </div>

      {/* Bottom Section - Settings */}
      <div className="px-3 py-4 border-t border-[#2E2E45]">
        <button className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group text-[#B5B5C5] hover:text-white hover:bg-white/5 font-medium relative ${!isCollapsed && 'hover:scale-[1.02]'}`} title={isCollapsed ? 'Settings' : ''}>
          <Settings className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 text-[#B5B5C5] group-hover:text-white ${isCollapsed ? 'mx-auto' : ''}`} />
          {!isCollapsed && <span className="text-sm">Settings</span>}

          {/* Tooltip for collapsed state */}
          {isCollapsed && <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg">
              Settings
            </div>}
        </button>
      </div>
    </nav>;
}