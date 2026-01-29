
import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { User, HourlyLog } from '../types';
import { Database } from '../services/database';

interface DashboardPageProps {
  user: User | null;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {
  const [hourlyData, setHourlyData] = useState<HourlyLog[]>([]);
  
  const theme = useMemo(() => {
    if (user?.specialization === 'Backend') return { color: '#6366f1', text: 'text-indigo-400', bg: 'bg-indigo-500/10' };
    if (user?.specialization === 'Frontend') return { color: '#10b981', text: 'text-emerald-400', bg: 'bg-emerald-500/10' };
    return { color: '#8b5cf6', text: 'text-violet-400', bg: 'bg-violet-500/10' };
  }, [user]);

  useEffect(() => {
    Database.getHourlyStats().then(setHourlyData);
  }, []);

  const totalMinutes = useMemo(() => hourlyData.reduce((acc, curr) => acc + curr.minutes, 0), [hourlyData]);

  return (
    <div className="flex-1 overflow-y-auto px-8 py-10 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-2">Performance Analytics</h1>
          <p className="text-gray-500">
            Authenticated as <span className={`${theme.text} font-bold`}>{user?.name}</span> // 
            Track: <span className="text-white font-medium">{user?.specialization}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live Monitoring</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-[28px] bg-[#0a0a0c] border border-white/[0.08] relative overflow-hidden">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Session Intensity</p>
          <h3 className="text-4xl font-bold text-white">{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</h3>
          <p className={`mt-4 text-[10px] font-bold ${theme.text} uppercase`}>Active Workstream</p>
        </div>
        <div className="p-8 rounded-[28px] bg-[#0a0a0c] border border-white/[0.08]">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Weekly Commitment</p>
          <h3 className="text-4xl font-bold text-white">88%</h3>
          <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-[88%] shadow-[0_0_10px_rgba(255,255,255,0.1)]" style={{ backgroundColor: theme.color }}></div>
          </div>
        </div>
        <div className={`p-8 rounded-[28px] border ${theme.bg.replace('/10', '/20')} ${theme.bg}`}>
          <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${theme.text}`}>Role Proficiency</p>
          <h3 className="text-4xl font-bold text-white">A+ Level</h3>
          <p className="mt-4 text-[10px] text-gray-500 uppercase font-bold">Ranking: Top Decile</p>
        </div>
      </div>

      <div className="p-10 rounded-[32px] bg-[#0a0a0c] border border-white/[0.06] shadow-2xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-bold text-white tracking-tight">Active Hours Trace</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.color }}></div>
            <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Activity (Min/Hr)</span>
          </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#333', fontSize: 10, fontWeight: 700 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#333', fontSize: 10, fontWeight: 700 }} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.01)' }} 
                contentStyle={{ backgroundColor: '#050506', border: '1px solid #222', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
              />
              <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                {hourlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.minutes > 0 ? theme.color : 'rgba(255,255,255,0.03)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
