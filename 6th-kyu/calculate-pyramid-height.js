/* Given a number n of blocks, calculate how many layers a pyramid built out of these blocks would have. Assuming
the base is square, each subsequent row has 1 more block than before, and there is always 1 block at the top. */

//P: A number
//R: A number

function pyramidHeight(n) {
    const layers = Array.from({length: 50}, (_, i) => i + 1)
                  .map((e, i, arr) => arr.slice(0, i + 1).reduce((a, b) => a + b ** 2, 0))
    for (let i = 0; i <= 50; i++) {
      if (layers[i] > n) {
        return i
        }
    }
  }