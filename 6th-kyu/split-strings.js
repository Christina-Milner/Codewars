/* Split a string into pairs of two characters. If its length is uneven, complete the last pair with a "_". */

//P: A string
//R: An array of strings

/*
- I would be tempted to map and add a character to then split by every 2 characters, but it's tagged Regular Expressions so...
- Won't /\w{2}/g already provide an array of what I'm looking for, just be missing the last letter if it's odd?
- So do that, check if joined together it's as long as the original string, if not, add last letter + _
*/

function solution(str){
    if (!str) {return []}
    let pairs = str.match(/\w{2}/g) || [];
    if (pairs.join('').length == str.length) {
     return pairs;
    }
    pairs.push(str[str.length - 1] + "_");
    return pairs;
 }