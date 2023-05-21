/* Given a n x n matrix of numbers (i.e. a 2D array), return the determinant of the matrix.
I have no idea what that is, but in a 2 x 2 matrix, it is upper left * lower right - upper right * lower left.
In a 3 x 3 matrix, it is a * det(a_minor) - b * det (b_minor) + c * det(c_minor), where "a_minor" means the 2D determinant of the 2 x 2
    left over after removing the row and column a is in.
In a 4 x 4 matrix, it is a * det(a_minor) - b * det(b_minor) + c * det(c_minor) - d * det(d_minor), and one can see why this is tagged recursion.
*/

//P: An array of arrays of numbers
//R: A number

/*
- Ok so the base case is a 2 x 2 matrix, where we can return arr[0][0] * arr[1][1] - arr[0][1] * arr[1][0]
- If array is longer than 2, we have a chain of stuff with the even elements being added and the odd ones being subtracted
- The "stuff" is each element of the first array being multiplied by a recursive call
    - How to get array that will be passed into the recursive call? I have element[y][x] and want to get rid of that row and column
    - Filter array by i !== y and map elements to filter by i !== x
- What do we do with empty or length 1 arrays, btw? Looks like length 1 should just return that number, going to assume empty should return 0
*/


function determinant(m) {
    if (!m[0].length) {return 0}
    if (m.length === 1) {return m[0][0]}
    if (m.length === 2) {
        return m[0][0] * m[1][1] - m[0][1] * m[1][0]
    }
    const filterHelper = (arr, idx) => {
        return arr.slice(1).map(row => row.filter((num, i) => i !== idx))
    }
    return m[0].reduce((acc, cur, idx, arr) => {
        if (idx % 2 === 0) {
            return acc + cur * determinant(filterHelper(m, idx))
        }
        else {
            return acc - cur * determinant(filterHelper(m, idx))
        }
    }, 0)
}