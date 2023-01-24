/* Given an array of objects representing data about developers attending a meetup, return true if every age group (teens, 20s, 30s, 40s, 50s, 60s, 70s, 80s, 90s, 100+)
is represented, and false otherwise. */

//P: An array of objects
//R: A boolean

/*
Going to try and figure something out that doesn't involve a bunch of cumbersome "if smaller than this and greater than that" code.
If I map the ages to their modulo 10, the numbers 1 to 10 should be represented. (Update: derp - not modulo, integer division. The thing that gets you the modulo.)
Turning them into a set and checking whether it's 10 elements long will probably do the trick, but that doesn't technically check
whether it's the right ages.
Why does JS not have range(1, 10)??? Argh. 
Sorting the numbers and comparing to their index will only work if an underage prodigy doesn't sneak in.
Fine, I'll make an array with the numbers from 1 to 10 and check it against the age modulos with every().
*/

/* Oh, hm, that doesn't quite work as 10 doesn't need to be in it as long as any number >= 10 is. Small adjustment in the .every() logic should fix that. */

function isAgeDiverse(list) {
    const devAgesByTen = list.map(e => Math.floor(e.age / 10))
    const maxDevAge = devAgesByTen.reduce((a, b) => Math.max(a, b))
    const oneToTen = Array.from({length: 10}, (_, i) => i + 1)
    return oneToTen.every(e => devAgesByTen.includes(e) || (e == 10 && maxDevAge > e))
  }

/* Needed a bit of extra tinkering to get the >100 logic right, but it beats defining isTeen, isTwenties etc. by hand. */