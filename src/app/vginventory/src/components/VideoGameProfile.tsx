import React from 'react';
import { useVideoGame } from "../hooks/useVideoGame";
import { useParams } from "react-router-dom";
import { useVideoGames } from '../hooks/useVideoGames';

export const VideoGameProfile = (props: any) => {
    let { title } = useParams();
    const { getVideoGame } = useVideoGames(props.games);
    const { videoGame } = useVideoGame(getVideoGame(title || ''));

    return (
        <div>
            <h1>{videoGame.title}</h1>
            <p>{videoGame.description}</p>
        </div>
    )
};