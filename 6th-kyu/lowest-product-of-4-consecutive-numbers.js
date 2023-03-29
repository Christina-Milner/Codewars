/* Given a number as a string, return the lowest product of 4 consecutive digits.
Return "Number is too small" if the number doesn't have at least 4 digits. */

//P: A string (of digits)
//R: A number or a string

/* 
- Check length and return error string if appropriate
- Split string to array and convert elements to number
- Map elements to the product of themselves and the next 3 elements (null for the ones where this doesn't exist)
- Return minimum of resulting array
*/

function lowestProduct(input) {
    if (input.length < 4) {
        return "Number is too small"
    }

    let numArr = input.split('').map(e => Number(e))
    numArr = numArr.reduce((a, b, i, arr) => {
        if (i + 3 < arr.length) {
            return a.concat(b * arr[i + 1] * arr [i + 2] * arr [i + 3])
        } else {
            return a
        }
    }, [])
    return numArr.reduce((a, b) => Math.min(a, b))
}

/* Two small fixes compared to original plan:
- Null apparently gets treated as 0, so could not use that for elements out of bounds. So had to use reduce instead of map to be able to just get rid of them.
- The if statement checking for length was originally a clumsy statement checking if arr[i + 1] to arr[i + 3] exist (God knows why I didn't just use the latter),
    but that got thrown off by 0 being falsy (again).
*/