import React from 'react';
import { useVideoGames } from '../hooks/useVideoGames';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

export const VideoGamesPage = (props: any) => {
    const { videoGames } = useVideoGames(props.games);

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            {videoGames.map((vg) => (
                <div key={vg.title}>
                    <Card style={{width: '18em', flex: '1'}}>
                        <Card.Header as="h5">{vg.title}</Card.Header>
                        <Card.Body>
                            <Card.Text>{vg.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer><Link to={`/videogames/${vg.title}`}>Go to</Link></Card.Footer>
                    </Card>
                </div>
            ))}
        </div>
    )
};