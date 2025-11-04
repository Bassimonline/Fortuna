import React from 'react';
import { ArrowLeftIcon, NftIcon, TransparencyIcon, CommunityIcon } from './icons';

interface AboutPageProps {
  onBack: () => void;
}

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

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="container mx-auto px-4 py-16 animate-fadeInUp">
      <button 
        onClick={onBack} 
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        aria-label="Back to home"
      >
        <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
        Back to Home
      </button>

      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                About Fortuna DAO
            </span>
        </h1>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto mt-4">
            Fortuna DAO is a community-driven decentralized organization operating on the XRP Ledger. Our mission is to provide a transparent and efficient platform for funding innovative projects proposed by the community.
        </p>
      </div>

      <div className="max-w-4xl mx-auto prose prose-invert prose-lg text-gray-300 mb-20 text-center">
        <h2 className="text-3xl font-bold text-white">Our Vision</h2>
        <p>
            We believe in the power of decentralization to democratize access to funding and empower creators worldwide. By leveraging the low transaction fees and high speed of the XRPL, Fortuna DAO aims to build a vibrant ecosystem where creators, donors, and developers can collaborate to build the future.
        </p>
        <h2 className="text-3xl font-bold text-white mt-12">Our Core Principles</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

      <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AboutPage;
