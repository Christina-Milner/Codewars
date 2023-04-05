/* Given a string, return the longest substring part of it that is in alphabetical order. Input will only be lowercase letters and at least one character long.
It can also go up to 10k characters so the solution needs to be efficient. If there are multiple solutions, return the one that appears first. */

//P: A string
//R: A string

/*
I am almost positive I have attempted this before. Let's see.
- Initialize a "longest" and "current" variable
- Stick first character into current
- Keep gluing subsequent characters to it as long as they come after the last character of it in the alphabet
- Once finding a character that does not fit that description, move "current" to "longest" and reset "current"
- Repeat and only overwrite longest if current is actually longer
*/

function longest(str) {
    let longest = ""
    let current = ""

    for (let char of str) {
        if (!current) {
            current += char
            continue
        }
        if (char.localeCompare(current[current.length - 1]) >= 0) {
            current += char
        } else {
            if (current.length > longest.length) {
                longest = current
            }
            current = char
        }
    }
    if (current.length > longest.length) {
        longest = current
    }
    return longest
}

/* That... wasn't hard, but for reference, here's an interesting solution: */

longest = s => s.match(/a*b*c*d*e*f*g*h*i*j*k*l*m*n*o*p*q*r*s*t*u*v*w*x*y*z*/g).reduce((a, b) => a.length >= b.length ? a : b)