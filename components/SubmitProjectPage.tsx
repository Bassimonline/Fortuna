import React, { useState } from 'react';
import { ProjectCategory, TeamMember } from '../types';
import { ArrowLeftIcon, PlusIcon, TrashIcon } from './icons';

interface SubmitProjectPageProps {
  onBack: () => void;
}

const FormField: React.FC<{ label: string; id: string; children: React.ReactNode; instruction: string; }> = ({ label, id, children, instruction }) => (
    <div className="mb-6">
        <label htmlFor={id} className="block text-md font-semibold text-gray-200 mb-2">{label}</label>
        {children}
        <p className="text-sm text-gray-400 mt-2">{instruction}</p>
    </div>
);

const inputStyles = "w-full bg-gray-800/60 border border-gray-700 rounded-md py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors";

const SubmitProjectPage: React.FC<SubmitProjectPageProps> = ({ onBack }) => {
    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<ProjectCategory>(ProjectCategory.DeFi);
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [goalAmount, setGoalAmount] = useState<number | ''>('');
    const [wallet, setWallet] = useState('');
    const [socials, setSocials] = useState({ twitter: '', website: '', linkedin: '', github: '' });
    const [teamMembers, setTeamMembers] = useState<Partial<TeamMember>[]>([{ name: '', role: '', avatarUrl: '' }]);

    const handleAddMember = () => {
        setTeamMembers([...teamMembers, { name: '', role: '', avatarUrl: '' }]);
    };

    const handleRemoveMember = (index: number) => {
        const newMembers = [...teamMembers];
        newMembers.splice(index, 1);
        setTeamMembers(newMembers);
    };

    const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
        const newMembers = [...teamMembers];
        const member = { ...newMembers[index], [field]: value };
        newMembers[index] = member;
        setTeamMembers(newMembers);
    };

    const handleSocialChange = (field: keyof typeof socials, value: string) => {
        setSocials(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const projectData = {
            title,
            shortDescription,
            description,
            category,
            thumbnailUrl,
            bannerUrl,
            goalAmount,
            wallet,
            socials,
            teamMembers,
        };
        console.log("Project Submission Data:", projectData);
        alert('Project submitted for review! Check the developer console for the submitted data.');
        // Here you would typically send the data to a backend server
    };

    return (
        <div className="container mx-auto px-4 py-16 animate-fadeInUp">
            <button 
                onClick={onBack} 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                aria-label="Back to dashboard"
            >
                <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
                Back to Dashboard
            </button>
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">Submit Your Project</h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
                    Complete the form below to submit your project for review by the Fortuna DAO community. Provide as much detail as possible to increase your chances of being funded.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                {/* Section 1: Project Details */}
                <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">1. Project Details</h2>
                    <FormField label="Project Title" id="title" instruction="A clear and concise name for your project.">
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className={inputStyles} required />
                    </FormField>
                    <FormField label="Short Description" id="short_description" instruction="A one-sentence pitch for your project. This will be shown on project cards (max 150 characters).">
                        <textarea id="short_description" value={shortDescription} onChange={e => setShortDescription(e.target.value)} className={inputStyles} rows={2} maxLength={150} required />
                    </FormField>
                    <FormField label="Full Description" id="description" instruction="A detailed explanation of your project. Describe the problem, your solution, and your roadmap. Markdown is supported.">
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className={inputStyles} rows={6} required />
                    </FormField>
                    <FormField label="Category" id="category" instruction="Select the category that best fits your project.">
                        <select id="category" value={category} onChange={e => setCategory(e.target.value as ProjectCategory)} className={inputStyles} required>
                            {Object.values(ProjectCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </FormField>
                </div>
                
                {/* Section 2: Visuals & Links */}
                <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">2. Visuals & Links</h2>
                    <FormField label="Thumbnail Image URL" id="thumbnail" instruction="A direct URL to a square image (e.g., 400x400) representing your project.">
                        <input type="url" id="thumbnail" value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} className={inputStyles} placeholder="https://example.com/image.png" required />
                    </FormField>
                    <FormField label="Banner Image URL" id="banner" instruction="A direct URL to a wide banner image (e.g., 1200x600) for your project page.">
                        <input type="url" id="banner" value={bannerUrl} onChange={e => setBannerUrl(e.target.value)} className={inputStyles} placeholder="https://example.com/banner.png" required />
                    </FormField>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField label="Twitter URL" id="twitter" instruction="Optional link to your project's Twitter profile.">
                            <input type="url" id="twitter" value={socials.twitter} onChange={e => handleSocialChange('twitter', e.target.value)} className={inputStyles} placeholder="https://twitter.com/project" />
                        </FormField>
                        <FormField label="Website URL" id="website" instruction="Optional link to your official website.">
                            <input type="url" id="website" value={socials.website} onChange={e => handleSocialChange('website', e.target.value)} className={inputStyles} placeholder="https://myproject.com" />
                        </FormField>
                        <FormField label="LinkedIn URL" id="linkedin" instruction="Optional link to your LinkedIn page.">
                            <input type="url" id="linkedin" value={socials.linkedin} onChange={e => handleSocialChange('linkedin', e.target.value)} className={inputStyles} placeholder="https://linkedin.com/company/project" />
                        </FormField>
                        <FormField label="GitHub URL" id="github" instruction="Optional link to your project's GitHub repository.">
                            <input type="url" id="github" value={socials.github} onChange={e => handleSocialChange('github', e.target.value)} className={inputStyles} placeholder="https://github.com/project" />
                        </FormField>
                     </div>
                </div>

                {/* Section 3: Funding */}
                <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">3. Funding</h2>
                     <FormField label="Funding Goal (XRP)" id="goal" instruction="The total amount of XRP you are requesting.">
                        <input type="number" id="goal" value={goalAmount} onChange={e => setGoalAmount(e.target.value === '' ? '' : parseFloat(e.target.value))} className={inputStyles} min="1" required />
                    </FormField>
                     <FormField label="XRPL Wallet Address" id="wallet" instruction="The public XRPL address where funds will be sent. Must be a valid 'r...' address.">
                        <input type="text" id="wallet" value={wallet} onChange={e => setWallet(e.target.value)} className={inputStyles} required pattern="^r[1-9A-HJ-NP-Za-km-z]{25,34}$" />
                    </FormField>
                </div>

                {/* Section 4: Team */}
                <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-8 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-3">4. Your Team</h2>
                     {teamMembers.map((member, index) => (
                        <div key={index} className="relative grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border border-gray-800 rounded-lg">
                            <input type="text" placeholder="Full Name" value={member.name || ''} onChange={e => handleTeamMemberChange(index, 'name', e.target.value)} className={inputStyles} required />
                            <input type="text" placeholder="Role (e.g., Lead Developer)" value={member.role || ''} onChange={e => handleTeamMemberChange(index, 'role', e.target.value)} className={inputStyles} required />
                            <input type="url" placeholder="Avatar Image URL" value={member.avatarUrl || ''} onChange={e => handleTeamMemberChange(index, 'avatarUrl', e.target.value)} className={inputStyles} required />
                            {teamMembers.length > 1 && (
                                <button type="button" onClick={() => handleRemoveMember(index)} className="absolute -top-3 -right-3 p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors">
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddMember} className="flex items-center gap-2 text-sm font-semibold text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 py-2 px-4 rounded-lg transition-colors">
                        <PlusIcon className="w-5 h-5" />
                        Add Team Member
                    </button>
                </div>

                {/* Submission */}
                <div className="text-center mt-10">
                    <button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-12 rounded-lg text-lg shadow-lg shadow-purple-600/30 hover:scale-105 transition-transform transform-gpu">
                        Submit for Review
                    </button>
                    <p className="text-xs text-gray-500 mt-4">By submitting, you agree to our Terms of Service. Projects are subject to review and approval by the DAO.</p>
                </div>
            </form>

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

export default SubmitProjectPage;