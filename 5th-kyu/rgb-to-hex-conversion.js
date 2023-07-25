/* Given 3 number arguments representing a RGB value, return a string with the hexadecimal notation (but without the #, for reasons). The 3-digit shorthand isn't
a thing for the purposes of this.*/

//P: 3 numbers
//R: A string

/*
- According to the desc and examples, some of the input will be invalid values (not 0-255). Must make sure to increase/decrease values outside that range to the min/max of the valid range.
- So, for the other way around, we used parseInt(), here it'll be toString()
- But looks like toString produces lowercase, while the kata wants all caps
- So!
- Check for validity of input and adjust values if necessary
- Convert using toString(16)
- If length of result is 1, pad with a leading zero
- Put together as result string and uppercase
*/


function rgb(r, g, b) {
    return [r, g, b]
        .map(e => e < 0 ? "00" : e > 255 ? "FF" : e.toString(16).length < 2 ? e.toString(16).padStart(2, "0") : e.toString(16))
        .join('')
        .toUpperCase()
  }