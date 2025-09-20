import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import {Navbar} from './components';
import { Toaster } from "react-hot-toast";
import { GlobalContextProvider, useGlobalContext } from './utils/GlobalContext';
import AnalyticsHandler from './utils/AnalyticsHandler';
import QueryProviders from "./lib/ReactQuery/QueryProvider"

const App = () => {

  return (
    <GlobalContextProvider>
      <QueryProviders>

        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }} >
          <AnalyticsHandler />
          <div className="relative z-0 font-rubikDistressed bg-[var(--black)] text-[var(--text)] ">
            <Navbar />
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
            <AppRoutes/>
          </div>
        </BrowserRouter>
      </QueryProviders>
    </GlobalContextProvider>
  );
};

export default App;
