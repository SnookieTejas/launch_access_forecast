import React from 'react';
import { AnimatedKPIs } from './AnimatedKPIs';
export function LeftPanel() {
  return <div className="bg-gradient-to-br from-[#0D0C24] via-[#141438] to-[#0D0C24] text-white px-12 py-16 lg:px-16 lg:py-20 flex flex-col justify-between min-h-screen relative overflow-hidden">
      {/* Enhanced background animation - full coverage */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-80 h-80 bg-[#E67E22] rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '0.5s'
      }} />
        <div className="absolute top-1/2 left-20 w-72 h-72 bg-[#E67E22] rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1.5s'
      }} />
        <div className="absolute bottom-1/4 right-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '2s'
      }} />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse" style={{
        animationDelay: '1s'
      }} />
      </div>

      {/* Main content - vertically centered in top portion */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-xl">
        {/* App Name */}
        <div className="mb-4">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6" style={{
          fontFamily: 'Georgia, serif'
        }}>
            Launch Access Prediction & Demand Forecasting
          </h1>
          <div className="w-24 h-1.5 bg-[#E67E22] rounded-full" />
        </div>

        {/* Animated KPIs */}
        <AnimatedKPIs />
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-12 flex justify-center">
        <p className="text-white/50 text-sm font-medium flex items-center gap-2">
          Powered by
          <img src="/image.png" alt="ZS Logo" className="w-10 h-10 object-contain inline-block" />
        </p>
      </div>
    </div>;
}