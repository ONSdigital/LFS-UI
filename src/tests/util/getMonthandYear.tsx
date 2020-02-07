import MockDate from "mockdate";

MockDate.set('1955-07-18');

export function getMonthandYear(divide: string, day?: number) {
    var date = new Date();
    const month = date.getMonth() + 1;
    let themonth
    if (month < 10){themonth = "0" + String(month)}
    else themonth = String(month)

    const year = String(date.getFullYear())

    if(!day) day = date.getDate()

    if (divide === "/") return String(day) + "/" + themonth + "/" + year
    if (divide === "-") return year + "-" + themonth + "-" + String(day) + "T00:00:00.000Z"
}