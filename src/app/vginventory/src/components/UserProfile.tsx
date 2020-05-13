import React from 'react';
import {useUserProfile } from '../hooks/useUserProfile';
import { Link } from 'react-router-dom';
import { useVideoGames } from '../hooks/useVideoGames';
import { VideoGameListProps } from '../models/iprops';
import { userVideoGame } from '../models/iuserVideoGame';
import { Container, Card, CardHeader, CardBody, CardText } from 'reactstrap';

export const UserProfile = (props:any) => {
  const videoGameProps: VideoGameListProps = {
    videoGames: props.videoGames,
    userVideoGames: props.profile.userVideoGames
  }
  return (
    <div className="main">
      <UserComponent user={props.profile.user} />
      <VideoGamesComponent list={videoGameProps} />
    </div>
  )
}

const UserComponent = (props:any) => {
  const { userObj } = useUserProfile(props.user);

  return (
    <div className="section section-dark">
      <Container>
        <Card>
          <CardHeader>{userObj.name}</CardHeader>
          <CardBody>
            <CardText>Member Since: {userObj.startDate.month} {userObj.startDate.year}</CardText>
            <CardText>Bio:</CardText>
            <CardText>{userObj.bio}</CardText>
          </CardBody>
        </Card>
      </Container>
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
    <div className="section section-text">
      <Container>
        <div className="text-justified">
          {videoGameList}
        </div>
      </Container>
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