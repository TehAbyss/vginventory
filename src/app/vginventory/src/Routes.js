import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { UserProfile } from "./components/UserProfile";
import { VideoGameProfile } from "./components/VideoGameProfile";
import {useUserProfile } from './hooks/useUserProfile';
import { getUserProfileMock, getVideoGameList } from "./models/mocks/mockData";

export default function Routes() {
  const profile = getUserProfileMock();
  const videoGames = getVideoGameList();
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={(props) => <UserProfile {...props} profile={profile} videoGames={videoGames} />} />
        <Route path="/videogames/:title" component={VideoGameProfile} />
      </Switch>
    </div>
  );
}