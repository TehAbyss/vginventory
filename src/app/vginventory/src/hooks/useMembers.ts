import { useState, useEffect } from 'react';
import { baseApiUrl } from '../config';

const axios = require('axios').default;

export function useMembers(props: any) {
    const [user, setUser] = useState([]);
    const url = baseApiUrl.concat('/api/user');

    useEffect(() => {
        readUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const createUser = async (user: any) => {
        const config = {
            headers: {
                'Content-Type':'application/json'
            },
            data: {
                email: user.email,
                userName: user.userName,
                bio: user.bio,
                avatarUrl: user.avatarUrl
            }
        };
        await axios.post(url, null, config);
        readUser();
    }

    const readUser = async () => {
        const response  = await axios.get(url);
        setUser(response.data);
    };

    const updateUser = async (user: any) => {
        await axios.put(url, user);
        readUser();
    };

    const deleteUser = async (user: any) => {
        const config = {
            headers: {
                'Content-Type':'application/json'
            },
            data: {
                id: user.id
            }
        };
        await axios.delete(url, config);
        readUser();
    };

    return {
        user,
        createUser,
        readUser,
        updateUser,
        deleteUser
    };
}
