
import React from 'react';
import { NftIcon, TransparencyIcon, CommunityIcon } from './icons';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="relative bg-[#100f13] border border-gray-800 rounded-2xl p-8 text-center overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
        <div className="relative z-10">
            <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-full text-white transform group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    </div>
);


const Features: React.FC = () => {
  return (
    <section className="py-24">
       <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">Why Choose Fortuna DAO?</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          More than just a funding platform. We are building a decentralized ecosystem.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
            icon={<TransparencyIcon className="w-8 h-8"/>}
            title="On-Chain Transparency"
            description="All donations and funding distributions are recorded on the XRP Ledger for ultimate transparency and accountability."
        />
        <FeatureCard 
            icon={<CommunityIcon className="w-8 h-8"/>}
            title="Community Governance"
            description="Fortuna is governed by its members. Token holders vote on which projects get featured and how the DAO evolves."
        />
        <FeatureCard 
            icon={<NftIcon className="w-8 h-8"/>}
            title="Evolving NFT Badges"
            description="As you donate and participate, your unique Soulbound NFT badge levels up, showcasing your impact in the ecosystem."
        />
      </div>
    </section>
  );
};

export default Features;
