/* Matrix M of positive and negative integers should be sorted in zigzaggy columns
so lowest is in upper left corner, then it goes down the first column, up the second and so on.
Highest value bottom right if column number n is odd, top right if it's even */

// Good Lord this took wayyy too long, spent a good 15 minutes switching "rows" and "columns" around
// as my math visualisation skills blow. Yes, solution is suboptimal as I couldn't figure out how to keep
// empty subarrays from showing up other than filtering for them, but I'm not touching it again

function upDownColSort(matrix) {
    const rows = matrix.length
    const columns = matrix[0].length
    let arrOfColumns = []
    let arrOfRows = Array(columns).fill([])
    let sorted = matrix.reduce((a, b) => a.concat(b), []).sort((a, b) => b - a)
    for (let i = 0; i < columns; i++) {
      let arr = []
      while (arr.length < rows) {
        arr.push(sorted.pop())
      }
      if (i % 2 !== 0) {arr = arr.reverse()}
      arrOfColumns.push(arr)
    }
    for (let i = 0; i < rows; i++) {
      arrOfRows[i] = arrOfColumns.reduce((a, b) => a.concat(b[i]), [])
    }
    arrOfRows = arrOfRows.filter(e => e.length > 0)
    return arrOfRows
}