import { useState } from 'react';
import { videoGame } from '../models/ivideoGame';

export function useVideoGames(props: videoGame[]) {
    const [videoGames, setVideoGames] = useState<videoGame[]>(props);

    //useEffect(() => {
        //TODO: this useEffect should call the users api and get a user by id
    //    setVideoGames(getUserProfileMock().videoGames);
    //},[videoGames]);

    function getVideoGame(title: string) {
        return videoGames.find((vg) => vg.title === title) || {id:'', title:'', genre:[], description: '', releaseDate:{date:'', month:'', year:'', epoch: 0}};
    }

    return {
        videoGames,
        setVideoGames,
        getVideoGame
    };
};