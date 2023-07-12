/* Create a Vector class. The constructor takes in an array of numbers, and it should have the following methods:
a.add(b): returns a new Vector with the elements of a and b added
a.subtract(b): Same thing but with subtraction
a.dot(b): multiplication
a.norm(): returns the square root of the sum of the squares of the vector's elements
a.toString(): returns the vector as a string in round brackets
a.equals(b): returns a boolean indicating whether two vectors have the same components.
If a and b are not of equal length, these methods should throw an error.
*/

//P: N/A - depends on the method
//R: N/A

/*
- Constructor takes array of numbers and saves it to whatever
- Math methods check if the array property on both vectors has the same length, if no, throw error, if yes, iterate over them, do the math, and return 
    a new Vector with the array obtained
- toString: Array joined by commas with round brackets around it
- Equals: Check length, then iterate over arrays and return false if mismatch found
*/

class Vector {
    constructor(array) {
        this.components = array
    }

    add(vector) {
        if (this.components.length !== vector.components.length) {
            throw new Error("Vectors must be of equal length!")
        }
        return new Vector(this.components.map((num, idx) => num + vector.components[idx]))
    }

    subtract(vector) {
        if (this.components.length !== vector.components.length) {
            throw new Error("Vectors must be of equal length!")
        }
        return new Vector(this.components.map((num, idx) => num - vector.components[idx]))
    }

    dot(vector) {
        if (this.components.length !== vector.components.length) {
            throw new Error("Vectors must be of equal length!")
        }
        return this.components.reduce((acc, cur, idx) => acc + cur * vector.components[idx], 0)
    }

    equals(vector) {
        if (this.components.length !== vector.components.length) {
            return false
        }
        return this.components.every((num, idx) => num === vector.components[idx])
    }

    norm() {
        return Math.sqrt(this.components.reduce((acc, cur) => acc + cur ** 2, 0))
    }

    toString() {
        return `(${this.components.join(',')})`
    }
}

/* Didn't read properly - dot product returns a number, the sum of the products of the two vectors' components. Should've maybe done P and R for each method... */



