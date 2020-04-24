import { useState } from 'react';
import { videoGame } from '../models/ivideoGame';

const axios = require('axios').default;

export function useUpdateVideoGame(vg: videoGame) {
    const [videogame, setVideoGame] = useState<videoGame>(vg);
    const [description, setDescription] = useState<string>(vg.description);
    const url = 'https://localhost:5001/api/videogames'.concat(`/${vg.title}`);

    const updateVideoGame = async () => {
        const response  = await axios.put(url,videogame);
        setVideoGame(response.data);
    };

    function onDescriptionChange(event:any) {
        if (event.target.value !== description) {
            setDescription(event.target.value);
        }
        event.preventDefault();
    }

    function onUpdate(event:any) {
        let game: videoGame = videogame;
        game.description = description;
        setVideoGame(game);
        //updateVideoGame();
        event.preventDefault();
    }

    return {
        videogame,
        description,
        onDescriptionChange,
        onUpdate
    };
};