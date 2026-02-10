import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all duration-300"></div>
                            <div className="relative bg-gradient-to-tr from-primary to-accent p-2.5 rounded-xl text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                                <Sparkles className="w-5 h-5" />
                            </div>
                        </div>
                        <span className="text-xl font-display font-bold text-white tracking-tight">
                            AI <span className="text-primary">Prep</span>
                        </span>
                    </Link>

                    {/* Desktop Nav - Removed Links and Get Started */}
                    <div className="hidden md:flex items-center space-x-8">
                    </div>

                    {/* Mobile Menu Button - Removed */}
                </div>
            </div>

            {/* Mobile Menu - Removed */}
        </nav>
    );
};

export default Navbar;
