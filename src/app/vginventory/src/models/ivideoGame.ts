import { date } from "./idate";

export interface videoGame {
    id: string;
    title: string;
    genre: string[];
    description: string;
    releaseDate: date;
};