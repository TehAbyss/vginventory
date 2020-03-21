import { useState, useEffect } from 'react';
import { user } from '../models/iuser';
import { getUserProfileMock } from '../models/mocks/mockData';

export function useUserProfile(props:user) {
    const [user, setUser] = useState<user>(props);
    const [userBio, setUserBio] = useState<string>(props.bio);

    useEffect(() => {
        //TODO: this useEffect should call the users api and get a user by id
        //setUser(getUserProfileMock().user);
    },[user]);

    return {
        user,
        setUser,
        userBio,
        setUserBio
    };
};