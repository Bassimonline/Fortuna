import React, { useState, useMemo } from 'react';
import { User, ProposalStatus } from '../types';
import { MOCK_PROPOSALS } from '../constants';
import ProposalCard from './ProposalCard';
import { ArrowLeftIcon } from './icons';

interface GovernancePageProps {
    user: User | null;
    onBack: () => void;
    onCreateProposal: () => void;
}

const StatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
    <div className="bg-white/5 backdrop-blur-md p-px rounded-2xl shadow-lg">
      <div className="bg-[#100f13] rounded-2xl p-6 text-center h-full">
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">{value}</p>
      </div>
    </div>
);

const GovernancePage: React.FC<GovernancePageProps> = ({ user, onBack, onCreateProposal }) => {
    const [filter, setFilter] = useState<ProposalStatus | 'All'>('All');

    const filteredProposals = useMemo(() => {
        if (filter === 'All') {
            return MOCK_PROPOSALS;
        }
        return MOCK_PROPOSALS.filter(p => p.status === filter);
    }, [filter]);

    const activeProposalsCount = MOCK_PROPOSALS.filter(p => p.status === ProposalStatus.Active).length;

    const filterCategories: (ProposalStatus | 'All')[] = ['All', ...Object.values(ProposalStatus)];

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

            <div className="text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter">
                     <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                        DAO Governance
                    </span>
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
                    Your voice, your vote. Participate in proposals that shape the future of Fortuna.
                </p>
            </div>
            
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
                <StatCard title="Active Proposals" value={activeProposalsCount} />
                <StatCard title="Total Proposals" value={MOCK_PROPOSALS.length} />
                <StatCard title="Your Voting Power (FORT)" value={user ? user.fortBalance.toLocaleString() : 'N/A'} />
            </section>

            <section className="py-12">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
                    <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                        {filterCategories.map(category => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 outline-none focus:ring-2 focus:ring-purple-500 ${
                                filter === category
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                                    : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 hover:text-white'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                     <button 
                        onClick={onCreateProposal}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-purple-600/30 hover:scale-105 transition-transform transform-gpu shrink-0"
                    >
                        Create Proposal
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProposals.map(proposal => (
                        <ProposalCard key={proposal.id} proposal={proposal} />
                    ))}
                </div>
            </section>

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

export default GovernancePage;