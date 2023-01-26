/* Given an array of objects representing data about developers attending a meetup, return their selected food options and a count of each as an object. */

//P: An array of objects
//R: An object

/*
- Create empty object
- Iterate over array and add value of meal property to object if not present, otherwise increase its value by 1
- Return object

This seems sus as the katas from this series have mostly just been about finding the right array method for the job, but I can't think
of one that would let me do this in one go.
*/

function orderFood(list) {
    let meals = {}
    for (let dev of list) {
        if (dev.meal in meals) {meals[dev.meal] += 1}
        else {meals[dev.meal] = 1}
    }
    return meals
  }

/* Ah, could've used reduce for it. I suppose. */