import React, { useState } from 'react';
import { StarIcon, PinIcon, EyeIcon, Edit2Icon, Trash2Icon, CalendarIcon, UserIcon, ClockIcon } from 'lucide-react';
interface ScenarioCardProps {
  id: number;
  title: string;
  tag: string;
  tagColor: 'teal' | 'orange' | 'purple' | 'blue';
  initiatedDate: string;
  createdBy: string;
  lastModified: string;
  lastModifiedBy: string;
  isFavorite?: boolean;
  isPinned?: boolean;
  onCardClick?: (id: number) => void;
}
const tagColors = {
  teal: 'bg-teal-100 text-teal-700',
  orange: 'bg-orange-100 text-orange-700',
  purple: 'bg-purple-100 text-purple-700',
  blue: 'bg-blue-100 text-blue-700'
};
export function ScenarioCard({
  id,
  title,
  tag,
  tagColor,
  initiatedDate,
  createdBy,
  lastModified,
  lastModifiedBy,
  isFavorite = false,
  isPinned = false,
  onCardClick
}: ScenarioCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [pinned, setPinned] = useState(isPinned);
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(id);
    }
  };
  return <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] p-6 group cursor-pointer" onClick={handleCardClick}>
      {/* Title */}
      <h3 className="text-xl font-bold text-[#2E2E3A] mb-3">{title}</h3>

      {/* Tag */}
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${tagColors[tagColor]}`}>
          {tag}
        </span>
      </div>

      {/* Metadata */}
      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <CalendarIcon size={16} className="text-gray-400" />
          <span>
            Initiated:{' '}
            <span className="font-medium text-gray-700">{initiatedDate}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <UserIcon size={16} className="text-gray-400" />
          <span>
            Created by:{' '}
            <span className="font-medium text-gray-700">{createdBy}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <ClockIcon size={16} className="text-gray-400" />
          <span>
            Last Modified:{' '}
            <span className="font-medium text-gray-700">{lastModified}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <UserIcon size={16} className="text-gray-400" />
          <span>
            Last Modified by:{' '}
            <span className="font-medium text-gray-700">{lastModifiedBy}</span>
          </span>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <button onClick={e => {
          e.stopPropagation();
          setPinned(!pinned);
        }} className={`p-2 rounded-lg transition-colors ${pinned ? 'text-[#6C5DD3]' : 'text-gray-400 hover:text-[#6C5DD3]'}`} aria-label="Pin scenario">
            <svg width="20" height="20" viewBox="0 0 24 24" fill={pinned ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </button>
          <button onClick={e => {
          e.stopPropagation();
          setFavorite(!favorite);
        }} className={`p-2 rounded-lg transition-colors ${favorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`} aria-label="Favorite scenario">
            <PinIcon size={20} fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={e => e.stopPropagation()} className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" aria-label="View scenario">
            <EyeIcon size={20} />
          </button>
          <button onClick={e => e.stopPropagation()} className="p-2 rounded-lg text-gray-400 hover:text-[#6C5DD3] hover:bg-purple-50 transition-colors" aria-label="Edit scenario">
            <Edit2Icon size={20} />
          </button>
          <button onClick={e => e.stopPropagation()} className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" aria-label="Delete scenario">
            <Trash2Icon size={20} />
          </button>
        </div>
      </div>
    </div>;
}