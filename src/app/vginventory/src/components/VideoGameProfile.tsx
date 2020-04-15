import React from 'react';
import { useVideoGame } from "../hooks/useVideoGame";
import { useParams } from "react-router-dom";

export const VideoGameProfile = (props: any) => {
    let { title } = useParams();
    const { videogame } = useVideoGame(title || '');
    console.log(videogame);
    if (!videogame) return null;

    return (
        <div>

            <h1>{videogame.title}</h1>
            <p>{videogame.description}</p>
        </div>
    )
};