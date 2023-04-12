/* Given an array that contains a sorted list of integers, return it as a string where sequences of at least 3 consecutive integers are replaced with
"range formatting" ("1-3" instead of "1, 2, 3"). */

//P: A sorted array of numbers
//R: A string

/*
- Initialise "result" array and "temp" array
- Iterate over input array
- If next element is more than 1 greater than current element, push current into result
- Else, push current into temp
- As long as following element is + 1, keep pushing to temp
- Once the next element is once again more than 1 larger than the current one:
    - If length of temp (including current element) is < 3, concatenate all of temp onto current and reset temp
    - If it is greater than three, push `${first element}-${last element}` into result and wipe temp
- Return result joined with commas as a string
*/

function solution(list){
    let result = []
    let temp = []
    for (let i = 0; i < list.length; i++) {
        if (list[i + 1] === list[i] + 1) {
            temp.push(list[i])
        } else {
            if (!temp.length) {
                result.push(list[i])
            } else {
                temp.push(list[i])
                if (temp.length < 3) {
                    result = result.concat(temp)
                } else {
                    result.push(`${temp[0]}-${temp[temp.length - 1]}`)
                }
                temp = []
            }
        }
    }
    return result.join(",")
}