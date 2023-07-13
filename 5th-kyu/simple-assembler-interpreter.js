/* Given an array of strings that represent instructions for a program, return an object with this program's variables as keys and their values as, well, values.
The possible instructions are:
mov x y - assigns the value y to variable x
inc x - increments the value of x
dec x - decrements the value of x
jnz x y - jumps to an instruction y steps away (-1 = previous instruction, 2 = skip next instruction), but only if x is not zero
Variables are alphabetical letters.
Every operation on a variable will be preceded by a "mov" so no need to worry about undeclared variables. */

//P: An array of strings
//R: An object

/* 
- Could use Regex here but don't feel like it - just split each individual instruction by spaces to get the components out
- It won't try to increment or decrement undeclared variables, but what about using mov with one that's already declared? From tests, doesn't look like
    that is a thing either, so we can safely assume mov = let
    - So, initialise the object, and when we see a mov, create an entry of x: y
- Increments/decrements are self explanatory
- The jnz one is interesting. We can't just iterate over the array because that doesn't allow for this behaviour
    - Instead: Initialise a pointer and run a while true loop that does what the array element at that pointer says and breaks when it hits the array length
    - What does jnz do if the x value IS zero? Just get ignored?
*/


function simple_assembler(program) {
    let vars = {}
    let pointer = 0
    while (true) {
        if (pointer >= program.length) {
            return vars
        }
        const instruction = program[pointer].split(' ')
        if (instruction[0] === "mov") {
            const value = isNaN(instruction[2]) ? vars[instruction[2]] : Number(instruction[2])
            vars[instruction[1]] = value
        }
        else if (instruction[0] === "inc") {
            vars[instruction[1]]++
        }
        else if (instruction[0] === "dec") {
            vars[instruction[1]]--
        }
        else if (instruction[0] === "jnz") {
            const fml = instruction[1]
            if (!isNaN(fml) && fml != 0 || isNaN(fml) && vars[fml] !== 0) {
                pointer += Number(instruction[2])
                continue
          }
        }
        pointer++
    }   
}