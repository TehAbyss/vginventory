import React from 'react';
import { useVideoGames } from '../hooks/useVideoGames';
import { Container, Card, CardHeader, CardBody, CardText, CardFooter, Button } from "reactstrap";
import './../styles/videoGames.css';

export const VideoGamesPage = (props: any) => {
    const { videoGames } = useVideoGames(props.games);

    return (
        <div className="main">
            <div className="section section-dark">
                <Container>
                    <div className="VG-div">
                        {videoGames.map((vg) => (
                            <div key={vg.title}>
                                <Card className="VG-card">
                                    <CardHeader as="h5">{vg.title}</CardHeader>
                                    <CardBody className="VG-card-body">
                                        <CardText className="VG-card-text">{vg.description}</CardText>
                                    </CardBody>
                                    <CardFooter><Button href={`/videogames/${vg.title}`} color="default">Read more</Button></CardFooter>
                                </Card>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </div>
    )
};