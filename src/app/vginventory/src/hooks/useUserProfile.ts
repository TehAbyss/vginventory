import { useState, useEffect } from 'react';
import { user } from '../models/iuser';

export function useUserProfile(props:user) {
    const [user, setUser] = useState<user>(props);
    const [userBio, setUserBio] = useState<string>(props.bio);

    useEffect(() => {
        //TODO: this useEffect should call the users api and get a user by id
        setUser(props);
    },[props]);

    return {
        user,
        setUser,
        userBio,
        setUserBio
    };
};