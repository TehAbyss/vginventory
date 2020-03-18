import { useState } from 'react';
import { user } from '../models/iuser';
import { videoGame } from '../models/ivideoGame';
import { userVideoGame } from '../models/iuserVideoGame';

export interface UserProfileProps {
    user: user;
    videoGames: videoGame[];
    userVideoGame: userVideoGame[];
};

export function useUserProfile(props: UserProfileProps) {
    const [user, setUser] = useState<user>(props.user);
    const [videoGames, setVideoGames] = useState<videoGame[]>(props.videoGames);
    const [userBio, setUserBio] = useState<string>(props.user.bio);

    return {
        user,
        setUser,
        videoGames,
        setVideoGames,
        userBio,
        setUserBio
    };
};