/* You are given two strings. For each character in string a, change the case of all its occurrences in string B. Then do the same thing with the inputs reversed
and return the two strings joined together.
Examples: 
Input: "abc" and "cde"      => Output: "abCCde" 
The only char from the first string present in the second is "c", so it gets capitalised
The same is then true the other way around so it gets capitalised in the first one as well

Input: "ab" and "aba"       => Output: "aBABA"
String 2 goes all caps because both characters in it are in string 1 once.
The other way around, the a is present twice so the effect gets cancelled out (uppercased and then lowercased again), the b gets capitalised

Input: "abab" and "bababa"  => Output: "ABABbababa"
String 1 has no effect on string 2 because both letters are present twice, the other way around everything gets capitalised.
*/

//P: Two strings
//R: A string

/*
- First we need to check for letters that are present in both 1 and 2
- Then we check how many times they are present in 1 - if it's an even number, nothing happens, if it's an odd one, change the casing of all those letters in 2
    (sample tests show stuff is not necessarily lowercase to begin with)
- Then we do the same thing the other way around

In terms of code:
- Split both strings into arrays
- Make lowercase copies for easier comparison
- Filter 1 by elements present in 2
- Filter result by elements present an odd number of times
- Map 2 to change casing of all remaining items
- Do all the above in a helper function so the same thing can then be run with the inputs reversed
- Join arrays and concatenate strings
*/

function workOnStrings(a,b){
    let first = a.split('')
    let second = b.split('')
    const firstLower = first.map(e => e.toLowerCase())
    const secondLower = second.map(e => e.toLowerCase())

    const capsChanger = (arr1, arr2, arrToBeEdited) => {
        let lettersToChange = arr1.filter(e => arr2.includes(e)).filter(e => arr1.filter(f => f == e).length % 2 !== 0)
        return arrToBeEdited.map(e => {
            if (lettersToChange.includes(e.toLowerCase())) {
                return e == e.toLowerCase() ? e.toUpperCase() : e.toLowerCase()
            } else {
                return e
            }
        })
    }
    return `${capsChanger(secondLower, firstLower, first).join('')}${capsChanger(firstLower, secondLower, second).join('')}`
}

/* Why did I not make first and second constants? Because I was originally going to have the helper modify them instead of returning a new array.
Felt iffy doing that, though, so changed it to return the desired array instead and then forgot to change those declarations before submitting. 
Big brain move would have been to have capsChanger return a string to save myself having to repeat the join on the last line. I sometimes take
my pseudocode steps too literally. */