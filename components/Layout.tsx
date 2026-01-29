
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { User } from '../types';

interface LayoutProps {
  user: User | null;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync state with browser fullscreen events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen attempt blocked by system policy or iframe restrictions.");
      alert("System Blocked: Your current browser environment is restricting native Fullscreen. Please use the 'Open in New Window' button to launch the app in a standalone tab.");
    }
  };

  const openInNewWindow = () => {
    window.open(window.location.href, '_blank');
  };

  return (
    <div className="flex h-screen bg-[#050506] text-[#EDEDEF] overflow-hidden">
      <main className="flex-1 relative flex flex-col min-w-0">
        {/* TOP HEADER BAR */}
        <div className="h-32 flex-shrink-0 bg-[#050506] border-b border-white/[0.08] z-[100] px-10 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center space-x-5">
              <div className="relative w-12 h-12">
                <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-[#00E5FF] opacity-90 blur-[0.5px]"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#5E6AD2] opacity-90 -translate-x-1 translate-y-1 blur-[0.5px]"></div>
              </div>
              <span className="text-3xl font-bold tracking-tighter text-white uppercase">ONBOARD HUB</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={openInNewWindow}
                className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all backdrop-blur-md"
                title="Open Standalone Terminal"
              >
                <i className="fas fa-external-link-alt text-lg"></i>
              </button>

              <button 
                onClick={toggleFullscreen}
                className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all backdrop-blur-md"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-lg`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-hidden relative">
          {children}
        </div>
      </main>
      
      <Sidebar user={user} onLogout={onLogout} />
    </div>
  );
};

export default Layout;
