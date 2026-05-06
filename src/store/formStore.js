const formData = {
  name: '',
  age: 30,
  monthlyIncome: 0,
  currentSavings: 0,
  occupation: 'Salaried',
  goals: [],
  timeHorizon: 10,
  riskAppetite: 'moderate',
  dropReaction: 'hold',
  targetCorpus: 0,
  factSheetFile: null,
  extractedText: ''
};

export const updateForm = (key, value) => {
  formData[key] = value;
};

export const resetForm = () => {
  formData.name = '';
  formData.age = 30;
  formData.monthlyIncome = 0;
  formData.currentSavings = 0;
  formData.occupation = 'Salaried';
  formData.goals = [];
  formData.timeHorizon = 10;
  formData.riskAppetite = 'moderate';
  formData.dropReaction = 'hold';
  formData.targetCorpus = 0;
  formData.factSheetFile = null;
  formData.extractedText = '';
};

export const getFormData = () => {
  return { ...formData };
};
