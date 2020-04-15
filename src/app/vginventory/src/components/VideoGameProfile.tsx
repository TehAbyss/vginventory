import React from 'react';
import { useVideoGame } from "../hooks/useVideoGame";
import { useParams } from "react-router-dom";

export const VideoGameProfile = (props: any) => {
    let { title } = useParams();
    const { videoGame } = useVideoGame(title || '');
    console.log(videoGame);
    if (!videoGame) return null;

    return (
        <div>

            <h1>{videoGame.title}</h1>
            <p>{videoGame.description}</p>
        </div>
    )
};