/* Given a "pyramid" of numbers (an array of arrays of increasing size), find the largest possible sum you can obtain by "sliding down" from one number to an
adjacent one below. 
Example:
   /3/
  \7\ 4 
 2 \4\ 6 
8 5 \9\ 3
=> 23
*/

//P: An array of arrays of numbers
//R: A number

/*
- in the example, it would be:
    - 10 or 7
    - 12 or 14 or 11 or 16
    - 20 or 17 or 19 or 23 or 16 or 20 or 22 or 16
- For each number in one row, the possible options are its index and its index + 1 in the next row
- Fish element at the top out and use as starting value
- Recursive function: takes in array of arrays and an accumulator array that starts out empty
- Creates new accumulator array of all possible valid sums and runs until original array is empty
- Find maximum of resulting array
- This will probably not be able to handle the scenario of very large pyramids, but burn that bridge when we get to it
*/

function longestSlideDown (pyramid){
    console.log("TEST STARTS HERE")
    const startingValue = pyramid[0][0]
    const copy = pyramid.slice(1)

    const slidingSums = (arr, acc = []) => {
        console.log("acc", acc)
        console.log("arr0", arr[0])
        if (!arr.length) {return acc}
        if (!acc.length) {
            for (let num of arr[0]) {
                acc.push(num + startingValue)
            }
            return slidingSums(arr.slice(1), acc)
        }
        let newAcc = []
        if (acc.length == 2) {
            newAcc = [acc[0] + arr[0][0], [acc[0] + arr[0][1], acc[1] + arr[0][1]], acc[1] + arr[0][2]]
            return slidingSums(arr.slice(1), newAcc)
        }
        for (let i = 0; i < arr[0].length; i++) {
            if (i == 0) {
                newAcc.push(arr[0][i] + acc[0])
            }
            else if (i == arr[0].length - 1) {
                newAcc.push(arr[0][i] + acc[acc.length - 1])
            }
            else {
                if (typeof(acc[i - 1]) !== "object") {
                    newAcc.push([acc[i - 1] + arr[0][i]].concat(acc[i].map(e => e + arr[0][i])))
                }
                else if (typeof(acc[i]) !== "object") {
                    newAcc.push(acc[i - 1].map(e => e + arr[0][i]).concat(acc[i] + arr[0][i]))
                }
                else {
                    newAcc.push(acc[i - 1].map(e => e + arr[0][i]).concat(acc[i].map(e => e + arr[0][i])))
                }
            }
        }
        return slidingSums(arr.slice(1), newAcc)
    }
    let sums = slidingSums(copy).reduce((a, b) => a.concat(b), [])
    return sums.reduce((a, b) => Math.max(a, b))
}

/* This was more complicated than I thought as the size of acc grows compared to the current subarray.
Solved that by creating arrays for the branches to keep the number of elements the same as it was in the array row.
Passes fixeds, times out/runs out of memory on the large tests. WIP. */

function longestSlideDown(pyramid) {
    let copy = pyramid.slice()
    let current = copy.pop()
    while (copy.length) {
        let next = copy.pop()
        current = next.map((e, i) => Math.max(e + current[i], e + current[i] + 1))
    }
    return current.reduce((a, b) => Math.max(a, b))
}

/* ^ New approach after someone pointed out to me it might be wise to start at the bottom, but that doesn't work yet either. */