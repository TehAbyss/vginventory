import { useState } from 'react';
import { baseApiUrl } from '../config';
import { videoGame } from '../models/ivideoGame';
import { useHistory } from 'react-router-dom';

const axios = require('axios').default;

export function useCreateVideoGame() {
    const [title, setTitle] = useState("");
    const [genres, setGenres] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [releaseDate, setReleaseDate] = useState<Date>(new Date());
    
    const url = baseApiUrl.concat(`/api/videogames`);
    let history = useHistory();

    const updateTitle = (event:any) => {
        setTitle(event.target.value);
        
        event.preventDefault();
    }

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
        setDescription(event.target.value);

        event.preventDefault();
    }

    const updateReleaseDate = (event:any) => {
        const date:Date = event.target.value;
        setReleaseDate(date);

        event.preventDefault();
    }

    const createVideoGame = async (videogame:videoGame) => {
        try {
            await axios.post(url,videogame);
            history.push(`/videogames/${videogame.title}`);
        }
        catch (error) {
            console.log(error);
        }
    }

    const submitHandler = (event:any) => {
        const vg:videoGame = {id:'', title: title, description: description, genre: genres, releaseDate: releaseDate};
        createVideoGame(vg);
        
        event.preventDefault();
    }

    return {
        title,
        updateTitle,
        genres,
        addGenre,
        updateGenre,
        removeGenre,
        description,
        updateDescription,
        updateReleaseDate,
        submitHandler
    }
}