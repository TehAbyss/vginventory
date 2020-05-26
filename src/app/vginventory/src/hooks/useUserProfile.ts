import { baseApiUrl } from '../config';
import { user } from '../models/iuser';
import { useState, useEffect } from 'react';

const axios = require('axios').default;

export function useUserProfile(props: any) {
    const url = baseApiUrl.concat('/api/user');
    const isAuthenticatedUser = props.isAuthenticated && typeof props.user !== 'undefined' && props.user.email !== 'undefined';
    const currentUser : user = {
        id: '',
        email: (isAuthenticatedUser ? props.user.email : ''),
        name: '',
        bio: '',
        avatarUrl: '',
        startDate: new Date()
    };
    const [userProfile, setUserProfile] = useState<user>(currentUser);

    useEffect(() => {
        readUserProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createUserProfile = async () => {
        if (userProfile.email === '') {
            return;
        }
        if (userProfile.id !== '') {
            return;
        }
        const config = {
            headers: {
                'Content-Type':'application/json'
            },
            data: {
                email: userProfile.email,
                userName: 'Anonymous'
            }
        };
        await axios.post(url, null, config);
    }

    const readUserProfile = async () => {
        if (userProfile.email === '') {
            return;
        }

        const fullUrl = url.concat('/').concat(userProfile.email);
        let response = await axios.get(fullUrl);

        if (typeof response.data !== 'undefined') {
            if (response.data.length === 0) {
                createUserProfile();
                response = await axios.get(fullUrl);
            }

            if (response.data.length > 0) {
                const data = response.data[0];
                
                let readUser : user = {
                    id: data.id,
                    email: data.email,
                    name: data.userName,
                    bio: data.bio,
                    avatarUrl: data.avatarUrl,
                    startDate: new Date(data.startDate)
                };
                setUserProfile(readUser);
            }
        }
    };

    const updateUserProfile = async (user: user) => {
        if (user.email === userProfile.email) {
            await axios.put(url, user);
            readUserProfile();
        }
    };

    return {
        userProfile,
        readUserProfile,
        updateUserProfile
    };
}
