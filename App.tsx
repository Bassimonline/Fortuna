import React, { useState, useCallback, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import ProjectGrid from './components/ProjectGrid';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import ProjectPage from './components/ProjectPage';
import DashboardPage from './components/DashboardPage';
import SubmitProjectPage from './components/SubmitProjectPage';
import GovernancePage from './components/GovernancePage';
import CreateProposalPage from './components/CreateProposalPage';
import ParticleBackground from './components/ParticleBackground';
import ProjectsPage from './components/ProjectsPage';
import AboutPage from './components/AboutPage';
import { Project, ProjectCategory, User } from './types';
import { MOCK_PROJECTS, MOCK_USER_DATA } from './constants';

type ViewState =
  | { type: 'home' }
  | { type: 'project'; project: Project }
  | { type: 'dashboard' }
  | { type: 'submitProject' }
  | { type: 'governance' }
  | { type: 'createProposal' }
  | { type: 'projects' }
  | { type: 'about' };

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All');
  const [viewState, setViewState] = useState<ViewState>({ type: 'home' });
  const [user, setUser] = useState<User | null>(null);

  const handleConnectWallet = useCallback(() => {
    setUser(MOCK_USER_DATA);
  }, []);

  const handleDisconnect = useCallback(() => {
    setUser(null);
    setViewState({ type: 'home' });
  }, []);
  
  const handleOpenDashboard = useCallback(() => {
    setViewState({ type: 'dashboard' });
    window.scrollTo(0, 0);
  }, []);
  
  const handleBackToHome = useCallback(() => {
    setViewState({ type: 'home' });
  }, []);

  const handleSelectProject = useCallback((project: Project) => {
    setViewState({ type: 'project', project });
    window.scrollTo(0, 0);
  }, []);

  const handleDeselectProject = useCallback(() => {
    setViewState({ type: 'projects' });
  }, []);

  const handleOpenSubmitProject = useCallback(() => {
    setViewState({ type: 'submitProject' });
    window.scrollTo(0, 0);
  }, []);

  const handleStartProjectClick = useCallback(() => {
    if (user) {
        handleOpenSubmitProject();
    } else {
        handleConnectWallet();
    }
  }, [user, handleOpenSubmitProject, handleConnectWallet]);

  const handleCloseSubmitProject = useCallback(() => {
    setViewState({ type: 'dashboard' });
    window.scrollTo(0, 0);
  }, []);

  const handleOpenGovernance = useCallback(() => {
    setViewState({ type: 'governance' });
    window.scrollTo(0, 0);
  }, []);
  
  const handleCloseGovernance = useCallback(() => {
      setViewState({ type: 'home' });
      window.scrollTo(0, 0);
  }, []);

  const handleOpenCreateProposal = useCallback(() => {
      setViewState({ type: 'createProposal' });
      window.scrollTo(0, 0);
  }, []);

  const handleCloseCreateProposal = useCallback(() => {
      setViewState({ type: 'governance' });
      window.scrollTo(0, 0);
  }, []);

  const handleOpenProjects = useCallback(() => {
    setViewState({ type: 'projects' });
    window.scrollTo(0, 0);
  }, []);

  const handleOpenAbout = useCallback(() => {
    setViewState({ type: 'about' });
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return MOCK_PROJECTS;
    }
    return MOCK_PROJECTS.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const renderContent = () => {
    switch(viewState.type) {
        case 'project':
            return <ProjectPage project={viewState.project} onBack={handleDeselectProject} />;
        case 'dashboard':
            return user ? <DashboardPage user={user} onBack={handleBackToHome} onProjectClick={handleSelectProject} onOpenSubmitProject={handleOpenSubmitProject} /> : null;
        case 'submitProject':
            return <SubmitProjectPage onBack={handleCloseSubmitProject} />;
        case 'governance':
            return <GovernancePage user={user} onBack={handleCloseGovernance} onCreateProposal={handleOpenCreateProposal} />;
        case 'createProposal':
            return <CreateProposalPage onBack={handleCloseCreateProposal} />;
        case 'projects':
            return <ProjectsPage 
                projects={filteredProjects}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onProjectClick={handleSelectProject}
                onBack={handleBackToHome}
            />;
        case 'about':
            return <AboutPage onBack={handleBackToHome} />;
        case 'home':
        default:
            return (
              <>
                <main className="relative z-10 container mx-auto px-4 py-8">
                  <Hero onExploreProjects={handleOpenProjects} />
                  <Stats />
                  <HowItWorks />
                  <Features />
                </main>
                <CtaSection onStartProject={handleStartProjectClick} />
                <Footer 
                  onOpenProjects={handleOpenProjects}
                  onOpenGovernance={handleOpenGovernance}
                  onOpenAbout={handleOpenAbout}
                />
              </>
            );
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-gray-200 font-sans antialiased relative overflow-x-hidden">
      <ParticleBackground />
      
      <Header 
        user={user} 
        onConnect={handleConnectWallet} 
        onDisconnect={handleDisconnect}
        onOpenDashboard={handleOpenDashboard}
        onOpenGovernance={handleOpenGovernance}
        onOpenProjects={handleOpenProjects}
        onOpenAbout={handleOpenAbout}
      />
      {renderContent()}
    </div>
  );
};

export default App;