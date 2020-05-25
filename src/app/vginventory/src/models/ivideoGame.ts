export interface videoGame {
    id: string;
    title: string;
    genre: string[];
    description: string;
    releaseDate: Date;
};

export function getEmptyVideoGame() {
    return {id: '', title: '', genre: '', description: '', releaseDate: {}};
}