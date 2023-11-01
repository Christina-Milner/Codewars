/* Write a regular expression that will match a string only if it contains a valid date in the format [mm-dd].
    Assume it's not a leap year. Ignore everything else in the string, including potential invalid dates. */

//P: A string
//R: A boolean

/* 
- This is inconvenient as I'd already planned out in my head how I was going to use regex only to find [xx-xx] and then pick out the numbers
    and use ifs and comparisons to check for validity. But I'm supposed to ONLY write a regular expression. Hmph.
- Boh, that means one pattern per month, or at least grouped by months with the same days, no?
- Something like /\[0[1|3|5|7|8][0-2]\d\] would match valid Jan, MArch, May, July, Aug dates other than the 30th and the 31st, and then build from there
    and add the extra conditions?
- I think a Regex is fundamentally the wrong way to approach this problem, it's going to look messy as heck and I regret choosing this kata
*/

const months31 = ["01", "03", "05", "07", "08", "10", "12"];
const months30 = ["04", "06", "09", "11"];
const days = Array.from({length: 31}, (_, i) => i + 1);
let options = [];

for (let month of months31) {
    for (let day of days) {
        options.push(`\\[${month}\-${String(day).padStart(2, "0")}\\]`);
    }
}

for (let month of months30) {
    for (let day of days.slice(0, 30)) {
        options.push(`\\[${month}\-${String(day).padStart(2, "0")}\\]`);
    }
}

for (let day of days.slice(0, 28)) {
    options.push(`\\[02\-${String(day).padStart(2, "0")}\\]`);
}

const validDate = new RegExp(options.join("|"))

/* Trying to do the logic inline was doing my head in, but I eventually remembered no one said I had to do everything in one line. 
The end result just had to be a regex rather than a function.*/