import { useState, useEffect } from 'react';
import { baseApiUrl } from '../config';
import { videoGame } from '../models/ivideoGame';

const axios = require('axios').default;

export function useGetVideoGame(title: string) {
    const [videogame, setVideoGame] = useState<videoGame>();
    const url = baseApiUrl.concat(`/api/videogames/${title}`);

    useEffect(() => {
        readVideoGame();
        // eslint-disable-next-line
    }, []);

    const readVideoGame = async () => {
        try {
            const response = await axios.get(url);
            setVideoGame(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    return {
        videogame,
        setVideoGame
    };
};