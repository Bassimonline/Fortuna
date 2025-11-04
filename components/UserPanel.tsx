
import React, { useState, useCallback } from 'react';
import { User } from '../types';
import { CopyIcon, LogoutIcon } from './icons';

interface UserPanelProps {
  user: User;
  onDisconnect: () => void;
}

const UserPanel: React.FC<UserPanelProps> = ({ user, onDisconnect }) => {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const handleCopyAddress = useCallback(() => {
    navigator.clipboard.writeText(user.address);
    setCopyStatus('copied');
    setTimeout(() => setCopyStatus('idle'), 2000);
  }, [user.address]);

  return (
    <div className="absolute top-full right-0 mt-3 w-72 bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl shadow-black/30 p-4 animate-fadeInUp z-50">
        <div className="flex items-center gap-3 pb-4 border-b border-gray-700/50">
            <img src={user.avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full bg-gray-700" />
            <div>
                <p className="text-sm font-semibold text-white">Wallet Connected</p>
                <div className="flex items-center gap-2">
                    <p className="text-xs font-mono text-gray-400">{`${user.address.slice(0, 6)}...${user.address.slice(-6)}`}</p>
                    <button onClick={handleCopyAddress} className="text-gray-500 hover:text-white transition-colors">
                        <CopyIcon className="w-4 h-4" />
                    </button>
                    {copyStatus === 'copied' && <span className="text-xs text-green-400">Copied!</span>}
                </div>
            </div>
        </div>
        
        <div className="py-4 space-y-3">
            <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-400">XRP Balance</span>
                <span className="font-semibold text-white">{user.xrpBalance.toLocaleString()} XRP</span>
            </div>
             <div className="flex justify-between items-baseline">
                <span className="text-sm text-gray-400">FORT Balance</span>
                <span className="font-semibold text-white">{user.fortBalance.toLocaleString()} FORT</span>
            </div>
        </div>

        <button 
            onClick={onDisconnect}
            className="w-full flex items-center justify-center gap-2 text-sm text-red-400 bg-red-500/10 hover:bg-red-500/20 py-2 rounded-lg transition-colors"
        >
            <LogoutIcon className="w-4 h-4" />
            Disconnect
        </button>
        <style>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeInUp { animation: fadeInUp 0.2s ease-out forwards; }
        `}</style>
    </div>
  );
};

export default UserPanel;
