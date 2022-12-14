/* You are given a string that represents events regarding a garage door for each second.
"." means no event
"P" means the open/close button has been pressed
"O" means the door has detected an obstacle.
If the button is pressed, the door immediately moves 1 in the opening or closing direction depending on whether it is open or closed.
If an obstacle is detected, the door immediately reverses its movement.
Return a string composed of numbers representing the corresponding state of the garage door (0 = fully closed, 5 = fully open).

Example: "..P...O....." should return "001234321000" */

//P: A string
//R: A string (of digits 0-5)

/* 
- "." means the numeric value of the door state decreases/increases if it's closing/opening, or nothing happens if it is at 0 or 5.
- "P" means:
    - If the door is currently doing nothing, it starts opening/closing and the value increases/decreases by 1
        - If it is at 0, it starts opening, if it is at 5, it starts closing, otherwise it resumes whatever it was doing before
    - If the door is already opening/closing, it pauses and its current value stays the same
- "O" means:
    - The door's "opening"/"closing" state gets flipped and it then immediately moves by 1 into that new direction.
    - Going to assume I don't need to account for "um it can't hit an obstacle if it's already fully closed" type input

All these states I need to keep track of are starting to sound like an object class to me. */

function door(events) {

    class GarageDoor {
      constructor(numState, direction, paused) {
        this.numState = numState
        this.direction = direction
        this.paused = paused
      }
      buttonPress() {
        if (this.paused) {
          this.paused = false
          this.changeState()
        } else {
          this.paused = true
        }
        return this.numState
      }
      detectObstacle() {
        this.direction = this.direction == "opening" ? "closing" : "opening"
        this.changeState()
        return this.numState
      }
      tick() {
        this.changeState()
        return this.numState
      }
      changeState() {
        if (this.paused) {return}
        if (this.direction == "opening" && this.numState < 5) {
          this.numState += 1
        }
        else if (this.direction == "closing" && this.numState > 0) {
          this.numState -= 1
        }
        if (this.numState == 5) {
          this.paused = true
          this.direction = "closing"
        }
        else if (this.numState == 0) {
          this.paused = true
          this.direction = "opening"
        }
      }
    }
    
    let ourDoor = new GarageDoor(0, "opening", true)
    return events.split('').map(e => {
      if (e == ".") {return ourDoor.tick()}
      if (e == "P") {return ourDoor.buttonPress()}
      if (e == "O") {return ourDoor.detectObstacle()}
    }).join('')
  }
