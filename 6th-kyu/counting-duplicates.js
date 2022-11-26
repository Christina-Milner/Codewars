/* Given a string, return the number of characters that occur in it more than once (case-insensitive, "Bb" counts as 2 bs). */

//P: A string (can be empty)
//R: A number

/* Could iterate over the (lowercased) string and make an object with the counts for every character. But I think there might be a shortcut using filter(). */

function duplicateCount(text){
    const textArr = text.toLowerCase().split('')
    return new Set (textArr
            .filter(e => textArr.filter(f => f == e).length > 1)).size
  }

//Presto!