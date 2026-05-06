import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import StepIndicator from '../components/StepIndicator';
import RiskDial from '../components/RiskDial';
import FileUpload from '../components/FileUpload';
import { updateForm, getFormData } from '../store/formStore';
import { extractFactSheet, generateReport } from '../services/api';

const Form = ({ navigate, setReportData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isExtracting, setIsExtracting] = useState(false);
  const [formData, setLocalFormData] = useState(getFormData());

  const handleUpdate = (key, value) => {
    updateForm(key, value);
    setLocalFormData(getFormData());
  };

  const handleToggleGoal = (goalId) => {
    const goals = [...formData.goals];
    if (goals.includes(goalId)) {
      handleUpdate('goals', goals.filter(g => g !== goalId));
    } else {
      handleUpdate('goals', [...goals, goalId]);
    }
  };

  const formatCurrency = (val) => {
    if (!val) return '';
    const num = Number(val);
    if (num >= 10000000) return `₹ ${(num / 10000000).toFixed(2)} Crores`;
    if (num >= 100000) return `₹ ${(num / 100000).toFixed(2)} Lakhs`;
    return `₹ ${num.toLocaleString('en-IN')}`;
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerate = async () => {
    navigate('loading');
    try {
      const profile = getFormData();
      const result = await generateReport(profile, profile.extractedText);
      setReportData(result);
      navigate('report');
    } catch (e) {
      alert(e.message || 'Error generating report.');
      navigate('form');
    }
  };

  const onFileSelect = async (file) => {
    handleUpdate('factSheetFile', file);
    setIsExtracting(true);
    try {
      const result = await extractFactSheet(file);
      handleUpdate('extractedText', result.extracted_text);
    } catch (e) {
      console.warn('Extraction failed', e);
    } finally {
      setIsExtracting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div key={1} className="animate-fadeSlideUp">
            <h2 className="font-heading text-3xl text-on-background">Tell us about yourself</h2>
            <p className="text-on-background/50 text-base mt-2 mb-8">We'll use this to personalize every insight</p>
            
            <div className="mb-6">
              <label className="text-on-background/70 text-sm mb-2 block">Full Name</label>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => handleUpdate('name', e.target.value)}
                className="glass-card w-full px-4 py-3 text-on-background rounded-input border border-outline-variant focus:border-primary focus:outline-none focus:shadow-glow-primary bg-transparent"
                placeholder="e.g. Priya Sharma"
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-on-background/70 text-sm block">Age</label>
                <span className="text-primary font-bold">{formData.age}</span>
              </div>
              <input 
                type="range" min="18" max="75" step="1"
                value={formData.age}
                onChange={(e) => handleUpdate('age', Number(e.target.value))}
                className="w-full accent-primary h-2"
              />
              <div className="flex justify-between text-xs text-on-background/40 mt-1">
                <span>18</span>
                <span>46</span>
                <span>75</span>
              </div>
            </div>

            <div className="mb-6 relative">
              <label className="text-on-background/70 text-sm mb-2 block">Monthly Income (₹)</label>
              <span className="absolute left-4 top-10 text-on-background/50">₹</span>
              <input 
                type="number"
                value={formData.monthlyIncome || ''}
                onChange={(e) => handleUpdate('monthlyIncome', Number(e.target.value))}
                className="glass-card w-full pl-8 pr-4 py-3 text-on-background rounded-input border border-outline-variant focus:border-primary focus:outline-none focus:shadow-glow-primary bg-transparent"
                placeholder="0"
              />
            </div>

            <div className="mb-6 relative">
              <label className="text-on-background/70 text-sm mb-2 block">Current Savings (₹)</label>
              <span className="absolute left-4 top-10 text-on-background/50">₹</span>
              <input 
                type="number"
                value={formData.currentSavings || ''}
                onChange={(e) => handleUpdate('currentSavings', Number(e.target.value))}
                className="glass-card w-full pl-8 pr-4 py-3 text-on-background rounded-input border border-outline-variant focus:border-primary focus:outline-none focus:shadow-glow-primary bg-transparent"
                placeholder="0"
              />
            </div>

            <div className="mb-6">
              <label className="text-on-background/70 text-sm mb-2 block">Occupation</label>
              <select 
                value={formData.occupation}
                onChange={(e) => handleUpdate('occupation', e.target.value)}
                className="glass-card w-full px-4 py-3 text-on-background rounded-input border border-outline-variant focus:border-primary focus:outline-none focus:shadow-glow-primary bg-surface-container"
              >
                {['Salaried', 'Self-Employed', 'Business Owner', 'Freelancer', 'Student', 'Retired', 'Government Employee'].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        );

      case 2:
        const goalsList = [
          { id: 'retirement', label: 'Retirement', icon: '🌅' },
          { id: 'education', label: "Child's Education", icon: '🎓' },
          { id: 'home', label: 'Buy a Home', icon: '🏠' },
          { id: 'wealth', label: 'Wealth Growth', icon: '📈' },
          { id: 'emergency', label: 'Emergency Fund', icon: '🛡️' },
          { id: 'travel', label: 'Travel', icon: '✈️' },
          { id: 'business', label: 'Start Business', icon: '🚀' },
          { id: 'marriage', label: 'Marriage', icon: '💍' },
        ];
        return (
          <div key={2} className="animate-fadeSlideUp">
            <h2 className="font-heading text-3xl text-on-background">What are your financial goals?</h2>
            <p className="text-on-background/50 text-base mt-2 mb-8">Select all that apply — we'll prioritize together</p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mb-8">
              {goalsList.map(g => {
                const isSelected = formData.goals.includes(g.id);
                return (
                  <div 
                    key={g.id}
                    onClick={() => handleToggleGoal(g.id)}
                    className={`glass-card p-4 cursor-pointer text-center transition-all duration-200 border
                      ${isSelected ? 'border-primary shadow-glow-primary bg-primary/10 scale-105' : 'border-outline-variant hover:border-primary/50'}`}
                  >
                    <div className="text-2xl mb-2">{g.icon}</div>
                    <div className="text-sm font-medium text-on-background">{g.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="text-on-background/70 text-sm block">Investment Time Horizon</label>
                <span className="text-primary font-bold">{formData.timeHorizon} Years</span>
              </div>
              <input 
                type="range" min="1" max="30" step="1"
                value={formData.timeHorizon}
                onChange={(e) => handleUpdate('timeHorizon', Number(e.target.value))}
                className="w-full accent-primary h-2"
              />
              <div className="flex justify-between text-xs text-on-background/40 mt-1">
                <span>1yr</span><span>5yr</span><span>10yr</span><span>20yr</span><span>30yr</span>
              </div>
            </div>

            <div className="mb-6 relative">
              <label className="text-on-background/70 text-sm mb-2 block">Target Amount (₹)</label>
              <span className="absolute left-4 top-10 text-on-background/50">₹</span>
              <input 
                type="number"
                value={formData.targetCorpus || ''}
                onChange={(e) => handleUpdate('targetCorpus', Number(e.target.value))}
                className="glass-card w-full pl-8 pr-4 py-3 text-on-background rounded-input border border-outline-variant focus:border-primary focus:outline-none focus:shadow-glow-primary bg-transparent"
                placeholder="0"
              />
              <div className="text-xs text-secondary mt-2 min-h-4">
                {formatCurrency(formData.targetCorpus)}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div key={3} className="animate-fadeSlideUp">
            <h2 className="font-heading text-3xl text-on-background">What's your risk appetite?</h2>
            <p className="text-on-background/50 text-base mt-2 mb-8">Be honest — this shapes your entire strategy</p>

            <RiskDial 
              value={formData.riskAppetite} 
              onChange={(val) => handleUpdate('riskAppetite', val)} 
            />

            <div className="flex gap-4 mt-8 mb-8 justify-center flex-wrap">
              <div className={`p-3 border rounded text-xs text-center flex-1 min-w-[150px] ${formData.riskAppetite === 'conservative' ? 'border-secondary text-secondary bg-secondary/10' : 'border-outline-variant text-on-background/50'}`}>
                70% Debt · 20% Equity · 10% Gold
              </div>
              <div className={`p-3 border rounded text-xs text-center flex-1 min-w-[150px] ${formData.riskAppetite === 'moderate' ? 'border-tertiary text-tertiary bg-tertiary/10' : 'border-outline-variant text-on-background/50'}`}>
                50% Equity · 35% Debt · 15% Gold
              </div>
              <div className={`p-3 border rounded text-xs text-center flex-1 min-w-[150px] ${formData.riskAppetite === 'aggressive' ? 'border-red-400 text-red-400 bg-red-400/10' : 'border-outline-variant text-on-background/50'}`}>
                80% Equity · 10% Debt · 10% Gold
              </div>
            </div>

            <div className="mt-8">
              <label className="text-on-background/70 text-sm mb-3 block">How would you react if your portfolio dropped 20%?</label>
              <div className="flex flex-col sm:flex-row gap-3">
                {[
                  { emoji: '😰', label: 'Panic and sell everything', value: 'panic' },
                  { emoji: '😟', label: 'Worried but hold', value: 'hold' },
                  { emoji: '😎', label: 'Buy more — great opportunity!', value: 'buy' }
                ].map(r => (
                  <div 
                    key={r.value}
                    onClick={() => handleUpdate('dropReaction', r.value)}
                    className={`glass-card p-4 flex-1 cursor-pointer text-center transition-all duration-200 border
                      ${formData.dropReaction === r.value ? 'border-primary shadow-glow-primary bg-primary/10 scale-105' : 'border-outline-variant hover:border-primary/50'}`}
                  >
                    <div className="text-xl mb-1">{r.emoji}</div>
                    <div className="text-xs font-medium text-on-background">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div key={4} className="animate-fadeSlideUp">
            <h2 className="font-heading text-3xl text-on-background">Upload Your Fact Sheet</h2>
            <p className="text-on-background/50 text-base mt-2 mb-8">Last month's mutual fund or portfolio statement</p>

            <FileUpload onFileSelect={onFileSelect} isLoading={isExtracting} />
            
            {formData.extractedText && !isExtracting && (
              <div className="mt-4 text-secondary text-sm text-center">
                ✓ Fact sheet read successfully — {formData.extractedText.length} characters extracted
              </div>
            )}

            <div className="mt-8 text-center">
              <button onClick={handleGenerate} className="text-on-background/40 hover:text-on-background text-sm underline transition">
                Skip for now
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <Navbar />
      <StepIndicator currentStep={currentStep} labels={['Profile', 'Goals', 'Risk', 'Upload']} />
      
      <div className="max-w-2xl mx-auto">
        {renderStepContent()}
        
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-outline-variant">
          {currentStep > 1 ? (
            <button 
              onClick={handleBack}
              className="border border-outline-variant text-on-background rounded-pill px-6 py-3 hover:border-primary transition"
            >
              ← Back
            </button>
          ) : <div></div>}

          {currentStep < 4 ? (
            <button 
              onClick={handleNext}
              className="bg-primary text-white rounded-pill px-8 py-3 shimmer-btn hover:scale-105 transition-all"
            >
              Continue →
            </button>
          ) : (
            <button 
              onClick={handleGenerate}
              className="bg-primary text-white rounded-pill px-8 py-3 shimmer-btn shadow-glow-primary hover:scale-105 transition-all"
              disabled={isExtracting}
            >
              Generate My Report →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
