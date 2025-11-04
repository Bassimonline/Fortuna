import React from 'react';
import { Proposal, ProposalStatus } from '../types';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from './icons';

interface ProposalCardProps {
    proposal: Proposal;
}

const VoteBar: React.FC<{ votesFor: number, votesAgainst: number }> = ({ votesFor, votesAgainst }) => {
    const totalVotes = votesFor + votesAgainst;
    const forPercentage = totalVotes > 0 ? (votesFor / totalVotes) * 100 : 0;
    
    return (
        <div>
            <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                <span className="font-semibold text-green-400">For: {forPercentage.toFixed(1)}%</span>
                <span className="font-semibold text-red-400">Against: {(100 - forPercentage).toFixed(1)}%</span>
            </div>
            <div className="w-full flex h-2.5 rounded-full overflow-hidden bg-gray-700">
                <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{ width: `${forPercentage}%` }}
                />
                <div 
                    className="bg-gradient-to-r from-red-500 to-rose-500"
                    style={{ width: `${100 - forPercentage}%` }}
                />
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                <span>{votesFor.toLocaleString()} FORT</span>
                <span>{votesAgainst.toLocaleString()} FORT</span>
            </div>
        </div>
    );
}

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal }) => {

    const getStatusInfo = (status: ProposalStatus) => {
        switch (status) {
            case ProposalStatus.Active:
                return { styles: 'bg-green-500/20 text-green-300 border-green-500/30', icon: <ClockIcon className="w-4 h-4" /> };
            case ProposalStatus.Passed:
                return { styles: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: <CheckCircleIcon className="w-4 h-4" /> };
            case ProposalStatus.Failed:
                return { styles: 'bg-red-500/20 text-red-300 border-red-500/30', icon: <XCircleIcon className="w-4 h-4" /> };
            case ProposalStatus.Executed:
                return { styles: 'bg-gray-500/20 text-gray-300 border-gray-500/30', icon: <CheckCircleIcon className="w-4 h-4" /> };
            default:
                return { styles: 'bg-gray-500/20 text-gray-300 border-gray-500/30', icon: null };
        }
    };
    
    const getTimeRemaining = (endDate: string) => {
        const end = new Date(endDate);
        const now = new Date();
        const diff = end.getTime() - now.getTime();

        if (diff <= 0) return "Voting ended";
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

        if (days > 0) return `${days}d ${hours}h remaining`;
        return `${hours}h remaining`;
    };

    const statusInfo = getStatusInfo(proposal.status);

    return (
        <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-6 flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1">
            <header>
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-bold text-white leading-tight">{proposal.title}</h3>
                    <div className={`flex items-center gap-1.5 shrink-0 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${statusInfo.styles}`}>
                        {statusInfo.icon}
                        {proposal.status}
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-mono">
                    By: {`${proposal.proposer.slice(0, 6)}...${proposal.proposer.slice(-4)}`}
                </p>
            </header>

            <p className="text-gray-400 text-sm flex-grow">
                {proposal.description.substring(0, 150)}{proposal.description.length > 150 && '...'}
            </p>

            <footer className="mt-auto">
                {proposal.status === ProposalStatus.Active && (
                    <div className="mb-4">
                        <VoteBar votesFor={proposal.votesFor} votesAgainst={proposal.votesAgainst} />
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <button className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                        View Details
                    </button>
                    {proposal.status === ProposalStatus.Active && (
                         <p className="text-sm text-gray-400">{getTimeRemaining(proposal.endDate)}</p>
                    )}
                     {proposal.status !== ProposalStatus.Active && (
                         <p className="text-sm text-gray-500">Ended on {new Date(proposal.endDate).toLocaleDateString()}</p>
                    )}
                </div>
            </footer>
        </div>
    );
};

export default ProposalCard;