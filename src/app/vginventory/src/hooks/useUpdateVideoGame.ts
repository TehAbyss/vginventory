import { useState } from 'react';
import { baseApiUrl } from '../config';
import { useHistory } from 'react-router-dom';
import { videoGame } from '../models/ivideoGame';

const axios = require('axios').default;

export function useUpdateVideoGame(vg: videoGame) {
    const [videogame, setVideoGame] = useState<videoGame>(vg);
    const [genres, setGenres] = useState<string[]>(vg.genre);
    const [description, setDescription] = useState<string>(vg.description);
    const [releaseDate, setReleaseDate] = useState<Date>(new Date(vg.releaseDate));
    
    const url = baseApiUrl.concat(`/api/videogames`);
    let history = useHistory();

    const updateVideoGame = async (vg:videoGame) => {
        try {
            const response  = await axios.put(url,vg);
            setVideoGame(response.data);
            history.push(`/videogames/${videogame.title}`);
        }
        catch (error) {
            console.log(error);
        }
    };

    const addGenre = () => {
        setGenres(genres => [...genres, ""]);
    }

    const updateGenre = (event:any, idx:number) => {
        event.preventDefault();

        const newGenres = genres.map((genre, sidx) => {
            if (idx !== sidx) return genre;
            return event.target.value;
        });
      
        setGenres(newGenres);
    }

    const removeGenre = (idx:number) => {
        setGenres(genres => genres.filter((g, sidx) => idx !== sidx));
    }

    const updateDescription = (event:any) => {
        event.preventDefault();
        setDescription(event.target.value);
    }

    const updateReleaseDate = (date:any) => {
        setReleaseDate(date.toDate());
    }

    const submitHandler = (event:any) => {
        event.preventDefault();
        let vg = {
            ...videogame,
            description: description,
            genre: genres,
            releaseDate: releaseDate
        };

        updateVideoGame(vg);
    }

    return {
        videogame,
        genres,
        addGenre,
        updateGenre,
        removeGenre,
        description,
        updateDescription,
        releaseDate,
        updateReleaseDate,
        submitHandler
    };
};