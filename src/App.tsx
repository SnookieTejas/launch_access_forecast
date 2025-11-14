import React, { useEffect, useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { SimulationInputs } from './pages/SimulationInputs';
import { AccessDemandPrediction } from './pages/AccessDemandPrediction';
import { DataIntegration } from './pages/DataIntegration';
import { AppLayout } from './components/AppLayout';
import { ScenarioFormData } from './components/CreateScenarioModal';
type Screen = 'landing' | 'dashboard' | 'app';
type Module = 'simulation' | 'access' | 'integration';
const moduleConfig = {
  simulation: {
    title: 'Simulation Inputs',
    subsections: [{
      id: 'asset',
      label: 'Asset Attributes'
    }, {
      id: 'analog',
      label: 'Analog Selection'
    }]
  },
  access: {
    title: 'Access and Demand Prediction',
    subsections: [{
      id: 'forecast',
      label: 'Access Forecast'
    }, {
      id: 'sensitivity',
      label: 'Scenario Comparison'
    }, {
      id: 'comparison',
      label: 'Market Share Comparison'
    }]
  },
  integration: {
    title: 'Data Integration',
    subsections: [{
      id: 'upload',
      label: 'Upload Data'
    }, {
      id: 'mapping',
      label: 'Mapping View'
    }, {
      id: 'validation',
      label: 'Validation Logs'
    }]
  }
};
export function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [activeModule, setActiveModule] = useState<Module>('simulation');
  const [activeSubsection, setActiveSubsection] = useState('asset');
  const [scenarioFormData, setScenarioFormData] = useState<ScenarioFormData | null>(null);
  const [selectedAnalogs, setSelectedAnalogs] = useState<string[]>([]);
  const [initialScenarioTab, setInitialScenarioTab] = useState<string>('base');
  // Scroll to top when screen changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);
  // Scroll to top when module changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeModule]);
  // Scroll to top when subsection changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSubsection]);
  const handleLogin = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setCurrentScreen('dashboard');
      setIsFadingOut(false);
    }, 500);
  };
  const handleNavigateToSimulation = (formData?: ScenarioFormData) => {
    setIsFadingOut(true);
    // Store the form data if provided
    if (formData) {
      setScenarioFormData(formData);
    }
    setTimeout(() => {
      setCurrentScreen('app');
      setActiveModule('simulation');
      setActiveSubsection('asset');
      setIsFadingOut(false);
    }, 300);
  };
  const handleNavigateToScenarioComparison = (scenarioId: number) => {
    setIsFadingOut(true);
    // Map scenario ID to the appropriate tab
    let targetTab = 'base';
    if (scenarioId === 1) {
      targetTab = 'base';
    } else if (scenarioId === 2) {
      targetTab = 'scenario2';
    }
    setInitialScenarioTab(targetTab);
    setTimeout(() => {
      setCurrentScreen('app');
      setActiveModule('access');
      setActiveSubsection('sensitivity');
      setIsFadingOut(false);
    }, 300);
  };
  const handleBackToDashboard = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setCurrentScreen('dashboard');
      setIsFadingOut(false);
    }, 300);
  };
  const handleModuleChange = (module: Module) => {
    setActiveModule(module);
    setActiveSubsection(moduleConfig[module].subsections[0].id);
  };
  const handleNavigateToAccessForecast = (analogs: string[]) => {
    setSelectedAnalogs(analogs);
    setActiveModule('access');
    setActiveSubsection('forecast');
  };
  const renderModuleContent = () => {
    switch (activeModule) {
      case 'simulation':
        return <SimulationInputs activeSubsection={activeSubsection} onSubsectionChange={setActiveSubsection} onNavigateToAccess={handleNavigateToAccessForecast} initialFormData={scenarioFormData} />;
      case 'access':
        return <AccessDemandPrediction activeSubsection={activeSubsection} selectedAnalogs={selectedAnalogs} initialScenarioTab={initialScenarioTab} />;
      case 'integration':
        return <DataIntegration activeSubsection={activeSubsection} />;
      default:
        return null;
    }
  };
  if (currentScreen === 'app') {
    const config = moduleConfig[activeModule];
    return <div className={isFadingOut ? 'fade-out' : ''}>
        <AppLayout activeModule={activeModule} onModuleChange={handleModuleChange} moduleTitle={config.title} subsections={config.subsections} activeSubsection={activeSubsection} onSubsectionChange={setActiveSubsection} onBack={handleBackToDashboard} showBackButton={true}>
          {renderModuleContent()}
        </AppLayout>
      </div>;
  }
  if (currentScreen === 'dashboard') {
    return <div className={isFadingOut ? 'fade-out' : ''}>
        <Dashboard onNavigateToSimulation={handleNavigateToSimulation} onNavigateToScenarioComparison={handleNavigateToScenarioComparison} />
      </div>;
  }
  return <div className={isFadingOut ? 'fade-out' : ''}>
      <LandingPage onLogin={handleLogin} />
    </div>;
}