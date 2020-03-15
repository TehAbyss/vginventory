import { UserProfileProps } from "../../hooks/useUserProfile";

export const getUserProfileMock = (): UserProfileProps => {
    return (
        {
            user: {
                Id: '1',
                UserName: 'User1',
                Bio: 'I love video games!',
                MemberStartDate: Date.now()
            },
            videoGames: [
                {
                    title: 'Overwatch'
                },
                {
                    title: 'Phoenix Wright: Ace Attorney'
                }
            ]
        }
    );
};

export const getEmptyVideoGameListMock = (): UserProfileProps => {
    return (
        {
            user: {
                Id: '1',
                UserName: 'User1',
                Bio: 'I love video games!',
                MemberStartDate: Date.now()
            },
            videoGames: [
            ]
        }
    );
};