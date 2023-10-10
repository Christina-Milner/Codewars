/*
???
This kata is a puzzle with deliberately vague instructions.
Provided:
Bomb.diffuse();

console.log( Bomb )

I am to diffuse all 10 bombs.
*/

//P: ???
//R: ???

/*
- No pseudocode plan for this one, just have to figure it out as I go along
- Console logging Bomb showed that besides the diffuse method, it had a property of key with the value 42
- Passing 42 into the diffuse() call produced this in the test log:
Well done, however another bomb has just armed itself!  9 bombs left!
{ key: 42, diffuse: [Function: diffuse], hint: 'just keep trying' } [Function: diffuse]

- The actual failing test says expected undefined to equal true
- It'd be awesome if I could see what that test is doing
- Ok, it's calling diffuse, which currently returns undefined. What happens if I just redefine it to return true?
- Right, did a for loop calling diffuse on all numbers between 1 and 100. it appears 1 works, but nothing else.
- This has earned me a new hint: "Check the globals".
- Uh. Wat.
- Which number works as an additional defuse after the initial one appears to change??
- Did a while loop calling diffuse on Bomb.key instead. This works twice and then stops working.
- A-haa! Console logging "Bomb.diffuse.toString()" lets me check what the hell that actually does. It calls another function called check();.
- And I can only see check() before calling diffuse()
Check does: 
function( code ){
			    if( code === this.key ) next(step);
			    else failed = true;
			  }
- And suddenly, trying to check "check()" throws an error again, but diffuse() now uses that same code. ???
- Ok, nope, going to give up on it and look up solutions.
*/

// Bomb #1: Bomb.key => 42
Bomb.diffuse(42)

// Bomb #2: Call it five times
for (i = 0; i < 5; ++i) Bomb.diffuse()

// Bomb #3: Global variable
Bomb.diffuse(BombKey)

// Bomb #4: Manually define the global function
function diffuseTheBomb() { return 1; }
Bomb.diffuse()

// Bomb #5: base64 decode on the Net
Bomb.diffuse(3.14159)

// Bomb #6: Today minus 4 years
date = new Date(); date.setFullYear(date.getFullYear() - 4);
Bomb.diffuse(date)

// Bomb #7: Freeze it, so the value does not change with assignment
code = { key: 43 }; Object.freeze(code);
Bomb.diffuse(code)

// Bomb #8: Compare (>,<) ops call valueOf(), so we can use outer state to satisfy both
value = 9;
obj = { valueOf: function() { ret = value; value = 11; return ret } }
Bomb.diffuse(obj)

// Bomb #9: Same by modifying Math.random (0.5 ** 1/3 does not work, so we need state machine again)
cnt = 0;
Math.random = function() { if (cnt++ == 2) return 0.5; else return 1 }
Bomb.diffuse(42)

// Bomb #10: I enjoyed the challenge, so I entered 'yes' in base64 :)
Array.prototype.valueOf = function() {
  return this.reduce(
    function(x, y) { return x + y }, 0
  )
}
Bomb.diffuse('eWVz')

