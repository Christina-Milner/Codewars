/* Fix the Warrior class such that damage is calculated correctly depending on the defender's block (equal to position of attacker: no damage, otherwise 10 damage
    if hit high, 5 damage if hit low, 5 extra damage if no block set) and the HP adjusted correctly as well. If HP reach 0, the warrior should become deceased, and
    if hit again, a zombie, but HP can't go below zero.
    The code as provided:
*/
Position = {
    high: 'h',
    low: 'l'
  }//don't change this object!
  
  Warrior = function(name){
    this.name = name;  
    this.health = 100;
  }
  
  Warrior.prototype = {
    attack: function(enemy, position){
      if (enemy.block != position){
        var damage = position == Position.high ? 10 : 5;
        // if enemy is not blocking at all then give more damage
        if (!enemy.block){
          damage += 5;
        }
        setHealth.call(enemy.health - damage);   
      }
    }
  }
  
  // private functions
  function setHealth(value){
    this.health = Math.max(0, value);
    if (this.health == 0){
      this.deceased = true;
      this.zombie = false;
    }
    else if(this.deceased){
      this.zombie = true;
    }
  }
  
/* ??? What in the heck is the Position object for? Just use "high" or "low"?!  */
/* So, from running tests - HP isn't getting updated and some tests checking for alive or dead are getting undefined.
This isn't particularly surprising as I'm pretty sure the "this" in "this.health" in the setHealth function is referring to the wrong thing.
Similarly, the Warriors never receive the deceased or zombie properties. That function does. So, we gotta stick em on the warriors.
I would normally be tempted to rewrite this whole thing with class syntax, but let's see if I can fix it in the shape it's in.
I'd say just pass the enemy into setHealth rather than enemy.health and update the rest of it accordingly? */

Position = {
    high: 'h',
    low: 'l'
  }

class Warrior {
    constructor(name) {
        this.name = name;
        this.health = 100;
        this.deceased = false;
        this.zombie = false;
    }
    setHealth(enemy, damage) {
        enemy.health = Math.max(0, enemy.health - damage)
        if (enemy.health == 0 && !enemy.deceased) {
            enemy.deceased = true;
        }
        else if (enemy.deceased) {
            enemy.zombie = true;
        }
    }
    attack(enemy, position) {
        let damage = 0
        if (enemy.block != position) {
            damage = position == Position.high ? 10 : 5;
            if (!enemy.block) {
                damage +=5;
            }
        }
        this.setHealth(enemy, damage);
    }
}

/* I did not, in fact, figure out what was wrong with the original code, but this works. */
/* From looking at other solutions, I was on the right track. The person who kept the original syntax
changed it to "setHealth.call(enemy, enemy.health - damage); ", but setHealth then only takes in value as a parameter.
I should've probably looked up how call() works in the docs.*/