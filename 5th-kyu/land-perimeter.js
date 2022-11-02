/* Given an array of strings made up of X and O, where X represents land and O represents water,
return the perimeter of the land tiles on the map represented by the array.  */

//P: An array of strings consisting of X and O
//R: A string reading "Total land perimeter: " + the number

function landPerimeter(arr) {
    let perimeterCount = 0
    arr.forEach((row, idx, arr) => {
      row.split('').forEach((e, i, subArr) => {
        if (e == 'X') {
          if (subArr[i - 1] !== 'X') {perimeterCount++}   // left
          if (subArr[i + 1] !== 'X') {perimeterCount++}   // right
          if (arr[idx + 1] && arr[idx + 1][i] !== 'X') {  // bottom
            perimeterCount++
          }
          if (idx == 0 || idx == arr.length - 1) {      // first or last row
            perimeterCount++                            // top or bottom
            if (arr.length == 1) {perimeterCount++}
          }
  
          if (arr[idx - 1] && arr[idx - 1][i] !== 'X') {  // top if not continued from prev row
            perimeterCount++
          }
        }
      })
    })
    return `Total land perimeter: ${perimeterCount}`
  }
