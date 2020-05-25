import React from 'react';
import { useVideoGames } from '../../hooks/useVideoGames';
import { Container, Card, CardHeader, CardBody, CardText, CardFooter, Button, CardDeck, Row, Col } from "reactstrap";

export const VideoGamesPage = (props: any) => {
    const { videoGames } = useVideoGames(props);

    return (
        <>            
            <div className="section section-dark">
                <Container>
                    <div className="title text-center">
                        <h1>Video Games</h1>
                    </div>
                    <Row>
                        <Col md="8">
                            <Button href="/videogames/new" color="default">Add video Game</Button>
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