/* Given a number, return it as a string breaking down its components, such as
example: 7286.45 => 7000 + 200 + 80 + 6 + 4/10 + 5/100
*/

//P: A number (mostly non-integer)
//R: A string

/* I did version 1 of this by turning the number into a string and mapping the components to the appropriate multipliers based on its length.
I think I can recyle the same logic here, just need to split it by before and after the decimal.
- Turn number into string
- Split by "." (keeping in mind there may not be a decimal)
- Before the decimal: each element maps to itself times 10 to the power of one less than the string length minus the current index
- After the decimal: each element maps to a fraction with itself as the numerator and 10 to the power of 1 more than the current index as the denominator
*/

function expandedForm(num) {
    const [beforeDecimal, afterDecimal] = [String(num).split('.')[0], String(num).split('.')[1]]
    const firstPart = beforeDecimal ? beforeDecimal.split('').map((e, i, arr) => Number(e) ? Number(e) * 10 ** (arr.length - i - 1) : "").filter(e => e).join(' + ') : ""
    const secondPart = afterDecimal ? afterDecimal.split('').map((e, i) => Number(e) ? `${e}/${10 ** (i + 1)}` : "").filter(e => e).join(' + ') : ""
    return firstPart ? secondPart ? `${firstPart} + ${secondPart}` : firstPart : secondPart
  }

/* The filter(e => e) seems clumsy so I was wondering if I couldn't use reduce for this instead, but it seems to be impossible to do so without
having an extra plus floating around at the start of each string (because accumulator starts empty and then gets stuff concatenated onto it with pluses).
In any case, the reduce would've needed so many extra checks it would be no more concise than using map, so we just go with that. */