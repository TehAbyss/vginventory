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
            updateReleaseDateObj(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    const updateReleaseDateObj = (data:any) => {
        if (data) {
            let vg = data as videoGame;
            vg.releaseDate = new Date(vg.releaseDate);
            setVideoGame(vg);
        }
    }

    return {
        videogame
    };
};