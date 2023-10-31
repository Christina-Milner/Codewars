/* Given a string comprised of 1s, 0s and ?s that are wildcards, return an array of all possible permutations of having 0 or 1 in place of the wildcard. */

//P: A string
//R: An array of strings

/*
- I feel like it should work something like this:
    - Start with an array with the string in it
    - This will run as long as any element in the array has a ? in it
    - Make a new array and push in the string with the first ? replaced by a 1, as well as a 0
    - Repeat
*/



function possibilities(str) {
    let result = [str];
    while (result.some(string => string.includes("?"))) {
        let newResult = []
        for (let el of result) {
            newResult.push(el.replace(/\?/, "1"));
            newResult.push(el.replace(/\?/, "0"));
        }
        result = newResult;
    }
    return result;
};