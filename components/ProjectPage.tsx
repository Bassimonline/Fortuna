import React from 'react';
import { Project } from '../types';
import { ArrowLeftIcon, ExternalLinkIcon, TwitterIcon, WebsiteIcon, LinkedInIcon } from './icons';

interface ProjectPageProps {
  project: Project;
  onBack: () => void;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project, onBack }) => {
  const progress = (project.raised_amount_xrp / project.goal_amount_xrp) * 100;

  return (
    <div className="container mx-auto px-4 py-16 animate-fadeInUp">
      <button 
        onClick={onBack} 
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        aria-label="Back to projects"
      >
        <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
        Back to Projects
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Column: Project Details */}
        <div className="lg:col-span-2">
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
            <img src={project.banner} alt={`${project.title} banner`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
                <p className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text mb-1">{project.category}</p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{project.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-4 py-4 mb-4 border-b border-gray-800">
            <span className="text-sm font-semibold text-gray-400">Follow them:</span>
            <div className="flex items-center gap-4">
              {project.socials.twitter && (
                  <a href={project.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <TwitterIcon className="w-5 h-5" />
                  </a>
              )}
              {project.socials.website && (
                  <a href={project.socials.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <WebsiteIcon className="w-5 h-5" />
                  </a>
              )}
              {project.socials.linkedin && (
                  <a href={project.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <LinkedInIcon className="w-5 h-5" />
                  </a>
              )}
            </div>
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none text-gray-300">
            <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 mb-4">About this project</h2>
            <p>{project.description}</p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white border-b border-gray-700 pb-2 mb-6">Meet the Team</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
              {project.team.map(member => (
                <div key={member.name} className="flex flex-col items-center">
                  <img src={member.avatarUrl} alt={member.name} className="w-24 h-24 rounded-full mb-3 bg-gray-800 border-2 border-gray-700" />
                  <h3 className="font-semibold text-white">{member.name}</h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-6 flex flex-col gap-6">
            <div className="flex justify-center -mt-20">
              <img src={project.thumbnail} alt={`${project.title} logo`} className="w-28 h-28 rounded-xl object-cover border-4 border-gray-800 shadow-lg" />
            </div>

            <div>
                 <div className="flex justify-between items-center text-sm text-gray-300 mb-1">
                    <span>Progress</span>
                    <span className="font-bold">{progress.toFixed(0)}%</span>
                 </div>
                 <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                 </div>
                 <div className="text-center text-sm text-gray-400 mt-2">
                    <span className="font-bold text-white text-lg">{project.raised_amount_xrp.toLocaleString()}</span> XRP raised
                 </div>
            </div>
            
            <div className="border-y border-gray-800 py-4 flex justify-around text-center">
                 <div>
                    <p className="text-2xl font-bold text-white">{project.donors.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">Donors</p>
                </div>
                 <div>
                    <p className="text-2xl font-bold text-white">{project.goal_amount_xrp.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">XRP Goal</p>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                 <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transition-all text-center">
                    Donate Now
                 </button>
                 <button className="w-full flex items-center justify-center bg-gray-700 text-gray-200 font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-colors">
                    View on XRPL <ExternalLinkIcon />
                 </button>
            </div>
          </div>
        </div>
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

export default ProjectPage;