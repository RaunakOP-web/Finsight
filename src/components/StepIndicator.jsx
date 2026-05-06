import React from 'react';

const StepIndicator = ({ currentStep, labels }) => {
  return (
    <div className="flex items-center justify-center w-full max-w-2xl mx-auto mb-12">
      {labels.map((label, index) => {
        const stepNum = index + 1;
        const isCompleted = currentStep > stepNum;
        const isCurrent = currentStep === stepNum;
        
        return (
          <React.Fragment key={stepNum}>
            <div className="flex flex-col items-center relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 z-10 
                ${isCompleted ? 'bg-secondary text-surface-container' : 
                  isCurrent ? 'bg-primary text-white ring-4 ring-primary/30' : 
                  'bg-surface-container border border-outline-variant text-on-background/40'}`}>
                {isCompleted ? '✓' : stepNum}
              </div>
              <span className={`absolute top-10 whitespace-nowrap font-body text-xs 
                ${isCurrent || isCompleted ? 'text-on-background' : 'text-on-background/40'}`}>
                {label}
              </span>
            </div>
            {index < labels.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 transition-all duration-300
                ${isCompleted ? 'bg-secondary' : 'bg-outline-variant'}`} 
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
