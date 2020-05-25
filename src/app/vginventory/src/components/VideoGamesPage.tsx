import React from 'react';
import { useVideoGames } from '../hooks/useVideoGames';
import { Container, Card, CardHeader, CardBody, CardText, CardFooter, Button, CardDeck, Row, Col } from "reactstrap";
import './../styles/videoGames.css';

export const VideoGamesPage = (props: any) => {
    const { videoGames } = useVideoGames(props);

    return (
        <>            
            <div className="section section-dark">
                <Container>
                    <div className="title">
                        <h2>Video Games</h2>
                    </div>
                    <Row>
                        <Col md="8">
                            <Button href="" color="default">Add video Game</Button>
                        </Col>
                    </Row>
                    <CardDeck>
                        {videoGames.map((vg) => (
                            <div key={vg.title}>
                                <Card className="VG-card">
                                    <CardHeader>{vg.title}</CardHeader>
                                    <CardBody className="VG-card-body">
                                        <CardText className="VG-card-text">{vg.description}</CardText>
                                    </CardBody>
                                    <CardFooter><Button href={`/videogames/${vg.title}`} color="default">Read more</Button></CardFooter>
                                </Card>
                            </div>
                        ))}
                    </CardDeck>
                </Container>
            </div>
        </>
    )
};