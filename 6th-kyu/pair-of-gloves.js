/* Given an array of strings that are colours, return how many matching pairs there are. Apparently gloves for the left and right hand do not need
to be differentiated.
Example:
input = ["red", "green", "red", "blue", "blue"]
result = 2 (1 red pair + 1 blue pair)
 */

//P: An array of strings
//R: A number

/*
- Create a set to get the unique colors in the array
- For each color in the set, filter original array by it, divide length by 2 rounded down
- Add up numbers obtained in previous step
*/


function numberOfPairs(gloves) {
  return Array.from(new Set(gloves))
            .map(color => Math.floor(gloves.filter(glove => glove == color).length / 2))
            .reduce((acc, cur) => acc + cur, 0)
}

/* I am trying to make a point of not writing stuff like e => thing.filter(f => f == e) just out of laziness anymore, even if Codewars is obsessed with keeping everything short. */