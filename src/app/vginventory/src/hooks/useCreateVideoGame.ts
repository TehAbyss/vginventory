import { useState } from 'react';
import { baseApiUrl } from '../config';
import { videoGame } from '../models/ivideoGame';

const axios = require('axios').default;

export function useCreateVideoGame() {
    const [title, setTitle] = useState("");
    const [genres, setGenres] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [releaseDate, setReleaseDate] = useState<Date>();

    const updateTitle = (event:any) => {
        setTitle(event.target.value);
    }

    const addGenre = () => {
        setGenres(genres => [...genres, ""]);
    }

    const updateGenre = (event:any, idx:number) => {

    }

    const removeGenre = (idx:number) => {
        setGenres(genres => genres.filter((g, sidx) => idx !== sidx));
    }

    const updateDescription = (event:any) => {
        setDescription(event.target.value);
    }

    const updateReleaseDate = (event:any) => {
        const date:Date = event.target.value;
        setReleaseDate(date);
    }

    const submitHandler = (event:any) => {
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
        submitHandler
    }
}