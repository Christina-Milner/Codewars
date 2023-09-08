/* Given an array with a string (??) of what an airport flappy display thing says, an array of an array (???) of numbers indicating how many times each rotor flaps,
return an array of a string with what the display says now.
The characters on the rotors are preloaded as the constant ALPHABET. */

//P: An array of a string and an array of an array of numbers
//R: An array of a string

/*
- Ah - it's arrays because these katas are going to work up to a multi-line display, but it's only 1 to start with
- Split to array (because there aren't enough of those in here yet)
- Take index of character in the ALPHABET const, add rotor number, take modulo 54
- Put back together
*/

function flapDisplay(lines, rotors) {
    return lines.map((str, i) => {
        return str.split('').map((char, idx) => ALPHABET[(ALPHABET.indexOf(char) + rotors[i].slice(0, idx + 1).reduce((acc, cur) => acc + cur, 0)) % 54]).join('')
    })
}

/* Ok I slightly misunderstood how it was meant to work, as the number of flaps is cumulative. And there were multi-line tests hidden in the non-basic ones,
so that's why arrays. But no biggie. */