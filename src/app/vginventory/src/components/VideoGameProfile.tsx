import React from 'react';
import { useGetVideoGame } from "../hooks/useGetVideoGame";
import { useParams } from "react-router-dom";
import { VideoGameEdit } from './VideoGameEdit';

export const VideoGameProfile = (props: any) => {
    let { title } = useParams();
    const { videogame } = useGetVideoGame(title || '');
    console.log(videogame);
    if (!videogame) return null;

    return (
        <div>

            <h1>{videogame.title}</h1>
            <p>{videogame.description}</p>
            <button type="button" onClick={() => <VideoGameEdit game={videogame} />}>Edit</button>
        </div>
    )
};