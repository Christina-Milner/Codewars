/* Write a function wiht up to 4 arguments ("Fizz", "Buzz", 3 and 5 by default) that returns an array of the numbers to 100, but with the numbers replaced according to
FizzBuzz rules, i.e. numbers divisible by num1 get replaced by str1, ditto num2 and str2, and numbers divisible by both get replaced by str1 + str2. */

//P: Two strings and two numbers
//R: An array of numbers and strings

/*
- Tbh if I was asked to do FizzBuzz, I'd set it up much like this, to make the numbers and replacement strings flexible
- With the default parameters added, I don't think I need to do much else?
- Generate array of 1 to 100 and map, or just iterate from 1 to 100 and push? Doesn't really matter, let's go with map
- Check for divisible by both first, rest is pretty self explanatory
*/


function fizzBuzzCustom(str1 = "Fizz", str2 = "Buzz", num1 = 3, num2 = 5) {
    return Array.from({length: 100}, (_, i) => i + 1)
           .map(num => {
                if (num % num1 === 0 && num % num2 === 0) {
                    return str1 + str2
                }
                else if (num % num1 === 0) {
                    return str1
                }
                else if (num % num2 === 0) {
                    return str2
                }
                else {
                    return num
                }
           })
}