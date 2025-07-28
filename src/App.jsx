import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import {Navbar} from './components';
import { GlobalContextProvider, useGlobalContext } from './utils/GlobalContext';
import AnalyticsHandler from './utils/AnalyticsHandler';

const App = () => {

  return (
    <GlobalContextProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }} >
        <AnalyticsHandler />
        <div className="relative z-0 font-rubikDistressed bg-[var(--black)] text-[var(--text)] ">
          <Navbar />
          <AppRoutes/>
        </div>
      </BrowserRouter>
    </GlobalContextProvider>
  );
};

export default App;
