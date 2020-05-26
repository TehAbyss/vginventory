import React from 'react';
import { Container, Card, CardHeader, CardBody, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { userVideoGame } from '../models/iuserVideoGame';
import { useUserVideoGames } from '../hooks/useUserVideoGames';
import { useVideoGames } from '../hooks/useVideoGames';
import { getMonthName } from '../models/idate';

export const UserProfile = (props: any) => {
  const { userVideoGames } = useUserVideoGames(props);

  return (
    <div className="main">
      <UserComponent userProfile={props.userProfile} />
      <VideoGamesComponent userVideoGames={userVideoGames} />
    </div>
  )
}

const UserComponent = (props:any) => {
  const userProfile = props.userProfile;

  return (
    <div className="section section-dark">
      <Container>
        <Card>
          <CardHeader>{userProfile.name}</CardHeader>
          <CardBody>
            <CardText>Email: {userProfile.email}</CardText>
            <CardText>Member Since: {getMonthName(userProfile.startDate.getMonth())} {userProfile.startDate.getUTCFullYear()}</CardText>
            <CardText>Bio:</CardText>
            <CardText>{userProfile.bio}</CardText>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

const VideoGamesComponent = (props:any) => {
  const { videoGames } = useVideoGames(props);

  const videoGameList = Object.entries(videoGames).map(([vgkey, vgvalue]) => {
    const userGame = props.userVideoGames.find((uvg: userVideoGame) => uvg.videoGameId === vgvalue.id);
    if (typeof userGame === 'undefined') {
      return <div key={vgvalue.title}></div>
    } else {
      return <div key={vgvalue.title}><VideoGame game={vgvalue} userGame={userGame} /></div>
    }
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
  return (
    <div>
      <h2><Link to={`/videogames/${props.game.title}`}>{props.game.title}</Link></h2>
      <p hidden={!props.userGame.isOwned}>Own</p>
      <p hidden={!props.userGame.isCompleted}>Completed</p>
      <p hidden={!props.userGame.isWishListed}>Wishlist</p>
    </div>
  )
};