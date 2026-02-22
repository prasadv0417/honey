import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = false }) => {
  const containerClass = fullScreen
    ? "fixed inset-0 min-h-screen z-50 flex items-center justify-center bg-honey-50/80 backdrop-blur-sm"
    : "flex items-center justify-center p-8 w-full";

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-honey-500 animate-spin" />
        <p className="text-brown-800 font-medium animate-pulse font-['Playfair_Display']">Loading Nature's Gold...</p>
      </div>
    </div>
  );
};

export default Loader;
