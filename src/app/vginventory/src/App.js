import React from 'react';
import { NavBar } from './components/NavBar';
import { Router } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import Routes from './Routes';
import history from "./utils/history";

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
