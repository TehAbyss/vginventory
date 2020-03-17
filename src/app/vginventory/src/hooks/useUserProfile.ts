import { useState } from 'react';
import { user } from '../models/iuser';
import { videoGame } from '../models/ivideoGame';

export interface UserProfileProps {
    user: user;
    videoGames: videoGame[];
};

export function useUserProfile(props: UserProfileProps) {
    const [user, setUser] = useState<user>(props.user);
    const [videoGames, setVideoGames] = useState<videoGame[]>(props.videoGames);
    const [userBio, setUserBio] = useState<string>(props.user.bio);

    function addVideoGameToList(title: string) {
        let vg = videoGames;
        //setVideoGames(vg.concat({title: title}));
    };

    return {
        user,
        setUser,
        videoGames,
        setVideoGames,
        userBio,
        setUserBio,
        addVideoGameToList
    };
};