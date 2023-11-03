/* There's a transformation where you take a string, create a matrix of every shift of it, then alphabetically sort that matrix and then reutrn the last
column of it plus the (zero-indexed) row where the original string is. 
Write the encode() and decode() functions to make this happen.
Hints:

    The output contains the last matrix column.
    The first column can be acquired by sorting the last column.
    For every row of the table: Symbols in the first column follow on symbols in the last column, in the same way they do in the input string.
    You don't need to reconstruct the whole table to get the input back.
*/

//P: A string / A string and a number
//R: An array of string and a number / A string



/*
- For encode, actually create the table. I've spent a few minutes thinking about it and trying to spot a pattern that might help bypass having to do it, but I don't see one. So.
    - Create array with original string in it
    - While its length is shorter than the string's length, take the string currently in last position, slice its last letter off and stick it on the front, and push that in
    - Sort the array by LocaleCompare
    - Return the last column (map to last letter => join) and the index of the original string

- For decode, hmmm. 
    - We know the first column is the last column, alphabetically sorted
    - So we know the first letter of the original word (given index in first column) and the last letter (given index in last column)
    - In the example, we have "nnbbraaaa" (last), "aaaabbnnr" (first), and we know "b_____r"
    - This must be where "Symbols in the first column follow on symbols in the last column" comes in, but last col[4] is "b" and first row[5] is also b so ???
        - Add a "skip if same one" clause I guess?
    - So then last col[2] = b and first col[3] = a tells us it's "ba____r"? And the same logic tells us the "a"s are followed by "n" and one by a "r"?
    - So, in code: given index of first column = first letter, of last column = last letter
    - Find first letter in last column, second letter is index + 1 in first column (going to hope first occurrence of first letter will always be correct one)
    - Keep doing this

*/


function encode(s) {
    let matrix = [s];
    while (matrix.length < s.length) {
        const last = matrix[matrix.length - 1];
        matrix.push(last[last.length - 1] + last.slice(0, -1));
    }
    matrix.sort();
    return [matrix.map(row => row[row.length - 1]).join(''), matrix.indexOf(s)];
}
  
function decode(s, i) {
    if (!s || i < 0) {return ""}
    let matrix = Array.from({length: s.length}, () => []);
    while (matrix.some(e => e.length < s.length)) {
        for (let i = 0; i < s.length; i++) {
            matrix[i].unshift(s[i]);
        }
        matrix.sort();
     }
    return matrix[i].join('');
  }

/* Encode was np. Logic sketched out above for decode just wouldn't quite work. Ended up taking the approach hinted at in the Wikipedia article on Burrows Wheeler transformation ¯\_(ツ)_/¯ */
