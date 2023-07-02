/* Write a function that combines an unknown number of functions */

// P: Unknown number of unary functions
// R: The result of applying all of said functions to an argument

function compose() {
    const fns = [...arguments]
    return func = (arg, fnArr = fns.reverse()) => {
      if (!fnArr.length) {return arg}
      return func(fnArr[0](arg), fnArr.slice(1))
    }
  }

  // Love me some recursion
  // Todo: Investigate why reduce didn't work ("a is not a function")

  /* It appears this kata got updated in some way and I did it again without realising I'd already done it until VSCode complained
  this file already existed.
  "Compose" now takes two functions specifically as arguments and is to return a function that applies both to an unspecified number of arguments.
  I wanted to check a "wouldn't that just work like...?" before writing anything down, but that was all there was to it. */

function compose(f,g) {
    return function(...args) {
        return f(g(...args))
    }
}