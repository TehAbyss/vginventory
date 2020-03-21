import { useState, useEffect } from 'react';
import { videoGame } from '../models/ivideoGame';
import { useVideoGames } from './useVideoGames';

export function useVideoGame(vgTitle: string) {
    vgTitle = vgTitle ? vgTitle : '';
    const { videoGames } = useVideoGames();
    const [videoGame, setVideoGame] = useState(getVideoGame());

    //useEffect(() => {
        //TODO: this useEffect should call the users api and get a user by id
    //    setVideoGame(getVideoGame());
    //},[videoGame]);

    function getVideoGame() {
        let vg = videoGames.find(({title}) => title === vgTitle);
        if (vg === undefined) vg = {id:'', title:'', genre:[], description: '', releaseDate:{date:'', month:'', year:'', epoch: 0}};
        return vg;
    }

    return {
        videoGame,
        setVideoGame
    };
};