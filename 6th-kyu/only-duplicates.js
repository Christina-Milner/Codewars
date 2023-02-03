/* Given a string, remove all characters from it that are unique. */

//P: A string
//R: A string

/*
- Split string, filter by filter length > 1, join
*/

function onlyDuplicates(str) {
    return str.split('').filter((e, _, arr) => arr.filter(f => f == e).length > 1).join('')
  }


/* This seems a bit on the easy side for 6th kyu, but I'm not complaining, I just found out I actually need to go somewhere.
Hence somewhat sparse PREP, but I'm also not entirely sure what else there is to say about this.*/