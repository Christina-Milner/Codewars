/* Given a positive number n, perform only 1 operation consisting of taking a digit at index i and
reinserting it at index j to get the lowest possible values of n, i and j. Return an array of the new n,
i, and j. */

//P: An integer
//R: An array of 3 integers

/* Figured this out - leaving old attempt at a solution below as a cautionary tale against trying to
derive the logic piecemeal by looking at the tests instead of looking at the bigger picture */

function smallest(n) {
  let numArr = String(n).split('').map(e => Number(e))
  let newNum = n
  let iVar = 0
  let jVar = 0
  for (let i = 0; i < numArr.length; i++) {
    let numToMove = numArr[i]
    let newNumArr = numArr.slice(0, i).concat(numArr.slice(i + 1))
    for (let j = 0; j <= newNumArr.length; j++) {
      let num = Number(newNumArr.slice(0, j).concat(numToMove).concat(newNumArr.slice(j)).join(''))
      if (num < newNum) {
        newNum = num
        iVar = i
        jVar = j
      }
    }
  }
  return [newNum, iVar, jVar]
}


/*
function smallest(n) {
    console.log(n)
    let numArr = String(n).split('').map(e => Number(e))
      //  From tests:
      // - Find the smallest digit and move it to the front
      // - If it's already at the front, find the next smallest and move it to 1
      // - If the digit at [1] is a 0, move the digit at [0] instead - ooh, but what if multiple zeroes?
      
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
*/
