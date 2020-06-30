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
  //const userProfile = props.userProfile;
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
            src={require("../img/joe-gardner-2.jpg")}
          />
        </div>
        <div className="name">
          <h4 className="title">
            Jane Faker <br />
          </h4>
          <h6 className="description">Music Producer</h6>
        </div>
      </div>
      <Row>
        <Col className="ml-auto mr-auto text-center" md="6">
          <p>
            An artist of considerable range, Jane Faker — the name taken by
            Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
            and records all of his own music, giving it a warm, intimate
            feel with a solid groove structure.
          </p>
          <br />
          <Button className="btn-round" color="default" outline>
            <i className="fa fa-cog" /> Settings
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
                Follows
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === "2" ? "active" : ""}
                onClick={() => {
                  toggle("2");
                }}
              >
                Following
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
          <h3 className="text-muted">Not following anyone yet :(</h3>
          <Button className="btn-round" color="warning">
            Find artists
          </Button>
        </TabPane>
      </TabContent>
    </Container>
  </div>
    /*
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
    */
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