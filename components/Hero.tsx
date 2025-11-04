
import React from 'react';
import { BackgroundRippleEffect } from './ui/background-ripple-effect';

const Hero: React.FC = () => {
  return (
    <section className="relative text-center py-24 md:py-32 overflow-hidden">
      <BackgroundRippleEffect />
      <div className="relative z-10 inline-block">
        <div className="opacity-0 animate-fadeInUp">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tighter">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                Fund the Future.
              </span>
              <br />
              <span className="text-gray-200">Build with Community.</span>
            </h1>
        </div>
        <div className="opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mt-6">
              Fortuna DAO empowers community-driven projects through decentralized funding.
              Donate, participate in governance, and earn dynamic NFT badges that evolve with your contributions.
            </p>
        </div>
        <div className="mt-12 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-10 rounded-lg text-lg shadow-lg shadow-purple-600/30 hover:scale-105 transition-transform transform-gpu">
            Explore Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;