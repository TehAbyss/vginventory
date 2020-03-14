import { useState, useEffect } from 'react';
import { User } from '../models/iuser';
import { VideoGame } from '../models/ivideoGame';

export interface UserProfileProps {
    user: User;
    videoGames: VideoGame[];
};

export function useUserProfile(props: UserProfileProps) {
    const [user, setUser] = useState<User>(props.user);
    const [videoGames, setVideoGames] = useState<VideoGame[]>(props.videoGames);
    const [userBio, setUserBio] = useState<string>(props.user.Bio);

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    useEffect(() => {
        setVideoGames(props.videoGames);
    }, [props.videoGames])

    function addVideoGameToList(title: string) {
        let vg = videoGames;
        setVideoGames(vg.concat({title: title}));
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