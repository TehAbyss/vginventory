import React from 'react';
import {useUserProfile, UserProfileProps, VideoGameListProps, VideoGameProps } from '../hooks/useUserProfile';
import { user } from '../models/iuser';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import { VideoGameProfile } from './VideoGameProfile';

export const UserProfile = (props: UserProfileProps) => {
  const { user, videoGames } = useUserProfile(props);

  return (
    <>
      <UserComponent {...user} />
      <VideoGamesComponent {...videoGames} />
    </>
  )
}

const UserComponent = (user: user) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Member Since: {user.startDate.month} {user.startDate.year}</p>
      <label>Bio:</label>
      <p>{user.bio}</p>
    </div>
  )
}

const VideoGamesComponent = (videoGameList: VideoGameListProps) => {
  const videoGames = Object.entries(videoGameList.videoGames).map(([vgkey, vgvalue]) => {
    const userVideoGame = videoGameList.userVideoGames.find((uvg) => uvg.videoGameId === vgvalue.id) ||
      {userId: '', videoGameId: '', completed: false, own: false, wishlist: false};
    const value: VideoGameProps = {videoGame: vgvalue, userVideoGame: userVideoGame};
    return <div key={value.videoGame.title}><VideoGame {...value} /></div>
  })
  return (
    <Router>
      <div>
        {videoGames}
      </div>

      <Switch>
        <Route path="/:id" render={() => <GetGame />} />
      </Switch>
    </Router>
  )
}

const GetGame = () => {
  let { id } = useParams();
  return (
    <p>{id}</p>
  )
};

const VideoGame = (videoGame: VideoGameProps) => {
  return (
      <div>
        <h2><Link to={{pathname: `/${videoGame.videoGame.title}`}}>{videoGame.videoGame.title}</Link></h2>
        <p hidden={!videoGame.userVideoGame.own}>Own</p>
        <p hidden={!videoGame.userVideoGame.completed}>Completed</p>
        <p hidden={!videoGame.userVideoGame.wishlist}>Wishlist</p>
      </div>
  )
};