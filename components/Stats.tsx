
import React from 'react';

const StatCard: React.FC<{ title: string; value: string; delay: string }> = ({ title, value, delay }) => (
  <div 
    className="bg-white/5 backdrop-blur-md p-px rounded-2xl shadow-lg opacity-0 animate-fadeInUp"
    style={{ animationDelay: delay }}
  >
    <div className="bg-[#100f13] rounded-2xl p-6 text-center h-full">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">{value}</p>
    </div>
  </div>
);

const Stats: React.FC = () => {
  return (
    <section className="py-16">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <StatCard title="Total Raised (XRP)" value="1.2M" delay="0s" />
        <StatCard title="Projects Funded" value="42" delay="0.2s" />
        <StatCard title="Active Donors" value="1,500+" delay="0.4s" />
      </div>
    </section>
  );
};

export default Stats;
