import { date } from "./idate";

export interface user {
	id: string;
	name: string;
	bio: string;
	startDate: date;
	avatarUrl: string;
	email: string;
};