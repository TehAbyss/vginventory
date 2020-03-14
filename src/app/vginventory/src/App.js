import React from 'react';
import { UserProfile } from './components/UserProfile';
import { getUserProfileMock } from './models/mocks/mockUserProfile'

function App() {

  const profileProps = getUserProfileMock();

  return (
    <div>
      <UserProfile {...profileProps} />
    </div>
  );
}

export default App;
