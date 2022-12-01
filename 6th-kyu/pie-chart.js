/* Given a JSON containing whatever as keys and numbers as values, return one with the numbers replaced by the angle that segment would take up on a pie chart,
rounded to two decimal places where necessary. */

//P: A JSON
//R: A JSON

/*
1) JSON parse the input
2) I hope my math checks out here, but ... sum up the values, replace each key's value with the percentage, then take that percentage of 360
3) do a if parseInt(x) == x check here to see if rounding is necessary because we don't want x.00 values
4) JSON.stringify the result and return
*/

function pieChart(obj) {
    let parsed = JSON.parse(obj)
    let totalSum = Object.values(parsed).reduce((a, b) => a + b, 0)
    for (let key in parsed) {
      parsed[key] = (parsed[key] / totalSum) * 360
      if (parseInt(String(parsed[key])) !== parsed[key]) {parsed[key] = parsed[key].toFixed(2)}
    }
    return JSON.stringify(parsed)
  }
