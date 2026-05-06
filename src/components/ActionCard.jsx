import React from 'react';

const ActionCard = ({ priority, action, why, by_when }) => {
  const getBadgeStyle = () => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-tertiary/20 text-tertiary';
      case 'low': return 'bg-secondary/20 text-secondary';
      default: return 'bg-surface-container-high text-on-background';
    }
  };

  const getLetter = () => {
    return priority.charAt(0).toUpperCase();
  };

  return (
    <div className="glass-card p-5 mb-3 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${getBadgeStyle()}`}>
        {getLetter()}
      </div>
      <div>
        <h4 className="font-medium text-on-background">{action}</h4>
        <p className="text-sm text-on-background/50 mt-1">{why}</p>
        {by_when && (
          <span className="bg-surface-container-high rounded px-2 py-0.5 text-xs text-on-background/60 mt-2 inline-block">
            {by_when}
          </span>
        )}
      </div>
    </div>
  );
};

export default ActionCard;
