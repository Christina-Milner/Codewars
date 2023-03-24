/* Given a string, return an array containing only those characters of the string where the binary representation of their ASCII value consists of
more zeros than ones, removing any duplicates.*/

//P: A string
//R: An array of strings

/*
- Split the string
- Filter by:
    - ASCII value (charCodeAt) -> to binary (toString(2)) -> split and filtered by 0 longer than split and filtered by 1
    - Not already present in array
- Return
*/
function moreZeros(s){
    let strArr = s.split('')
    return strArr.reduce((a, b) => {
        let binaryArr = b.charCodeAt(0).toString(2).split('')
        if (binaryArr.filter(f => f == "0").length > binaryArr.filter(f => f == "1").length && !a.includes(b)) {
            return a.concat(b)
        } else {
            return a
        }
    }, [])
}