/* Write the function theLift(). It takes in 2 parameters:
    - queues: An array of arrays of people waiting for the lift at each floor. Array[0] is the ground floor. The people are numbers, indicating what floor they
        want to go to
    - capacity: the max # of people that can be in the lift at a time

It is to return the ordered list of all the floors the lift stopped at.
Example: queues = [
      [], // G
      [], // 1
      [5,5,5], // 2
      [], // 3
      [], // 4
      [], // 5
      [], // 6
    ]
theLift(queues,5) => [0, 2, 5, 0]

Rules:
- Lift is only going either up or down at a time, it doesn't change direction until there is nobody else waiting to go in that direction
- When empty, it tries to be smart
- Observe max capacity
- Lift will stop at floors it is called to even if full, but if no one gets off, no one can get on (and they will push the button again)
- Empty lift with no one waiting will return to ground floor

- People are in queues and enter the lift in order, but don't block people behind them from entering as...
- Only people going the same direction as the Lift may enter it
*/

//P: An array of arrays of numbers
//R: An array of numbers

/*
- Yo I think these lifts need to be an object class
- Constructor takes parameters of lift function
- Capacity simply becomes a property
- Queues too, for now - see what we end up doing with this
- Lift also needs a position (default 0)
- And a property indicating what it's doing (up/down/nothing)
- And an array to hold the people currently IN the elevator
- From 0, iterate over floors up to highest that has people and "stop" (push into result) at each one that has people
    - If there are people desiring the current floor in the elevator, get rid of them
    - If the elevator is at max capacity, do nothing
    - Otherwise iterate over people and move any whose floor is higher than current from floor to lift (until full)
    - Do this until highest floor reached that has people
- Now lift goes down, iterate from current floor (highest with people) to lowest with people and do reverse of previous step
- If lift is empty but there are still people: TBD, not sure what this actually means
- Lift is empty and there's no more people: goes back to ground, add 0

*/

/* Old version of code removed for legibility, it's still in the commits */

/* Passing basic tests, need to refine logic though. Lift currently stops at the same floor multiple times. 
Easy enough to fix by disallowing the same number twice in a row if I can't fix the logic behind it, but there's other issues.
Queues, capacity:  [
  [],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ],
  [ 0, 0, 0, 0 ]
] 5
expected [ +0, 6, 5, +0, 5, 4, +0, 4, 3, +0, 3, 2, +0, 1, +0 ] to deeply equal [ +0, 6, 5, 4, 3, 2, 1, +0, 5, 4, 3, 2, 1, +0, 4, 3, 2, 1, +0, 3, 2, 1, +0, 1, +0 ]

=> Ah, this is the "elevator will stop if people waiting even if no one can get on or off" thing. 

If I remove the temp if check in atFloor to always record the floor that is being stopped at and add a check to not push the same floor that was just pushed again,
it solves a lot of these problems but breaks the "down and down" basic test.

Queues, capacity:  [
  [], [ 0 ], [],
  [], [ 2 ], [ 3 ],
  []
] 5
expected [ +0, 1, 4, 5, 4, 3, 2, 1, +0 ] to deeply equal [ +0, 5, 4, 3, 2, 1, +0 ]

Wait... why wouldn't that pick up the person on floor 1 first? Let's see if we can cheat that by adding a check where if everyone wants to go down, we skip the up loop. 
Ok, done. Next problem:

Queues, capacity:  [ [], [ 2 ], [ 3, 3, 3 ], [ 1 ], [], [], [] ] 1
expected [ +0, 1, 2, 3, 2, 1, 2, 3, 2, 3, +0 ] to deeply equal [ +0, 1, 2, 3, 1, 2, 3, 2, 3, +0 ]

That seems to be the same problem in reverse, i.e. once it's reached 3, it should go "now everyone wants up" and go to the lowest floor.
I should make the up and down for loops subfunctions before I put that in though, otherwise I'll have them both duplicated. Current progress: */

/* (Next day)
Ok, to-do:
- Track whether the "up" or "down" button is pushed at a floor
- Outsource the up for loop and down for loop to helper functions
*/

class Lift {
    constructor(queues, capacity) {
        this.floors = queues.length
        this.queues = queues
        this.capacity = capacity
        this.floor = 0
        this.moving = null
        this.occupants = []
        this.path = []
    }

    buttonPushed(floor) {
        let waiting = this.queues[floor]
        let pushed = []
        if (waiting.some(person => person > floor)) {
            pushed.push("up")
        }
        if (waiting.some(person => person < floor)) {
            pushed.push("down")
        }
        return pushed
    }

    moveUp() {
        this.moving = "up"
        for (let i = this.floor; i < this.floors; i++) {
            this.floor = i
            if (this.buttonPushed(i).includes("up") || this.occupants.includes(i)) {
                this.atFloor(i)
            }
        }
    }

    moveDown() {
        this.moving = "down"        
        for (let i = this.floor; i >= 0; i--) {
            this.floor = i
            if (this.buttonPushed(i).includes("down")|| this.occupants.includes(i)) {
                this.atFloor(i)
            }
        }
    }

    liftGoesBrr() {
        this.atFloor(0)
        while (this.queues.some(floor => floor.length) || this.occupants.length) {
            this.moveUp()
            this.moveDown()           
        }
        this.atFloor(0)
        return this.path
    }

    atFloor(floor) {
        let temp = []
        this.occupants = this.occupants.filter(person => person !== floor)
        let newPassengers = this.queues[floor].slice()
        for (let i = 0; i < newPassengers.length; i++) {
            if ((this.moving == "up" && newPassengers[i] > floor || this.moving == "down" && newPassengers[i] < floor) && this.occupants.length < this.capacity) {
                this.occupants.push(newPassengers[i])
                temp.push(i)
            }
        }
        this.queues[floor] = this.queues[floor].filter((e, idx) => !temp.includes(idx))

        if (this.path[this.path.length - 1] !== floor) {
            this.path.push(floor)
        }
    }
}

function theLift(queues, capacity) {
    let lift = new Lift(queues, capacity)
    return lift.liftGoesBrr()
}

/* BOOM! HAHA!
So. Outsourcing the for loops wouldn't actually have been necessary, as I am no longer duplicating them within the while loop. But maybe it looks neater this way, idk.
The crucial bit of info I had previously overlooked was that there isn't magical elevator logic, it just matters whether people have pushed the "up" or "down" button.
Top solution by other people is somewhat similar, but also creates a new class for Floor. That would've been a good idea to clean it up. */