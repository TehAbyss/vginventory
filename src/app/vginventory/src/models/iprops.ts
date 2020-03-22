import { user } from './iuser';
import { videoGame } from './ivideoGame';
import { userVideoGame } from './iuserVideoGame';

export interface UserProfileProps {
    user: user;
    userVideoGames: userVideoGame[];
};

export interface VideoGameListProps {
    videoGames: videoGame[];
    userVideoGames: userVideoGame[];
};

export interface VideoGameProps {
    videoGame: videoGame;
    userVideoGame: userVideoGame;
}