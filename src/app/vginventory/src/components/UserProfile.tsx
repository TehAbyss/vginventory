import React from 'react';
import {useUserProfile, UserProfileProps } from '../hooks/useUserProfile';
import { ReactComponent } from '*.svg';
import { User } from '../models/iuser';

export const UserProfile = (props: UserProfileProps) => {
  const { user,
    setUser,
    videoGames,
    setVideoGames } = useUserProfile(props);

  return (
    <div>
      <p>{user.UserName}</p>
      <p>Member Since:{user.MemberStartDate.toString()}</p>
      <label>Bio:</label>
      <p>{user.Bio}</p>
    </div>
  )
}