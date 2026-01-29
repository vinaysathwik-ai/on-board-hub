
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AiAgentPage from './pages/AiAgentPage';
import TeamPage from './pages/TeamPage';
import InformationPage from './pages/InformationPage';
import Layout from './components/Layout';
import { User } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <HashRouter>
      <div className="min-h-screen selection:bg-[#5E6AD2]/30 selection:text-white">
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/assistant" replace />} 
          />
          
          <Route 
            path="/*" 
            element={isAuthenticated ? (
              <Layout user={user} onLogout={handleLogout}>
                <Routes>
                  <Route index element={<Navigate to="/assistant" replace />} />
                  <Route path="assistant" element={<AiAgentPage user={user} onLogout={handleLogout} />} />
                  <Route path="team" element={<TeamPage />} />
                  
                  {/* Unified Information Terminal Routes */}
                  <Route path="getting-started" element={<InformationPage />} />
                  <Route path="tech-stack" element={<InformationPage />} />
                  <Route path="overview" element={<InformationPage />} />
                  <Route path="architecture" element={<InformationPage />} />
                  <Route path="workflows" element={<InformationPage />} />
                  <Route path="issues" element={<InformationPage />} />
                  <Route path="faqs" element={<InformationPage />} />

                  {/* Catch-all fallback */}
                  <Route path="*" element={<Navigate to="/assistant" replace />} />
                </Routes>
              </Layout>
            ) : <Navigate to="/login" replace />} 
          />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
