/* Given a string of words with numbers mixed in, return it with the words ordered by those numbers. The numbers will always start at 1 and the string
will always contain valid consecutive numbers. Empty string should return an empty string. */

//P: A string
//R: A string

/* Write a subfunction that maps a string to the one number contained in it - split/filter by Number(x) is not NaN - and use that in sort() */

function order(words){
    const numberExtractor = str => {
      return Number(str.split('').filter(e => Number(e))[0])
    }
    return words.split(' ').sort((a, b) => numberExtractor(a) - numberExtractor(b)).join(' ')
  }


/* Took a moment of hiccups with Number.isNaN(), then realised that was a completely unnecessary extra step as Number(e) is truthy if e can be converted to a number and falsy otherwise. */