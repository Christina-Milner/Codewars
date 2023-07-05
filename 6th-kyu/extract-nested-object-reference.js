/* Complete an object prototype method that, given a string, returns the appropriate values from a nested object.
For example, given "person.propA.propA1.propA2", it should return person[propA][propA1][propA2] (or undefined if any of these don't exist).*/

//P: A string
//R: Whatever the corresponding object value is


/*
- I suspect eval() would accomplish this, but that's obviously a bad idea
- Also, trying to directly parse the nested string will throw errors if any property before the last one is undefined
- Instead, we split the string by the full stops and check if the first property in the array is defined on the object
- If yes, we run a while loop and keep updating the object to the next property
*/


Object.prototype.hash = function(string) {
    let elements = string.split('.')
    let obj = this[elements.shift()]
    if (!obj) {return obj}
    while (elements.length) {
        if (!obj) {return obj}
        obj = obj[elements.shift()]
    }
    return obj
}