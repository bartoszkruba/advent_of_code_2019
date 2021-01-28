const fs = require('fs')
const [min, max] = fs.readFileSync('puzzle_inputs.txt').toString().split('-').map(v => +v)

const findSolutions = (min, max) => {
    let c = 0
    const regex1 = /^(?=[1-9]{6}$)1*2*3*4*5*6*7*8*9*$/
    const regex2 = /(\d)\1+/
    const regex3 = /([0-9])\1{2}/

    let matches = []

    for (let i = min; i <= max; i++) if (regex1.test(i) && regex2.test(i)) matches.push(i)

    const solution1 = matches.length

    matches = matches.filter(psw => (
        (/(1)\1{1}/.test(psw) && !/(1)\1{2}/.test(psw)) ||
        (/(2)\1{1}/.test(psw) && !/(2)\1{2}/.test(psw)) ||
        (/(3)\1{1}/.test(psw) && !/(3)\1{2}/.test(psw)) ||
        (/(4)\1{1}/.test(psw) && !/(4)\1{2}/.test(psw)) ||
        (/(5)\1{1}/.test(psw) && !/(5)\1{2}/.test(psw)) ||
        (/(6)\1{1}/.test(psw) && !/(6)\1{2}/.test(psw)) ||
        (/(7)\1{1}/.test(psw) && !/(7)\1{2}/.test(psw)) ||
        (/(8)\1{1}/.test(psw) && !/(8)\1{2}/.test(psw)) ||
        (/(9)\1{1}/.test(psw) && !/(9)\1{2}/.test(psw))
    ))

    const solution2 = matches.length

    return { solution1, solution2 }
}

const {solution1, solution2} = findSolutions(min, max)

console.log('Part One Solution: ' + solution1)
console.log('Part Two Solution: ' + solution2)
