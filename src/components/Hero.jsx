import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import api from '../api/axios'; // Ensure we use the configured axios instance

const Hero = ({ onStart }) => {
    const [activeUsers, setActiveUsers] = React.useState(1);

    React.useEffect(() => {
        // Generate or retrieve a persistent visitor ID (Session based now)
        let visitorId = sessionStorage.getItem('visitor_id');
        if (!visitorId) {
            visitorId = uuidv4();
            sessionStorage.setItem('visitor_id', visitorId);
        }

        const sendHeartbeat = async () => {
            try {
                const response = await api.post('/analytics/heartbeat', { visitorId });
                setActiveUsers(response.data.activeUsers);
            } catch (error) {
                console.error("Failed to sync active users", error);
            }
        };

        // Send immediately on mount
        sendHeartbeat();

        // Sync every 5 seconds
        const interval = setInterval(sendHeartbeat, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative pt-20 pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-md"
                        >
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            <span className="text-sm font-medium text-slate-300">New AI Model V2.0</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight"
                        >
                            Master Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient bg-300%">
                                Tech Interview.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light"
                        >
                            Join thousands of candidates who doubled their interview success rate with tailored AI mock interviews, real-time feedback, and detailed performance analytics.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                        >
                            <button
                                onClick={onStart}
                                className="group btn-primary w-full sm:w-auto h-14 px-8 text-base shadow-[0_10px_40px_-10px_rgba(99,102,241,0.5)]"
                            >
                                <span>Start Interview</span>
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-white leading-none">{activeUsers}</p>
                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">Total Visitors</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Visual Content */}
                    <div className="flex-1 relative w-full max-w-[600px] lg:max-w-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10"
                        >
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 backdrop-blur-xl group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                                <div className="p-1">
                                    {/* Using a placeholder if hero.png doesn't exist or just using the image if it fits */}
                                    <img src="/hero.png" alt="Dashboard Preview" className="rounded-xl w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" />
                                </div>

                                {/* Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-8 -left-8 bg-surface/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-4 hidden sm:flex"
                                >
                                    <div className="bg-green-500/20 p-3 rounded-lg">
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Performance</p>
                                        <p className="text-lg font-bold text-white">Top 5% Candidate</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Decor elements */}
                        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
