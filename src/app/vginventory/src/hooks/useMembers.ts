import { useState, useEffect } from 'react';

const axios = require('axios').default;

export function useMembers(props: any) {
    const [user, setUser] = useState([]);
    const url = 'https://localhost:5001/api/user';

    useEffect(() => {
        readUser();
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
        const config = {
            headers: {
                'Content-Type':'application/json'
            },
            data: {
                userName: user.userName,
                bio: user.bio,
                avatarUrl: user.avatarUrl
            }
        };
        await axios.put(url, null, config);
        readUser();
    };

    const deleteUser = async (user: any) => {
        const config = {
            headers: {
                'Content-Type':'application/json'
            },
            data: {
                userName: user.userName
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
