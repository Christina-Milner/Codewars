/* Given numbers n and d, find numbers lower than or equal to n that
1) Have 2 or more digits
2) Have digits that consistently increase from left to right
3) Have no duplicated digits
4) Difference between digits is no greater than d
*/

function selNumber(n, d) {
    const isValid = num => {
      const numArr = String(num).split('').map(e => Number(e))
      let valid = true                  // The old problem of "I need forEach to return something"
      if (numArr.length < 2) {valid = false}
      numArr.forEach((e, i, arr) => {
        if (e >= arr[i + 1]) {valid = false}
        if (arr[i + 1] - e > d) {valid = false}
      })
      return valid
    }
    return Array.from({length: n + 1}, (_, i) => i).filter(e => isValid(e)).length
}