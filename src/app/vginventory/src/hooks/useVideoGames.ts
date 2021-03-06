import { useState, useEffect } from 'react';
import { baseApiUrl } from "../config";
import { videoGame } from '../models/ivideoGame';

const axios = require('axios').default;

export function useVideoGames(props: videoGame[]) {
    const [videoGames, setVideoGames] = useState<videoGame[]>([]);
    const url = baseApiUrl.concat('/api/videogames');

    useEffect(() => {
        //TODO: this useEffect should call the users api and get a user by id
        readVideoGames();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const readVideoGames = async () => {
        const response  = await axios.get(url);
        setVideoGames(response.data);
    };

    function getVideoGame(title: string) {
        return videoGames.find((vg) => vg.title === title) || {id:'', title:'', genre:[], description: '', releaseDate:{date:'', month:'', year:'', epoch: 0}};
    }

    return {
        videoGames,
        setVideoGames,
        getVideoGame
    };
};