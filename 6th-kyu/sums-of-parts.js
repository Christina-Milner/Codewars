/* Given an array of numbers, return an array of the sums of its individual parts (i.e. first element is the sum of the whole array,
    second is the sum of the array without the first element, etc. last element is zero because the last part is an empty array).
    Consider performance as these arrays might be thousands of elements long.*/

//P: An array of numbers
//R: An array of numbers

/*
- The general idea would be a recursive function that runs until the input array is empty, sticks the sum of the input array into an accumulator array
  and then calls itself on the input array with the first element removed
- Willing to guess that's way too slow, but let's try it just to see
*/

function partsSums(ls) {
    const sumArrParts = (arr, acc = []) => {
        if (!arr.length) {return acc.concat(0)}
        return sumArrParts (arr.slice(1), acc.concat(arr.reduce((a, b) => a + b, 0)))
    }
    return sumArrParts(ls)
}

/* As expected, that passes fixeds so the logic is sound, but it blows up on randoms where the large arrays come into play. */
/*
Intuitively, I would assume things would be more efficient if we start from the back as we'd then only have to keep adding
one element to the "running total" instead of repeatedly summing most of the array.
- Could reverse input array to begin with but under the hood that's probably another bunch of iterating over the whole thing so let's not
- Add 0 to acc to begin with
- Pop last element from input array and unshift it + the first already present element into acc
*/

function partsSums(ls) {
    const sumArrParts = (arr, acc = [0]) => {
        if (!arr.length) {return acc}
        acc.unshift(arr.pop() + acc[0])
        return sumArrParts(arr, acc)
    }
    return sumArrParts(ls)
}

/* Sadly, that did not help. The input that makes it explode has over 167k elements...
The fact that it's saying maximum call stack size exceeded makes me think the problem is with using recursion, but I don't logically see
why that would be the problem. It's tail recursive and all. I'll try an iterative solution, anyway. */

function partsSums(ls) {
    let result = [0]
    for (let i = ls.length - 1; i >= 0; i--) {
        result.unshift(ls[i] + result[0])
    }
    return result
}

/* Ok, now it times out instead of producing a stack overflow. Glad we cleared that up. */

function partsSums(ls) {
    return ls.map((_, i, arr) => arr.slice(i).reduce((a, b) => a + b, 0)).concat(0)
  }

/* That would be yet another way to do it, but I didn't expect that to work performance-wise and it doesn't.
I honestly don't understand why the second solution didn't work, that has what I would say the minimum amount of iterating over the whole thing.
Best guess is that it can't hold the input array of 168k elements and a result array starting to approach that size in memory at the same time, but
how to solve that? Just break the array into pieces and do those individually? */

/* Tried to brute force it with this monstrosity as figuring out how to do this without having to hardcode the individual segments is just
a little beyond my grasp - now it's not timing out anymore but it's throwing an error on one of the random tests that I can't read because
it's trying to console log arrays of hundreds of thousands of elements.*/

function partsSums(ls) {
    console.log(ls)
    
    const sumArrParts = (arr, acc = [0]) => {
        for (let i = arr.length - 1; i >= 0; i--) {
          acc.unshift(arr[i] + acc[0])
        }
        return acc
    }
    if (ls.length < 100) {
        return sumArrParts(ls)
    }
    else {
        let div = Math.floor(ls.length / 20)
        let lastDiv = sumArrParts(ls.slice(19 * div))
        let divBefore = sumArrParts(ls.slice(18 * div, 19 * div), [lastDiv[0]])
        let divBefore2 = sumArrParts(ls.slice(17 * div, 18 * div), [divBefore[0]])
        let divBefore3 = sumArrParts(ls.slice(16 * div, 17 * div), [divBefore2[0]])
        let divBefore4 = sumArrParts(ls.slice(15 * div, 16 * div), [divBefore3[0]])
        let divBefore5 = sumArrParts(ls.slice(14 * div, 15 * div), [divBefore4[0]])
        let divBefore6 = sumArrParts(ls.slice(13 * div, 14 * div), [divBefore5[0]])
        let divBefore7 = sumArrParts(ls.slice(12 * div, 13 * div), [divBefore6[0]])
        let divBefore8 = sumArrParts(ls.slice(11 * div, 12 * div), [divBefore7[0]])
        let divBefore9 = sumArrParts(ls.slice(10 * div, 11 * div), [divBefore8[0]])
        let divBefore10 = sumArrParts(ls.slice(9 * div, 10 * div), [divBefore9[0]])
        let divBefore11 = sumArrParts(ls.slice(8 * div, 9 * div), [divBefore10[0]])
        let divBefore12 = sumArrParts(ls.slice(7 * div, 8 * div), [divBefore11[0]])
        let divBefore13 = sumArrParts(ls.slice(6 * div, 7 * div), [divBefore12[0]])
        let divBefore14 = sumArrParts(ls.slice(5 * div, 6 * div), [divBefore13[0]])
        let divBefore15 = sumArrParts(ls.slice(4 * div, 5 * div), [divBefore14[0]])
        let divBefore16 = sumArrParts(ls.slice(3 * div, 4 * div), [divBefore15[0]])
        let divBefore17 = sumArrParts(ls.slice(2 * div, 3 * div), [divBefore16[0]])
        let divBefore18 = sumArrParts(ls.slice(div, 2 * div), [divBefore17[0]])
        let divBefore19 = sumArrParts(ls.slice(0, div), [divBefore18[0]])
        return [lastDiv, divBefore, divBefore3, divBefore4, divBefore5, divBefore6, divBefore7, divBefore8, divBefore9,
               divBefore10, divBefore11, divBefore12, divBefore13, divBefore14, divBefore15, divBefore16, divBefore17, divBefore18, divBefore19].reduce((a, b) => a.concat(b))
    }
}

/* Threw in the towel and asked for help. New solution: */

function partsSums(ls) {
    const n = ls.length
    let cumulativeSum = Array(n + 1)
    cumulativeSum[0] = 0
    for (let i = 1; i <= n; i++) {
        cumulativeSum[i] = cumulativeSum[i - 1] + ls[i - 1]
    }

    return cumulativeSum.map((e, _, arr) => arr[arr.length - 1] - e)
}

/* OK, that was the solution I was helped out with (well, the map was my idea when I realised the new array suggested in the second step of my helper's suggestion
boiled down to that), but here's the real breakthrough - someone really only needed to explain to me that the problem with previous attempts was that unshift() runs massively
slower than push(). And I shouldn't have discarded the idea of using reverse() because that at least only needs to be run once at the end, while unshift() has the
same complexity but gets run on every iteration. So I will be submitting the following: */

function partsSums(ls) {
    let result = [0]
    for (let i = ls.length - 1; i >= 0; i--) {
        result.push(ls[i] + result[result.length - 1])
    }
    return result.reverse()
}
