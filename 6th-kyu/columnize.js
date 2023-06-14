/* Given an array of strings and a number num, return one string where the individual items are in num columns separated by | , separated by new lines, and
left justified.
Example: 
["1", "12", "123", "1234", "12345", "123456"]
becomes
1     
12    
123   
1234  
12345 
123456
for 1 column,
1     | 12    
123   | 1234  
12345 | 123456
for 2 columns, and
1     | 12     | 123 | 1234
12345 | 123456
for 4 columns. */

//P: An array of strings and a number
//R: A string

/*
- First, find the longest item in the array of strings. This is the column width.
- Pad any shorter elements with spaces at the end to match this width
- Create subarrays based on columns, i.e.:
    - Iterate from num to array length, incrementing by num, and push array.slice(i - num, i) into new array each time
    - Only do this if num greater than 1, otherwise it's just a waste of time
- Join the subarrays by "| " and then the super-array by "\n"

*/

function columnize(items, n) {
    let columns = Array.from({length: n}, () => [])
    for (let i = 0; i < items.length; i++) {
        columns[i % n].push(items[i])
    }
    for (let i = 0; i < columns.length; i++) {
        const maxLength = columns[i].map(str => str.length).reduce((acc, cur) => Math.max(acc, cur), 0)
        for (let j = 0; j < columns[i].length; j++) {
            columns[i][j] = columns[i][j].padEnd(maxLength)
        }
    }

    let rows = []
    for (let i = 0; i <= Math.ceil(items.length / n); i++) {
        rows.push(columns.map(subArr => subArr[i]).filter(str => typeof(str) !== "undefined"))
    }
    rows = rows.filter(subArr => subArr.length > 0)
    return rows.map(subArr => subArr.join(" | ")).join("\n")
}

/* Oh my God, that might have been the most frustrating thing I've ever done on CW. (Or at least for this difficulty.)
My entire original approach was moot because the columns aren't supposed to be equal width. They're supposed to be
as wide as the widest element in them. And then it just became a nightmare of trying to read test results that
only differ in the number of spaces and figuring out how the pipe was supposed to be handled. */