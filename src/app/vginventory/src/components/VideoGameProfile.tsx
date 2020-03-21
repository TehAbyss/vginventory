import React from 'react';
import { useVideoGame } from "../hooks/useVideoGame";
import { useParams } from "react-router-dom";

export const VideoGameProfile = () => {
    let { title } = useParams();
    const { videoGame } = useVideoGame(title || '');

    return (
        <div>
            <h1>{videoGame.title}</h1>
            <p>{videoGame.description}</p>
        </div>
    )
};