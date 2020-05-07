import { useState } from 'react';
import { baseApiUrl } from '../config';
import { useHistory } from 'react-router-dom';
import { videoGame } from '../models/ivideoGame';

const axios = require('axios').default;

export function useUpdateVideoGame(vg: videoGame) {
    const [videogame, setVideoGame] = useState<videoGame>(vg);
    const [description, setDescription] = useState<string>(vg.description);
    const url = baseApiUrl.concat(`/api/videogames/${videogame.id}`);
    let history = useHistory();

    const updateVideoGame = async () => {
        try {
            const response  = await axios.put(url,videogame);
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