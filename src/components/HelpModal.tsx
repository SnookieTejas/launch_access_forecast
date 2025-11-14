import React from 'react';
import { XIcon, MailIcon, FileTextIcon } from 'lucide-react';
interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function HelpModal({
  isOpen,
  onClose
}: HelpModalProps) {
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-slideUp">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
          <XIcon size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#0D0C24] mb-6">Need Help?</h2>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-[#E67E22]/10 rounded-lg">
              <MailIcon size={24} className="text-[#E67E22]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0D0C24] mb-1">
                Contact Support
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                In case of any queries or related information about this tool,
                please reach out to:
              </p>
              <a href="mailto:xyz@zs.com" className="text-[#E67E22] hover:underline font-medium">
                xyz@zs.com
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FileTextIcon size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0D0C24] mb-1">
                Documentation
              </h3>
              <p className="text-gray-600 text-sm">
                Access user guides and technical documentation for detailed
                information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}