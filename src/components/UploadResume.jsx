import React, { useState, useRef } from 'react';
import { Upload, FileText, Loader2, CheckCircle, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';

const UploadResume = ({ onUploadSuccess }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        validateAndSetFile(selectedFile);
    };

    const validateAndSetFile = (file) => {
        if (!file) return;
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            setError('Please upload a PDF or DOC/DOCX file.');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB.');
            return;
        }
        setError('');
        setFile(file);
    };

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setLoading(false);
            onUploadSuccess(response.data);
        } catch (err) {
            setLoading(false);
            console.error(err);
            setError('Upload failed. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 bg-surface/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl text-center overflow-hidden"
            >
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <h2 className="text-3xl font-display font-bold mb-3 text-white">Upload Your Resume</h2>
                <p className="text-slate-400 mb-10 max-w-md mx-auto">We'll analyze your skills and generate tailored interview questions.</p>

                <div
                    className={`relative border-2 border-dashed rounded-2xl p-10 transition-all duration-300 cursor-pointer overflow-hidden group ${isDragOver
                        ? 'border-primary bg-primary/5 scale-[1.02]'
                        : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/50'
                        }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                    />

                    <AnimatePresence mode="wait">
                        {!file ? (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-20 h-20 bg-slate-800/80 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-black/20">
                                    <Upload className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <p className="text-xl font-medium text-white mb-2">Click to upload or drag & drop</p>
                                <p className="text-sm text-slate-500 font-medium bg-slate-800/50 px-3 py-1 rounded-full">PDF, DOCX (Max 5MB)</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="file-selected"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="flex flex-col items-center relative z-10"
                            >
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                                    <FileText className="w-10 h-10 text-green-500" />
                                </div>
                                <p className="text-xl font-medium text-white mb-1">{file.name}</p>
                                <p className="text-sm text-slate-400 mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                                <button
                                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                    className="flex items-center space-x-1 text-sm text-red-400 hover:text-red-300 px-4 py-2 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Remove file</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium flex items-center justify-center"
                    >
                        {error}
                    </motion.div>
                )}

                <AnimatePresence>
                    {file && !loading && (
                        <motion.button
                            onClick={handleUpload}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-primary mt-8 w-full h-14 text-lg flex items-center justify-center space-x-3 shadow-xl shadow-primary/20"
                        >
                            <Sparkles className="w-5 h-5" />
                            <span>Generate Interview</span>
                        </motion.button>
                    )}
                </AnimatePresence>

                {loading && (
                    <div className="mt-8 flex flex-col items-center">
                        <div className="relative mb-4">
                            <div className="w-16 h-16 border-4 border-slate-700/50 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <span className="text-base font-medium text-white animate-pulse">Analyzing resume & crafting questions...</span>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default UploadResume;
