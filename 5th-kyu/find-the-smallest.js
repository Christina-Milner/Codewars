/* Given a positive number n, perform only 1 operation consisting of taking a digit at index i and
reinserting it at index j to get the lowest possible values of n, i and j. Return an array of the new n,
i, and j. */

//P: An integer
//R: An array of 3 integers

function smallest(n) {
    console.log(n)
    let numArr = String(n).split('').map(e => Number(e))
    /* From tests:
      - Find the smallest digit and move it to the front
      - If it's already at the front, find the next smallest and move it to 1
      - If the digit at [1] is a 0, move the digit at [0] instead - ooh, but what if multiple zeroes?
      */
    if (numArr[1] == 0) {                 // Move first digit behind any following zeroes
      let tempArr = numArr.slice(1)
      let j = 0
      while (tempArr[0] == 0) {
        j++
        tempArr.shift()
      }
      tempArr.unshift(numArr[0])
      return [Number(tempArr.map(e => String(e)).join('')), 0, j]
    }
  
    const findSmallestDigitNotInFront = arr => {            // find the smallest digit that's not already at the front
      if (arr.length == 1) {return arr[0]}
      let smallest = arr.reduce((a, b) => Math.min(a, b))
      if (!(arr[0] == smallest)) {return smallest}
      else {return findSmallestDigitNotInFront(arr.slice(1))}
    }
    let smallestDigit = findSmallestDigitNotInFront(numArr)
    
    if (numArr.every(e => e == smallestDigit)) {return [Number(numArr.map(e => String(e)).join('')), 0, 0]}
      
    let i = smallestDigit == 0 ? numArr.lastIndexOf(smallestDigit) :
                                 numArr[0] <= smallestDigit ? numArr.slice(1).indexOf(smallestDigit) + 1 :
                                 numArr.indexOf(smallestDigit)
    let j = 0
    while (numArr[j] <= smallestDigit) {j++}
    if (numArr.slice(0, j).every(e => e == j)) {j = 0}
    numArr.splice(j, 0, smallestDigit)
    numArr.splice(i + 1, 1)
    return [Number(numArr.map(e => String(e)).join('')), i, j]  
}

/* WIP - passes about 3/4 of the random tests, but keep having to account for more cases that break the logic.
May have to rewrite to change it to more of a brute force approach as there's too many holes in the logic
described in the comment inside the function.
- If there's multiple zeroes, we want to sometimes pick one from the back but not always - in 5807900218252322, we want the first one
  because of the arbitrary and extremely irksome requirement to keep the index low
- 1586897492995867 should produce [1258689749995867, 9, 1] not [2158689749995867, 9, 0], so logic for j needs some more fixing
- 935855753 - here, the lowest digit isn't actually what we're after as moving the 9 all the way to the back results in the lowest number
- 2443261318465736 - moving the 1 at index 8 instead of 6 results in a lower number */