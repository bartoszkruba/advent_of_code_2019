const fs = require('fs')
const IntcodeComputer = require('../intcode_computer')

const inputs = fs.readFileSync('puzzle_inputs.txt').toString().split(',').map(v => +v)

const computer = new IntcodeComputer()

computer.compute(inputs.map(v => v), [1]).then(output => {
    console.log(output)
    process.exit()
})
