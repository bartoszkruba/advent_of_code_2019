const fs = require('fs')
const IntcodeComputer = require('../intcode_computer')

const inputs = fs.readFileSync('puzzle_inputs.txt').toString().split(',').map(v => +v)

function find_solution1(inputs, computer) {
    inputs[1] = 12
    inputs[2] = 2

    computer.compute(inputs)

    return inputs[0]
}

function find_solution2(inputs, computer) {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            const memory = inputs.map(v => v)
            memory[1] = i
            memory[2] = j
            computer.compute(memory)

            if (memory[0] == 19690720) return 100 * i + j
        }
    }
}
const computer = new IntcodeComputer()

console.log('Part One Solution: ' + find_solution1(inputs.map(v => v), computer))
console.log('Part Two Solution: ' + find_solution2(inputs, computer))