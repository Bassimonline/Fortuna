import React from 'react';
import { Project, ProjectCategory } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  selectedCategory: ProjectCategory | 'All';
  onSelectCategory: (category: ProjectCategory | 'All') => void;
  onProjectClick: (project: Project) => void;
}

const categories: (ProjectCategory | 'All')[] = ['All', ...Object.values(ProjectCategory)];

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, selectedCategory, onSelectCategory, onProjectClick }) => {
  return (
    <section className="py-12">
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-5 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 outline-none focus:ring-2 focus:ring-purple-500 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                : 'bg-gray-800/60 text-gray-300 hover:bg-gray-700/80 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} onClick={() => onProjectClick(project)} />
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;