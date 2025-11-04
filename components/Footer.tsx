import React from 'react';
import { TwitterIcon, DiscordIcon, GithubIcon, ArrowRightIcon } from './icons';

interface FooterProps {
    onOpenProjects: () => void;
    onOpenGovernance: () => void;
    onOpenAbout: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenProjects, onOpenGovernance, onOpenAbout }) => {

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, action: () => void) => {
    e.preventDefault();
    action();
  }

  return (
    <footer className="border-t border-gray-800/50">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Column 1: Brand & Social */}
            <div className="md:col-span-1">
                <img src="https://i.ibb.co/qM8gsxnS/daologo.png" alt="Fortuna DAO Logo" className="h-12 mb-2" />
                <p className="text-gray-500 mt-2 text-sm">Decentralized funding for a better future.</p>
                <div className="flex gap-5 text-gray-400 mt-6">
                    <a href="#" aria-label="Twitter" className="hover:text-white transition-colors"><TwitterIcon className="w-5 h-5"/></a>
                    <a href="#" aria-label="Discord" className="hover:text-white transition-colors"><DiscordIcon className="w-5 h-5"/></a>
                    <a href="#" aria-label="GitHub" className="hover:text-white transition-colors"><GithubIcon className="w-5 h-5"/></a>
                </div>
            </div>

            {/* Column 2: Links */}
            <div className="md:col-span-1">
                <h4 className="font-semibold text-white mb-4">Explore</h4>
                <nav className="flex flex-col gap-3">
                    <a href="#" onClick={(e) => handleLinkClick(e, onOpenProjects)} className="text-gray-400 hover:text-white transition-colors">Projects</a>
                    <a href="#" onClick={(e) => handleLinkClick(e, onOpenGovernance)} className="text-gray-400 hover:text-white transition-colors">Governance</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
                    <a href="#" onClick={(e) => handleLinkClick(e, onOpenAbout)} className="text-gray-400 hover:text-white transition-colors">About Us</a>
                </nav>
            </div>
            
            {/* Column 3: Legal */}
            <div className="md:col-span-1">
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <nav className="flex flex-col gap-3">
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                </nav>
            </div>

            {/* Column 4: Newsletter */}
            <div className="md:col-span-1">
                <h4 className="font-semibold text-white mb-4">Stay Updated</h4>
                <p className="text-gray-400 mb-4 text-sm">Join our newsletter for the latest projects and updates.</p>
                <form className="flex items-center">
                    <input 
                        type="email" 
                        placeholder="your@email.com" 
                        className="w-full bg-gray-800/60 border border-gray-700 rounded-l-md py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button 
                        type="submit"
                        aria-label="Subscribe to newsletter"
                        className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-r-md transition-colors"
                    >
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>

        <div className="text-center text-gray-600 text-sm mt-8 pt-8 border-t border-gray-800/50">
            <p>&copy; {new Date().getFullYear()} Fortuna DAO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;