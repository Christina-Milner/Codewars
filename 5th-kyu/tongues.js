/* Write a function to decode 'Gandalf's' language. 
    Vowels from the sequence 'a' 'i' 'y' 'e' 'o' 'u' are replaced with the vowel 3 places down (looping around of course).
    Consonants are replaced by the letter 10 letters down in 'b' 'k' 'x' 'z' 'n' 'h' 'd' 'c' 'w' 'g' 'p' 'v' 'j' 'q' 't' 's' 'r' 'l' 'm' 'f'.
    Case should be preserved. Based on sample tests, numbers and punctuation should be left unchanged. */

//P: A string
//R: A string

/*
- Create arrays for the vowels and consonants
    - Vowel shift is indexof current letter + 3 % array length, consonant the same thing with 10
- Have to either make an uppercase version of both arrays or check case of the input letter with an if - going to do former
- Do all this by splitting input to array and using map, then join back together

*/


function tongues(code) {
    const vowelsLower = ['a', 'i', 'y', 'e', 'o', 'u'];
    const vowelsUpper = vowelsLower.map(letter => letter.toUpperCase());
    const consonantsLower = ['b', 'k', 'x', 'z', 'n', 'h', 'd', 'c', 'w', 'g', 'p', 'v', 'j', 'q', 't', 's', 'r', 'l', 'm', 'f'];
    const consonantsUpper = consonantsLower.map(letter => letter.toUpperCase());

    return code.split('').map(letter => {
        if (vowelsLower.includes(letter)) {
            return vowelsLower[(vowelsLower.indexOf(letter) + 3) % vowelsLower.length];
        }
        if (vowelsUpper.includes(letter)) {
            return vowelsUpper[(vowelsUpper.indexOf(letter) + 3) % vowelsUpper.length];
        }
        if (consonantsLower.includes(letter)) {
            return consonantsLower[(consonantsLower.indexOf(letter) + 10) % consonantsLower.length];
        }
        if (consonantsUpper.includes(letter)) {
            return consonantsUpper[(consonantsUpper.indexOf(letter) + 10) % consonantsUpper.length];
        }
        return letter
    }).join('');
}
