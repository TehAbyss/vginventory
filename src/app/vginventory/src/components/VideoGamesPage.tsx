import React from 'react';
import { useVideoGames } from '../hooks/useVideoGames';
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

export const VideoGamesPage = (props: any) => {
    const { videoGames } = useVideoGames(props.games);

    return (
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            {videoGames.map((vg) => (
                <div key={vg.title}>
                    <Card style={{width: '18em', flex: '1', margin: '1em', height: '18em'}}>
                        <Card.Header as="h5">{vg.title}</Card.Header>
                        <Card.Body style={{overflow: 'hidden'}}>
                            <Card.Text style={{wordWrap: 'break-word'}}>{vg.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer><Link to={`/videogames/${vg.title}`}>Go to</Link></Card.Footer>
                    </Card>
                </div>
            ))}
        </div>
    )
};