/* John and Ann are doing Codewars.
On day 1, Ann does 1 kata and John does 0.
Rules copy pasted from the kata description because wtf:
    On day n the number of katas done by Ann should be n minus the number of katas done by John at day t,
     t being equal to the number of katas done by Ann herself at day n - 1.

    On day n the number of katas done by John should be n minus the number of katas done by Ann at day t,
    t being equal to the number of katas done by John himself at day n - 1

Write functions ann(n) and john(n) that return the array of how many katas the person does on each day up to that day, and
sum_ann(n) and sum_john(n) that return the totals.
*/

//P: A number (in all 4 cases)
//R: An array of numbers (list functions) or a number (sum functions)

/*
Example provided:
john(11)  -->  [0, 0, 1, 2, 2, 3, 4, 4, 5, 6, 6]
ann(6)    -->  [1, 1, 2, 2, 3, 3]
- So, how would we build this up?
    - John starts at 0, Ann starts at 1
    - John's day 1 is 1 - ann(john(0)) = 1 - ann(0). ann(0) is provided, so it's 1 - 1 = 0.
    - Based on that, we can now calculate Ann's day 1 - it's 1 - john(ann(0)) = 1 - john(1) = 1

*/

class JohnAndAnn {
    constructor() {
        this.john = [0]
        this.ann = [1]
    }
    calculateDays(num) {
        for (let i = 1; i < num; i++) {
            this.john.push(i - this.ann[this.john[i - 1]]);
            this.ann.push(i - this.john[this.ann[i - 1]]);
        }
    }
}

function john(n) {
    let data = new JohnAndAnn();
    data.calculateDays(n);
    return data.john;
}
function ann(n) {
    let data = new JohnAndAnn();
    data.calculateDays(n);
    return data.ann;
}

function sumJohn(n) {
    let data = new JohnAndAnn();
    data.calculateDays(n);
    return data.john.reduce((acc, cur) => acc + cur, 0);
}

function sumAnn(n) {
    let data = new JohnAndAnn();
    data.calculateDays(n);
    return data.ann.reduce((acc, cur) => acc + cur, 0);
}