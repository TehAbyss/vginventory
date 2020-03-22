import { useState, useEffect } from 'react';
import { videoGame } from '../models/ivideoGame';

export function useVideoGame(props: videoGame) {
    const [videoGame, setVideoGame] = useState(props);

    return {
        videoGame,
        setVideoGame
    };
};