/* Given a string, reverse the casing of each character and reverse the order of the words.
It says I will have to "handle multiple spaces and leading/trailing spaces", but not how. I assume I am to get rid of them, but we'll see. */

//P: A string
//R: A string

/*
- Maybe outsource casing thing to a helper for tidiness - split substring, anything that's lowercase (equals itself toLowerCase()) gets uppercased and vice versa, then rejoin
- Split outer string by spaces and reverse, unless I'm missing something here?
*/


function stringTransformer(str) {
    const changeCase = word => {
        return word.split('').map(letter => {
            if (letter === letter.toLowerCase()) {
                return letter.toUpperCase()
            } else {
                return letter.toLowerCase()
            }
        }).join('')
    }

    return str.split(' ').map(word => changeCase(word)).reverse().join(' ')
  }

/* Based on discourse, I'm not the only one confused about the "handling spaces" thing, but it doesn't matter as the author neglected to test for any of this in JS ¯\_(ツ)_/¯ */