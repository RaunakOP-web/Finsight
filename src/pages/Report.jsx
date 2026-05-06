import React, { useEffect } from 'react';
import RiskDial from '../components/RiskDial';
import ActionCard from '../components/ActionCard';

const Report = ({ navigate, reportData }) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeSlideUp');
          entry.target.style.opacity = 1;
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.report-section').forEach((el) => {
      el.style.opacity = 0;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  if (!reportData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-surface-container-low/90 backdrop-blur border-b border-outline-variant px-6 py-4 flex justify-between items-center">
        <button onClick={() => navigate('form')} className="text-on-background/70 hover:text-primary transition text-sm">
          ← Back
        </button>
        <h1 className="font-heading font-semibold text-lg">Your FinSight Report</h1>
        <button onClick={() => window.print()} className="border border-outline-variant rounded-pill px-4 py-1.5 text-sm hover:border-primary transition">
          Download PDF
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24 space-y-12">
        
        {/* SECTION 1 */}
        <section className="report-section glass-card p-8 border-l-4 border-primary" style={{ animationDelay: '0.1s' }}>
          <div className="text-primary text-xs tracking-widest mb-3 font-semibold uppercase">EXECUTIVE SUMMARY</div>
          <p className="text-lg leading-relaxed">{reportData.executive_summary}</p>
        </section>

        {/* SECTION 2 */}
        <section className="report-section" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-tertiary font-heading font-semibold mb-4 uppercase tracking-wider text-sm">FINANCIAL SNAPSHOT</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(reportData.financial_snapshot || {}).map(([key, value]) => (
              <div key={key} className="glass-card p-5">
                <div className="text-on-background/50 text-xs uppercase mb-1">{key.replace(/_/g, ' ')}</div>
                <div className="text-on-background font-mono font-bold text-xl">{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="report-section" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-secondary font-heading font-semibold mb-4 uppercase tracking-wider text-sm">GOAL ANALYSIS</h3>
          <div className="space-y-3">
            {(reportData.goal_analysis || []).map((goal, idx) => (
              <div key={idx} className="glass-card p-6 flex flex-col sm:flex-row items-start gap-6">
                <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                    <path strokeDasharray={`${goal.current_progress_percent}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4edea3" strokeWidth="3" />
                  </svg>
                  <span className="absolute text-xs font-bold">{goal.current_progress_percent}%</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-heading font-semibold text-lg">{goal.goal_name}</h4>
                    <span className={`border rounded px-2 py-0.5 text-xs ${
                      goal.priority === 'High' ? 'bg-red-500/20 text-red-400 border-red-500/50' : 
                      goal.priority === 'Medium' ? 'bg-tertiary/20 text-tertiary border-tertiary/50' : 
                      'bg-secondary/20 text-secondary border-secondary/50'
                    }`}>
                      {goal.priority} Priority
                    </span>
                  </div>
                  <p className="text-on-background/80 mb-2 text-sm">{goal.recommendation}</p>
                  <p className="text-primary text-sm font-medium">Instrument: {goal.suggested_instrument}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4 */}
        <section className="report-section" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-tertiary font-heading font-semibold mb-4 uppercase tracking-wider text-sm">RISK PROFILE</h3>
          <div className="glass-card p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="pointer-events-none">
              <RiskDial value={reportData.risk_profile_assessment?.stated_risk || 'moderate'} />
            </div>
            <div>
              <p className="text-on-background/80 mb-6 text-sm">{reportData.risk_profile_assessment?.reconciliation}</p>
              
              <div className="mb-4">
                <div className="text-xs uppercase text-on-background/50 mb-2">Ideal Asset Allocation</div>
                <div className="flex h-6 rounded-pill overflow-hidden text-xs font-bold">
                  {reportData.risk_profile_assessment?.ideal_asset_allocation && Object.entries(reportData.risk_profile_assessment.ideal_asset_allocation).map(([key, val]) => {
                    const percent = parseInt(val) || 0;
                    if (percent === 0) return null;
                    let bg = 'bg-primary';
                    if (key === 'debt') bg = 'bg-tertiary';
                    if (key === 'gold') bg = 'bg-yellow-500';
                    if (key === 'cash_liquid') bg = 'bg-secondary';
                    return (
                      <div key={key} className={`${bg} flex items-center justify-center`} style={{ width: `${percent}%` }}>
                        {percent > 10 ? val : ''}
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-4 mt-2 text-xs text-on-background/50">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-primary rounded-full"></span> Equity</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-tertiary rounded-full"></span> Debt</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-500 rounded-full"></span> Gold</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-secondary rounded-full"></span> Cash</span>
                </div>
              </div>
              
              <p className="text-on-background/60 text-xs">{reportData.risk_profile_assessment?.allocation_reasoning}</p>
            </div>
          </div>
        </section>

        {/* SECTION 5 (Optional) */}
        {reportData.fact_sheet_insights && Object.keys(reportData.fact_sheet_insights).length > 0 && (
          <section className="report-section" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-on-background/80 font-heading font-semibold mb-4 uppercase tracking-wider text-sm">FACT SHEET INSIGHTS</h3>
            <div className="glass-card p-6">
              <h4 className="font-heading font-bold text-lg mb-3">{reportData.fact_sheet_insights.fund_or_portfolio_name}</h4>
              <p className="mb-4 text-sm text-on-background/80">{reportData.fact_sheet_insights.performance_commentary}</p>
              <p className="mb-6 text-sm text-on-background/80">{reportData.fact_sheet_insights.fit_for_user}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {reportData.fact_sheet_insights.positives && reportData.fact_sheet_insights.positives.length > 0 && (
                  <div>
                    <h5 className="text-secondary text-xs font-bold uppercase mb-2">Positives</h5>
                    <ul className="space-y-1">
                      {reportData.fact_sheet_insights.positives.map((p, i) => (
                        <li key={i} className="text-secondary text-sm flex gap-2"><span className="flex-shrink-0">✓</span> <span>{p}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
                {reportData.fact_sheet_insights.red_flags && reportData.fact_sheet_insights.red_flags.length > 0 && (
                  <div>
                    <h5 className="text-red-400 text-xs font-bold uppercase mb-2">Red Flags</h5>
                    <ul className="space-y-1">
                      {reportData.fact_sheet_insights.red_flags.map((r, i) => (
                        <li key={i} className="text-red-400 text-sm flex gap-2"><span className="flex-shrink-0">⚠</span> <span>{r}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 6 */}
        <section className="report-section" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-primary font-heading font-semibold mb-4 uppercase tracking-wider text-sm">RECOMMENDED STRATEGY</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['short_term_0_to_1yr', 'mid_term_1_to_5yr', 'long_term_5yr_plus'].map((key) => {
              const strat = reportData.recommended_strategy?.[key];
              if (!strat) return null;
              
              let border = 'border-t-2 border-secondary';
              if (key === 'mid_term_1_to_5yr') border = 'border-t-2 border-tertiary';
              if (key === 'long_term_5yr_plus') border = 'border-t-2 border-primary';

              return (
                <div key={key} className={`glass-card p-5 ${border}`}>
                  <h4 className="font-heading font-semibold mb-3">{strat.title}</h4>
                  <ul className="list-disc pl-4 space-y-1 mb-4 text-sm text-on-background/80 marker:text-primary">
                    {(strat.actions || []).map((act, i) => <li key={i}>{act}</li>)}
                  </ul>
                  <p className="text-xs text-on-background/50 border-t border-outline-variant pt-3">{strat.reasoning}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 7 */}
        <section className="report-section" style={{ animationDelay: '0.7s' }}>
          <h3 className="text-on-background/80 font-heading font-semibold mb-4 uppercase tracking-wider text-sm">ACTION STEPS</h3>
          <div className="space-y-3">
            {(reportData.action_steps || []).map((act, idx) => (
              <ActionCard key={idx} {...act} />
            ))}
          </div>
        </section>

        {/* CLOSING NOTE */}
        <section className="report-section" style={{ animationDelay: '0.8s' }}>
          <div className="glass-card p-8 mt-6 text-center border border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <p className="text-lg italic text-on-background/80">"{reportData.closing_note}"</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Report;
