import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons';

interface CreateProposalPageProps {
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

const CreateProposalPage: React.FC<CreateProposalPageProps> = ({ onBack }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const proposalData = { title, description };
        console.log("New Proposal Data:", proposalData);
        alert('Proposal submitted for review! Check the developer console for the submitted data.');
        onBack();
    };

    return (
        <div className="container mx-auto px-4 py-16 animate-fadeInUp">
            <button 
                onClick={onBack} 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
                aria-label="Back to governance"
            >
                <ArrowLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
                Back to Governance
            </button>
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white">Create a New Proposal</h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-4">
                    Propose a change or new initiative for the Fortuna DAO. Clearly articulate your idea to the community.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-8">
                <FormField label="Proposal Title" id="title" instruction="A clear, concise title that summarizes the proposal.">
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        className={inputStyles} 
                        required 
                        maxLength={100}
                    />
                </FormField>
                <FormField label="Proposal Description" id="description" instruction="Detailed explanation of the proposal. What is the problem, what is the proposed solution, and what are the expected outcomes? Markdown is supported.">
                    <textarea 
                        id="description" 
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                        className={inputStyles} 
                        rows={10} 
                        required 
                    />
                </FormField>

                <div className="text-center mt-8">
                    <button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-10 rounded-lg text-lg shadow-lg shadow-purple-600/30 hover:scale-105 transition-transform transform-gpu">
                        Submit Proposal
                    </button>
                    <p className="text-xs text-gray-500 mt-4">Note: A fee in FORT tokens may be required to submit a proposal to prevent spam.</p>
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

export default CreateProposalPage;