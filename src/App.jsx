import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';
import {Navbar} from './components';
import LayerMask from './components/LayerMask';

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true, }} >
      <div className="relative z-0 font-rubikDistressed bg-[var(--black)] text-[var(--text)] ">
        {/* <LayerMask/> */}
        <Navbar />
        <AppRoutes/>
      </div>
    </BrowserRouter>
  );
};

export default App;
