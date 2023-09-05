/* Given an array, return an array of all of its sublists.
Example: power([1,2,3]);=>[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]] */

//P: An array
//R: An array of arrays


/*
- I am admittedly doing this a little backwards, I started playing around with it to see if I could figure out before setting out a plan
- Playing with it briefly yesterday didn't really get me anywhere and I didn't have much time so I picked a different kata
- But I did read this https://en.wikipedia.org/wiki/Power_set and the sequence of binary digits kept floating around in my head as something that
    should help
- So if you take for example [1, 2, 3, 4], the total number of sublists is 15, which also happens to be the decimal equivalent of "1111"
- Played a bit in the console to see if iterating over the binary numbers from 0 to (1 repeated array length times) and creating subarrays
    based on which digit of the binary number was a 1 worked
- It didn't quite (duplicates of combinations with 1, and combinations like [2, 3, 4] missing), but spotted a pattern when I compared it
    to the actual binary numbers
- What about if we REVERSE the binary number?

*/


function power(array) {
    let resultArr = []
    let max = parseInt("1".repeat(array.length), 2)
    for (let i = 0; i <= max; i++) {
        let tempArr = []
        let num = i.toString(2).split('').reverse().join('')
        for (let j = 0; j < num.length; j++) {
            if (num[j] === "1") {
                tempArr.push(array[j])
            }
        }
        resultArr.push(tempArr)
    }
    if (!resultArr.length) {resultArr.push([])}
    return resultArr
}

/* Alternative solution seen after submission, which is more the kind of direction I thought in initially but couldn't get to work: */

function power(array) {
	return array.reduce((a, b) =>  a.concat(a.map(c => c.concat([b]))), [[]])
}