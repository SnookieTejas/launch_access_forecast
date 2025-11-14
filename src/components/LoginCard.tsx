import React, { useState } from 'react';
import { MailIcon, LockIcon, HelpCircleIcon } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { RequestAccessModal } from './RequestAccessModal';
import { HelpModal } from './HelpModal';
interface LoginCardProps {
  onLogin: () => void;
}
export function LoginCard({
  onLogin
}: LoginCardProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [showRequestAccess, setShowRequestAccess] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    const newErrors = {
      email: '',
      password: ''
    };
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 500);
  };
  return <>
      <div className="bg-white rounded-2xl shadow-2xl p-10 lg:p-12 w-full max-w-md animate-fadeIn">
        <div className="mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0D0C24] mb-3">
            Welcome, <span className="text-[#E67E22]">User</span>
          </h2>
          <p className="text-gray-600 text-base">
            Sign in to access your forecasting dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input label="Email Address" type="email" placeholder="your.email@company.com" icon={<MailIcon size={20} />} value={email} onChange={e => {
          setEmail(e.target.value);
          setErrors({
            ...errors,
            email: ''
          });
        }} error={errors.email} />

          <Input label="Password" type="password" placeholder="Enter your password" icon={<LockIcon size={20} />} value={password} onChange={e => {
          setPassword(e.target.value);
          setErrors({
            ...errors,
            password: ''
          });
        }} error={errors.password} />

          <Button type="submit" isLoading={isLoading} className="w-full mt-8">
            Login
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
          <button onClick={() => setShowRequestAccess(true)} className="text-[#E67E22] hover:text-[#D35400] font-semibold transition-colors text-sm flex items-center justify-center w-full">
            Request Access →
          </button>

          <div className="bg-gray-50 rounded-lg p-4">
            <button onClick={() => setShowHelp(true)} className="flex items-start space-x-3 text-left w-full group">
              <HelpCircleIcon size={20} className="text-gray-400 group-hover:text-[#E67E22] transition-colors flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-[#0D0C24] transition-colors">
                  Need help?
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  For any queries or related information about this tool, reach
                  out to{' '}
                  <span className="text-[#E67E22] font-medium">xyz@zs.com</span>
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <RequestAccessModal isOpen={showRequestAccess} onClose={() => setShowRequestAccess(false)} />

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </>;
}