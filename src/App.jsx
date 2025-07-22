import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import {Navbar} from './components';
import LayerMask from './components/LayerMask';
import { GlobalContextProvider, useGlobalContext } from './utils/GlobalContext';

const App = () => {
  // const { WhichLang } = useGlobalContext()
  // const dir = WhichLang == "en" ? "ltr" : "rtl"
  return (
    <GlobalContextProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }} >
        <div className="relative z-0 font-rubikDistressed bg-[var(--black)] text-[var(--text)] ">
          <LayerMask/>
          <Navbar />
          <AppRoutes/>
        </div>
      </BrowserRouter>
    </GlobalContextProvider>
  );
};

export default App;
