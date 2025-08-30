import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SheConnectApp from './SheConnectApp';
import TicketList from './components/TicketList';
import PgLocationSearch from './pages/PgLocationSearch';

const App = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://formshare.ai/embed/popup/v1.js';
    script.setAttribute('data-formshare-url', 'https://formshare.ai/r/a6qnqsDNmW');
    script.setAttribute('data-formshare-popup-bg-color', '#eab308');
    script.setAttribute('data-formshare-popup-icon-color', '#FFFFFF');
    script.setAttribute('data-formshare-popup-icon-type', 'default');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<SheConnectApp />} />
        <Route path="/pg-search" element={<PgLocationSearch />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
