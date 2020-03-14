import React from 'react';
import {useUserProfile, UserProfileProps } from '../hooks/useUserProfile';
import { ReactComponent } from '*.svg';
import { VideoGame } from '../models/ivideoGame';
import { User } from '../models/iuser';

export const UserProfile = (props: UserProfileProps) => {
  const { user,
    setUser,
    videoGames,
    setVideoGames } = useUserProfile(props);

  return (
    <div>
      <UserComponent {...user} />
      <VideoGamesComponent {...videoGames} />
    </div>
  )
}

const UserComponent = (user: User) => {
  return (
    <div>
      <p>{user.UserName}</p>
      <p>Member Since:{user.MemberStartDate.toString()}</p>
      <label>Bio:</label>
      <p>{user.Bio}</p>
    </div>
  )
}

const VideoGamesComponent = (videoGames: VideoGame[]) => {
  const videoGameList = videoGames.map(({title}) => <li key={title}>{title}</li>);

  return (
    <div>
      <ul>
        {videoGameList}
      </ul>
    </div>
  )
}