export function getMonthName(month: number) {
    if (month < 0 || month > 11) {
        return '';
    }
    return monthName[month];
};

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