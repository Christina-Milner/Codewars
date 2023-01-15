/* Given a string S and an integer num, concatenate all the odd-indexed characters of S with all the even-indexed ones, and repeat this process num times.
If num is 0, the original string should be returned.
Write a decription function that, given the num, can reverse the process. */

//P: A string and an integer
//R: A string

/*
Encryption:
- Process described: string split filtered by odd indices joined + string split filtered by even indices joined
- Make helper that recursively does this while n > 0

Decryption:
- Split string in half and start assembling new string alternating between the halves and starting with the second
- Recursively do this while n >0

*/

function encrypt(text, n) {
    if (n <= 0 || !text) {return text}
    let encrypted = text.split('').filter((e, i) => i % 2 !==0).join('') + text.split('').filter((e, i) => i % 2 ==0).join('')

    return encrypt(encrypted, n - 1)
}

function decrypt(encryptedText, n) {
    if (n <= 0 || !encryptedText) {return encryptedText}
    let oddHalf = encryptedText.slice(0, Math.floor(encryptedText.length / 2)).split('')
    let evenHalf = encryptedText.slice(Math.floor(encryptedText.length / 2)).split('')
    let result = ""
    while (oddHalf.length || evenHalf.length) {
        if (evenHalf.length) {result += evenHalf.shift()}
        if (oddHalf.length) {result += oddHalf.shift()}
    }

    return decrypt(result, n - 1)
}

/* Decided I didn't need a helper when I could just make the function itself recursive. */