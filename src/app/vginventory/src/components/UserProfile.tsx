import React from 'react';
import {useUserProfile, UserProfileProps } from '../hooks/useUserProfile';
import { videoGame } from '../models/ivideoGame';
import { user } from '../models/iuser';

export const UserProfile = (props: UserProfileProps) => {
  const { user,
    setUser,
    videoGames,
    setVideoGames } = useUserProfile(props);

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
      <p>{user.name}</p>
      <p>Member Since: {user.startDate.year}</p>
      <label>Bio:</label>
      <p>{user.bio}</p>
    </div>
  )
}

const VideoGamesComponent = (videoGames: videoGame[]) => {
  const videGameList = Object.entries(videoGames).map(([key, value]) => {
    return <div key={value.title}><VideoGame {...value} /></div>
  })
  return (
    <div>
      {videGameList}
    </div>
  )
}

const VideoGame = (videoGame: videoGame) => {
  return (
    <div>
      <p>{videoGame.title}</p>
      <p>Release Date: {videoGame.releaseDate.year}</p>
      <p>{videoGame.description}</p>
    </div>
  )
};