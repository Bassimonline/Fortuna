import React, { useState, useEffect, useRef } from 'react';
import { User } from '../types';
import UserPanel from './UserPanel';
import { DashboardIcon } from './icons';

interface HeaderProps {
    user: User | null;
    onConnect: () => void;
    onDisconnect: () => void;
    onOpenDashboard: () => void;
    onOpenGovernance: () => void;
    onOpenProjects: () => void;
    onOpenAbout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onConnect, onDisconnect, onOpenDashboard, onOpenGovernance, onOpenProjects, onOpenAbout }) => {
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const userPanelRef = useRef<HTMLDivElement>(null);

  const toggleUserPanel = () => setIsUserPanelOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userPanelRef.current && !userPanelRef.current.contains(event.target as Node)) {
        setIsUserPanelOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-black/30 backdrop-blur-lg border-b border-gray-800/50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }} className="flex items-center">
            <img src="https://i.ibb.co/qM8gsxnS/daologo.png" alt="Fortuna DAO Logo" className="h-12" />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={onOpenProjects} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Projects</button>
            <button onClick={onOpenGovernance} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Governance</button>
            <button onClick={onOpenAbout} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">About</button>
          </nav>
          <div className="flex items-center gap-4">
            {user && (
              <button 
                onClick={onOpenDashboard}
                className="hidden sm:flex items-center gap-2 text-sm text-gray-300 hover:text-white bg-gray-800/60 hover:bg-gray-700/80 px-4 py-2 rounded-lg transition-colors"
              >
                  <DashboardIcon className="w-5 h-5" />
                  Dashboard
              </button>
            )}
            <div className="relative" ref={userPanelRef}>
              {user ? (
                  <button 
                    onClick={toggleUserPanel}
                    className="flex items-center gap-2 bg-gray-800/60 hover:bg-gray-700/80 px-3 py-2 rounded-lg transition-colors"
                  >
                      <img src={user.avatarUrl} alt="User Avatar" className="w-7 h-7 rounded-full bg-gray-700" />
                      <span className="text-sm font-mono text-gray-300 hidden sm:inline">{`${user.address.slice(0, 4)}...${user.address.slice(-4)}`}</span>
                  </button>
              ) : (
                  <button 
                    onClick={onConnect}
                    className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-pink-500 group-hover:from-purple-600 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-800"
                  >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Connect Wallet
                      </span>
                  </button>
              )}
              {isUserPanelOpen && user && (
                <UserPanel user={user} onDisconnect={() => {
                  onDisconnect();
                  setIsUserPanelOpen(false);
                }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;