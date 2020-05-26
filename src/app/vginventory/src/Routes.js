import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./components/Home";
import { NotFound } from "./components/NotFound";
import { UserProfile } from "./components/UserProfile";
import { VideoGameEdit } from "./components/videogame/Edit";
import { VideoGameProfile } from "./components/videogame/Profile";
import { VideoGamesPage } from "./components/videogame/ListOfGames";
import { useAuth0 } from "./react-auth0-spa";
import { useUserProfile } from "./hooks/useUserProfile";
import { VideoGameCreate } from "./components/videogame/Create";

export default function Routes() {
  const { isAuthenticated, user } = useAuth0();
  const { userProfile } = useUserProfile({user: user, isAuthenticated: isAuthenticated});

  return (
    <div>
      {!isAuthenticated && (
        <Switch>
          <Route exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      )}

      {isAuthenticated && (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={(props) => <UserProfile {...props} userProfile={userProfile} />} />
          <Route exact path="/videogames" component={() =>  <VideoGamesPage />} />
          <Route path="/videogames/new" component={VideoGameCreate} />
          <Route exact path="/videogames/:title/edit" component={(props) => <VideoGameEdit {...props} />} />
          <Route path="/videogames/:title" component={VideoGameProfile} />
          <Route component={NotFound} />
        </Switch>
      )}
    </div>
  );
}
