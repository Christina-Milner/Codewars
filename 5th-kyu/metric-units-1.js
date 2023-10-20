/* Given a number representing meters, return a string with it correctly formatted as a metric unit, i.e. 5 -> "5m", "5000" -> "5km". */

//P: A number
//R: A string


/*
- Save the prefixes in a map corresponding to their base 10 value, e.g. 1000: k - or even better, with the power of 10, so 3: k
- Actually, maybe use an array of arrays rather than an object because it's otherwise not guaranteed things will be iterated over in the correct order
- Find the biggest number the input is divisible by and combine its prefix with "m"
- Actually do the division and stick the result together with the unit

*/


function meters(x) {
    const prefixes = [[24, "Y"], [21, "Z"], [18, "E"], [15, "P"], [12, "T"], [9, "G"], [6, "M"], [3, "k"]];
    let unit = "";
    for (let arr of prefixes) {
        if (10 ** arr[0] <= x) {
            unit = arr[1];
            x /= 10 ** arr[0]
        }
    }
    unit += "m"
    return `${x}${unit}`
  }