import React from 'react';
import { useGetVideoGame } from "../hooks/useGetVideoGame";
import { useParams, useHistory } from "react-router-dom";
import { Container, Button } from 'reactstrap';

export const VideoGameProfile = () => {
    let { title } = useParams();
    let history = useHistory();
    const { videogame } = useGetVideoGame(title || '');

    if (!videogame) return null;

    return (
        <div className="main">
            <div className="section section-dark">
                <Container>
                    <h1>{videogame.title}</h1>
                    <h3>{videogame.description}</h3>
                    <br/>
                    <Button onClick={() => history.push(`/videogames/${videogame.title}/edit`, {game: videogame})}>Edit</Button>
                </Container>
            </div>
        </div>
    )
};