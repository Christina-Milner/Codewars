/* Given an array of Student objects that each have the properties name, fives, tens and twenties, return the name of the student with the most money.
If everyone has the same amount, return "all", otherwise there will always be a clear winner and the names are unique. */

//P: An array of Students
//R: A string

/*
- Write a helper that sums up fives * 5, tens * 10 and twenties * 20 to determine how much money a student has
- After that, I would say reduce does this, but that won't work correctly in the "everyone has the same amount" scenario
- Since it said there will be a unique winner unless everyone has the same amount,
   we want to abort iteration and return "all" as soon as two students have the same amount, anyway - which reduce doesn't do
- Instead, old-school: initialise a "max" variable and a "maxName" or similar variable
- Iterate over the array of students. If a student's money is higher than the current max, update both variables accordingly
- If a student's money is the same as the current max, abort and return "all"
- Otherwise, return maxName at the end

*/

function mostMoney(students) {
    const moneyAmount = student => student.fives * 5 + student.tens * 10 + student.twenties * 20
    let maxAmount = 0
    let maxName = ""
    let amounts = []
    for (let student of students) {
        let amount = moneyAmount(student)
        if (amount > maxAmount) {
            maxAmount = amount
            maxName = student.name
        }
        amounts.push(amount)
    }
    return amounts.length > 1 && amounts.every(e => e === maxAmount) ? "all" : maxName
  }

/* The "abort iteration if the money is the same" idea was obviously flawed - that would only work if the values are either unique or all the same.
It was, however, entirely possible to have one winner and everyone else has the same.
I was hoping to avoid having to iterate over everything again to double-check whether all values are the max value, but at least the calculation of each
student's total money only happens once.
Would probably have been preferable to sort the students array by total money, then check if length greater 1 and if so, whether first element money equals last. */