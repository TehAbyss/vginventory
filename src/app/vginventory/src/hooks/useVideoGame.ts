import { useState, useEffect } from 'react';
import { videoGame } from '../models/ivideoGame';

const axios = require('axios').default;

export function useVideoGame(title: string) {
    const [videogame, setVideoGame] = useState<videoGame>();
    const url = 'https://localhost:5001/api/videogames'.concat(`/${title}`);

    useEffect(() => {
        readVideoGame();
    });

    const readVideoGame = async () => {
        const response  = await axios.get(url);
        setVideoGame(response.data);
    };

    return {
        videogame,
        setVideoGame
    };
};