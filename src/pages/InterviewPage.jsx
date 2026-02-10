import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import api from '../api/axios';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const InterviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sessionData, setSessionData] = useState(null);

    useEffect(() => {
        if (!location.state?.resumeId) {
            navigate('/');
            return;
        }

        const startSession = async () => {
            try {
                const response = await api.post('/interview/start', {
                    resumeId: location.state.resumeId
                });
                setQuestions(response.data.questions);
                setSessionData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to start session", error);
                setLoading(false);
            }
        };

        startSession();
    }, [location, navigate]);

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-t-4 border-secondary rounded-full animate-spin-reverse opacity-70"></div>
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-3">Initializing Interface...</h2>
                <p className="text-slate-400 animate-pulse">Analyzing resume & generating profile-specific questions</p>
            </div>
        );
    }

    if (!questions || questions.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Failed to Generate Questions</h2>
                <p className="text-slate-400 mb-8 max-w-md">We couldn't generate questions from your resume. Please try uploading a different file.</p>
                <button onClick={() => navigate('/')} className="btn-primary">
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto px-4 py-12 relative min-h-[calc(100vh-100px)]">
            {/* Progress Header */}
            <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Technical Interview</h2>
                        <p className="text-slate-400 text-sm">Session ID: <span className="font-mono text-slate-500">#{sessionData?.sessionId?.slice(-6) || 'N/A'}</span></p>
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-bold text-primary">{currentIndex + 1}</span>
                        <span className="text-slate-500 text-lg">/{questions.length}</span>
                    </div>
                </div>

                <div className="h-2 bg-surface border border-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            <QuestionCard
                question={questions[currentIndex]}
                index={currentIndex}
                total={questions.length}
                onNext={handleNext}
                onPrev={handlePrev}
                sessionId={sessionData?.sessionId}
            />
        </div>
    );
};

export default InterviewPage;
