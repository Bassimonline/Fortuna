
import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types';
import { ShareIcon, CheckIcon, TwitterIcon, WebsiteIcon, LinkedInIcon, GithubIcon } from './icons';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const progress = (project.raised_amount_xrp / project.goal_amount_xrp) * 100;
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the card's onClick from firing
    
    const projectUrl = `${window.location.origin}/projects/${project.slug}`;
    const shareData = {
      title: project.title,
      text: project.short_description,
      url: projectUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
        // Fallback to clipboard if share is cancelled/fails
        navigator.clipboard.writeText(projectUrl);
        setShareStatus('copied');
        setTimeout(() => setShareStatus('idle'), 2000);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(projectUrl);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    }
  };

  const getStatusBadgeStyles = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.Active:
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case ProjectStatus.Completed:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case ProjectStatus.Pending:
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };


  return (
    <div
      className="relative rounded-2xl p-[1.5px] overflow-hidden transition-transform duration-300 group cursor-pointer transform-gpu hover:scale-[1.02]"
      onClick={onClick}
    >
      <div 
        className="absolute inset-[-200%] animate-spin-slow"
        style={{
          backgroundImage: 'conic-gradient(from 180deg at 50% 50%, #a855f7, #ec4899, #f97316, #a855f7)',
        }}
      />
      <div
        className="relative bg-gray-900/80 backdrop-blur-sm rounded-[15px] flex flex-col h-full transition-colors duration-300 group-hover:bg-gray-900/95 overflow-hidden"
      >
        <div className="relative w-full h-48 overflow-hidden">
            <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div
              className={`absolute top-3 left-3 z-10 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-sm ${getStatusBadgeStyles(project.status)}`}
            >
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </div>
            <button
              onClick={handleShare}
              className="absolute top-3 right-3 z-10 p-2 bg-black/40 rounded-full text-gray-300 hover:text-white hover:bg-black/60 transition-all duration-200"
              aria-label="Share project"
              title={shareStatus === 'copied' ? "Link Copied!" : "Share Project"}
            >
              {shareStatus === 'copied' ? <CheckIcon className="w-5 h-5 text-green-400" /> : <ShareIcon className="w-5 h-5" />}
            </button>
        </div>

        <div className="flex-grow flex flex-col p-4">
            <div className="flex-grow">
                <p className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text mb-1">{project.category}</p>
                <h3 className="text-lg font-bold mb-2 text-gray-100">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 h-20 overflow-hidden">{project.short_description}</p>
            </div>
          
            <div className="mt-auto pt-4 border-t border-gray-800/50">
              <div className="flex items-center gap-4 mb-4">
                  {project.socials.twitter && (
                      <a href={project.socials.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                          <TwitterIcon className="w-5 h-5" />
                      </a>
                  )}
                  {project.socials.website && (
                      <a href={project.socials.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-white transition-colors" aria-label="Website">
                          <WebsiteIcon className="w-5 h-5" />
                      </a>
                  )}
                  {project.socials.linkedin && (
                      <a href={project.socials.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                          <LinkedInIcon className="w-5 h-5" />
                      </a>
                  )}
                   {project.socials.github && (
                      <a href={project.socials.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                          <GithubIcon className="w-5 h-5" />
                      </a>
                  )}
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                  <span>
                    <span className="font-bold text-white">{project.raised_amount_xrp.toLocaleString()}</span> XRP
                  </span>
                  <span>
                    Goal: {project.goal_amount_xrp.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // In a real app, this would open a donation modal
                  alert(`Donation modal for "${project.title}" would open here.`);
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:scale-[1.03] hover:shadow-lg hover:shadow-purple-500/30 transition-all text-center transform-gpu"
              >
                Donate Now
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
