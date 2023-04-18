/* Given a string where "i" increments a number value that starts at 0, "d" decrements it, "s" squares it and "o" outputs it into the return array,
return said array. Invalid characters should be ignored. 
Example:
parse("iiisdoso") => [ 8, 64 ]
*/

//P: A string
//R: An array of numbers

/* 
- Initialise the number value and the result array
- Split string and use for loop or forEach to map each character to the correct action
- Invalid chars should be getting ignored by default as they won't pass any of the if checks
- Return array
*/


function parse(data) {
    let value = 0
    let result = []
    data.split('').forEach(e => {
        if (e == "i") {
            value++
        }
        if (e == "d") {
            value--
        }
        if (e == "s") {
            value = value ** 2
        }
        if (e == "o") {
            result.push(value)
        }
    })
    return result
}