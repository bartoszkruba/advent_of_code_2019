const fs = require('fs')
const [min, max] = fs.readFileSync('puzzle_inputs.txt').toString().split('-').map(v => +v)

const findSolution1 = (min, max) => {
    let c = 0
    regex1 = /^(?=[1-9]{6}$)1*2*3*4*5*6*7*8*9*$/
    regex2 = /(\d)\1+/
    for (let i = min; i <= max; i++) {
        if (regex1.test(i) && regex2.test(i)) c++
    }

    return c
}

console.log('Part One Solution: ' + findSolution1(min, max))
