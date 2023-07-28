/* Given a string, return true if it's in the format "(XXX) XXX-XXXX" (where the Xes are any digit) and false otherwise. */

//P: A string
//R: A boolean


/*
- I don't like problems where the only thing to do is to figure out a regex pattern, but it's getting more and more tedious to scroll past the <85% satisfaction katas
- So, let's at least do this without Regex, even though it's tagged as that
- String split by spaces must result in 2 substrings
- The first of which must have a length of 5, start with (, end with ), and otherwise contain only digits
- The rest of which must result in another 2 substrings if split by "-"
- Lengths 3 and 4 and all digits

*/



function validPhoneNumber(phoneNumber) {
    // Not using RegEx because I don't like when that's all there is to a problem
    let firstStep = phoneNumber.split(' ')
    if (firstStep.length !== 2) {return false}
    let [area, number] = [firstStep[0], firstStep[1]]
    if (area.length !== 5 || area[0] !== "(" || area[4] !== ")" || !(area.slice(1, 4).split('').every(e => Number(e) || e == 0))) {
        return false
    }
    if (number.split('-').length !== 2) {return false}
    let [firstHalf, rest] = [number.split('-')[0], number.split('-')[1]]
    if (firstHalf.length !== 3 || rest.length !== 4 || !(firstHalf.concat(rest).split('').every(e => Number(e) || e == 0))) {
        return false
    }
    return true
}

/* One of the top solutions only tests for total length and positions of the brackets and the '-'. Amazing testing there. */