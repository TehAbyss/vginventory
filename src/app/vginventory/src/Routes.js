import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { UserProfile } from "./components/UserProfile";
import { VideoGameProfile } from "./components/VideoGameProfile";
import {useUserProfile } from './hooks/useUserProfile';
import { getUserProfileMock } from "./models/mocks/mockUserProfile";

export default function Routes() {
  const profile = getUserProfileMock();
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={(props) => <UserProfile {...props} profile={profile} />} />
        <Route path="/videogames/:title" component={VideoGameProfile} />
      </Switch>
    </div>
  );
}