/* Given a number n, return the nth element in the list of numbers that are a power of the sum of their digits (such as 81, 8 + 1 = 9 and 9 ** 2 = 81). */

//P: A number
//R: A number 


/*
- Create an empty array of such numbers and keep going while its length is less than n
- Iterate over numbers, starting at 81
- Sum the digits of each number (string -> split -> reduce) and iterate over potential exponents until hitting a result bigger than the number we're looking for
- Add to array if it fulfills the condition and return last element once array has appropriate length
- Hope the performance isn't too bad. Otherwise, memo that array in a global variable somewhere.
*/


let list = [];

function createList() {
    const isPowerOfSum = (num, base) => {
        let sum = String(num).split('').map(Number).reduce((acc, cur) => acc + cur, 0);
        return sum == base;
    }
    for (let i = 2; i <= 100; i++) {
        for (let j = 2; j <= 100; j++) {
            if (isPowerOfSum(i ** j, i)) {
                list.push(i ** j);
            }
        }
    }
    list.sort((a, b) => a - b);
}

function powerSumDigTerm(n) {
    if (!list.length) {
        createList();
    }
    return list[n - 1];
}

/* Going through the numbers one by one did not work, of course. Generating powers of numbers and checking them was going to be more efficient, but keeping the list
inside the function was still inefficient and putting it outside now created a problem of not pushing in duplicates. Sooo... just outsource all that stuff to
another function that will only ever run once, and then see how high i and j need to go for everything to pass. >.> */