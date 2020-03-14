import React from 'react';
import logo from './logo.svg';
import './App.css';
import { UserProfile } from './components/UserProfile';
import { getUserProfileMock } from './models/mocks/mockUserProfile'

function App() {

  const profileProps = getUserProfileMock();

  return (
    <div className="App">
      <UserProfile {...profileProps} />
    </div>
  );
}

export default App;
