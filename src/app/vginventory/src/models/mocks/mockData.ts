import { UserProfileProps } from "../iprops";
import { getMonthName } from "../idate";
import { videoGame } from "../ivideoGame";
import { userVideoGame } from "../iuserVideoGame";

export const getUserProfileMock = (): UserProfileProps => {
    return (
        {
            user: {
                id: '1',
                name: 'User1',
                bio: 'I love video games!',
                startDate: new Date(Date.now()),
                avatarUrl: 'http://img.url.com',
                email: 'myemail@email.com'
            },
            userVideoGames: getUserVideoGameMock()
        }
    );
};

export const getVideoGameList = (): videoGame[] => {
    const owrelease = new Date('May 24, 2016');
    const pwrelease = new Date('October 12, 2001');
    return (
        [
            {
                id: '1',
                title: 'Overwatch',
                genre: [
                    'action',
                    'FPS'
                ],
                description: 'Overwatch is set sixty years into the future of a fictionalized Earth, thirty years after the resolution of what is known as the "Omnic Crisis."',
                releaseDate: owrelease
            },
            {
                id: '2',
                title: 'Phoenix Wright: Ace Attorney',
                genre: [
                    'adventure',
                    'visual novel'
                ],
                description: 
                    `Phoenix Wright, a newly hired defense attorney at the Fey & Co. law firm, agrees to represent his childhood friend Larry Butz, 
                    who has been charged with the murder of his girlfriend, Cindy Stone. With the help of his boss and mentor, Mia Fey, Phoenix proves that Frank Sahwit, 
                    the prosecution's star witness, is the real murderer.`,
                releaseDate: pwrelease
            }
        ]
    )
};

export const getEmptyVideoGameListMock = (): UserProfileProps => {
    return (
        {
            user: {
                id: '1',
                name: 'User1',
                bio: 'I love video games!',
                startDate: new Date(Date.now()),
                avatarUrl: 'http://img.url.com',
                email: 'myemail@email.com'
            },
            userVideoGames: []
        }
    );
};

const getUserVideoGameMock = (): userVideoGame[] => {
    return (
        [
            {
                userId: '1',
                videoGameId: '1',
                isCompleted: true,
                isOwned: true,
                isWishListed: false
            },
            {
                userId: '1',
                videoGameId: '2',
                isCompleted: false,
                isOwned: false,
                isWishListed: true
            }
        ]
    )
}