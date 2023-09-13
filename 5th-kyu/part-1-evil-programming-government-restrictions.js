/* Return the string 'I can write numbers like, 1, 2, 3.' without using numbers/number literals or the length property directly. */

//P: Nothing
//R: A string


/*
- Um. 1.) Why?
- Create empty array
- Push 3 random things in it that are not numbers
- Map it to indices
- Shift 0 out
- join it and stick it into the string to be returned

*/


function anarchy() {
    let arr = ["I", "like", "ducks", "quack"]
    arr = arr.map((duck, i) => i)
    arr.shift()
    return `I can write numbers like, ${arr.join(', ')}.`
}