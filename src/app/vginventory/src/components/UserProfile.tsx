import React from 'react';
import {useUserProfile, UserProfileProps, getMemberFullYear } from '../hooks/useUserProfile';
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
    return <li key={value.title}>{value.title}</li>
  })
  return (
    <>
      <ul>
        {videGameList}
      </ul>
    </>
  )
}