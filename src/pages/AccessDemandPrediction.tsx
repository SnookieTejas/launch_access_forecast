import React from 'react';
import { LineChartIcon, TrendingUpIcon, BarChart3Icon } from 'lucide-react';
import { AccessForecast } from './AccessForecast';
import { MarketShareComparison } from './MarketShareComparison';
import { ScenarioComparison } from './ScenarioComparison';
interface AccessDemandPredictionProps {
  activeSubsection: string;
  selectedAnalogs?: string[];
  initialScenarioTab?: string;
}
export function AccessDemandPrediction({
  activeSubsection,
  selectedAnalogs = [],
  initialScenarioTab = 'base'
}: AccessDemandPredictionProps) {
  const renderContent = () => {
    switch (activeSubsection) {
      case 'forecast':
        return <AccessForecast selectedAnalogs={selectedAnalogs} />;
      case 'sensitivity':
        return <ScenarioComparison initialTab={initialScenarioTab} />;
      case 'comparison':
        return <MarketShareComparison />;
      default:
        return null;
    }
  };
  // Remove padding wrapper for comparison and scenario views to allow full-width layout
  if (activeSubsection === 'comparison' || activeSubsection === 'sensitivity') {
    return <div className="fade-in">{renderContent()}</div>;
  }
  return <div className="pt-8 px-4 pb-12 max-w-[1400px] mx-auto fade-in">
      {renderContent()}
    </div>;
}