import React from 'react';
import {useUserProfile, UserProfileProps, VideoGameListProps, VideoGameProps } from '../hooks/useUserProfile';
import { user } from '../models/iuser';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import { VideoGameProfile } from './VideoGameProfile';

export const UserProfile = (props: UserProfileProps) => {
  const { user, videoGames } = useUserProfile(props);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/user/:id">
            <UserComponent {...user} />
            <VideoGamesComponent {...videoGames} />
          </Route>
          <Route path="/videogame/:id" exact component={() => <GetVideoGame {...videoGames} />} />
        </Switch>
      </Router>
    </>
  )
}

const GetVideoGame = (videoGames: VideoGameListProps) => {
  const { id } = useParams();
  const videoGame = videoGames.videoGames.find((vg) => vg.title === id) || {id: '', title: '', genre: [], description: '', releaseDate: {month:'', year:'', date: '', epoch: 0}};
  
  return (
    <VideoGameProfile {...videoGame} />
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
    <div>
      {videoGames}
    </div>
  )
}

const VideoGame = (videoGame: VideoGameProps) => {
  return (
    <>
      <h2><Link to={`/videogame/${videoGame.videoGame.title}`}>{videoGame.videoGame.title}</Link></h2>
      <p hidden={!videoGame.userVideoGame.own}>Own</p>
      <p hidden={!videoGame.userVideoGame.completed}>Completed</p>
      <p hidden={!videoGame.userVideoGame.wishlist}>Wishlist</p>
    </>
  )
};