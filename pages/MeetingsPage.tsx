
import React, { useState, useEffect } from 'react';
import { Meeting } from '../types';
import { Database } from '../services/database';

const MeetingsPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    Database.getMeetings().then(setMeetings);
  }, []);

  const handleJoin = (id: string, link: string) => {
    window.open(link, '_blank');
    setMeetings(prev => prev.map(m => 
      m.id === id ? { ...m, status: 'attended' as const } : m
    ));
  };

  const liveMeetings = meetings.filter(m => m.status === 'live');
  const scheduledMeetings = meetings.filter(m => m.status === 'scheduled');
  const attendedMeetings = meetings.filter(m => m.status === 'attended');

  return (
    <div className="flex-1 overflow-y-auto px-8 py-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">Sync Calendar</h1>
          <p className="text-gray-500">Collaborative sessions and professional syncs.</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Local Timezone</p>
          <p className="text-sm text-white font-semibold">IST (UTC+5:30)</p>
        </div>
      </header>

      <div className="space-y-10">
        {liveMeetings.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Ongoing Operations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveMeetings.map(m => (
                <div key={m.id} className="p-10 rounded-[32px] bg-indigo-500/5 border border-indigo-500/20 flex flex-col justify-between h-72 relative overflow-hidden group hover:border-indigo-500/40 transition-all">
                  <div className="absolute top-0 right-0 p-6">
                    <span className="px-3 py-1 rounded-full bg-indigo-500 text-white text-[9px] font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20">Active Session</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">{m.startTime} — {m.endTime}</p>
                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{m.name}</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-gray-400">{m.host.charAt(0)}</div>
                      <p className="text-sm text-gray-400 font-medium">Facilitator: <span className="text-white">{m.host}</span></p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleJoin(m.id, m.link)}
                    className="w-full py-4 bg-[#5E6AD2] hover:bg-[#6e7ae0] text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/10 active:scale-[0.98]"
                  >
                    Join Meet Now
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-xs font-bold text-gray-600 uppercase tracking-[0.2em] mb-6">Pipeline Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scheduledMeetings.map(m => (
              <div key={m.id} className="p-8 rounded-[28px] bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between h-64 hover:bg-white/[0.04] transition-all group">
                <div>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">{m.startTime}</p>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">{m.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">{m.host}</p>
                </div>
                <button 
                  onClick={() => handleJoin(m.id, m.link)}
                  className="w-full py-3 bg-white/[0.03] border border-white/5 hover:border-white/20 text-gray-400 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  Join Waiting Room
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MeetingsPage;
