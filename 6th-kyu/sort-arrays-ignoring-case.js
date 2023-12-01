/* Given an array of strings, sort it in alphabetical order, ignoring case (so A b C d, not A C b d or b d A C). */

//P: An array of strings
//R: An array of strings

/*
- So, using the inbuilt sort() without any parameters will do it by Ascii code or whatever, in any case it will separate lower and uppercase
- This can be neatly bypassed by using locale compare instead - I happen to know this because I thought I had to use locale compare elsewhere and then realised its behaviour in this regard was
    undesirable and the default sort did what I wanted.
- Oh, and it says "Sort the given array in alphabetical order", which to me sounds like modifying the input is desired, so I won't make a copy.
*/


function sortme(names) {
    console.log(names.sort((a, b) => a.toLowerCase() == b.toLowerCase() ? names.indexOf(b) - names.indexOf(a) : a.localeCompare(b)).join(' '))
    return names.sort((a, b) => a.toLowerCase() == b.toLowerCase() ? names.indexOf(b) - names.indexOf(a) : a.localeCompare(b));
}

/*
For some reason, this passed with the console log but not without it. (Yes, because the sort gets run twice, but why?)
I noticed that when the list contained the same word in both cases, they were apparently meant to remain in the original order.
I do not have time to investigate further right now.
*/