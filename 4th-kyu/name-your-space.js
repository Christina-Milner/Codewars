/* Write a function that takes in a root, a path and an optional value. If a value is provided, the path is set to the value (including creating
    any missing objects along the way), if no value is provided, it returns the value at the path given. 
    Examples:
    let stuff = {}
    namespace(stuff, 'moreStuff.name', 'the stuff')
    // results in {moreStuff: {name: 'the stuff'}}
    namespace(stuff, 'moreStuff.name') // returns 'the stuff'
    namespace(stuff, 'otherStuff.id') // returns undefined
*/

//P: An object, a string and an optional string
//R: ? (Nothing, if setting a value, and depending on the value, if not)

/*
- If value isn't provided, we just need to return what's in the path, right? Ideally inserting ? before every full stop so it doesn't break if there's an undefined somewhere in the middle
- Wait, from tests it looks like the last argument isn't necessarily a string. Anyway, no matter
- When setting the path, have to approach it recursively (or iteratively? We'll see)
    - Split path by "."
    - Make new object, pop out last element of that array as a property and give it the value from the parameter
    - This whole object now becomes the new value to be assigned to the next thing up the chain, and so on


*/

function namespace(root, path, value){
    let pathItems = path.split('.');
    if (value === undefined) {
        let obj = root;
        for (let item of pathItems) {
            if (item in obj) {
                obj = obj[item];
            }
            else {
                return undefined;
            }
        }
        return obj;
    }
    else {
        let obj = {};
        obj[pathItems.pop()] = value;
        while (pathItems.length > 1) {
            let newObj = {};
            newObj[pathItems.pop()] = obj;
            obj = newObj;
        }
        root[pathItems[0]] = obj;
    }
}

/* Yeah no question marks obviously because I can't parse variables in dot notation, but the idea is the same - check on every step that the thing still exists, because properties of undefined throw an error. */