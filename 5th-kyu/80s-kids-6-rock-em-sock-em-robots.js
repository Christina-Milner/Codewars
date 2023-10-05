/* Given three objects, robot 1, robot 2 and tactics, return which robot wins the fight.
    - The robots have the properties name (str), health (num), speed (num), and tactics (array of strings)
    - Tactics is an object with the ability names as keys and their damage values as values
    - The robot with the higher speed stat goes first, if equal, the one passed in first
    - Robots alternate turn and use the tactics in order
    - Fight ends when no tactics remain or a robot's health falls to 0 (in former case, winner is the one with more hp left)
    - Return the string "$NAME has won the fight." or "The fight was a draw."
*/

//P: Three objects
//R: A string

/*
- Write a helper function that takes in actor and target
    - This shifts the actor's first tactic out of the array
    - Looks up its damage and subtracts that damage from the target's health
- This keeps being called in a while loop with the order of actor and target depending on their speed stat
- While loop runs until tactics have run out and checks for 0 health inside the loop and breaks out if that is the case
*/


function fight(robot1, robot2, tactics) {
    const attack = (source, target) => {
        const next = source.tactics.shift()
        target.health -= next ? tactics[next] : 0
    }
    const win = actor => {
        return `${actor.name} has won the fight.`
    }
    let first = robot1.speed >= robot2.speed ? robot1 : robot2
    let second = robot1.speed >= robot2.speed ? robot2 : robot1
    while (robot1.tactics.length || robot2.tactics.length) {
        attack(first, second)
        if (second.health <= 0) {
            return win(first)
        }
        attack(second, first)
        if (first.health <= 0) {
            return win(second)
        }
    }
    return first.health == second.health ? "The fight was a draw." : first.health > second.health ? win(first) : win(second)
  }