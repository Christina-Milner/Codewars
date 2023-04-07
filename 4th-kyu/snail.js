/* Given an n x n array, return the elements arranged from outermost to middle traveling clockwise, like this: 
array = [[1,2,3],
         [4,5,6],
         [7,8,9]]
snail(array) #=> [1,2,3,6,9,8,7,4,5]
*/

//P: An array of arrays (of presumably numbers?)
//R: An array

/*
- Need a done condition: When length of the new array equals n x n
- Initialise a lower boundary (start 0), an upper boundary (start n - 1), a left boundary (start 0) and a right boundary (start n - 1)
- Initialise a variable of the direction where we are going (start "right")
- Iterate along array[0] and push all elements into new array, increment lower boundary and change direction to "down"
- Push the last element (index n - 1) of all subarrays from lower boundary to upper boundary into new array, decrement right boundary and set direction to "left"
- Remove right boundary index element from upper boundary subarray, then reverse and push items in, decrement upper boundary and change direction to "up"
- Push left boundary index element of all subarrays between upper and lower boundaries in, starting from the former, increment left boundary and change direction to "right"
- Hope the while loop doesn't crap itself and return array when it's done
*/


snail = function(array) {
    const n = array.length
    if (!array[n - 1].length) {
        return []
    }
    let leftBoundary = 0
    let lowerBoundary = 0
    let upperBoundary = n - 1
    let rightBoundary = n - 1
    let direction = "right"

    let result = []
    while (result.length < n * n) {
        if (direction == "right") {
            for (let i = leftBoundary; i <= rightBoundary; i++) {
                result.push(array[lowerBoundary][i])
            }
            lowerBoundary++
            direction = "down"
        }
        if (direction == "down") {
            for (let i = lowerBoundary; i <= upperBoundary; i++) {
                result.push(array[i][rightBoundary])
            }
            rightBoundary--
            direction = "left"
        }
        if (direction == "left") {
            for (let i = rightBoundary; i >= leftBoundary; i--) {
                result.push(array[upperBoundary][i])
            }
            upperBoundary--
            direction = "up"
        }
        if (direction == "up") {
            for (let i = upperBoundary; i >= lowerBoundary; i--) {
                result.push(array[i][leftBoundary])
            }
            leftBoundary++
            direction = "right"
        }
    }
    return result
  }

/* Realised after the fact that I'd used single equal signs on the last two if blocks rather than double - the fact that the code passed anyway led to the epiphany that the direction
variable and all the if blocks are actually completely redundant, the while loop just needs to do those 4 things in order. Could shorten it by removing them, but I'll leave it as I
submitted it to CW.
Could, of course, also work with shift(), pop() and reverse() instead of using the boundary variables and iterating every time, but on the plus side, it worked on the first attempt
as I coded it the way I would describe what to do. */