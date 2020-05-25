import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Home } from "./components/Home";
import { NotFound } from "./components/NotFound";
import { UserProfile } from "./components/UserProfile";
import { VideoGameEdit } from "./components/VideoGameEdit";
import { VideoGameProfile } from "./components/VideoGameProfile";
import { VideoGamesPage } from "./components/VideoGamesPage";
import { useAuth0 } from "./react-auth0-spa";
import { useUserProfile } from "./hooks/useUserProfile";

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
          <Route exact path="/videogames/:title/edit" component={(props) => <VideoGameEdit {...props} />} />
          <Route path="/videogames/:title" component={VideoGameProfile} />
          <Route component={NotFound} />
        </Switch>
      )}
    </div>
  );
}
