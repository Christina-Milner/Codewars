/* Given a set of geographical coordinates as a string, return true if they are valid coordinates and false if not. Valid means the following criteria are fulfilled:
    - No characters other than digits and an optional decimal period and minus
    - Minus directly attached to the following digit
    - Latitude between 0 and 90, longitude between 0 and 180 (positive and negative)
*/

//P: A string
//R: A boolean

/*
- This is tagged RegEx but a lot of it would be easier to do without it? Like, split the input by ", " and convert array elements to number.
    - If they're NaN, there's invalid characters floating around
    - Easy to check they're between -90 and 90 and -180 and 180, respectively.
    - This also catches the "no space between the minus sign and the digit" thing
*/


function isValidCoordinates(coordinates){
    if (coordinates.includes("e")) {
        return false;
    }
    let numCoords = coordinates.split(", ").map(Number);
    let [lat, long] = [numCoords[0], numCoords[1]];
    if (isNaN(lat) || isNaN(long)) {
        return false;
    }
    if (lat < -90 || lat > 90) {
        return false;
    }
    if (long < -180 || long > 180) {
        return false;
    }
    return true;
}