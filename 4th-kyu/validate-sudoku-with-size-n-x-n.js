/* Complete the isValid() method of a Sudoku class that takes no arguments and returns whether this (a multidimensional array of size n x n) is a valid Sudoku. */

//P: Nothing
//R: A boolean

/*
- This doesn't seem that hard. A Sudoku SOLVER would be a different kettle of fish.
- It's valid if each row, column and (square root of n) square contains the numbers from 1 to 9
- Row: Elements of the array
- Column: Array mapped to the element at that index of each element
- Square: 3 groups, array from 0 to square root of n, from 1 x square root of n to 2 x square root of n, ... from n - 1 x square root of n to n
    - Each group gets split into those same groups vertically, if that makes sense
    - Ok this one is the tricky part
    - So with the 9 x 9 example, I want:
        - Array sliced from 0 to 3, each element sliced from 0 to 3 and concatenated together
        - Array sliced from 0 to 3, each element sliced from 3 to 6 and concatenated together
        - Array sliced from 0 to 3, each element sliced from 6 to 9 and concatenated together
        - Array sliced from 3 to 6, each element sliced from 0 to 3 and concatenated together
        - Array sliced from 3 to 6, each element sliced from 3 to 6 and concatenated together
        - Array sliced from 3 to 6, each element sliced from 6 to 9 and concatenated together
        - Array sliced from 6 to 9, each element sliced from 0 to 3 and concatenated together
        - Array sliced from 6 to 9, each element sliced from 3 to 6 and concatenated together
        - Array sliced from 6 to 9, each element sliced from 6 to 9 and concatenated together

        - To summarise: Create groups of slices by multiples of square root once
        - Run a for loop over each one of those groups that splits it into the 3 sub-groups
    - Wait hang on, do I need to write the constructor for this thing as well?
    - No, doesn't look like it, not sure what is going on with this class definition but I'll leave it alone rather than change it to class syntax because idk how it works
    - Naw, I'm going to rewrite it because idek how to access the array data
*/


class Sudoku {
    constructor(data) {
        this.data = data
    }

    isValid() {
        const n = this.data.length
        // Sneaky tests with Sudokus that violate the size constraints
        if (!this.data.every(row => row.length === n)) {
            return false
        }
        // On with the actual validation
        const validate = arr => Array.from({length: n}, (_, i) => i + 1).every(e => arr.includes(e))
        for (let i = 0; i < n; i++) {
            // Rows
            if (!validate(this.data[i])) {
                return false
            }
            // Columns
            if (!validate(this.data.map(row => row[i]))) {
                return false
            }
        }
        // Boxes
        const root = Math.sqrt(n)
        let rowGroups = []
        let boxes = []
        for (let i = 1; i <= root; i++) {
            rowGroups.push(this.data.slice((i - 1) * root, i * root))
        }
        for (let group of rowGroups) {
            for (let i = 1; i <= root; i++) {
                let box = group.map(row => row.slice((i - 1) * root, i * root)).reduce((acc, cur) => acc.concat(cur), [])
                boxes.push(box)
            }
        }
        for (let box of boxes) {
            if (!validate(box)) {
                return false
            }
        }
        return true;
    }
}