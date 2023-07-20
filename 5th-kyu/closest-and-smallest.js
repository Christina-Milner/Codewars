/* Given a string of numbers separated by spaces and the concept of the "weight" of a number being the sum of its digits, find the pair of numbers with the smallest difference
in weights, the smallest weights, and the lowest indices in the string.
Return an array of arrays in the format [[weight of num 1, index of num 1, num 1], [weight of num 2, index of num 2, num 2]], sorted by ascending order of weights or otherwise 
indexes.*/

//P: A string
//R: An array of arrays of numbers

/*
- Split the string by spaces to start with
- I'm real tempted here to map the resulting number strings to objects that store all this info we need to keep track of
- Like an object with the properties value (the actual number), weight, index (to preserve the original index as we'll probably be sorting stuff)
- Sort these by weights, then add a diff property indicating difference to weight of the right-hand neighbor (null for last element)
- If there is only one element with the minimum diff, job done, return the appropriate properties of it and its right-hand neighbor
- If there are multiple, stick them into an array and then wrangle either sort or reduce into producing the one that's right and its partner
*/


function  closest(strng) {
    if (!strng) {return []}
    const sumDigits = numStr => numStr.split('').map(Number).reduce((acc, cur) => acc + cur, 0)
    const stringArr = strng.split(' ')
    class DataObj {
        constructor(numStr, idx) {
            this.numValue = Number(numStr)
            this.weight = sumDigits(numStr)
            this.originalIdx = idx
            this.diff = null
        }
    }
    let data = stringArr.map((numStr, idx) => new DataObj(numStr, idx))
    data.sort((a, b) => a.weight - b.weight)

    data.forEach((el, idx, arr) => el.diff = arr[idx + 1] && arr[idx - 1] ? Math.abs(Math.min(el. weight - arr[idx + 1]["weight"], el.weight - arr[idx - 1]["weight"])) :
                 arr[idx + 1] ? Math.abs(el.weight - arr[idx + 1]["weight"]) : Math.abs(el.weight - arr[idx - 1]["weight"]))
    const minDiff = data.map(el => el.diff).reduce((acc, cur) => Math.min(acc, cur))
    let candidates = data.filter(el => el.diff === minDiff)
    if (candidates.length > 1) {
        candidates.sort((a, b) => {
            if (a.weight === b.weight) {
                 try {
                     return (a.originalIdx + data[data.indexOf(a) + 1].originalIdx) - (b.originalIdx + data[data.indexOf(b) + 1].originalIdx)
                   } catch(err) {
                     return a.originalIdx - b.originalIdx
                   }
            } else {
                return a.weight - b.weight
            }
        })
    }
    candidates.forEach(e => console.log(e, data[data.indexOf(e) + 1]))

    let left = candidates[0]
    let right = data[data.indexOf(candidates[0]) + 1]
    let result = [[left.weight, left.originalIdx, left.numValue], [right.weight, right.originalIdx, right.numValue]]
    return result.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0])
}

/* LMAO lesson learned. The above is as far as I got with the approach I'd planned out, and no, I don't understand the various complicated addendums I made trying to catch edge cases and bypass the fact the
partner for the correctly identified first element wasn't necessarily its neighbor in the original array anymore, either. Got sick of staring at that monstrosity and decided to take it back to basics. No need
for the objects as long as I keep track of the original index somehow. Also, it's way easier to sort by weight then index and then check the diffs than to try to filter by that criterion first. And here we go: */

function  closest(strng) {
    if (!strng) {return []}
    const sumDigits = numStr => numStr.split('').map(Number).reduce((acc, cur) => acc + cur, 0)
    const stringArr = strng.split(' ')
    let data = stringArr.map((e, idx) => [e, idx]).sort((a, b) => {
        if (sumDigits(a[0]) === sumDigits(b[0])) {
            return a[1] - b[1]
        } else {
            return sumDigits(a[0]) - sumDigits(b[0])
        }
    })
    let first = data[0]
    let second = data[1]
    let diff = sumDigits(data[1][0]) - sumDigits(data[0][0])
    for (let i = 2; i < data.length; i++) {
        if (sumDigits(data[i][0]) - sumDigits(data[i - 1][0]) < diff) {
            diff = sumDigits(data[i][0]) - sumDigits(data[i - 1][0])
            first = data[i - 1]
            second = data[i]
        }
    }
    return [[sumDigits(first[0]), first[1], Number(first[0])], [sumDigits(second[0]), second[1], Number(second[0])]]
}