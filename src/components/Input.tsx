import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon, InfoIcon } from 'lucide-react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  showInfoIcon?: boolean;
}
export function Input({
  label,
  icon,
  error,
  type,
  className = '',
  showInfoIcon = false,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  return <div className="w-full">
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-2">
        {showInfoIcon && <InfoIcon size={14} className="text-gray-500 flex-shrink-0" />}
        {label}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>}
        <input type={inputType} className={`w-full px-4 py-3 ${icon ? 'pl-10' : ''} ${isPassword ? 'pr-10' : ''} border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E67E22] focus:border-transparent transition-all duration-300 ${error ? 'border-red-500' : ''} ${className}`} {...props} />
        {isPassword && <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
          </button>}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>;
}