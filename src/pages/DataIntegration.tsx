import React from 'react';
import { UploadIcon, MapIcon, CheckCircleIcon } from 'lucide-react';
interface DataIntegrationProps {
  activeSubsection: string;
}
export function DataIntegration({
  activeSubsection
}: DataIntegrationProps) {
  const renderContent = () => {
    switch (activeSubsection) {
      case 'upload':
        return <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center space-x-3 mb-6">
                <UploadIcon size={24} className="text-[#FF5A5F]" />
                <h3 className="text-xl font-semibold text-[#0D0C24]">
                  Upload Data
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Upload external data sources to enhance forecasting accuracy.
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-[#FF5A5F] transition-colors cursor-pointer">
                <UploadIcon size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium">
                  Drag and drop files here or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: CSV, XLSX, JSON
                </p>
              </div>
            </div>
          </div>;
      case 'mapping':
        return <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MapIcon size={24} className="text-[#FF5A5F]" />
                <h3 className="text-xl font-semibold text-[#0D0C24]">
                  Mapping View
                </h3>
              </div>
              <p className="text-gray-600">
                Map uploaded data fields to system attributes for proper
                integration.
              </p>
            </div>
          </div>;
      case 'validation':
        return <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircleIcon size={24} className="text-[#FF5A5F]" />
                <h3 className="text-xl font-semibold text-[#0D0C24]">
                  Validation Logs
                </h3>
              </div>
              <p className="text-gray-600">
                Review data validation results and resolve any integration
                issues.
              </p>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="pt-8 px-4 pb-12 max-w-[1400px] mx-auto fade-in">
      {renderContent()}
    </div>;
}