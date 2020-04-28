import { date, getEmptyDate } from "./idate";

export interface videoGame {
    id: string;
    title: string;
    genre: string[];
    description: string;
    releaseDate: date;
};

export function getEmptyVideoGame() {
    return {id: '', title: '', genre: '', description: '', releaseDate: getEmptyDate()};
}