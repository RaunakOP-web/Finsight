import React from 'react';

const TickerTape = () => {
  const items = [
    { symbol: 'NIFTY 50', value: '24,198.85', change: '+0.43%', up: true },
    { symbol: 'SENSEX', value: '79,442.11', change: '+0.38%', up: true },
    { symbol: 'GOLD', value: '₹72,450', change: '+1.2%', up: true },
    { symbol: 'USD/INR', value: '83.47', change: '-0.12%', up: false },
    { symbol: 'NIFTY BANK', value: '51,233.60', change: '+0.67%', up: true },
    { symbol: 'CRUDE OIL', value: '$78.32', change: '-0.55%', up: false },
    { symbol: 'SILVER', value: '₹89,200', change: '+0.9%', up: true },
    { symbol: 'BITCOIN', value: '$67,420', change: '+2.1%', up: true },
  ];

  const renderItems = () => (
    items.map((item, index) => (
      <span key={`${item.symbol}-${index}`} className="mx-8">
        <span className="text-on-background/50 text-xs mr-2">{item.symbol}</span>
        <span className="text-on-background text-xs font-mono font-medium mr-1">{item.value}</span>
        <span className={`text-xs ${item.up ? 'text-secondary' : 'text-red-400'}`}>{item.change}</span>
      </span>
    ))
  );

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 bg-surface-container-low border-t border-outline-variant py-2">
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {renderItems()}
          {renderItems()}
        </div>
      </div>
    </div>
  );
};

export default TickerTape;
