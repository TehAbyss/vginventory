import { useState, useEffect } from 'react';
import { getUserProfileMock } from '../models/mocks/mockData';
import { userVideoGame } from '../models/iuserVideoGame';

export function useUserVideoGames() {
    const [userVideoGames, setUserVideoGames] = useState<userVideoGame[]>(getUserProfileMock().userVideoGames);

    //useEffect(() => {
        //TODO: this useEffect should call the users api and get a user by id
        //setUserVideoGames(getUserProfileMock().userVideoGames);
    //},[userVideoGames]);

    return {
        userVideoGames,
        setUserVideoGames
    };
};