/* Write a function that, given a function, caches the results of calls to it. If functionA(a, b) is a complex operation and cachedFunction = cache(functionA), 
then cache(a, b) should execute function A with those arguments, but another call to cache should return that same result instead of invoking the original function again. */

//P: A function
//R: ?

/*
- So, without the caching functionality, cache would need to simply return the original function
- This is another of those closure things, isn't it
- The obvious strat would seem to be to save the arguments and the results of the call outside the inner function
*/


function cache(func) {
    let calls = {}
    return function() {
      let key = JSON.stringify(arguments);
      if (!(key in calls)) {
        calls[key] = func.apply(null, arguments);
      }
      return calls[key];
    }
  }