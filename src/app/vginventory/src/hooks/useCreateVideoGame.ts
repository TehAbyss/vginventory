import { useState } from 'react';
import { baseApiUrl } from '../config';
import { videoGame } from '../models/ivideoGame';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const axios = require('axios').default;

export function useCreateVideoGame() {
    const [title, setTitle] = useState("");
    const [genres, setGenres] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [releaseDate, setReleaseDate] = useState<Date>(new Date());
    
    const url = baseApiUrl.concat(`/api/videogames`);
    let history = useHistory();

    const updateTitle = (event:any) => {
        event.preventDefault();
        setTitle(event.target.value);
    }

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
        if (moment.isMoment(date)) {
            setReleaseDate(date.toDate());
        }
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
        event.preventDefault();
        const vg:videoGame = {
            id:'', 
            title: title, 
            description: description, 
            genre: genres, 
            releaseDate: releaseDate
        };
        createVideoGame(vg);
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