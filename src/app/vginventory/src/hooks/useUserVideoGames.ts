import { baseApiUrl } from '../config';
import { userVideoGame } from '../models/iuserVideoGame';
import { useState, useEffect } from 'react';

const axios = require('axios').default;

export function useUserVideoGames(props: any) {
    const url = baseApiUrl.concat('/api/userVideoGame');
    const [userVideoGames, setUserVideoGames] = useState<userVideoGame[]>([]);

    useEffect(() => {
        readUserVideoGames();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const readUserVideoGames = async () => {
        if (props.userProfile.id === '') {
            return;
        }

        const fullUrl = url.concat('?userId=').concat(props.userProfile.id);
        const response  = await axios.get(fullUrl);

        if (response.data !== null) {
            setUserVideoGames(response.data);
        }
    };

    return {
        userVideoGames,
        setUserVideoGames
    };
};