/* Given a sequence of numbers as an array intended as being a progression where the difference between consecutive terms remains constant, find the one number that is missing from the progression.
There will always be at least 3 numbers and the missing term is not the first or last one. */

//P: An array of numbers
//R: A number

/*
- Iterate over array sort of simulating a reduce (not using reduce itself because we want to abort as soon as we find the right element)
- Initialise array with first element of list
- Iterate over list starting from index 1
- If array only has one element in it, replace it with the difference between the current list element and it and push current list element in
    - In the 1, 3, 5, 9, 11 example, this would now be [2, 3]
- For each subsequent element, check if it equals the sum of the two array elements
    - Replace the second element with it if yes
    - If no, return sum of array elements
- But what if the second element is what's missing? E.g. if it was 1, 5, 7, 9, 11?
    - In above list of ifs, add a check if difference between elements is bigger or smaller than saved difference
    - If bigger, return sum of array elements
    - If smaller, return second element minus half the difference
*/



function findMissing (list) {  
    let diffCurrent = [list[0]]
    for (let i = 1; i < list.length; i++) {
        if (diffCurrent.length == 1) {
            diffCurrent[0] = list[i] - diffCurrent[0]
            diffCurrent.push(list[i])
        }
        else if (list[i] == diffCurrent[0] + diffCurrent[1]) {
            diffCurrent[1] = list[i]
        }
        else {
            if (Math.abs(list[i] - diffCurrent[1]) > Math.abs(diffCurrent[0])) {
                return diffCurrent[1] + diffCurrent[0]
            }
            else {
                return diffCurrent[1] - diffCurrent[0] / 2
            }
        }
    }
  }

/* Needed a little tinkering to account for descending sequences/negative numbers, but otherwise the logic was solid. Important to consider scenarios
that may not be shown in the examples and sample tests. */
/* Alternative, slightly more elegant solutions:
  - Find expected step value by dividing the difference between the first and last elements by the length of the list, then filter for the value that does not equal the first element + the index * step and subtract the step from it
  - Expected sum of the list is the sum of its first and last element times its length + 1, all divided by 2 (why?) - then simply subtract actual sum of the list from this
*/