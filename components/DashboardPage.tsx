import React from 'react';
import { User, ActivityType, Project } from '../types';
import { MOCK_PROJECTS } from '../constants';
import { ArrowLeftIcon, CopyIcon, DonationActivityIcon, VoteActivityIcon } from './icons';

interface DashboardPageProps {
  user: User;
  onBack: () => void;
  onProjectClick: (project: Project) => void;
  onOpenSubmitProject: () => void;
}

const StatCard: React.FC<{ title: string; value: string | number; }> = ({ title, value }) => (
    <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-6 text-center">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">{value}</p>
    </div>
);

const DashboardPage: React.FC<DashboardPageProps> = ({ user, onBack, onProjectClick, onOpenSubmitProject }) => {
    const totalDonated = user.donations.reduce((sum, d) => sum + d.amountXRP, 0);
    const projectsSupported = new Set(user.donations.map(d => d.projectId)).size;
    const votesCast = user.activityLog.filter(a => a.type === ActivityType.Vote).length;

    const getProjectById = (id: string) => MOCK_PROJECTS.find(p => p.id === id);

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

        {/* User Profile Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 bg-gray-900/50 border border-gray-800 p-8 rounded-3xl">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-purple-500" />
                <div>
                    <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
                    <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                        <p className="font-mono text-gray-400">{user.address}</p>
                        <button onClick={() => navigator.clipboard.writeText(user.address)} className="text-gray-500 hover:text-white transition-colors">
                            <CopyIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex gap-6 mt-4 justify-center sm:justify-start">
                        <div>
                            <span className="text-sm text-gray-400">XRP Balance: </span>
                            <span className="font-semibold text-white">{user.xrpBalance.toLocaleString()}</span>
                        </div>
                         <div>
                            <span className="text-sm text-gray-400">FORT Balance: </span>
                            <span className="font-semibold text-white">{user.fortBalance.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <button 
                onClick={onOpenSubmitProject}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-purple-600/30 hover:scale-105 transition-transform transform-gpu shrink-0"
            >
                Submit a Project
            </button>
        </header>
        
        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            <StatCard title="Total XRP Donated" value={totalDonated.toLocaleString()} />
            <StatCard title="Projects Supported" value={projectsSupported} />
            <StatCard title="Governance Votes Cast" value={votesCast} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Participated Projects */}
            <section className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6 text-white">Participated Projects</h2>
                <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-800/50">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-gray-400">Project</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Amount Donated</th>
                                <th className="p-4 text-sm font-semibold text-gray-400 hidden md:table-cell">Date</th>
                                <th className="p-4 text-sm font-semibold text-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.donations.map(donation => {
                                const project = getProjectById(donation.projectId);
                                if (!project) return null;
                                return (
                                    <tr 
                                      key={donation.projectId} 
                                      className="border-t border-gray-800 hover:bg-gray-800/50 transition-colors cursor-pointer"
                                      onClick={() => onProjectClick(project)}
                                    >
                                        <td className="p-4 flex items-center gap-3">
                                            <img src={project.thumbnail} alt={project.title} className="w-10 h-10 rounded-lg hidden sm:block" />
                                            <span className="font-semibold text-white">{project.title}</span>
                                        </td>
                                        <td className="p-4 font-mono text-gray-300">{donation.amountXRP.toLocaleString()} XRP</td>
                                        <td className="p-4 text-sm text-gray-400 hidden md:table-cell">{new Date(donation.date).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${project.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Recent Activity */}
            <section>
                <h2 className="text-2xl font-bold mb-6 text-white">Recent Activity</h2>
                <div className="space-y-4">
                {user.activityLog.slice(0, 5).map(activity => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-900/70 rounded-xl border border-gray-800">
                        <div className={`p-2 rounded-full ${activity.type === ActivityType.Donation ? 'bg-purple-500/20 text-purple-400' : 'bg-pink-500/20 text-pink-400'}`}>
                           {activity.type === ActivityType.Donation ? <DonationActivityIcon className="w-5 h-5"/> : <VoteActivityIcon className="w-5 h-5"/>}
                        </div>
                        <div>
                            <p className="text-sm text-white">{activity.description}</p>
                            {activity.amountXRP && (
                                <p className="text-sm font-semibold text-purple-400">{activity.amountXRP.toLocaleString()} XRP</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">{new Date(activity.date).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
                </div>
            </section>
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

export default DashboardPage;