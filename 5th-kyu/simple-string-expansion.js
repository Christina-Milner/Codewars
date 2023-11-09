/* Given a string with characters in brackets and numbers preceding those brackets, return the string with the brackets 'expanded' properly, aka
their content repeated as many times as the prefix number.
Input will only be numbers, lowercase letters and valid parentheses.
Examples:
    solve("3(ab)") = "ababab"     -- because "ab" repeats 3 times
    solve("2(a3(b))") = "abbbabbb" -- because "a3(b)" == "abbb", which repeats twice.
*/

//P: A string
//R: A string

/*
- Hmm. Is there a way to do this without RegEx? Kata is tagged algorithms rather than RegEx
- Might work if we reverse the input string so we can go inside out? (I mean or we could iterate over it from the back but whatever)
- Iterate over string (or, since it's been reversed, might be an array) until we hit the first thing that isn't a closing bracket
- Save everything we find until we hit an open bracket. This is ThingToRepeat
- Save the next batch of stuff that comes before another open bracket. If it's longer than 1 char, separate it into number and letters
- Update ThingToRepeat as ThingToRepeat x number, prefixed by letters
- Repeat with next batch of stuff in between two opening brackets
*/


function solve(str){
    const strArr = str.split('').filter(e => e !== ")").join('').split('(');
    let workingString = ""
    for (let i = strArr.length - 1; i >= 0; i--) {
        const cur = strArr[i];
        if (i == strArr.length - 1) {
            workingString += cur;
            continue;
        }
        if (!isNaN(cur)) {
            workingString = workingString.repeat(Number(cur));
            continue;
        }
        if (isNaN(cur) && cur.length == 1) {
            workingString = cur + workingString;
            continue;
        }
        const num = cur[cur.length - 1];
        const rest = cur.slice(0, -1);
        workingString = workingString.repeat(Number(num));
        workingString = rest + workingString;
    }
    return workingString;
}

/* My original plan very quickly turned into a nightmare of "what how do I track whether I'm adding stuff to workingString or to the prefix/multiplier?"
    Fortunately, arrays offer ways around that. */