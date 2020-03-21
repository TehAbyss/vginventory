import { useState, useEffect } from 'react';
import { getUserProfileMock, getVideoGameList } from '../models/mocks/mockData';
import { videoGame } from '../models/ivideoGame';

export function useVideoGames() {
    const [videoGames, setVideoGames] = useState<videoGame[]>(getVideoGameList());

    //useEffect(() => {
        //TODO: this useEffect should call the users api and get a user by id
    //    setVideoGames(getUserProfileMock().videoGames);
    //},[videoGames]);

    return {
        videoGames,
        setVideoGames
    };
};