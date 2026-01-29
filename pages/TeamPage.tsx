
import React, { useState, useEffect } from 'react';
import { User } from '../types';

const TeamPage: React.FC = () => {
  const [employees, setEmployees] = useState<User[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('onboard_hub_users');
    if (stored) {
      const usersWithPasswords = JSON.parse(stored);
      // Remove passwords before displaying
      const safeUsers = usersWithPasswords.map(({ password, ...user }: any) => user);
      setEmployees(safeUsers);
    }
  }, []);

  return (
    <div className="h-full overflow-y-auto px-8 py-20 scrollbar-hide">
      <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <header className="text-center">
          <h1 className="text-5xl font-bold tracking-tighter text-white mb-4">Team Directory</h1>
          <p className="text-gray-500 text-lg">Connected personnel in the ONBOARD HUB network.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {employees.map((emp, idx) => (
            <div key={idx} className="p-10 rounded-[32px] bg-white/[0.02] border border-white/[0.08] flex flex-col items-center text-center group hover:bg-white/[0.04] transition-all hover:border-white/20">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mb-8 border-2 border-white/5 group-hover:border-[#5E6AD2]/50 transition-all ${
                emp.specialization === 'Backend' ? 'bg-indigo-500/10 text-indigo-400' :
                emp.specialization === 'Frontend' ? 'bg-emerald-500/10 text-emerald-400' :
                'bg-gray-500/10 text-gray-400'
              }`}>
                {emp.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{emp.name}</h3>
              <p className="text-sm text-[#5E6AD2] font-bold uppercase tracking-widest mb-6">{emp.role}</p>
              <div className="w-full pt-6 border-t border-white/5 space-y-3">
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Network Identity</p>
                <p className="text-sm text-gray-400 font-medium truncate px-4">{emp.email}</p>
              </div>
            </div>
          ))}
        </div>

        {employees.length === 0 && (
          <div className="py-24 text-center border border-dashed border-white/10 rounded-[40px]">
            <p className="text-gray-500 italic text-lg">Accessing encrypted personnel data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;
