import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-surface-container-low/80 border-b border-outline-variant' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-on-background font-heading font-bold text-xl">Fin</span>
          <span className="text-primary font-heading font-bold text-xl">Sight</span>
          <span className="ml-1 bg-primary text-white text-xs rounded px-1">AI</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-on-background/60 hover:text-on-background text-sm transition">How it Works</a>
          <a href="#" className="text-on-background/60 hover:text-on-background text-sm transition">About</a>
          <button className="border border-primary text-primary rounded-pill px-4 py-2 text-sm hover:bg-primary hover:text-white transition">Sign In</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
