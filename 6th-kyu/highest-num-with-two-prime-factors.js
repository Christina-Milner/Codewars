// Find the highest number equal or less than n that is the product of two prime factors
// and return the number as well as the exponents for each prime factor

//P: Number
//R: Array of numbers, [numMax, exponent1, exponent2]


function highestBiPrimeFac(p1, p2, n) {
    let product = p1 * p2
    let exp1 = 1
    let exp2 = 1
    for (let i = 1; i < 100; i++) {
      for (let j = 1; j < 100; j++) {
        let result = p1 ** i * p2 ** j
        if (result > n) {break}
        if (result > product) {
          product = result
          exp1 = i
          exp2 = j
        }
      }
    }
  return [product, exp1, exp2]
}