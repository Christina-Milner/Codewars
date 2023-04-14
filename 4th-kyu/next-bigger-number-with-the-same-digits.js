/* Given a positive integer, return the next bigger number that can be formed by rearranging its digits, for example 513 => 531.
If this is not possible, return -1. */

//P: A number
//R: A number

/*
- Cases where it's not possible:
    - Number has only one digit
    - Number is all the same digit
    - Digits are all in descending order

- From the sample cases, it looks like we want to find the lowest digit and then move it to the right by one digit? Unless it's already in the 1s position, at which point find the next lowest one.
    891 would be 981 because the 1 can't go anywhere else, so we have to move the 8. Right?

- So for "not possible cases", check a) input < 10, b) convert to string -> split -> map back to number and check if every element is smaller than or equal to the previous one.
- Make a sorted version of the digits array
- Starting with the lowest digit, check that it is not in the 1s position and whether its right-hand neighbor is greater than it
- If so, swap the two and return
- Pray this is not designed to time out on the nested for loop this is starting to sound like

- Hmmno, had a look at the random tests to ensure the -1 cases were working, and the "lowest digit moves one to the right" assumption doesn't hold up. 
    5,209,004,493,625 becomes 5,209,004,493,652
    723,425,832,610 becomes 723,425,836,012
- Basically, shuffle as small a section of the number as possible into ascending order?
    No, 267,705,262,391 becomes 267,705,262,913

- Ok ... New hypothesis: Find the first pair of adjacent numbers that can be swapped to create a bigger number. Then put everything behind them in ascending order.
*/

function nextBigger(n){
    let numArr = String(n).split('').map(e => Number(e))
    if (numArr.length < 2 || numArr.every((e, i, arr) => !arr[i + 1] || arr[i + 1] <= e)) {
      return - 1
    }
    let marker = 0
    for (let i = numArr.length - 1; i >= 0; i--) {
        if (numArr[i] > numArr[i - 1]) {
            const min = numArr.slice(i).filter(e => e > numArr[i - 1]).reduce((a, b) => Math.min(a, b))
            marker = i
            let temp = numArr[i - 1]
            numArr[i - 1] = min
            numArr[numArr.lastIndexOf(min)] = temp
            break
        }
    }
    let first = numArr.slice(0, marker)
    let rest = numArr.slice(marker)
    rest.sort((a, b) => a - b)
    return Number(first.concat(rest).join(''))
}

/* 
New hypothesis largely worked but needed a bit of tinkering for cases where there was a lower digit to be pulled from somewhere further back
to make the number bigger. I feel like placing the marker at which the reshuffle begins at the first point where a left digit is smaller than the
digit to its right shouldn't work in that case, but it does, so gift horse etc.
Alllso the kata is tagged "Strings" so this probably wasn't how this was intended to be done, but ¯\_(ツ)_/¯ */
