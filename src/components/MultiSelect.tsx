import React, { useEffect, useState, useRef } from 'react';
import { ChevronDownIcon, CheckIcon, SearchIcon, XIcon } from 'lucide-react';
interface MultiSelectProps {
  label: string;
  placeholder?: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  required?: boolean;
}
export function MultiSelect({
  label,
  placeholder = 'Select options',
  options,
  value,
  onChange,
  error,
  required = false
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);
  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };
  const handleSelectAll = () => {
    if (value.length === filteredOptions.length && filteredOptions.length > 0) {
      // Deselect all filtered options
      onChange(value.filter(v => !filteredOptions.includes(v)));
    } else {
      // Select all filtered options
      const newValue = [...new Set([...value, ...filteredOptions])];
      onChange(newValue);
    }
  };
  const clearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  // Filter options based on search query
  const filteredOptions = options.filter(option => option.toLowerCase().includes(searchQuery.toLowerCase()));
  const displayText = value.length === 0 ? placeholder : value.length === 1 ? value[0] : `${value.length} selected`;
  const allFilteredSelected = filteredOptions.length > 0 && filteredOptions.every(opt => value.includes(opt));
  return <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative" ref={dropdownRef}>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className={`w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent transition-all duration-300 text-left bg-white ${error ? 'border-red-500' : ''} ${!value.length ? 'text-gray-400' : 'text-gray-900'}`}>
          {displayText}
          <ChevronDownIcon size={20} className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && <div className="absolute z-[1000] w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden animate-fadeIn">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input ref={searchInputRef} type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search analogs..." className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-transparent text-sm" />
                {searchQuery && <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    <XIcon size={16} />
                  </button>}
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-64 overflow-y-auto">
              {/* Select All Option */}
              {filteredOptions.length > 0 && <button type="button" onClick={handleSelectAll} className="w-full px-4 py-3 text-left hover:bg-[#FF5A5F]/10 transition-colors border-b border-gray-200 font-medium text-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${allFilteredSelected ? 'bg-[#FF5A5F] border-[#FF5A5F]' : 'border-gray-300'}`}>
                      {allFilteredSelected && <CheckIcon size={14} className="text-white" />}
                    </div>
                    <span>
                      {searchQuery ? `Select All (${filteredOptions.length})` : 'Select All'}
                    </span>
                  </div>
                </button>}

              {/* Individual Options */}
              {filteredOptions.length > 0 ? filteredOptions.map((option, index) => {
            const isSelected = value.includes(option);
            return <button key={index} type="button" onClick={() => handleToggle(option)} className={`w-full px-4 py-3 text-left hover:bg-[#FF5A5F]/10 transition-colors ${isSelected ? 'bg-[#FF5A5F]/5' : ''}`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-[#FF5A5F] border-[#FF5A5F]' : 'border-gray-300'}`}>
                          {isSelected && <CheckIcon size={14} className="text-white" />}
                        </div>
                        <span className="text-gray-700">{option}</span>
                      </div>
                    </button>;
          }) : <div className="px-4 py-8 text-center text-gray-500">
                  <SearchIcon size={32} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No analogs found</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try a different search term
                  </p>
                </div>}
            </div>

            {/* Results Summary */}
            {searchQuery && filteredOptions.length > 0 && <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                Showing {filteredOptions.length} of {options.length} analogs
              </div>}
          </div>}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>;
}