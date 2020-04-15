import { useState, useEffect } from 'react';
import { user } from '../models/iuser';

export function useUserProfile(props:user) {
    const [userObj, setUser] = useState<user>(props);
    const [userBio, setUserBio] = useState<string>(props.bio);

    useEffect(() => {
        //TODO: this useEffect should call the users api and get a user by id
        setUser(props);
    },[props]);

    return {
        userObj,
        setUser,
        userBio,
        setUserBio
    };
};