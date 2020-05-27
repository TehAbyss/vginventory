import React from 'react';
import { useGetVideoGame } from "../../hooks/useGetVideoGame";
import { useParams, useHistory } from "react-router-dom";
import { Container, Button, Row, Col } from 'reactstrap';
import { getMonthName } from '../../models/idate';

export const VideoGameProfile = () => {
    let { title } = useParams();
    let history = useHistory();
    const { videogame } = useGetVideoGame(title || '');

    if (!videogame) return null;

    return (
        <div className="main">
            <div className="section section-dark">
                <Container>
                    <Row>
                        <div className="title">
                            <h1>{videogame.title}</h1>
                        </div>
                    </Row>
                    <Row>
                        <Col md="2"><h4 className="description">Released</h4></Col>
                        <Col><h4>{videogame.releaseDate}</h4></Col>
                    </Row>
                    <Row>
                        <Col md="2"><h4 className="description">Description</h4></Col>
                        <Col><p>{videogame.description}</p></Col>
                    </Row>
                    <Row>
                        <Col md="2"><h4 className="description">Genre</h4></Col>
                        {videogame.genre.map((genre, idx) => (
                            <Col key={idx}><h4>{genre}</h4></Col>
                        ))}
                    </Row>
                    <Row>
                        <Button onClick={() => history.push(`/videogames/${videogame.title}/edit`, {game: videogame})}>Edit</Button>
                    </Row>
                </Container>
            </div>
        </div>
    )
};