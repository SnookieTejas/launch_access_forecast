import React, { useState } from 'react';
import { SearchIcon, ChevronDownIcon, PlusIcon } from 'lucide-react';
interface FilterBarProps {
  onCreateScenario: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}
export function FilterBar({
  onCreateScenario,
  searchQuery,
  onSearchChange
}: FilterBarProps) {
  return <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
      {/* Left: Filter and Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
        {/* Filter Dropdown */}
        <button className="flex items-center space-x-2 px-4 py-2.5 border-2 border-[#6C5DD3] text-[#6C5DD3] rounded-lg hover:bg-[#6C5DD3] hover:text-white transition-all duration-300 font-medium">
          <span>Filter</span>
          <ChevronDownIcon size={18} />
        </button>

        {/* Search Bar */}
        <div className="relative w-full sm:w-96">
          <SearchIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search scenario..." value={searchQuery} onChange={e => onSearchChange(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-transparent transition-all" />
        </div>
      </div>

      {/* Right: Create Button */}
      <button onClick={onCreateScenario} className="flex items-center space-x-2 px-6 py-2.5 bg-[#6C5DD3] text-white rounded-lg hover:bg-[#5a4ec4] hover:scale-105 transition-all duration-300 font-semibold shadow-md hover:shadow-lg">
        <PlusIcon size={20} />
        <span>Create new scenario</span>
      </button>
    </div>;
}