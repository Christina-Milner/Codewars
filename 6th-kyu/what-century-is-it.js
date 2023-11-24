/* Given a year (validation not needed), return a string indicating what century the year is in, as in 1999 -> 20th. */

//P: A string
//R: A string

/*
- Generally speaking, we want the first two digits of the year, plus 1, with "th" attached
- Says input is always a 4 digit string, so no need to consider the 8th century or similar
- Need to check if century number ends in 1, 2 or 3 to attach st, nd or rd respectively instead
*/


function whatCentury(year) {
    const suffixes = {1: "st", 2: "nd", 3: "rd"};
    const century = Number(year.slice(2)) ? String(Number(year.slice(0, 2)) + 1) : year.slice(0, 2);
    return century[0] > 1 && century[1] in suffixes ? `${century}${suffixes[century[1]]}` : `${century}th`;
}

/* 2 small adjustments had to be made: 11 != 11th, and round numbers like 2000 still count as the previous century. */