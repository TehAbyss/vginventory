import React from 'react';
import { useGetVideoGame } from "../hooks/useGetVideoGame";
import { useParams, useHistory } from "react-router-dom";

export const VideoGameProfile = () => {
    let { title } = useParams();
    let history = useHistory();
    const { videogame } = useGetVideoGame(title || '');

    if (!videogame) return null;

    return (
        <div>

            <h1>{videogame.title}</h1>
            <p>{videogame.description}</p>
            <button type="button" onClick={() => history.push(`/videogames/${videogame.title}/edit`, {game: videogame})}>Edit</button>
        </div>
    )
};