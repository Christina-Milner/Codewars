/*Given an array arr of integers and a list of ranges (of start and end indices, each inclusive and start < end), calculate the sum value
of each range and return the maximum sum */

//P: An array of integers and a list of start and end indices, all inputs valid
//R: A number

function maxSum(arr,range){
    return range
      .map(e => {
      return arr.slice(e[0], e[1] + 1)
        .reduce((a, b) => a + b, 0)
    })
    .reduce((a, b) => Math.max(a, b))  
  }