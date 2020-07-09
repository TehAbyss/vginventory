import React from 'react';
import { userVideoGame } from '../models/iuserVideoGame';
import { useUserVideoGames } from '../hooks/useUserVideoGames';
import { useVideoGames } from '../hooks/useVideoGames';
import { getMonthName } from '../models/idate';
import ProfilePageHeader from './ProfilePageHeader';
// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap";
import { useHistory } from 'react-router-dom';
import { user } from '../models/iuser';

export const UserProfile = (props: any) => {
  const { userVideoGames } = useUserVideoGames(props);

  return (
    <>
      <ProfilePageHeader />
      <UserComponent userProfile={props.userProfile} />
      <VideoGamesComponent userVideoGames={userVideoGames} />
    </>
  )
}

const UserComponent = (props:any) => {
  const userProfile:user = props.userProfile;
  let history = useHistory();
  const [activeTab, setActiveTab] = React.useState("1");

  const toggle = (tab:any) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });

  return (
    <div className="section profile-content">
    <Container>
      <div className="owner">
        <div className="avatar">
          <img
            alt="..."
            className="img-circle img-no-padding img-responsive"
            src={userProfile.avatarUrl}
          />
        </div>
        <div className="name">
          <h4 className="title">
            {userProfile.name} <br />
          </h4>
          <h6 className="description">Member Since: {getMonthName(userProfile.startDate.getMonth())} {userProfile.startDate.getUTCFullYear()}</h6>
        </div>
      </div>
      <Row>
        <Col className="ml-auto mr-auto text-center" md="6">
          <p>
            {userProfile.bio}
          </p>
          <br />
          <Button className="btn-round" color="default" outline>
            <i className="fa fa-cog" /> Update
          </Button>
        </Col>
      </Row>
      <br />
      <div className="nav-tabs-navigation">
        <div className="nav-tabs-wrapper">
          <Nav role="tablist" tabs>
            <NavItem>
              <NavLink
                className={activeTab === "1" ? "active" : ""}
                onClick={() => {
                  toggle("1");
                }}
              >
                Library
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "2" ? "active" : ""}
                onClick={() => {
                  toggle("2");
                }}
              >
                WishList
              </NavLink>
            </NavItem>
          </Nav>
        </div>
      </div>
      {/* Tab panes */}
      <TabContent className="following" activeTab={activeTab}>
        <TabPane tabId="1" id="follows">
          <Row>
            <Col className="ml-auto mr-auto" md="6">
              <ul className="list-unstyled follows">
                <li>
                  <Row>
                    <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                      <img
                        alt="..."
                        className="img-circle img-no-padding img-responsive"
                        src={require("../img/clem-onojeghuo-2.jpg")}
                      />
                    </Col>
                    <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                      <h6>
                        Flume <br />
                        <small>Musical Producer</small>
                      </h6>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                      <FormGroup check>
                        <Label check>
                          <Input
                            defaultChecked
                            defaultValue=""
                            type="checkbox"
                          />
                          <span className="form-check-sign" />
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                </li>
                <hr />
                <li>
                  <Row>
                    <Col className="mx-auto" lg="2" md="4" xs="4">
                      <img
                        alt="..."
                        className="img-circle img-no-padding img-responsive"
                        src={require("../img/ayo-ogunseinde-2.jpg")}
                      />
                    </Col>
                    <Col lg="7" md="4" xs="4">
                      <h6>
                        Banks <br />
                        <small>Singer</small>
                      </h6>
                    </Col>
                    <Col lg="3" md="4" xs="4">
                      <FormGroup check>
                        <Label check>
                          <Input defaultValue="" type="checkbox" />
                          <span className="form-check-sign" />
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                </li>
              </ul>
            </Col>
          </Row>
        </TabPane>
        <TabPane className="text-center" tabId="2" id="following">
          <h3 className="text-muted">No games wishlisted yet :(</h3>
          <Button onClick={() => history.push(`/videogamesrawg`)} className="btn-round" color="warning">
            Find Games
          </Button>
        </TabPane>
      </TabContent>
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
      <p>Under Construction!</p>
      {/*
        <h2><Link to={`/videogames/${props.game.title}`}>{props.game.title}</Link></h2>
        <p hidden={!props.userGame.isOwned}>Own</p>
        <p hidden={!props.userGame.isCompleted}>Completed</p>
        <p hidden={!props.userGame.isWishListed}>Wishlist</p>
      */}
    </div>
  )
};