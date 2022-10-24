/* Given a string of names formatted in the style "Firstname:Lastname;Firstname:Lastname;",
return a string in the format of "(LASTNAME, FIRSTNAME)(LASTNAME, FIRSTNAME)" sorted alphabetically by
last name, or by first name if last names are identical */

//P: A string, formatted "Firstname:Lastname;Firstname:Lastname;"
//R: A string, formatted "(LASTNAME, FIRSTNAME)(LASTNAME, FIRSTNAME)" and sorted alphabetically

function meeting(s) {
    let listOfPeople = []
    for (let person of s.split(';')) {
      listOfPeople.push({first: person.split(':')[0].toUpperCase(), last: person.split(':')[1].toUpperCase()})
    }
    listOfPeople.sort((a, b) => a.last == b.last ? a.first.localeCompare(b.first) : a.last.localeCompare(b.last))
    return listOfPeople.reduce((a, b) => a + `(${b.last}, ${b.first})`, "")
}