import React from 'react';
import { Badge, Button, Card, CardBody, CardDeck, CardHeader, Col, Container, Row} from "reactstrap";
import { useRawg } from '../../hooks/useRawg';

export const VideoGamesRawg = (props: any) => {
    const { games, queryGames } = useRawg(props);

    return (
        <>
            <div className="section section-dark">
                <Container>
                    <Row>
                        <Col>
                            <div className="title text-center">
                                <h1>Video Games</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CardDeck>
                                {games.results.map((vg:any) => (
                                    <div key={vg.name}>
                                        <Card className="VG-card">
                                            <CardHeader>{vg.name}</CardHeader>
                                            <CardBody className="VG-card-body">
                                                <img src={vg.background_image} alt={vg.name}/>
                                            </CardBody>
                                        </Card>
                                    </div>
                                ))}
                            </CardDeck>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button color="default" onClick={() => queryGames(games.previous)}>Previous</Button>
                        </Col>
                        <Col xs="auto"> </Col>
                        <Col className="text-right">
                            <Button color="default" onClick={() => queryGames(games.next)}>Next</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="title text-right">
                                Thanks to <a href="https://rawg.io"><Badge>RAWG</Badge></a> for the data!
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
};