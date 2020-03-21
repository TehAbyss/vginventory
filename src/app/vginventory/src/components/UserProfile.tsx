import React from 'react';
import {useUserProfile } from '../hooks/useUserProfile';
import { Route, Link, useParams, Switch } from 'react-router-dom';
import { VideoGameProfile } from './VideoGameProfile';
import { useVideoGame } from '../hooks/useVideoGame';
import { useVideoGames } from '../hooks/useVideoGames';

export const UserProfile = (props:any) => {
  console.log(props)
  return (
    <>
      <UserComponent user={props.profile.user} />
      <VideoGamesComponent videoGames={props.profile.videoGames}/>
    </>
  )
}

const UserComponent = (props:any) => {
  console.log(props);
  //TODO: use the id to pass it to the hooks
  const { id } = useParams();
  const { user } = useUserProfile(props.user);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Member Since: {user.startDate.month} {user.startDate.year}</p>
      <label>Bio:</label>
      <p>{user.bio}</p>
    </div>
  )
}

const VideoGamesComponent = (props:any) => {
    //TODO: use the id to pass it to the hooks
    const { id } = useParams();
    const { videoGames } = useVideoGames();

  const videoGameList = Object.entries(videoGames).map(([vgkey, vgvalue]) => {
    return <div key={vgvalue.title}><VideoGame id={vgvalue.title} /></div>
  })
  return (
    <div>
      {videoGameList}
    </div>
  )
}

const VideoGame = (props: any) => {
  const { videoGame } = useVideoGame(props.id);
  //const { userVideoGames } = useUserVideoGames();
  //<p hidden={!videoGame.userVideoGame.own}>Own</p>
  //<p hidden={!videoGame.userVideoGame.completed}>Completed</p>
  //<p hidden={!videoGame.userVideoGame.wishlist}>Wishlist</p>
  return (
    <div>
      <h2><Link to={`/videogames/${videoGame.title}`}>{videoGame.title}</Link></h2>
    </div>
  )
};