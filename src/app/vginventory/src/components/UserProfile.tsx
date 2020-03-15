import React from 'react';
import {useUserProfile, UserProfileProps, getMemberFullYear } from '../hooks/useUserProfile';
import { VideoGame } from '../models/ivideoGame';
import { User } from '../models/iuser';

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

const UserComponent = (user: User) => {
  return (
    <div>
      <p>{user.UserName}</p>
      <p>Member Since: {getMemberFullYear(user.MemberStartDate)}</p>
      <label>Bio:</label>
      <p>{user.Bio}</p>
    </div>
  )
}

const VideoGamesComponent = (videoGames: VideoGame[]) => {
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