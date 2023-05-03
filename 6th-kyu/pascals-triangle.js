/* Given a number n, return the n top rows of Pascal's triangle flattened into a one-dimensional array.
Note the top row appears to be 1 rather than 0, unlike in the wikipedia entry linked.
Pascal's triangle starts out as
 1
1 1
with each subsequent number being the sum of the two numbers above it (0 for out of bounds, so the edges are always 1). */

//P: A number
//R: An array of numbers

/*
- Initialise [[1], [1, 1]] as the first two levels. 
- If input is 1, return first element, if input is 2, flatten it out (with reduce) and return it
- Otherwise:
    - Run while loop until length of that array equals input number
    - Push in a new array that has n - 2 more elements than the previous one
    - Its 0 and length - 1 elements are 1, the rest are previous array [idx - 1] + previous array [idx]
- Flatten the whole thing and return
*/

function pascalsTriangle(n) {
    let pascalsArray = [[1], [1, 1]]
    if (n == 1) {
        return pascalsArray[0]
    }
    while (pascalsArray.length < n) {
        let newArr = Array(pascalsArray[pascalsArray.length - 1].length + 1).fill(0)
        newArr[0] = 1
        newArr[newArr.length - 1] = 1
        for (let i = 0; i < newArr.length; i++) {
            if (!newArr[i]) {
                newArr[i] = pascalsArray[pascalsArray.length - 1][i - 1] + pascalsArray[pascalsArray.length - 1][i]
            }
        }
        pascalsArray.push(newArr)
    }
    return pascalsArray.reduce((a, b) => a.concat(b), [])
  }