import { useState, useEffect } from 'react';
import { videoGame } from '../models/ivideoGame';

const axios = require('axios').default;

export function useGetVideoGame(title: string) {
    const [videogame, setVideoGame] = useState<videoGame>();
    const url = 'https://localhost:5001/api/videogames'.concat(`/${title}`);

    useEffect(() => {
        readVideoGame();
        // eslint-disable-next-line
    }, []);

    const readVideoGame = () => {
        axios.get(url)
        .then(function (response:any) {
            setVideoGame(response.data);
        })
        .catch(function (error:any) {
            console.log(error);
        })
    };

    return {
        videogame,
        setVideoGame
    };
};