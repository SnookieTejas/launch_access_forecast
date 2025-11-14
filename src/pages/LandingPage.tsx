import React from 'react';
import { LeftPanel } from '../components/LeftPanel';
import { LoginCard } from '../components/LoginCard';
interface LandingPageProps {
  onLogin: () => void;
}
export function LandingPage({
  onLogin
}: LandingPageProps) {
  return <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Dark Theme - 45% width */}
      <div className="lg:w-[45%] lg:sticky lg:top-0 lg:h-screen">
        <LeftPanel />
      </div>

      {/* Right Panel - Light Theme with Wave Pattern - 55% width */}
      <div className="lg:w-[55%] flex items-center justify-center p-8 lg:p-16 min-h-screen relative overflow-hidden" style={{
      backgroundColor: '#F7F8FA'
    }}>
        {/* Wave pattern with reduced opacity */}
        <div className="absolute inset-0" style={{
        backgroundImage: 'url(https://uploadthingy.s3.us-west-1.amazonaws.com/vEpYjkzo2XGNLuNJDbf5qj/image.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.5
      }} />

        {/* Subtle animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#E67E22] rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-400 rounded-full blur-3xl animate-float" style={{
          animationDelay: '2s'
        }} />
        </div>

        {/* Login Card */}
        <div className="relative z-10 w-full flex justify-center">
          <LoginCard onLogin={onLogin} />
        </div>
      </div>
    </div>;
}