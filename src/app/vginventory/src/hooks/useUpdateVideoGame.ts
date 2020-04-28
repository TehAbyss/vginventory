import { useState } from 'react';
import { videoGame } from '../models/ivideoGame';
import { useHistory } from 'react-router-dom';

const axios = require('axios').default;

export function useUpdateVideoGame(vg: videoGame) {
    console.log(vg)
    const [videogame, setVideoGame] = useState<videoGame>(vg);
    const [description, setDescription] = useState<string>(vg.description);
    const url = 'https://localhost:5001/api/videogames'.concat(`/${vg.title}`);
    let history = useHistory();

    const updateVideoGame = async () => {
        try {
            const response  = await axios.put(url,videogame);
            console.log(response);
            setVideoGame(response.data);
            history.push(`/videogames/${videogame.title}`);
        }
        catch (error) {
            console.log(error);
        }
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
        updateVideoGame();
        event.preventDefault();
    }

    return {
        videogame,
        description,
        onDescriptionChange,
        onUpdate
    };
};