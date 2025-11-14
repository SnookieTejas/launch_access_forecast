import React, { useState } from 'react';
import { FileTextIcon, SearchIcon } from 'lucide-react';
import { Header } from '../components/Header';
import { FilterBar } from '../components/FilterBar';
import { ScenarioCard } from '../components/ScenarioCard';
import { CreateScenarioModal, ScenarioFormData } from '../components/CreateScenarioModal';
const scenarios = [{
  id: 1,
  title: 'Scenario 1',
  tag: 'Base case',
  tagColor: 'teal' as const,
  initiatedDate: '8/23/2025',
  createdBy: 'Siddharth Jain',
  lastModified: '9/17/2025',
  lastModifiedBy: 'Siddharth Jain',
  isFavorite: true,
  isPinned: true
}, {
  id: 2,
  title: 'Scenario 2',
  tag: 'Better efficacy',
  tagColor: 'blue' as const,
  initiatedDate: '8/23/2025',
  createdBy: 'Atul Joshi',
  lastModified: '9/17/2025',
  lastModifiedBy: 'Atul Joshi',
  isPinned: true
}, {
  id: 3,
  title: 'Scenario 3',
  tag: 'Better safety',
  tagColor: 'orange' as const,
  initiatedDate: '8/23/2025',
  createdBy: 'Siddharth Jain',
  lastModified: '9/17/2025',
  lastModifiedBy: 'Siddharth Jain',
  isFavorite: true
}, {
  id: 4,
  title: 'Scenario 4',
  tag: 'Better safety',
  tagColor: 'orange' as const,
  initiatedDate: '8/23/2025',
  createdBy: 'Avinash Satpathy',
  lastModified: '9/17/2025',
  lastModifiedBy: 'Avinash Satpathy',
  isFavorite: true,
  isPinned: true
}, {
  id: 5,
  title: 'Scenario 5',
  tag: 'Better safety',
  tagColor: 'orange' as const,
  initiatedDate: '8/23/2025',
  createdBy: 'Avinash Satpathy',
  lastModified: '9/17/2025',
  lastModifiedBy: 'Avinash Satpathy'
}, {
  id: 6,
  title: 'Scenario 6',
  tag: 'Base case',
  tagColor: 'teal' as const,
  initiatedDate: '8/23/2025',
  createdBy: 'Tejas Mahind',
  lastModified: '9/17/2025',
  lastModifiedBy: 'Tejas Mahind'
}, {
  id: 7,
  title: 'Scenario 7',
  tag: 'Better safety',
  tagColor: 'orange' as const,
  initiatedDate: '8/23/2025',
  createdBy: 'Avinash Satpathy',
  lastModified: '9/17/2025',
  lastModifiedBy: 'Avinash Satpathy'
}, {
  id: 8,
  title: 'Scenario 8',
  tag: 'Better efficacy',
  tagColor: 'blue' as const,
  initiatedDate: '8/23/2025',
  createdBy: 'Tejas Mahind',
  lastModified: '9/17/2025',
  lastModifiedBy: 'Tejas Mahind'
}];
interface DashboardProps {
  onNavigateToSimulation: (formData?: ScenarioFormData) => void;
  onNavigateToScenarioComparison?: (scenarioId: number) => void;
}
export function Dashboard({
  onNavigateToSimulation,
  onNavigateToScenarioComparison
}: DashboardProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const handleCreateScenario = (formData: ScenarioFormData) => {
    setShowCreateModal(false);
    onNavigateToSimulation(formData);
  };
  const handleScenarioCardClick = (scenarioId: number) => {
    // If Scenario 1 is clicked, navigate to Base Case screen in Scenario Comparison
    if (scenarioId === 1 && onNavigateToScenarioComparison) {
      onNavigateToScenarioComparison(scenarioId);
    }
    // If Scenario 2 is clicked, navigate to Better Efficacy screen in Scenario Comparison
    else if (scenarioId === 2 && onNavigateToScenarioComparison) {
      onNavigateToScenarioComparison(scenarioId);
    }
  };
  // Filter scenarios based on search query
  const filteredScenarios = scenarios.filter(scenario => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    // Search in title, tag, created by, and last modified by
    return scenario.title.toLowerCase().includes(query) || scenario.tag.toLowerCase().includes(query) || scenario.createdBy.toLowerCase().includes(query) || scenario.lastModifiedBy.toLowerCase().includes(query) || scenario.initiatedDate.includes(query) || scenario.lastModified.includes(query);
  });
  return <div className="min-h-screen bg-[#F8F9FB] fade-in">
      <Header />

      {/* Main Content */}
      <main className="pt-24 px-8 pb-12 max-w-[1920px] mx-auto">
        {/* Page Title */}
        <div className="flex items-center space-x-3 mb-8">
          <FileTextIcon size={32} className="text-[#6C5DD3]" />
          <h2 className="text-4xl font-bold text-[#2E2E3A]">Scenarios</h2>
        </div>

        {/* Filter Bar */}
        <FilterBar onCreateScenario={() => setShowCreateModal(true)} searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        {/* Scenario Cards Grid */}
        {filteredScenarios.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredScenarios.map((scenario, index) => <div key={scenario.id} className="animate-fadeIn" style={{
          animationDelay: `${index * 0.1}s`
        }}>
                <ScenarioCard {...scenario} onCardClick={handleScenarioCardClick} />
              </div>)}
          </div> : <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center">
              <SearchIcon size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No scenarios found
              </h3>
              <p className="text-gray-500 mb-4">
                No scenarios match your search for "{searchQuery}"
              </p>
              <button onClick={() => setSearchQuery('')} className="text-[#6C5DD3] hover:underline font-medium">
                Clear search
              </button>
            </div>
          </div>}
      </main>

      {/* Create Scenario Modal */}
      <CreateScenarioModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSubmit={handleCreateScenario} />
    </div>;
}