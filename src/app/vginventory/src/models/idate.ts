export interface date {
    date: string;
    month: string;
    year: string;
    epoch: number;
};

export function getMonthName(month: number) {
    if (month < 0 || month > 11) {
        return '';
    }
    return monthName[month];
};

export function getEmptyDate() {
    return {date: '', month: '', year: '', epoch: -1};
}

const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];