import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import {Navbar} from './components';
import { GlobalContextProvider, useGlobalContext } from './utils/GlobalContext';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPageView } from "./utils/analytics"

const App = () => {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return (
    <GlobalContextProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }} >
        <div className="relative z-0 font-rubikDistressed bg-[var(--black)] text-[var(--text)] ">
          <Navbar />
          <AppRoutes/>
        </div>
      </BrowserRouter>
    </GlobalContextProvider>
  );
};

export default App;
