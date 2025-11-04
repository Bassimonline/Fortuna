import React from 'react';
import { Project, ProjectCategory } from '../types';
import ProjectGrid from './ProjectGrid';
import { ArrowLeftIcon } from './icons';

interface ProjectsPageProps {
  projects: Project[];
  selectedCategory: ProjectCategory | 'All';
  onSelectCategory: (category: ProjectCategory | 'All') => void;
  onProjectClick: (project: Project) => void;
  onBack: () => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  selectedCategory,
  onSelectCategory,
  onProjectClick,
  onBack,
}) => {
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

        <div className="text-center pt-8 pb-12">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter">
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-transparent bg-clip-text">
                    Explore Projects
                </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Find and fund the next wave of innovation on the XRP Ledger.
            </p>
        </div>
      
        <ProjectGrid
            projects={projects}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            onProjectClick={onProjectClick}
        />
        
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

export default ProjectsPage;
