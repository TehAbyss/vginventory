import { useState, useEffect } from 'react';
import { user } from '../models/iuser';
import { getUserProfileMock } from '../models/mocks/mockUserProfile';

export function useUserProfile() {
    const [user, setUser] = useState<user>(getUserProfileMock().user);
    const [userBio, setUserBio] = useState<string>(user.bio);

    //useEffect(() => {
        //TODO: this useEffect should call the users api and get a user by id
    //    setUser(getUserProfileMock().user);
    //},[user]);

    return {
        user,
        setUser,
        userBio,
        setUserBio
    };
};