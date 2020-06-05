import { useState, useEffect, useRef } from 'react';

const axios = require('axios').default;

export function useRawg(props: any) {
    const rawgUrl = 'https://api.rawg.io/api/games';
    const gamesInitial = { count: 0, next: '', previous: '', results: [] };
    const [games, setGames] = useState(gamesInitial);

    // This is used to prevent performing a React state update on an unmounted component.
    const isMountedRef = useRef(false);

    useEffect(() => {
        queryGames();
        return () => {     
            isMountedRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const queryGames = async (nextUrl:string = '') => {
        let gamesUrl = nextUrl;
        if (typeof gamesUrl == 'undefined' || gamesUrl == null) {
            return;
        }
        if (gamesUrl.length === 0) {
            gamesUrl = rawgUrl;
        }
        isMountedRef.current = true;
        const response = await axios.get(gamesUrl);    
        if (typeof response.data !== 'undefined') {
            if (isMountedRef.current) {
                setGames(response.data);
            }
        }
    };

    return {
        games,
        queryGames
    };
}
