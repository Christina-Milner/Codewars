/* Imagine a sequence that starts with 1 and contains y = 2x + 1 and z = 3x + 1 for every element x.
So it goes 1, 3 (2 * 1 + 1), 4 (3 * 1 + 1), 7 (2 * 3 + 1), 9 (2 * 4 + 1), 10 (3 * 3 + 1), 13 (3 * 4 + 1) and so on.
Given a number n, return the element at index n of this (sorted) sequence and watch out for performance. */

//P: A number
//R: A number

/*
- Going to assume actually generating the sequence until it has the desired length is a non-starter for performance reasons, but let's go over how we would do that.
    - Initialise array as [1]
    - Initialise a tracker variable as 0
    - While array length is less than n + 1, push in 2 * element at tracker + 1 and 3 * element at tracker + 1, then increment tracker
    - Sort at the end as 3 * (x - 1) + 1 overtakes 2 * x + 1 as early as the example sequence
function dblLinear(n) {
    let arr = [1]
    let tracker = 0
    while (arr.length < n ) {
      arr.push(2 * arr[tracker] + 1, 3 * arr[tracker] + 1)
      arr.sort((a, b) => a - b)
      tracker++
    }
    return arr[n - 1]
}
- Ok, I see the problem. In order for this to work, the array has to be sorted on every pass rather than once at the end
- And it still doesn't work like that because of the duplicates problem 
function dblLinear(n) {
    let nums = new Set()
    nums.add(1)
    let tracker = 0
    while (nums.size < n + 10) {
      let arr = Array.from(nums)
      arr.push(2 * arr[tracker] + 1, 3 * arr[tracker] + 1)
      arr.sort((a, b) => a - b)
      nums = new Set(arr)
      tracker++
    }
    console.log(Array.from(nums))
    return Array.from(nums)[n]
}
- Ok, that is getting closer, but still doesn't work because 3x + 1 elements that way overshoot get pushed in before the ones that would follow in the sequence do.
- (And of course this times out on tests with higher numbers)
- So, have to find some kind of logic that allows for doing this without actually generating the sequence
- Hmm. Been staring at the numbers in Excel for a while, and best I can come up with is generate one array of 2x + 1 and one of 3x + 1 and then populate result
    checking back and forth to see which one is next in the order
- 

*/

function dblLinear(n) {
    const recursiveHelper = (rounds = 0, currentNum = 1, toCheck = []) => {
        if (rounds === n) {return currentNum}
        if (!toCheck) {
            toCheck.push(currentNum * 3 + 1)
            return recursiveHelper(rounds + 1, currentNum * 2 + 1, toCheck)
        }
        toCheck.push(currentNum * 2 + 1)
        toCheck.push(currentNum * 3 + 1)
        toCheck.sort((a, b) => b - a)
        let next = toCheck.pop()
        if (next === currentNum) {
            return recursiveHelper(rounds, next, toCheck)
        }
        return recursiveHelper(rounds + 1, next, toCheck)
    }
    return recursiveHelper()
}

/* Ok, that works in terms of the logic, but gets a max call stack size exceeded on the bigger numbers. Hmmm.
 */

function dblLinear(n) {
    let rounds = 0
    let currentNum = 1
    let toCheck = []
    while (rounds <= n) {
        if (rounds === n) {return currentNum}
        if (!toCheck) {
            toCheck.push(currentNum * 3 + 1)
            currentNum = currentNum * 2 + 1
            rounds++
            continue
        }
        toCheck.push(currentNum * 2 + 1)
        toCheck.push(currentNum * 3 + 1)
        let next = toCheck.reduce((acc, cur) => Math.min(acc, cur))
        if (next === currentNum) {
            toCheck = toCheck.filter(num => num !== currentNum)
            continue
        }
        rounds++
        currentNum = next
    }
}

/* Ok, rewritten as a while loop, it works fine in the browser console but times out on Codewars. It is no doubt sorting the array
on every iteration that's the problem, but how do I not do that? */

function dblLinear(n) {
    const sequence = [1]
    let index2 = 0
    let index3 = 0
  
    while (sequence.length <= n) {
      const element2 = 2 * sequence[index2] + 1
      const element3 = 3 * sequence[index3] + 1
      const minElement = Math.min(element2, element3)
  
      if (minElement === element2) {
        index2++
      }
      if (minElement === element3) {
        index3++
      }
      sequence.push(minElement)
    }
  
    return sequence[n]
  }