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

class Lift {
    constructor(queues, capacity) {
        this.queues = queues
        this.capacity = capacity
        this.floor = 0 // Do we actually need this? Probably for the "smart empty elevator" logic
        this.moving = null
        this.occupants = []
        this.path = []
    }

    liftGoesBrr() {
        while (this.queues.some(floor => floor.length)) {
            if (!this.moving) {
                this.moving = "up"
                for (let i = 0; i < this.queues.length; i++) {
                    if (this.queues[i].length) {
                        this.atFloor(i)
                    }
                }
            }
        }

        // Consider scenario where no more queues, but still people in the elevator
        // Then send to 0
    }

    atFloor(floor) {
        this.floor = floor
        this.occupants = this.occupants.filter(person => person !== floor)
        let newPassengers = this.queues[floor].slice()
        let temp = []
        for (let i = 0; i < newPassengers.length; i++) {
            if ((this.moving == "up" && newPassengers[i] > floor || this.moving == "down" && newPassengers[i] < floor) && this.occupants.length < capacity) {
                this.occupants.push(newPassengers[i])
                temp.push(i)
            }
        }
        this.queues[floor] = this.queues[floor].filter((e, idx) => !temp.includes(idx))
        this.path.push(floor)
    }
}



function theLift(queues, capacity) {
    // Your code here!
    return [999]
}
  