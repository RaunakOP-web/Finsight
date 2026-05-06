import React, { useEffect, useState } from 'react';

const Loading = ({ navigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    "Analyzing your profile...",
    "Reading fact sheet data...",
    "Mapping to market conditions...",
    "Crafting your personalized report..."
  ];

  useEffect(() => {
    // Step animation sequence
    const timeouts = [];
    for (let i = 0; i < steps.length; i++) {
      timeouts.push(setTimeout(() => setCurrentStep(i), i * 1500));
    }

    // Progress bar animation
    const startTime = Date.now();
    const duration = 15000;
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min((elapsed / duration) * 95, 95);
      setProgress(percent);
      if (percent < 95) {
        requestAnimationFrame(updateProgress);
      }
    };
    
    const progressAnim = requestAnimationFrame(updateProgress);

    return () => {
      timeouts.forEach(clearTimeout);
      cancelAnimationFrame(progressAnim);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      
      {/* Network / Brain Graphic */}
      <div className="relative w-48 h-48 mb-12">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
          <g style={{ animation: 'pulseGlow 4s infinite' }}>
            <line x1="20" y1="50" x2="40" y2="30" stroke="rgba(37,99,235,0.4)" strokeWidth="1" />
            <line x1="40" y1="30" x2="60" y2="30" stroke="rgba(37,99,235,0.4)" strokeWidth="1" />
            <line x1="60" y1="30" x2="80" y2="50" stroke="rgba(37,99,235,0.4)" strokeWidth="1" />
            <line x1="80" y1="50" x2="60" y2="70" stroke="rgba(37,99,235,0.4)" strokeWidth="1" />
            <line x1="60" y1="70" x2="40" y2="70" stroke="rgba(37,99,235,0.4)" strokeWidth="1" />
            <line x1="40" y1="70" x2="20" y2="50" stroke="rgba(37,99,235,0.4)" strokeWidth="1" />
            <line x1="40" y1="30" x2="50" y2="50" stroke="rgba(37,99,235,0.4)" strokeWidth="1" />
            <line x1="60" y1="30" x2="50" y2="50" stroke="rgba(37,99,235,0.4)" strokeWidth="1" />
            <line x1="20" y1="50" x2="50" y2="50" stroke="rgba(37,99,235,0.4)" strokeWidth="1" />
            <line x1="80" y1="50" x2="50" y2="50" stroke="rgba(37,99,235,0.4)" strokeWidth="1" />
            <line x1="40" y1="70" x2="50" y2="50" stroke="rgba(37,99,235,0.4)" strokeWidth="1" />
            <line x1="60" y1="70" x2="50" y2="50" stroke="rgba(37,99,235,0.4)" strokeWidth="1" />
          </g>

          <circle cx="20" cy="50" r="3" fill="#2563eb" style={{ animation: 'float 2s infinite ease-in-out' }} />
          <circle cx="40" cy="30" r="3" fill="#2563eb" style={{ animation: 'float 2s infinite ease-in-out 0.2s' }} />
          <circle cx="60" cy="30" r="3" fill="#2563eb" style={{ animation: 'float 2s infinite ease-in-out 0.4s' }} />
          <circle cx="80" cy="50" r="3" fill="#2563eb" style={{ animation: 'float 2s infinite ease-in-out 0.6s' }} />
          <circle cx="60" cy="70" r="3" fill="#2563eb" style={{ animation: 'float 2s infinite ease-in-out 0.8s' }} />
          <circle cx="40" cy="70" r="3" fill="#2563eb" style={{ animation: 'float 2s infinite ease-in-out 1.0s' }} />
          <circle cx="50" cy="50" r="4" fill="#4edea3" style={{ animation: 'pulseGlow 2s infinite' }} />
        </svg>
      </div>

      {/* Steps Sequence */}
      <div className="w-full max-w-sm flex flex-col gap-3 mb-10">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div 
              key={index} 
              className={`flex items-center gap-3 transition-all duration-500 ${isPending ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            >
              <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                {isCompleted && <span className="text-secondary text-sm">✓</span>}
                {isCurrent && <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>}
                {isPending && <span className="text-on-background/30 text-xs">○</span>}
              </div>
              <span className={`${isCompleted ? 'text-on-background/70' : isCurrent ? 'text-on-background font-medium' : 'text-on-background/30'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-on-background/30 text-sm mb-4">Usually takes 10–20 seconds</p>
      
      {/* Progress Bar */}
      <div className="w-full max-w-sm h-1 bg-surface-container rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary" 
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        ></div>
      </div>

    </div>
  );
};

export default Loading;
