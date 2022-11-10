/* Given an array of fractions written as an array, return the list of those fractions converted to the lowest common denominator */

//P: An array of arrays of numbers (positive integers)
//R: A string with numbers in brackets

function convertFrac(lst){
    if (!lst.length) {return ""}
  
    const simplified = lst.map(e => {
      if (e[0] !== 1) {
        for (let i = 2; i <= e[0]; i++) {
          if (e[0] % i == 0 && e[1] % i == 0) {
            return [e[0] / i, e[1] / i]
          }
        }
        return e
      }
      return e
    })
    
    const maxDenominatorInit = simplified.map(e => e[1]).reduce((a, b) => Math.max(a, b))
    let maxDenominator = maxDenominatorInit
    
    const allDivisibleBy = (num, arr) => arr.every(e => num % e[1] == 0)
    const mapToDenominator = (num, arr) => arr.map(e => [e[0] * (num / e[1]), num])
    const arrToStringForReasons = arr => arr.reduce((a, b) => a + `(${b[0]},${b[1]})`, "")
    
    while (true) {
      if (allDivisibleBy(maxDenominator, simplified)) {
        return arrToStringForReasons(mapToDenominator(maxDenominator, simplified))
      }
      maxDenominator += maxDenominatorInit
    }
  }

  /* I very nearly submitted this with maxDenominator only being incremented by 1 each time even though the inefficiency
  annoyed me and I was pretty sure the lowest common denominator had to be a multiple of maxDenominator, because the while
  loop timed out if I incremented maxDenominator by itself. It was in the process of writing a comment about it here
  that it dawned on me I was doubling, then quadrupling, then eightupling it and needed to separate out the initial value. */

