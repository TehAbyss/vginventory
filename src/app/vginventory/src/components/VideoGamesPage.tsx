import React from 'react';
import { useVideoGames } from '../hooks/useVideoGames';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './../styles/videoGames.css';

export const VideoGamesPage = (props: any) => {
    const { videoGames } = useVideoGames(props.games);

    return (
        <div className="VG-div">
            {videoGames.map((vg) => (
                <div key={vg.title}>
                    <Card className="VG-card">
                        <Card.Header as="h5">{vg.title}</Card.Header>
                        <Card.Body className="VG-card-body">
                            <Card.Text className="VG-card-text">{vg.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer><Link to={`/videogames/${vg.title}`}>Go to</Link></Card.Footer>
                    </Card>
                </div>
            ))}
        </div>
    )
};