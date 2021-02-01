const fs = require('fs')
const IntcodeComputer = require('../intcode_computer')

const inputs = fs.readFileSync('puzzle_inputs.txt').toString().split(',').map(v => +v)

const computer = new IntcodeComputer()

const findSolutions = async (inputs, computer) => {
    let output = await computer.compute(inputs.map(v => v))
    const solution1 = output[output.length - 1]

    return {solution1}
}

findSolutions(inputs, computer).then(({solution1}) => {
    console.log('Part One Solution: ' + solution1)
    process.exit()
})