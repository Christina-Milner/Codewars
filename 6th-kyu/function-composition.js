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