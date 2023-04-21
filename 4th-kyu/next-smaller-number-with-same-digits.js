/* Given a number, return the next smaller number you can create with the same digits (no leading zeroes allowed), or -1 if this is not possible. */

//P: A number
//R: A number

/* 
- Should just be the inverse of "next bigger number with the same digits", right?
- So instead of checking whether the digits are already in descending order first, check whether they are already in ascending order
    - Need to account for 0 here, though - 1027 should return -1 as the only option would be 0721, but 1207 would work as 1027
    - So just check for "ascending and not zero" here, we'll do zeroes later
- After that, I checked from the back of the number for the first point where I could swap two digits and create a bigger number,
    then made sure the number swapped to the left was the smallest possible, and then sorted the rest in ascending order.
    - This should be directly reversible, just need a check in there to make sure zero isn't getting swapped to the front
*/

function nextSmaller(n){
    let numArr = String(n).split('').map(e => Number(e))
    let marker = 0
    let swapped = false
    for (let i = numArr.length - 1; i >= 0; i--) {
        if (numArr[i] < numArr[i - 1] && !(i == 1 && !numArr[i])) {
            const max = numArr.slice(i).filter(e => e < numArr[i - 1]).reduce((a, b) => Math.max(a, b))
            marker = i
            let temp = numArr[i - 1]
            numArr[i - 1] = max
            numArr[numArr.lastIndexOf(max)] = temp
            swapped = true
            break
        }
    }
    if (!swapped && numArr[1] === 0) {
        if (!numArr.filter(e => e < numArr[0] && e !== 0).length) {
            return -1
        }
        const max = numArr.filter(e => e < numArr[0]).reduce((a, b) => b === 0 ? a : Math.max(a, b))
        marker = numArr.indexOf(max)
        let first = [max]
        let rest = numArr.slice(0, marker).concat(numArr.slice(marker + 1))
        rest.sort((a, b) => b - a)
        if (Number(first.concat(rest).join('')) < n) {
            return Number(first.concat(rest).join(''))
        }
    }
    if (!swapped) {return -1}
    let first = numArr.slice(0, marker)
    let rest = numArr.slice(marker)
    rest.sort((a, b) => b - a)
    return Number(first.concat(rest).join(''))
}

/* With the adjustment made for the zero case, this ended up being kind of monstrous, but technically reversing the previous approach worked. Noting much tidier approach for reference: */

const nextSmaller = (n, a = [...String(n)].map(Number)) => {
    for (let j = a.length, i = j - 1; i >= 0; i--, j--) {
      // if digit is greater than prev digit
      if (a[i] > a[j]) {
        // swap digit with next smaller digit to the right
        a[i] = a.splice(a.indexOf(Math.max(...a.slice(j).filter(n => n < a[i])), j), 1, a[i])[0];
        // concatenate left side up to same index (inclusive) + right side sorted descending
        const r = Number([...a.slice(0, j), ...a.slice(j).sort().reverse()].join(''));
        // cover leading zero case; if result is not the same # of digits as the input, return -1
        return Math.ceil(Math.log(r + 1) / Math.LN10) === a.length ? r : -1;
      }
    }
    return -1;
  };