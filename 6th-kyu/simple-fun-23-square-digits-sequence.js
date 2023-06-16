/* Given a number num, return the length of a sequence constructed by having each element be the sum of the previous element's digits squared,
going on until a number occurs that has already been present in the sequence. */

//P: A number
//R: A number

/*
- This kind of thing now always makes me wary whether I'm missing something by actually generating the sequence, but not sure how else you'd do it?
- Maybe putting the numbers in an object rather than an array will reduce the time spent finding out if an element is already present?
- Set original number : true in the object
- Then perform the sequence (number to string, split and map to square of number, reduce add)
- Add each element to object and return length of Object.keys if already present
*/



function squareDigitsSequence(a0) {
    let values = {}
    values[a0] = true
    let prev = a0
    while (true) {
        let next = String(prev).split('').map(digit => Number(digit) ** 2).reduce((acc, cur) => acc + cur, 0)
        if (next in values) {
            return Object.keys(values).length + 1
        }
        else {
            prev = next
            values[next] = true
        }
    }
}