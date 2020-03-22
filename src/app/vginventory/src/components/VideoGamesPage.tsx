import React from 'react';
import { useVideoGames } from '../hooks/useVideoGames';
import { Route, Link } from "react-router-dom";
import { VideoGameProfile } from "./VideoGameProfile";

export const VideoGamesPage = (props: any) => {
    const { videoGames } = useVideoGames(props.games);

    return (
        <div>
            {videoGames.map((vg) => (
                <div key={vg.title}>
                    <h1><Link to={`/videogames/${vg.title}`}>{vg.title}</Link></h1>
                    <p>{vg.description}</p>
                </div>
            ))}
        </div>
    )
};