/* Given an integer n and a string str, break the string up into substrings of length n without spaces + any remaining characters and return as a string with newlines in
between the substrings. */

//P: An integer and a string
//R: A string

/*
- Get rid of spaces in the string (regex replace or split by space and rejoin)
- Split string and map to add a \n whenever i + 1 is cleanly divisible by 5
- Rejoin
*/

function stringBreakers(n, string){
    const noSpaces = string.split(' ').join('')
    return noSpaces.split('').map((e, i, arr) => (i + 1) % n == 0 &&  i < arr.length - 1 ? e + '\n' : e).join('')
}

/* Just needed a small adjustment to avoid extra linebreaks at the end of the string. */