import React, { useState } from 'react';
import { XIcon, MailIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
interface RequestAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export function RequestAccessModal({
  isOpen,
  onClose
}: RequestAccessModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setEmail('');
      setError('');
    }, 2500);
  };
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-slideUp">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" aria-label="Close modal">
          <XIcon size={24} />
        </button>

        {!isSubmitted ? <>
            <h2 className="text-2xl font-bold text-[#0D0C24] mb-2">
              Request Access
            </h2>
            <p className="text-gray-600 mb-6">
              Enter your email and we'll send your request to the admin team.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Email Address" type="email" placeholder="your.email@company.com" icon={<MailIcon size={20} />} value={email} onChange={e => {
            setEmail(e.target.value);
            setError('');
          }} error={error} required />

              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </> : <div className="text-center py-8">
            <div className="mb-4 flex justify-center">
              <CheckCircleIcon size={64} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-[#0D0C24] mb-2">
              Request Sent!
            </h3>
            <p className="text-gray-600">
              Your access request has been sent to the admin team. You'll
              receive an email once approved.
            </p>
          </div>}
      </div>
    </div>;
}