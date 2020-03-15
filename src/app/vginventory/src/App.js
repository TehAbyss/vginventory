import React from 'react';
import { NavBar } from './components/NavBar';
import Routes from './Routes';

function App() {

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <Routes />
    </div>
  );
}

export default App;
