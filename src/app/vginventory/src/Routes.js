import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { UserProfile } from "./components/UserProfile";
import { MembersPage } from "./components/MembersPage";
import { VideoGameProfile } from "./components/VideoGameProfile";
import { getUserProfileMock, getVideoGameList } from "./models/mocks/mockData";
import { VideoGamesPage } from "./components/VideoGamesPage";
import { NotFound } from "./components/NotFound";
import { VideoGameEdit } from "./components/VideoGameEdit";

export default function Routes() {
  // TODO: props should come from useEffect and should useState
  const profile = getUserProfileMock();
  const videoGames = getVideoGameList();
  // TODO: need to pass the videogames for the user only in the UserProfile Component
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/members" component={() => <MembersPage /> } />
        <Route path="/users" component={(props) => <UserProfile {...props} profile={profile} videoGames={videoGames} />} />
        <Route exact path="/videogames" component={() =>  <VideoGamesPage games={videoGames} />} />
        <Route exact path="/videogames/:title/edit" component={(props) => <VideoGameEdit {...props} />} />
        <Route path="/videogames/:title" component={VideoGameProfile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}