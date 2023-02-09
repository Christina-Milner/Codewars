/* Create a method toUnderScore that will convert camel case strings such as ThisIsAUnitTest to a string separated by underscores, such as This_Is_A_Unit_Test.
Empty string should return an empty string, leading and trailing underscores should not be removed. */

//P: A string
//R: A string

/* 
- Check for empty string
- Check if every capital letter in the string is preceded by an underscore and add one if not, unless it's the first one
    - Map should do the trick for this - if element matches /[A-Z]/ and index is not 0, replace with _ + element
- Numbers are the tricky part. Step 2 will add an underscore after a group of numbers, but not before
    - Add a check for "if this element can't convert to a number but the next one can, add _ after"
*/

const toUnderScore = name => {
    if (!name) {return ""}
    return name.split('').map((e, i, arr) => {
        if (e.match(/[A-Z]/) && i && arr[i - 1] !== "_") {
            if (Number(arr[i + 1]) || Number(arr[i + 1] == 0)) {
                return "_" + e + "_"
            }
            return "_" + e
        }
        if (e.match(/[A-Za-z]/) && (Number(arr[i + 1]) || Number(arr[i + 1] == 0))) {
            return e + "_"
        }
        return e
    }).join('')
  }