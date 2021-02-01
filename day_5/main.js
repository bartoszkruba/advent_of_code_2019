const fs = require('fs')
const IntcodeComputer = require('../intcode_computer')

const inputs = fs.readFileSync('puzzle_inputs.txt').toString().split(',').map(v => +v)

const computer = new IntcodeComputer()

const findSolutions = async (inputs, computer) => {
    const solution1 = (await computer.compute(inputs.map(v => v), [1])).pop()

    const solution2 = (await computer.compute(inputs.map(v => v), [5])).pop()

    return {solution1, solution2}
}

findSolutions(inputs, computer).then(({solution1, solution2}) => {
    console.log('Part One Solution: ' + solution1)
    console.log('Part Two Solution: ' + solution2)
    process.exit()
})