import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { UserProfile } from "./components/UserProfile";
import { VideoGameProfile } from "./components/VideoGameProfile";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={UserProfile} />
        <Route path="/videogames/:title" component={VideoGameProfile} />
      </Switch>
    </div>
  );
}