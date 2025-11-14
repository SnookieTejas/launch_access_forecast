import React, { useState } from 'react';
import { LeftNavigation } from './LeftNavigation';
import { DynamicHeader } from './DynamicHeader';
interface Subsection {
  id: string;
  label: string;
}
interface AppLayoutProps {
  activeModule: 'simulation' | 'access' | 'integration';
  onModuleChange: (module: 'simulation' | 'access' | 'integration') => void;
  moduleTitle: string;
  subsections: Subsection[];
  activeSubsection: string;
  onSubsectionChange: (id: string) => void;
  onBack?: () => void;
  showBackButton?: boolean;
  children: React.ReactNode;
}
export function AppLayout({
  activeModule,
  onModuleChange,
  moduleTitle,
  subsections,
  activeSubsection,
  onSubsectionChange,
  onBack,
  showBackButton = false,
  children
}: AppLayoutProps) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  return <div className="min-h-screen bg-[#F8F9FB] flex">
      {/* Left Navigation */}
      <LeftNavigation activeModule={activeModule} onModuleChange={onModuleChange} isCollapsed={isNavCollapsed} onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)} />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isNavCollapsed ? 'ml-[72px]' : 'ml-[222px]'}`}>
        {/* Dynamic Header */}
        <DynamicHeader moduleTitle={moduleTitle} subsections={subsections} activeSubsection={activeSubsection} onSubsectionChange={onSubsectionChange} onBack={onBack} onHomeClick={onBack} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>;
}