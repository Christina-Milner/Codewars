/* Given a string and an array of comment markers, strip any "comments" from the string. 
Example: 
const result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"]) should return "apples, pears\ngrapes\nbananas"
*/

//P: A string and an array of strings
//R: A string

/*
- Seems like you'd just regex replace out anything starting with one of those markers and ending with either a line break or the end of the string? What am I missing?
*/


function solution(input, markers) {
    let strArr = input.split('\n')
    for (let i = 0; i < strArr.length; i++) {
        for (let marker of markers) {
            if (strArr[i].includes(marker)) {
                strArr[i] = strArr[i].slice(0, strArr[i].indexOf(marker)).trim()
            }
        }
    }
    return strArr.join('\n').trim()
};

/* Couldn't quite wrangle the RegEx, but it was also entirely unnecessary here. For reference, this would've been how to do that: */

function solution(input, markers){
    return input.replace(new RegExp("\\s?[" + markers.join("") + "].*(\\n)?", "gi"), "$1");
  }