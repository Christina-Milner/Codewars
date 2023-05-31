/* Write a function that calculates a Fibonacci number, but use some kind of storage for previously calculated numbers to avoid the tremendous
inefficiency of having to recalculate all the numbers twice on each recursive call.
Not sure what "can you make it so the memoization cache is private to this function" means, but as I define that kind of thing inside the function
anyway, that should be covered?
*/

//P: A number
//R: A number

/*
- Make an object and put 0: 0, 1: 1, 2: 1 in it
- Change base case to if string of n is in object, return value
- Hmmm ... at this point, might as well not make it recursive, no?
- Just do a for loop from 3 to n that creates a new object entry of obj[n - 1] + obj[n - 2] for each one
- Then return the value for n?
*/


function fibonacci(n) {
    let fibValues = {
        0: 0,
        1: 1,
        2: 1
    }
    if (n in fibValues) {
        return fibValues[n]
    }
    for (let i = 3; i <= n; i++) {
        fibValues[i] = fibValues[i - 1] + fibValues[i - 2]
    }
    return fibValues[n]
  }

  /* Oops. The problem did say to refactor into a *recursive* Fibonacci number with this memo thing. But why would you do this? Alllso, test for it if that's what I'm supposed to do...
  I have now seen the other solutions (basically same as standard Fibonacci just with a check whether the desired entry is already there), so no point trying to adjust it.
  The "keep it private" part has spawned some funny "closures" stuff in the other solutions that I don't understand, though. Note to self to investigate. */