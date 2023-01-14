/* You are given an input array of weather conditions, each for a half-day (first is morning of the first day, second afternoon of the first day).
A man will use an umbrella on his way to work if it is raining in the morning, but leave it there if it is not raining in the afternoon.
Return the minimum number of umbrellas he needs.
Examples:
minUmbrellas(["rainy", "clear", "rainy", "cloudy"]) = 2 (takes one to work the first day and leaves it there, needs another the second day)
minUmbrellas(["sunny", "windy", "sunny", "clear"]) = 0 (no rain)
minUmbrellas(["rainy", "rainy", "rainy", "rainy", "thunderstorms", "rainy"]) = 1 (perpetual rain so he takes the same umbrella on every journey)
*/

//P: An array of strings
//R: A number

/*
Could do this by iterating over the array, keeping track of a count, and using a boolean hasUmbrella variable.
But I feel like it should be doable with map or reduce based on the pairs of morning and afternoon weather.
But... no, do need to keep track of where an umbrella is.
What happens if the first pair is non-rain/rain, anyway? Does an umbrella magically teleport to his work? Apparently so, based on sample tests.
So:
- Create a constant for the strings that mean "rain"
- Initialise count: 0
- Initialise umbrellaHome (false) and umbrellaWork (false)
- Weather 1 is rain: count++ and umbrellaWork becomes true
- Weather 2 is rain: umbrellaWork becomes false, umbrellaHome becomes true
    - Weather 3 is rain: umbrellaBools swap again
    - Weather 3 is not rain: no changes
- Weather 2 is not rain: nothing changes
    - Weather 3 is rain: Actually, need to make the umbrella variables numbers too rather than bools. Count++, umbrellawWork++

- To summarise. Man is at home (index % 2 == 0) or at work (otherwise). If it rains:
    - Total count of umbrellas increases by 1 if count at his current location is 0
    - Otherwise, count at his current location decreases by 1
    - Count of umbrellas at the next location increases by 1
*/

function minUmbrellas(weather) {
    let totalCount = 0
    let umbrellasHome = 0
    let umbrellasWork = 0

    const rain = ["rainy", "thunderstorms"]

    for (let i = 0; i < weather.length; i++) {
        if (!rain.includes(weather[i])) {continue}
        if (i % 2 == 0) {
            if (!umbrellasHome) {totalCount++}
            else {umbrellasHome--}
            umbrellasWork++
        } else {
            if (!umbrellasWork) {totalCount++}
            else {umbrellasWork--}
            umbrellasHome++
        }
    }
    return totalCount
}

/* It's... beautiful. Annnd the tests are all being displayed individually! This is how I like my katas (even if this one might've been
slightly on the easy side for a 5th kyu). */

