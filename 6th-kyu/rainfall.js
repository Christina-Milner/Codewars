/*Given a list "data" of average rainfall numbers for a town (a string with town name: followed by the months and separated by \n) and an array towns of town names,
create a function "mean" that takes in a town and data and returns the average rainfall for that town, and a function variance that does the same thing but with the 
variance.*/

//P: a string and a dataset (also a string)
//R: A number (no rounding)

/* Variance: average of squared differences from the mean, so second function will use the first.
Work out mean, subtract the mean from each number, square the result, and then calculate the average of
those squared differences. */

/* So... we need
1) A helper that grabs the data for the right town (split by \n and use .includes())
-> Update: includes() does not work as there are tests looking for "Lon" and expecting a "not found" result of -1 rather than the numbers for London.
2) A helper that gets rid of everything but the numbers from that data (split by space and by comma and then do a is Number(e) NaN check)
3) A helper that calculates the mean (EZ) - put this outside the other two functions as they will both need it
4) A helper that calculates the variance

Akshully... maybe make a class for the data with all those helpers as methods so it ends up less of a mess?
*/

class RainData {
    constructor(strg) {
      this.rawData = strg
    }
    townData(town) {
      return this.rawData.split('\n').find(e => e.split(':')[0] == town)   // sneaky!
    }
    numbersOnly(town) {
      return this.townData(town)?.replace(/,/g, " ").split(" ").map(e => Number(e)).filter(e => !isNaN(e))
    }
    average(arr) {
      return arr ? arr.reduce((a, b) => a + b, 0) / arr.length : -1
    }
    mean(town) {
      return this.average(this.numbersOnly(town))
    }
    variance(town) {
      return this.numbersOnly(town) ? this.numbersOnly(town).reduce((a, b) => a + (b - this.mean(town)) ** 2, 0) / this.numbersOnly(town).length : -1
    }
    
  }
  
  function mean(town, strng) {
      const data = new RainData(strng)
      return data.mean(town)
  }
  function variance(town, strng) {
     const data = new RainData(strng)
     return data.variance(town)
  }