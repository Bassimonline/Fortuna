
import React from 'react';
import { DiscoverIcon, DonateIcon, GovernIcon } from './icons';

const StepCard: React.FC<{ icon: React.ReactNode; step: number; title: string; description: string; }> = ({ icon, step, title, description }) => (
    <div className="relative z-10 bg-gray-900 p-8 rounded-2xl border border-gray-800 transform hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-purple-500/20">
        <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-xl text-white">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-400">{description}</p>
        <div className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center bg-gray-800 rounded-full border-4 border-gray-900 text-purple-400 font-bold text-xl">
          {step}
        </div>
    </div>
);


const HowItWorks: React.FC = () => {
  return (
    <section className="py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
          How <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Fortuna</span> Works
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          A simple, transparent, and community-driven funding process.
        </p>
      </div>
      <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-800"></div>
          <div className="hidden md:block absolute top-1/2 left-1/4 w-3/4 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 opacity-50"></div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
            <StepCard 
                icon={<DiscoverIcon className="w-7 h-7" />}
                step={1}
                title="Discover Projects"
                description="Browse a curated list of innovative projects seeking funding from the community."
            />
            <StepCard 
                icon={<DonateIcon className="w-7 h-7" />}
                step={2}
                title="Donate with XRP"
                description="Fund the projects you believe in directly from your wallet with low-fee XRP transactions."
            />
            <StepCard 
                icon={<GovernIcon className="w-7 h-7" />}
                step={3}
                title="Shape the Future"
                description="Participate in governance decisions and help guide the direction of the DAO and its projects."
            />
          </div>
      </div>
    </section>
  );
};

export default HowItWorks;
