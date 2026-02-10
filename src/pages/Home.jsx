import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import UploadResume from '../components/UploadResume';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, MessageSquare, Award, ArrowDown } from 'lucide-react';

const Home = () => {
    const uploadRef = useRef(null);
    const navigate = useNavigate();

    const scrollToUpload = () => {
        uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleUploadSuccess = (data) => {
        navigate('/interview', { state: { resumeId: data.resumeId, resumeData: data.data } });
    };

    const steps = [
        {
            icon: Upload,
            title: "Upload Resume",
            text: "Drag & drop your PDF/DOCX. Our AI extracts your skills and experience instantly.",
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            icon: MessageSquare,
            title: "Answer Questions",
            text: "Face tailored technical and behavioral questions generated just for you.",
            color: "text-purple-400",
            bg: "bg-purple-500/10"
        },
        {
            icon: Award,
            title: "Get Feedback",
            text: "Receive detailed, constructive feedback on your answers to improve quickly.",
            color: "text-green-400",
            bg: "bg-green-500/10"
        }
    ];

    return (
        <>
            <Hero onStart={scrollToUpload} />

            {/* How it Works Section */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-display font-bold text-white mb-6"
                        >
                            Your Path to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Success</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 max-w-2xl mx-auto text-lg"
                        >
                            Three simple steps to master your next interview.
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        {steps.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="group relative p-8 rounded-3xl bg-surface/50 border border-white/5 hover:bg-surface/80 hover:border-white/10 transition-all duration-300 backdrop-blur-sm"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className={`w-7 h-7 ${item.color}`} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{item.text}</p>

                                <div className="absolute top-8 right-8 text-6xl font-black text-white/5 pointer-events-none select-none">
                                    0{i + 1}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <div ref={uploadRef} className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <UploadResume onUploadSuccess={handleUploadSuccess} />
                </div>
            </div>
        </>
    );
};

export default Home;
