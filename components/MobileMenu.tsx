import React from 'react';
import { User } from '../types';
import { CloseIcon, DashboardIcon } from './icons';

interface MobileMenuProps {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
    onOpenProjects: () => void;
    onOpenGovernance: () => void;
    onOpenAbout: () => void;
    onOpenDashboard: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, user, onClose, onOpenProjects, onOpenGovernance, onOpenAbout, onOpenDashboard }) => {

    const handleLinkClick = (action: () => void) => {
        action();
        onClose();
    };

    return (
        <div 
            className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div 
                className={`absolute top-0 right-0 h-full w-2/3 max-w-xs bg-gray-900 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-white" aria-label="Close menu">
                    <CloseIcon className="w-8 h-8" />
                </button>
                <nav className="flex flex-col space-y-6 text-lg p-8 mt-16">
                    <button onClick={() => handleLinkClick(onOpenProjects)} className="text-gray-300 hover:text-white transition-colors text-left py-2">Projects</button>
                    <button onClick={() => handleLinkClick(onOpenGovernance)} className="text-gray-300 hover:text-white transition-colors text-left py-2">Governance</button>
                    <button onClick={() => handleLinkClick(onOpenAbout)} className="text-gray-300 hover:text-white transition-colors text-left py-2">About</button>
                    {user && (
                        <button 
                            onClick={() => handleLinkClick(onOpenDashboard)} 
                            className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors text-left pt-6 border-t border-gray-700/50"
                        >
                            <DashboardIcon className="w-5 h-5" />
                            Dashboard
                        </button>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;
