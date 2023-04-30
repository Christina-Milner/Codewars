/* Given a non-empty input string, return all possible permutations of its characters (without duplicates). 
Example: 
With input 'abc':
Your function should return ['abc','acb','bac','bca','cab','cba']
*/

//P: A string
//R: An array of strings

/*
- Goal: Manage another 4th kyu without creating a huge monster of code and doing everything as backwards as possible
- Iterate over characters and create a new string for each with that character as the starting letter (filter out dupes here or later? Not sure)
- This might not perform well, but also save remaining letters for each
- For each starting letter, create all permutations of it and the next letter
- Repeat until no letters left
*/

function permutations(string) {
	let options = {}
    for (let i = 0; i < string.length; i++) {
        options[string[i]] = string.slice(0, i) + string.slice(i + 1)
    }

    const objPermutator = obj => {
        // Base case: Object values are empty because we've used up all the letters
        if (Object.values(obj).every(e => !e)) {
            return obj
        }
        let newObj = {}
        for (let key in obj) {
            for (let i = 0; i < obj[key].length; i++) {
                newObj[key + obj[key][i]] = obj[key].slice(0, i) + obj[key].slice(i + 1)
            }
        }
        return objPermutator(newObj)
    }

    return Object.keys(objPermutator(options))
}

/* That works ... I'm not sure how I didn't need to build in a dupes filter (forgot to before testing it), but apparently I don't. 
Oh *lightbulb* - objects can't have the same key twice so I cleverly built in a dupes filter without realising. */