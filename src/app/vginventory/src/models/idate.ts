export interface date {
    date: string;
    month: string;
    year: string;
    epoch: number;
};

export function getMonthName(month: number) {
    var options = { month: 'long'};
    return new Intl.DateTimeFormat('en-US', options).format(month);
};