import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Send, CheckCircle, ChevronRight, ChevronLeft, Award, Zap, BookOpen, AlertCircle } from 'lucide-react';
import api from '../api/axios';

const QuestionCard = ({ question, index, total, onNext, onPrev, sessionId }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [selfTestMode, setSelfTestMode] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [evaluation, setEvaluation] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Reset state when question changes
    React.useEffect(() => {
        setShowAnswer(false);
        setSelfTestMode(false);
        setUserAnswer('');
        setEvaluation(null);
    }, [question]);

    const handleSubmit = async () => {
        if (!userAnswer.trim()) return;
        setSubmitting(true);
        try {
            const response = await api.post('/interview/answer', {
                sessionId: sessionId,
                questionId: question._id,
                studentAnswer: userAnswer
            });
            setEvaluation(response.data.evaluation);
        } catch (error) {
            console.error("Evaluation failed", error);
        } finally {
            setSubmitting(false);
        }
    };

    const getTypeColor = (type) => {
        switch (type?.toLowerCase()) {
            case 'technical': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
            case 'behavioral': return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
            case 'situational': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
        }
    };

    return (
        <motion.div
            key={question._id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="relative bg-surface/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden">
                {/* Decorative background gradients */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${getTypeColor(question.type)}`}>
                            {question.type}
                        </span>

                        {question.difficulty && (
                            <span className="text-xs font-medium text-slate-500 flex items-center">
                                <Zap className="w-3 h-3 mr-1 text-yellow-500" />
                                {question.difficulty}
                            </span>
                        )}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-8 leading-normal">
                        {question.question}
                    </h3>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <button
                            onClick={() => setShowAnswer(!showAnswer)}
                            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${showAnswer
                                    ? 'bg-slate-700 text-white shadow-inner'
                                    : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                                }`}
                        >
                            {showAnswer ? <BookOpen className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            <span>{showAnswer ? 'Hide Solution' : 'View Solution'}</span>
                        </button>

                        <button
                            onClick={() => setSelfTestMode(!selfTestMode)}
                            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${selfTestMode
                                    ? 'bg-primary/20 border border-primary text-primary shadow-lg shadow-primary/10'
                                    : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
                                }`}
                        >
                            <Award className="w-4 h-4" />
                            <span>{selfTestMode ? 'Cancel Practice' : 'Attempt Question'}</span>
                        </button>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {/* Ideal Answer Section */}
                        {showAnswer && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden mb-6"
                            >
                                <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                                    <h4 className="text-emerald-400 font-semibold mb-3 flex items-center">
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                        Ideal Response
                                    </h4>
                                    <p className="text-slate-200 leading-relaxed text-lg font-light">
                                        {question.idealAnswer}
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Interactive Practice Mode */}
                        {selfTestMode && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                                    <label className="block text-sm font-medium text-slate-300 mb-4 ml-1">Your Answer</label>
                                    <div className="relative">
                                        <textarea
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            className="w-full min-h-[150px] bg-slate-950/50 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none placeholder-slate-600 leading-relaxed"
                                            placeholder="Structure your answer using the STAR method (Situation, Task, Action, Result)..."
                                        />
                                        <div className="absolute bottom-4 right-4 flex space-x-2">
                                            <button
                                                disabled={submitting || !userAnswer.trim()}
                                                onClick={handleSubmit}
                                                className="btn-primary py-2 px-4 shadow-lg text-sm flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {submitting ? (
                                                    <span className="flex items-center"><span className="animate-spin mr-2">⏳</span> Analyzing...</span>
                                                ) : (
                                                    <>
                                                        <Send className="w-4 h-4" />
                                                        <span>Submit</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Evaluation Results */}
                                    {evaluation && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-8 pt-8 border-t border-slate-700/50"
                                        >
                                            <div className="flex items-center justify-between mb-6">
                                                <h4 className="text-lg font-semibold text-white">AI Feedback</h4>
                                                <div className={`px-4 py-1.5 rounded-full border ${evaluation.score >= 7 ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                                        evaluation.score >= 4 ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                                                            'bg-red-500/10 border-red-500/20 text-red-400'
                                                    }`}>
                                                    <span className="font-bold text-lg">{evaluation.score}</span>
                                                    <span className="text-xs opacity-80 uppercase tracking-wider ml-1">/10 Score</span>
                                                </div>
                                            </div>

                                            <div className="bg-slate-800/30 rounded-xl p-5 mb-6">
                                                <p className="text-slate-300 italic">"{evaluation.feedback}"</p>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                {evaluation.strengths.length > 0 && (
                                                    <div>
                                                        <span className="text-xs font-bold text-green-400 uppercase tracking-wider block mb-3 flex items-center">
                                                            <CheckCircle className="w-3 h-3 mr-1" /> Key Strengths
                                                        </span>
                                                        <ul className="space-y-2">
                                                            {evaluation.strengths.map((s, i) => (
                                                                <li key={i} className="flex items-start text-sm text-slate-300">
                                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                                                    {s}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {evaluation.weaknesses.length > 0 && (
                                                    <div>
                                                        <span className="text-xs font-bold text-red-400 uppercase tracking-wider block mb-3 flex items-center">
                                                            <AlertCircle className="w-3 h-3 mr-1" /> Improvements
                                                        </span>
                                                        <ul className="space-y-2">
                                                            {evaluation.weaknesses.map((w, i) => (
                                                                <li key={i} className="flex items-start text-sm text-slate-300">
                                                                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                                                                    {w}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 px-4">
                <button
                    onClick={onPrev}
                    disabled={index === 0}
                    className="flex items-center space-x-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="font-medium">Previous</span>
                </button>

                <div className="flex space-x-1">
                    {Array.from({ length: total }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-primary w-6' :
                                    i < index ? 'bg-slate-600' : 'bg-slate-800'
                                }`}
                        />
                    ))}
                </div>

                <button
                    onClick={onNext}
                    disabled={index === total - 1}
                    className="group flex items-center space-x-2 text-white disabled:opacity-30 transition-colors"
                >
                    <span className="font-medium">Next Question</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <ChevronRight className="w-4 h-4" />
                    </div>
                </button>
            </div>
        </motion.div>
    );
};

export default QuestionCard;
