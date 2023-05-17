/* Given a string of digits and a number indicating the size of the substrings to cut it into, do the following:
- If a chunk represents an integer where the sum of the cubes of its digits is divisible by 2, reverse it
- Otherwise, rotate it to the left by one position
Then put the chunks back together and return as a string.
Return the empty string if n is <= 0 or the string is empty or n is larger than the length of the string. */

//P: A string and a number
//R: A string


/*
- Divide string into "chunks". Could either slice bits of length n off until no longer possible (leftover bits at the end are to be ignored),
   or map extra characters like # in at every nth position and then split by those
- Make helper that splits input string, maps to numbers, cubes, sums and returns a boolean indicating divisibility by 2
- If helper returns true, reverse chunk (split to array, reverse, put back together)
- Otherwise, slice first digit off and stick back on at the end
- Put chunks back together
*/


function revrot(str, num) {
    if (!str || !num || num > str.length) {
        return ""
    }

    const cubeSumHelper = numStr => {
        return numStr.split('')
            .map(digit => Number(digit) ** 3)
            .reduce((acc, cur) => acc + cur, 0)
            % 2 == 0
    }

    let chunks = []
    while (str.length >= num) {
        chunks.push(str.slice(0, num))
        str = str.slice(num)
    }
    
    return chunks.map(chunk => cubeSumHelper(chunk) ? chunk.split('').reverse().join('') : chunk.slice(1) + chunk[0]).join('')
}
