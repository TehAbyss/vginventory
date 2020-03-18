import React from 'react';
import { videoGame } from "../models/ivideoGame";

export const VideoGameProfile = (videoGame: videoGame) => {
    return (
        <div>
            <h1>{videoGame.title}</h1>
            <p>{videoGame.description}</p>
        </div>
    )
};