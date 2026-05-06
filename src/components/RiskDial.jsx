import React from 'react';

const RiskDial = ({ value, onChange }) => {
  const getRotation = () => {
    switch (value.toLowerCase()) {
      case 'conservative': return -60;
      case 'moderate': return 0;
      case 'aggressive': return 60;
      default: return 0;
    }
  };

  const getActiveColor = () => {
    switch (value.toLowerCase()) {
      case 'conservative': return 'text-secondary';
      case 'moderate': return 'text-tertiary';
      case 'aggressive': return 'text-red-400';
      default: return 'text-on-background';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-32 overflow-hidden mb-4">
        <svg viewBox="0 0 300 160" className="w-full h-full drop-shadow-lg">
          {/* Conservative Arc */}
          <path d="M 30 150 A 120 120 0 0 1 100 46" fill="none" stroke="#4edea3" strokeWidth="20" opacity={value === 'conservative' ? 1 : 0.3} />
          {/* Moderate Arc */}
          <path d="M 100 46 A 120 120 0 0 1 200 46" fill="none" stroke="#ffb95f" strokeWidth="20" opacity={value === 'moderate' ? 1 : 0.3} />
          {/* Aggressive Arc */}
          <path d="M 200 46 A 120 120 0 0 1 270 150" fill="none" stroke="#ef4444" strokeWidth="20" opacity={value === 'aggressive' ? 1 : 0.3} />
          
          {/* Needle */}
          <g 
            style={{ transform: `translate(150px, 150px) rotate(${getRotation()}deg)`, transition: 'transform 0.6s ease' }}
          >
            <circle cx="0" cy="0" r="8" fill="#d4e4fa" />
            <path d="M -3 0 L 0 -110 L 3 0 Z" fill="#d4e4fa" />
          </g>
        </svg>
      </div>
      
      <div className="text-center mb-6">
        <h3 className={`font-heading font-bold text-xl uppercase tracking-wider ${getActiveColor()}`}>
          {value}
        </h3>
      </div>

      {onChange && (
        <div className="flex gap-4 w-full justify-center">
          <button 
            onClick={() => onChange('conservative')}
            className={`px-4 py-2 rounded-pill text-sm transition-all border ${value === 'conservative' ? 'border-secondary text-secondary bg-secondary/10' : 'border-outline-variant text-on-background/50 hover:border-secondary/50'}`}
          >
            Conservative
          </button>
          <button 
            onClick={() => onChange('moderate')}
            className={`px-4 py-2 rounded-pill text-sm transition-all border ${value === 'moderate' ? 'border-tertiary text-tertiary bg-tertiary/10' : 'border-outline-variant text-on-background/50 hover:border-tertiary/50'}`}
          >
            Moderate
          </button>
          <button 
            onClick={() => onChange('aggressive')}
            className={`px-4 py-2 rounded-pill text-sm transition-all border ${value === 'aggressive' ? 'border-red-400 text-red-400 bg-red-400/10' : 'border-outline-variant text-on-background/50 hover:border-red-400/50'}`}
          >
            Aggressive
          </button>
        </div>
      )}
    </div>
  );
};

export default RiskDial;
