/* Given a string, return a string t with this property: 
length t(O) <= length t(1) >= length t(2) <= length t(3) >= length t(4) .... (P)
To achieve this, you may only swap substrings that are adjacent to each other (or have become that way after a swap). 
The uneven elements should be uppercase.*/

//P: A string
//R: A string

/*
- Split the string into an array
- Array.every checking that all odd-indexed elements are longer or equal than their neighbours can check that the condition is fulfilled
- If it is, uppercase the odd-indexed elements and return it
- If not, iterate over it until a substring violating the rule is found and swap it with its neighbour
- Recursively repeat this until condition is met
*/

function arrange(strng) {
    console.log(strng)
    let strArr = strng.split(' ')
    const isArranged = arr => {
        return arr.every((e, i, array) => {
            if (i % 2 !== 0) {
                if (array[i - 1] && array[i + 1]) {
                    return e.length >= array[i - 1].length && e.length >= array[i + 1].length
                } else if (array[i - 1]) {
                    return e.length >= array[i - 1].length
                } else if (array[i + 1]) {
                    return e.length >= array[i + 1].length
                }
            } else {
                return true
            }
        })
    }
    if (isArranged(strArr)) {
        return strArr.map((e, i) => i % 2 !== 0 ? e.toUpperCase() : e).join(' ')
    }
    for (let i = 0; i < strArr.length; i++) {
        if (i % 2 !== 0 && strArr[i + 1] && strArr[i + 1].length > strArr[i].length) {
            let temp = strArr[i]
            strArr[i] = strArr[i + 1]
            strArr[i + 1] = temp
            break
        } 
    }
    if (strArr.join(' ') == strng) {
        for (let i = 0; i < strArr.length; i++) {
            if (i % 2 !== 0 && strArr[i - 1] && strArr[i - 1].length > strArr[i].length) {
                let temp = strArr[i]
                strArr[i] = strArr[i - 1]
                strArr[i - 1] = temp
                break
            }
        }
      }
    return arrange(strArr.join(' '))
}

/* Above was best attempt - it got the strings to where they met the condition but didn't move things in the order OP wanted. Meh. Solution for reference: */

function swap(arr, left, right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
  }
  
  function arrange(str) {
    const arr = str.split(' ');
    for (let i = 0; i < arr.length - 1; i++) {
      if ((i % 2 === 0 && arr[i].length > arr[i + 1].length) || // even -> i <= i + 1
          (i % 2 !== 0 && arr[i].length < arr[i + 1].length)) { // odd -> i >= i + 1
        swap(arr, i, i + 1)
      }
    }
    return arr.map((x, i) => i % 2 === 0 ? x.toLowerCase() : x.toUpperCase()).join(' ');
  }