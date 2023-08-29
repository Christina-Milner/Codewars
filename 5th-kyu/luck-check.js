/* Given a ticket number, check whether it is "lucky", meaning the sum of the digits in the left half is the same as on the right (ignoring the middle element if
    the length is odd).
    The function should throw errors for empty strings or strings that do not represent a decimal number. */

//P: A string
//R: A boolean

/*
- Input validation first: Check for empty and whether contents of string convert to number
- Slice from 0 to half the length (rounded down) and from half the length (rounded up)
- Split and sum reduce the components and compare
*/


function luckCheck(ticket){
    if (!ticket || isNaN(ticket) || /\D/.test(ticket)) {
        throw new Error("Invalid input!")
    }
    const sumDigits = str => str.split('').reduce((acc, cur) => acc + Number(cur), 0)
    const left = ticket.slice(0, Math.floor(ticket.length / 2))
    const right = ticket.slice(Math.ceil(ticket.length / 2))
    return sumDigits(left) === sumDigits(right)
}

/* So, slightly sneaky hobbitses. Tests included strings like "417E30" which does convert to a number for silly JS reasons, but isn't a
decimal representation of one. Can't catch this by comparing the string turned to number and back to string with the original either, because
that'll strip leading zeroes as well, but a bit of Regex helped. */