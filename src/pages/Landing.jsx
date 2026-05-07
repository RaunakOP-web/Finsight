import React from 'react';
import Navbar from '../components/Navbar';
import ParticleBackground from '../components/ParticleBackground';
import TickerTape from '../components/TickerTape';

const Landing = ({ navigate }) => {
  return (
    <div className="min-h-screen relative flex flex-col justify-center overflow-hidden">
      <ParticleBackground />
      <Navbar />
      
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">
        <div className="border border-primary/30 text-primary rounded-pill px-4 py-1 text-sm animate-float mb-8 glass-card">
          ✦ AI-Powered Financial Intelligence
        </div>
        
        <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6">
          <div className="text-on-background">Your Money.</div>
          <div className="text-on-background">Your Future.</div>
          <div className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent pb-2">
            Your Report.
          </div>
        </h1>
        
        <p className="text-on-background/60 text-lg md:text-xl max-w-xl mx-auto mb-10">
          AI-powered financial insights personalized to your life goals, risk profile, and real market data — in seconds.
        </p>
        
        <button 
          onClick={() => navigate('form')}
          className="cta-btn"
        >
          <span className="cta-btn-text">Get My Report →</span>
        </button>

        <div className="flex flex-wrap justify-center gap-4 mt-12 w-full max-w-2xl">
          <div className="glass-card px-6 py-4 text-center animate-float flex-1 min-w-[180px]" style={{ animationDelay: '0s' }}>
            <div className="text-tertiary font-bold text-2xl md:text-3xl mb-1">98%</div>
            <div className="text-on-background/50 text-sm">Accuracy Score</div>
          </div>
          <div className="glass-card px-6 py-4 text-center animate-float flex-1 min-w-[180px]" style={{ animationDelay: '0.5s' }}>
            <div className="text-primary font-bold text-xl md:text-2xl mb-1">Llama 3.3</div>
            <div className="text-on-background/50 text-sm">Reasoning Engine</div>
          </div>
          <div className="glass-card px-6 py-4 text-center animate-float flex-1 min-w-[180px]" style={{ animationDelay: '1s' }}>
            <div className="text-secondary font-bold text-2xl md:text-3xl mb-1">10s</div>
            <div className="text-on-background/50 text-sm">Avg. Report Time</div>
          </div>
        </div>
      </main>
      
      <TickerTape />
    </div>
  );
};

export default Landing;
