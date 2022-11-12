function shortestArrang(n) {
    let resultArr = []
    for (let i = Math.ceil(n / 2); i >= 1; i--) {
      resultArr.push(i)
      if (resultArr.reduce((a, b) => a + b, 0) == n) {break}
      if (resultArr.reduce((a, b) => a + b, 0) > n) {resultArr = resultArr.slice(1)}
    }
  return !resultArr.length ? [-1] : resultArr.reduce((a, b) => a + b, 0) == n ? resultArr : [-1]
}