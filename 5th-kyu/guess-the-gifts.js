/* Given an array of objects representing a Christmas wishlist, with the objects having the properties name, size, clatters and weight, and an
array of the wrapped presents under the tree (with the same properties except name), return a list of the names of the items on the wishlist that could
potentially be under the tree. Order does not matter, but no duplicates. */

//P: Two arrays of objects
//R: An array of strings

/*
- Initialise the result as a Set to avoid the duplicates problem
- For each item in presents, filter wishlist by the items whose size, clatters and weight values match it, and add their names to the Set
- Convert the set to array and return

*/



function guessGifts(wishlist, presents) {
    let result = new Set()
    for (let gift of presents) {
        const possibles = wishlist.filter(item => item.clatters === gift.clatters && item.size === gift.size && item.weight === gift.weight)
        possibles.forEach(item => result.add(item.name))
    }
    return Array.from(result)
  }