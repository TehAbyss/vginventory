import React from 'react';
import {useUserProfile } from '../hooks/useUserProfile';
import { Link } from 'react-router-dom';
import { useVideoGames } from '../hooks/useVideoGames';
import { VideoGameListProps } from '../models/iprops';
import { userVideoGame } from '../models/iuserVideoGame';

export const UserProfile = (props:any) => {
  const videoGameProps: VideoGameListProps = {
    videoGames: props.videoGames,
    userVideoGames: props.profile.userVideoGames
  }
  return (
    <>
      <UserComponent user={props.profile.user} />
      <VideoGamesComponent list={videoGameProps} />
    </>
  )
}

const UserComponent = (props:any) => {
  const { userObj } = useUserProfile(props.user);

  return (
    <div>
      <h1>{userObj.name}</h1>
      <p>Member Since: {userObj.startDate.month} {userObj.startDate.year}</p>
      <label>Bio:</label>
      <p>{userObj.bio}</p>
    </div>
  )
}

const VideoGamesComponent = (props:any) => {
  const { videoGames } = useVideoGames(props.list.videoGames);

  const videoGameList = Object.entries(videoGames).map(([vgkey, vgvalue]) => {
    const userGame = props.list.userVideoGames.find((uvg: userVideoGame) => uvg.videoGameId === vgvalue.id) || '';
    return <div key={vgvalue.title}><VideoGame game={vgvalue} userGame={userGame} /></div>
  })
  return (
    <div>
      {videoGameList}
    </div>
  )
}

const VideoGame = (props: any) => {
  //const { videoGame } = useVideoGame(props.game);
  //const { userVideoGames } = useUserVideoGames();
  return (
    <div>
      <h2><Link to={`/videogames/${props.game.title}`}>{props.game.title}</Link></h2>
      <p hidden={!props.userGame.isOwned}>Own</p>
      <p hidden={!props.userGame.isCompleted}>Completed</p>
      <p hidden={!props.userGame.isWishListed}>Wishlist</p>
    </div>
  )
};