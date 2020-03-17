import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { UserProfile } from "./components/UserProfile";
import { getUserProfileMock } from './models/mocks/mockUserProfile';

export default function Routes() {
    const profileProps = getUserProfileMock();
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" render={() => <UserProfile {...profileProps} />} />
      </Switch>
    </div>
  );
}