import React from 'react';
interface Tab {
  id: string;
  label: string;
}
interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}
export function TabNavigation({
  tabs,
  activeTab,
  onTabChange
}: TabNavigationProps) {
  return <div className="border-b border-gray-200 bg-white">
      
    </div>;
}