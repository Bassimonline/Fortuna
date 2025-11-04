
import React from 'react';

const CtaSection: React.FC = () => {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="relative bg-gradient-to-r from-purple-800 via-pink-700 to-orange-600 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-16 -right-5 w-48 h-48 bg-white/10 rounded-full"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Ready to Build the Future?</h2>
                        <p className="text-lg text-purple-200 max-w-2xl mx-auto mb-10">
                            Whether you're a creator with a groundbreaking idea or a supporter of innovation, Fortuna DAO is your platform.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="bg-white text-purple-700 font-semibold py-3 px-8 rounded-lg shadow-lg hover:scale-105 hover:bg-gray-200 transition-all transform-gpu">
                                Start a Project
                            </button>
                             <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/30 transition-all">
                                Join our Discord
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CtaSection;
