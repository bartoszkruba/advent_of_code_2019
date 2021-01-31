const fs = require('fs')
const IntcodeComputer = require('../intcode_computer')

const inputs = fs.readFileSync('puzzle_inputs.txt').toString().split(',').map(v => +v)

const computer = new IntcodeComputer()

inputs[1] = 1
console.log(computer.compute(inputs))