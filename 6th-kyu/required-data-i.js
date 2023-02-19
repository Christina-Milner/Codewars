/* Implement a function that takes an array of integers and return [a, b, c, [d, e]] where
a = the total amount of received integers
b = the total amount of unique values
c = the total amount of values that occur only once
d = the element or elements with the maximum occurrence, sorted by value in the case of multiples
e = the maximum occurrence.
Example: count_sel([-3, -2, -1, 3, 4, -5, -5, 5, -1, -5]) ----> [10, 7, 5, [[-5], 3]]
List has 10 elements of 7 differing values, the unique values are -3, -2, 3, 4, and 5 (5 values), and the number -5 occurs the most frequently (3 times).
*/

//P: An array of integers
//R: An array of integers with a subarray of more integers

/*
a is the length of the input array
b is the size of the set created from the input array
c is the size of the input array if filtered to the elements that would create an array of length 1 if filtering by their value
d requires actually keeping track of how many occurrences of everything there are in the original array.
So!
- Convert input array to Set and turn Set back into array
- Then map elements of that array to [element, number of occurrences in original array]
- c is the number of elements in that array where the second number is 1
- e is the maximum of those second numbers
- d can now be obtained from this array as well
*/

function countSel(lst) {
    const totalIntegers = lst.length
    let uniques = Array.from(new Set(lst))
    const differentValues = uniques.length
    let howMany = uniques.map(e => [e, lst.filter(f => f == e).length])
    const uniqueValues = howMany.filter(e => e[1] == 1).length
    const maxOccurrence = howMany.reduce((a, b) => Math.max(a, b[1]), 0)
    const sortedMaxOccurrenceValues = howMany.filter(e => e[1] == maxOccurrence).map(e => e[0]).sort((a, b) => a - b)

    return [totalIntegers, differentValues, uniqueValues, [sortedMaxOccurrenceValues, maxOccurrence]]
}