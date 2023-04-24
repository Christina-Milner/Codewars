/* Given a string, return it with the even indexed characters of each word in upper case and the odd indexed ones in lower case.
Example: toWeirdCase( "Weird string case" );//=> returns "WeIrD StRiNg CaSe" */

//P: A string
//R: A string

/* 
- So, a simple map, but we need to reset the index count for each word
- Split original string by spaces and map words to arrays
- Then map those to do the appropriate casing
- Then join word arrays with no separator and total array with spaces
*/

function toWeirdCase(string){
    return string.split(' ')
        .map(e => e.split(''))
        .map(e => e.map((letter, idx) => {
            return idx % 2 == 0 ? letter.toUpperCase() : letter.toLowerCase()
        }))
        .map(e => e.join(''))
        .join(' ')
}