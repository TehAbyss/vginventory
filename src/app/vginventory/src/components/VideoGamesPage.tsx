import React from 'react';
import { useVideoGames } from '../hooks/useVideoGames';
import { Container, Card, CardHeader, CardBody, CardText, CardFooter, Button, CardDeck } from "reactstrap";
import './../styles/videoGames.css';

export const VideoGamesPage = (props: any) => {
    const { videoGames } = useVideoGames(props);

    return (
        <div className="main">
            <div className="section section-dark">
                <Container>
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
        </div>
    )
};