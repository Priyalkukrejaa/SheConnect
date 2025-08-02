import React, { useEffect } from 'react';
import SheConnectApp from './SheConnectApp';
import TicketList from './components/TicketList';

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
      <SheConnectApp />
      <TicketList />
    </div>
  );
};

export default App;
