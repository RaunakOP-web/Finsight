import React, { useState } from 'react';
import Landing from './pages/Landing';
import Form from './pages/Form';
import Loading from './pages/Loading';
import Report from './pages/Report';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [reportData, setReportData] = useState(null);

  const navigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body">
      {currentPage === 'landing' && <Landing navigate={navigate} />}
      {currentPage === 'form' && <Form navigate={navigate} setReportData={setReportData} />}
      {currentPage === 'loading' && <Loading navigate={navigate} />}
      {currentPage === 'report' && <Report navigate={navigate} reportData={reportData} />}
    </div>
  );
}

export default App;
