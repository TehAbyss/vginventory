import React, { useState, useEffect } from 'react';
import { User } from '../models/iuser';
import { VideoGame } from '../models/ivideoGame';

export interface UserProfileProps {
    user: User;
    videoGames: VideoGame[];
};

export function useUserProfile(props: UserProfileProps) {
    const [user, setUser] = useState<User>(props.user);
    const [videoGames, setVideoGames] = useState<VideoGame[]>(props.videoGames);

    useEffect(() => {
        setUser(props.user);
    }, [props.user.Bio]);

    return {
        user,
        setUser,
        videoGames,
        setVideoGames
    };
};