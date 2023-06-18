/* Given an integer n, create a n x n two-dimensional array with the numbers from 1 to n x n arranged in a clockwise spiral.
Example: 
N = 3 Output: [[1,2,3],[8,9,4],[7,6,5]]
1    2    3    
8    9    4    
7    6    5   
Return an empty array if N < 1 or invalid input.
*/

//P: A number
//R: An array of arrays of numbers

/*
- Check for n < 1 or invalid input
- Create array of values to use - array of length n x n, values index + 1
- I want to say I've done something like this before and using a "right", "down", "left", "up" etc. variable turned out to be clumsy, but that's what's coming to mind
- Initialise y and x pointers and direction (starting at 0, 0, right)
- Initialise n x n result array prefilled with zero
- Iterate over values to fill array and check "direction" variable to see where to go next
*/


function createSpiral(num) {
    if (isNaN(num) || num < 1 || Math.floor(num) !== num) {
        return []
    }
    if (num === 1) {return [[1]]}
    let result = Array.from({length: num}, () => Array(num).fill(0))
    let values = Array.from({length: num ** 2}, (_, i) => i + 1)
    let xMin = 0
    let xMax = num - 1
    let yMin = 0
    let yMax = num - 1
    let loops = 0
    while (values.length) {
        for (let i = xMin; i <= xMax; i++) {
            result[yMin][i] = values.shift()
        }
        yMin++
        for (let i = yMin; i <= yMax; i++) {
            result[i][xMax] = values.shift()
        }
        xMax--
        for (let i = xMax; i >= xMin; i--) {
            result[yMax][i] = values.shift()
        }
        yMax--
        for (let i = yMax; i >= yMin; i--) {
            result[i][xMin] = values.shift()
        }
        xMin++
    }
    return result
}

/* Originally did a nest of while loops based on a direction pointer, but as I coded it, began to remember the direction pointer is unnecessary
as it has to loop through all 4 directions in order anyway. Also, it was going into infinite loops. So I growled "c'mon, this is really not that hard",
scrapped what I had, and got there eventually.
Tests are atrocious - had to add the Math.floor condition to check for non-integers, but would never have been able to guess if someone else
hadn't commented on it in Discussion. The test was titled "Should return -1", seemed to actually be expecting [], and the input was 2 based on
console.log because this is one of those where console.logs for failing tests don't show (the problematic input was actually 4.5, but would've
never been able to guess). */