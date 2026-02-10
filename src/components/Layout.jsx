import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen bg-background text-text overflow-hidden selection:bg-primary/30">
            {/* Ambient Background Mesh */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px]" />
                <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] rounded-full bg-accent/5 blur-[100px]" />
            </div>

            <Navbar />

            <main className="relative z-10 flex-grow flex flex-col pt-24">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
