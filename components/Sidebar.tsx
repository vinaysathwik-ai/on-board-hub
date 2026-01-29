
import React from 'react';
import { NavLink } from 'react-router-dom';
import { User } from '../types';

interface SidebarProps {
  user: User | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const roleColor = user?.specialization === 'Backend' ? 'text-indigo-400' : 
                    user?.specialization === 'Frontend' ? 'text-emerald-400' : 'text-violet-400';
  
  const roleBg = user?.specialization === 'Backend' ? 'bg-indigo-500/20' : 
                 user?.specialization === 'Frontend' ? 'bg-emerald-500/20' : 'bg-violet-500/20';

  const coreTerminals = [
    { path: '/assistant', name: 'AI Assistant', icon: 'fa-sparkles' },
    { path: '/team', name: 'Team Directory', icon: 'fa-users' },
    { path: '/getting-started', name: 'Onboarding Guide', icon: 'fa-rocket' },
    { path: '/tech-stack', name: 'Tech Stack', icon: 'fa-microchip' },
  ];

  const supportTerminals = [
    { path: '/overview', name: 'Overview', icon: 'fa-building' },
    { path: '/architecture', name: 'Architecture', icon: 'fa-network-wired' },
    { path: '/faqs', name: 'Help Desk (FAQ)', icon: 'fa-circle-question' },
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-300 border ${
      isActive
        ? `bg-white/[0.08] text-white shadow-[0_0_20px_rgba(255,255,255,0.02)] border-white/10`
        : 'text-gray-400 hover:text-white hover:bg-white/[0.05] border-transparent hover:border-white/[0.05]'
    }`;

  return (
    <aside className="w-64 bg-black/40 border-l border-white/[0.06] backdrop-blur-3xl flex flex-col h-screen sticky top-0 z-50 overflow-y-auto scrollbar-hide">
      <div className="p-6">
        {/* TOP HEADER REMOVED - NOW IN LAYOUT */}
        
        <div className="space-y-8 mt-4">
          <section>
            <p className="px-4 mb-3 text-[10px] font-bold text-gray-600 uppercase tracking-[0.25em]">Terminals</p>
            <nav className="space-y-1.5">
              {coreTerminals.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={navLinkClasses}
                >
                  {({ isActive }) => (
                    <>
                      <i className={`fas ${item.icon} w-5 text-xs ${isActive ? roleColor : 'opacity-40'}`}></i>
                      <span className="text-[13px] font-medium tracking-tight">{item.name}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </section>

          <section>
            <p className="px-4 mb-3 text-[10px] font-bold text-gray-600 uppercase tracking-[0.25em]">Intelligence Base</p>
            <nav className="space-y-1.5">
              {supportTerminals.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={navLinkClasses}
                >
                  {({ isActive }) => (
                    <>
                      <i className={`fas ${item.icon} w-5 text-xs ${isActive ? roleColor : 'opacity-40'}`}></i>
                      <span className="text-[13px] font-medium tracking-tight">{item.name}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </section>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-white/[0.04]">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] group">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-9 h-9 rounded-xl ${roleBg} flex items-center justify-center font-bold ${roleColor} text-xs border border-white/5`}>
              {user?.name?.charAt(0) || '?'}
            </div>
            <div className="overflow-hidden">
              <p className="text-[12px] font-bold text-white truncate leading-tight">{user?.name}</p>
              <p className={`text-[9px] uppercase tracking-widest font-bold opacity-70 ${roleColor}`}>{user?.specialization}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full py-2.5 rounded-xl bg-white/[0.03] hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all text-[10px] font-bold uppercase tracking-widest border border-white/[0.02] hover:border-red-500/20 active:scale-95"
          >
            Terminal Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
