/* Given a 2-dimensional array and a string indicating which direction to go in, return a rotated version of the array.  */

//P: An array and a string
//R: An array

/* 
- Clockwise means mapping columns to rows and reversing them
    - Make new array
    - Iterate from 0 to original array row length
    - Create new array
    - Iterate over original array and push in each row's element at index i
    - Reverse new array and push into first new array

- Counterclockwise means mapping rows to columns and reversing them whaaat
    - Make new array of same length as the old one
    - Iterate over old one and put each element into new one at col index = current row index
    - Don't worry about row index - if we pop off the elements they can just go in order

*/

/*  This was my original solution, but it did not work as it was modifying the input which was being used across multiple tests.
Adding another line to the top of the function that made a copy of matrix before doing anything else did not help: */

function rotate(matrix, direction) {
    const rotateClockwise = arr => {
        let newArr = [];
        for (let i = 0; i < arr[0].length; i++) {
            let temp = [];
            for (let row of arr) {
                temp.push(row[i]);
            }
            newArr.push(temp.reverse());
        }
        return newArr;
    }

    const rotateCounterclockwise = arr => {
        let copy = arr.slice()
        let newArr = Array.from({length: arr.length}, () => []);
        for (let i = 0; i < copy.length; i++) {
            while (copy[i].length) {
                let next = newArr.find(row => !row[i]);
                next[i] = copy[i].pop();
            }
        }
        return newArr;
    }
    return direction == "clockwise" ? rotateClockwise(matrix) : rotateCounterclockwise(matrix);
}

/* I couldn't figure out why that was modifying the input despite using a copy, but I know the only thing that could
be responsible for it is pop() so I guess we just don't use that ¯\_(ツ)_/¯: */

function rotate(matrix, direction) {
    let copy = matrix.map(e => e);
    if (direction == "clockwise") {
        let newArr = [];
        for (let i = 0; i < copy[0].length; i++) {
            let temp = [];
            for (let row of copy) {
                temp.push(row[i]);
            }
            newArr.push(temp.reverse());
        }
        return newArr;
    }
  
 
    if (direction == "counter-clockwise") {
        return rotate(rotate(rotate(matrix, "clockwise"), "clockwise"), "clockwise");
    }
}

/* Actually, figured out as I was telling someone about it why that happened - the outer array was copied, but the individual rows were still
referring to the same objects. let copy = arr.slice().map(e => e.slice()) is what I needed. Howeverrr with that fix in place, the counterclockwise
first version still struggles with non-square matrices so this version it is. */
/* Added for reference - this is how I would have LIKED to solve this but my brain was tying itself into knots trying to figure out how you'd
do it with map: */

function rotate(matrix, direction) {
    return direction == 'clockwise' ? 
      matrix[0].map( (_, k) => matrix.map(a => a[k]).reverse() ) : 
      matrix[0].map( (_, k) => matrix.map(a => a[k]) ).reverse()
}

