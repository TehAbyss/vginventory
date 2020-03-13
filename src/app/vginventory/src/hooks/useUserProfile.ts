import React, { useState, useEffect } from 'react';
import { User } from '../models/iuser';
import { VideoGame } from '../models/ivideoGame';

export interface UserProfileProps {
    user: User;
    videoGames: VideoGame[];
};

export function useUserProfile(props: UserProfileProps) {
    const [userBio, setUserBio] = useState<string>(props.user.Bio);
    const [videoGames, setVideoGames] = useState<VideoGame[]>(props.videoGames);

    return {
        userBio,
        setUserBio,
        videoGames,
        setVideoGames
    };
};