/* Write a function (with an unspecified number of arguments) that returns the least common multiple of its arguments.
If the input is empty, return 1, if any of the arguments are 0, return 0. */

//P: An unspecified amount of numbers
//R: A number


/*
- It would probably help if I read up on the rules of the least common multiplier.
- I am going to make a bold guess based on the 2, 3, 4 => 12 scenario - it's the product of the two biggest arguments as well as any others neigher of them is divisible by
    => if it was 2, 3, 5, then 3 * 5 is 15 but as neither 3 nor 5 are divisible by 2, that isn't either, so you'd have to use 30. But with 2, 3, 4, 3 * 4 is enough as 4 is already divisible by 2.
- So, check for empty or 0 present
- Then sort the array of input arguments and save the two highest ones
- Filter array by is one of two highest or is a number neither of those is divisible by
- Reduce to get the product
- Maybe use a Set first just in case these jokers decide to put the same number in there more than once?

- Ok, good call on the Set but unfortunately my theory is wrong. Have to use either prime factorization or greatest common factor.
*/


function lcm() {
    let nums = Array.from(new Set([...arguments])).sort((a, b) => a - b)
    if (!nums.length) {return 1}
    if (!nums[0]) {return 0}
    const gcf = (num1, num2) => {
        let [small, big] = [Math.min(num1, num2), Math.max(num1, num2)]
        if (big % small === 0) {return small}
        for (let i = small; i >= 2; i--) {
            if (big % i === 0 && small % i === 0) {
                return i
            }
        }
        return 1
    }
    return nums.reduce((acc, cur, idx) => {
        if (!idx) {return cur}
        return (acc * cur) / gcf(acc, cur)
    }, 0)
}