/* Given a (case-insensitive) hex colour code such as #FF9933, return an object with the actual RGB values, in this case {r: 255, g: 153, b: 51}. Shorthand like #fff does
not need to be supported. */

//P: A string
//R: An object

/* 
- Soo... parseInt() will do the conversion. And it's even case-insensitive.
- Get rid of #, take first two digits, convert and save as r, then repeat for g and b???
*/


function hexStringToRGB(hexString) {
    let result = {}
    result["r"] = parseInt(hexString.slice(1, 3), 16)
    result["g"] = parseInt(hexString.slice(3, 5), 16)
    result["b"] = parseInt(hexString.slice(5), 16)
    return result
}

/* Oooo...kay? Did this get made before parseInt() was a thing or something? */