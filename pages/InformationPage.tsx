
import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const PAGE_CONTENT: Record<string, { title: string; subtitle: string; icon: string; content: string[] }> = {
  '/getting-started': {
    title: 'Getting Started',
    subtitle: 'Step into the ecosystem.',
    icon: 'fa-rocket',
    content: [
      'Initialize your local development environment via the setup scripts in /scripts/init.sh.',
      'Register your hardware MAC address on the internal security whitelist.',
      'Synchronize your enterprise LDAP credentials with the neural gateway.',
      'Complete the mandatory compliance training module on the HR portal.'
    ]
  },
  '/overview': {
    title: 'Company Overview',
    subtitle: 'Strategic alignment and core directives.',
    icon: 'fa-building',
    content: [
      'Onboard Hub is a global leader in AI-driven personnel synchronization.',
      'Operational Focus: Reducing time-to-productivity for technical talent by 40%.',
      'Architecture: Cloud-native, globally distributed, and vertically integrated.',
      'Culture: High-autonomy, data-driven decisions, and radical transparency.'
    ]
  },
  '/tech-stack': {
    title: 'Tech Stack & Tools',
    subtitle: 'High-performance engineering standards.',
    icon: 'fa-microchip',
    content: [
      'Core Frontend: React 19, Tailwind CSS, and sophisticated Framer Motion animations.',
      'Service Layer: TypeScript-first Node.js services with ultra-low latency response times.',
      'State & Data: Distributed PostgreSQL with Redis caching for real-time telemetry.',
      'Infrastructure: Automated Kubernetes orchestration on AWS with Terraform provisioning.'
    ]
  },
  '/architecture': {
    title: 'System Architecture',
    subtitle: 'Infrastructure blueprint and data flow.',
    icon: 'fa-network-wired',
    content: [
      'Micro-frontend architecture using module federation for team independence.',
      'Event-driven communication facilitated by high-throughput Kafka clusters.',
      'Zero-Trust networking with strictly enforced mTLS between all internal services.',
      'Edge-compute optimization for neural assistant response delivery.'
    ]
  },
  '/faqs': {
    title: 'Help Desk (FAQ)',
    subtitle: 'Common technical inquiries and solutions.',
    icon: 'fa-circle-question',
    content: [
      'Where is the corporate handbook? Access the shared Notion drive at wiki.onboard.hub.',
      'How to handle VPN dropouts? Switch to the "Neural-Direct" protocol in your client settings.',
      'How do I request software? Submit a ticket through the /internal/software-request endpoint.',
      'Who is my tech mentor? Refer to the Team Directory; your mentor is marked with a star icon.'
    ]
  }
};

const InformationPage: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const data = PAGE_CONTENT[pathname] || PAGE_CONTENT['/getting-started'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleQueryAssistant = (topic: string) => {
    // Navigate to assistant with a query parameter
    navigate(`/assistant?q=${encodeURIComponent(`Tell me more about: ${topic}`)}`);
  };

  return (
    <div key={pathname} className="h-full overflow-y-auto px-8 py-16 animate-in fade-in slide-in-from-bottom-4 duration-700 scrollbar-hide">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <div className="w-14 h-14 rounded-[20px] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-8 shadow-2xl shadow-indigo-500/10">
            <i className={`fas ${data.icon} text-xl`}></i>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-3 uppercase">
            {data.title}
          </h1>
          <p className="text-gray-500 text-lg font-medium">
            {data.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {data.content.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative p-6 rounded-[24px] bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all hover:border-indigo-500/30 cursor-pointer"
              onClick={() => handleQueryAssistant(item)}
            >
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-[14px] bg-white/5 flex items-center justify-center text-[11px] font-bold text-gray-500 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-300 flex-shrink-0">
                  0{idx + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 leading-relaxed font-medium pt-1.5 text-base group-hover:text-white transition-colors">
                    {item}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 pt-1.5">
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100">
                    <i className="fas fa-arrow-right text-[10px]"></i>
                  </div>
                </div>
              </div>
              
              {/* Subtle hover prompt */}
              <div className="absolute bottom-4 right-8 text-[9px] font-bold text-indigo-400 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                Query AI Assistant
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-12 rounded-[48px] bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent border border-indigo-500/10 text-center backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Complex Inquiries?</h3>
          <p className="text-gray-500 mb-10 max-w-sm mx-auto text-base relative z-10 font-medium">Our Neural Assistant is optimized for your specialization and can provide deep technical insights 24/7.</p>
          <Link 
            to="/assistant" 
            className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black hover:bg-indigo-50 rounded-xl font-bold text-xs transition-all shadow-xl hover:scale-105 active:scale-95 relative z-10 uppercase tracking-widest"
          >
            <i className="fas fa-sparkles text-[10px]"></i>
            Launch Neural Core
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InformationPage;
