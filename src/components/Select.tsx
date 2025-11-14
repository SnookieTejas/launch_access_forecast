import React, { useEffect, useState, useRef } from "react";
import { ChevronDownIcon, InfoIcon } from "lucide-react";
interface SelectProps {
  label: string;
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  showInfoIcon?: boolean;
}
export function Select({
  label,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  error,
  required = false,
  icon,
  disabled = false,
  showInfoIcon = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSelect = (option: string) => {
    if (!disabled) {
      onChange(option);
      setIsOpen(false);
    }
  };
  return (
    <div className="w-full">
      {label && (
        <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
          {showInfoIcon && (
            <InfoIcon size={14} className="text-gray-500 flex-shrink-0" />
          )}
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-4 py-3 ${
            icon ? "pl-10" : ""
          } pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C5DD3] focus:border-transparent transition-all duration-300 text-left ${
            error ? "border-red-500" : ""
          } ${!value ? "text-gray-400" : "text-gray-900"} ${
            disabled
              ? "bg-gray-100 cursor-not-allowed opacity-60"
              : "bg-white cursor-pointer"
          }`}
        >
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          {value || placeholder}
          <ChevronDownIcon
            size={20}
            className={`absolute right-3 top-[25px] transform -translate-y-1/2 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && !disabled && (
          <div className=" z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.length > 0 ? (
              options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-3 text-left hover:bg-[#6C5DD3]/10 transition-colors ${
                    value === option
                      ? "bg-[#6C5DD3]/20 text-[#6C5DD3] font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {option}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-sm">
                No options available
              </div>
            )}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
