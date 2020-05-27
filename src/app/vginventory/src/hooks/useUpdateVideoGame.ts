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

    const updateVideoGame = async () => {
        try {
            const response  = await axios.put(url,videogame);
            setVideoGame(response.data);
            console.log(videogame);
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
        const newGenres = genres.map((genre, sidx) => {
            if (idx !== sidx) return genre;
            return event.target.value;
        });
      
        setGenres(newGenres);

        event.preventDefault();
    }

    const removeGenre = (idx:number) => {
        setGenres(genres => genres.filter((g, sidx) => idx !== sidx));
    }

    const updateDescription = (event:any) => {
        if (event.target.value !== description) {
            setDescription(event.target.value);
            console.log(description);
        }
        event.preventDefault();
    }

    const updateReleaseDate = (date:any) => {
        if (date.toDate() !== releaseDate) {
            setReleaseDate(date.toDate());
        }
    }

    const submitHandler = (event:any) => {
        setVideoGame({
            id: videogame.id, 
            title: videogame.title, 
            genre: genres, 
            description: description, 
            releaseDate: releaseDate
        });
        console.log(videogame);
        updateVideoGame();
        
        event.preventDefault();
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