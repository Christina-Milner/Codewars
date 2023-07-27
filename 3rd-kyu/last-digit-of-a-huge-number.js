/* Given an array of numbers, e.g. [2, 3, 4], return the last digit of the number obtained by taking each number to the power of the subsequent ones, i.e. 2 ** (3 ** 4). 
0 ** 0 is assumed to be 1, as is the last digit of the result if the list is empty. */

//P: An array of numbers
//R: A number

/*
- 2 ** (3 ** 4) is what the console will spit out if you just put in "2 ** 3 ** 4" although I'm not sure why as I thought order of operations was left to right if 
the operations are of equal prio. Anyhoo.
- Obviously, just doing the maths operations will not work. Even the 2 ** 3 ** 4 example is already a something e24 number
- This is a generalisation of the 5th kyu "last digit of a large number", which I've done, so it shouldn't be too hard
- That was based on the fact that there's a pattern to the powers of numbers
    - E.g. powers of 2 rotate between 2, 4, 8 and 6 as the last digit
    - And this holds true for powers of any number ending in 2
- It also turned out that only the last 2 digits of the exponent were relevant. We take the modulo of that to find which one of the list of options is the right one.
- So, one of the examples is [937640, 767456, 981242]
    - First we need 767456 ** 981242
    - It's a 6 number, so all its powers will end in 6, no further calculation needed
    - Buuut, how does that help with the next step? I kind of need the last two digits
    - Well, fortunately the first number ends in a 0, so it doesn't matter, because the result will always end in a 0 as well. Lol.
- Ok, let's look at [3, 4, 5] instead
    - 4 ** 5 is obviously calculable, but let's pretend it's not
    - 4 means last digit is 4 or 6, but have to subtract one from the exponent before taking the modulo because of the 4 ** 0 outlier
    - So [4, 6][(5 - 1) % 2], which is indeed 4 (1024)
    - 3 ** 1024 is not calculable, but we know powers of 3 cycle through 1, 3, 9 and 7
    - 4 modulo 4 of that array is 1, which is the correct answer
- Let's code this out assuming just the last digit is enough and see what happens
*/

function lastDigit(nums) {
    console.log(nums)
    if (!nums.length) {return 1}
    if (nums.every(e => !e)) {
        if (nums.length === 2) {
            return 1
          } else return 0}



    let exponent = nums.pop()
    let expLastDigit = Number(String(exponent)[String(exponent).length - 1])
    console.log(nums)
    const powerPatterns = {
        2: [2, 4, 8, 6],
        3: [1, 3, 9, 7],
        4: [4, 6],
        7: [1, 7, 9, 3],
        8: [8, 4, 2, 6],
        9: [1, 9]
    }

    while (nums.length) {
        console.log("expLastDigit: ", expLastDigit)
        let base = nums.pop()
        let baseLastDigit = String(base)[String(base).length - 1]
        console.log("baseLastDigit: ", baseLastDigit)
        if (!(baseLastDigit in powerPatterns)) {
            expLastDigit = Number(baseLastDigit)
            continue
        }
        let options = powerPatterns[baseLastDigit]
        console.log(options, expLastDigit % options.length)
        expLastDigit = Number(baseLastDigit) % 2 === 0 ? options[Math.abs((expLastDigit - 1)) % options.length] : options[expLastDigit % options.length]
    }
    return expLastDigit

}

/* TODO: Figure out zeroes. They're entirely broken. "0 ** x = 0, but 0 ** 0 = 1" is a giant pain. 
Then figure out what the pattern here is:

7, 6, 2	ex: 1, act: 9
7, 6, 21	ex: 1, act: 9
12, 30, 21	ex: 6, act: 4
2, 2, 101, 2	ex: 6, act: 4
82242, 254719, 736371	ex: 8, act: 2
123232, 694022, 140249	ex: 6, act: 4
11482, 210916	ex: 6, act: 4
11482, 210916, 613739	ex: 6, act: 4
*/
