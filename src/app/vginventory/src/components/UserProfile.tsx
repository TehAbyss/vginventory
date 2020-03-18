import React from 'react';
import {useUserProfile, UserProfileProps, VideoGameListProps, VideoGameProps } from '../hooks/useUserProfile';
import { videoGame } from '../models/ivideoGame';
import { user } from '../models/iuser';
import { userVideoGame } from '../models/iuserVideoGame';

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
      <p>{user.name}</p>
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
    <div>
      <p>{videoGame.videoGame.title}</p>
      <p hidden={!videoGame.userVideoGame.own}>Own</p>
      <p hidden={!videoGame.userVideoGame.completed}>Completed</p>
      <p hidden={!videoGame.userVideoGame.wishlist}>Wishlist</p>
    </div>
  )
};