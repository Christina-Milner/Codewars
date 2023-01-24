/* Given an array of objects representing data about developers attending a meetup, add a "username" property to each object that concatenates
the first name in lower case and the birth year.
The birth year is determined by subtracting the age from the current year. */

//P: An array of objects
//R: An array of objects

/*
This specifically says to add the property to each object in the input array, so I'm not going to worry about not modifying the input. I'm being told to.
- Create a new date and use getFullYear() to get the current year
- Do a forEach that adds a "username" attribute and sets it to the first name in lower case plus the current year minus age
- return the list
- Edit: woops, missed the part about adding the first letter of the last name.
*/

function addUsername(list) {
    const currentYear = new Date().getFullYear()
    list.forEach(e => e.username = `${e.firstName.toLowerCase()}${e.lastName[0].toLowerCase()}${currentYear - e.age}`)
    return list
  }