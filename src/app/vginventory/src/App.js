import React from 'react';
import { NavBar } from './components/NavBar';
import { Router } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import { LoadingPage } from "./components/LoadingPage";
import Routes from './Routes';
import history from "./utils/history";
import './App.css';
import { Footer } from './components/Footer';

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return (
      <div className="center">
        <LoadingPage type="spinningBubbles" color="grey" />
      </div>
    );
  }

  return (
    <div>
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Routes />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
