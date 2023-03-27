/* Given a comma separated strings of animals and other stuff found at a zoo and a list of what can eat what, return an array of:
 a) the original input string
 b) "X eats Y" for each time something eats something else
 c) The final string of what is left
Animals can only eat things immediately adjacent to them and will always eat what is to their left first.
The leftmost animal gets to eat first. */

//P: A string
//R: An array of strings

/*
- Create an object that keeps track of what eats what
- Iterate over the array and look for things that can be eaten, then check if the element to their right is what eats them, then the element to their left
- Slice out that element if so and push a "X eats Y" into an array
- Repeat this process until the array no longer changes

- This reminds me of the kata about eliminating adjacent redundant directions from a list of directions. I used reduce for that and recursively ran it until
the length of the array no longer changed. That should work here too. */

const whoEatsWho = zoo => {
    const eats = {
        "antelope": ["grass"],
        "big-fish": ["little-fish"],
        "bug": ["leaves"],
        "bear": ["leaves", "big-fish", "bug", "chicken", "cow", "sheep"],
        "giraffe": ["leaves"],
        "panda": ["leaves"],
        "chicken": ["bug"],
        "fox": ["chicken", "sheep"],
        "lion": ["cow", "antelope"],
        "sheep": ["grass"],
        "cow": ["grass"],
    }
    let zooArr = zoo.split(',')
    let messages = []

    const feedingTime = arr => {
        let oldArrLength = arr.length
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] in eats && eats[arr[i]].includes(arr[i - 1])) {
                messages.push(`${arr[i]} eats ${arr[i - 1]}`)
                arr = arr.slice(0, i - 1).concat(arr.slice(i))
                break
            }
            else if (arr[i] in eats && eats[arr[i]].includes(arr[i + 1])) {
                messages.push(`${arr[i]} eats ${arr[i + 1]}`)
                arr = arr.slice(0, i + 1).concat(arr.slice(i + 2))
                break
            }
        }
        if (arr.length == oldArrLength) {
          return arr.join(',')
        }
        return feedingTime(arr)
    }
    let survivors = feedingTime(zooArr)
    return [zoo].concat(messages).concat(survivors)
  }
  
/* Learning process:
- Decided against reduce early on as it would make including the messages a pain
- Had to realise that concatenating messages onto the final return before calling feedingTime obviously does not work
- Had to add a break as soon as a match is found as the "leftmost animals eat first" rule overrides iterating over the full array once
- Finally, I'd originally made the object with the things that get eaten as keys and the predators as values, but that way the priorities were wrong
  if one thing was surrounded by two things that could eat it (leftmost animal takes priority over animal eats to the left first), so swapped them around
*/