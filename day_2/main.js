const fs = require('fs')
const IntcodeComputer = require('../intcode_computer')

const inputs = fs.readFileSync('puzzle_inputs.txt').toString().split(',').map(v => +v)

const computer = new IntcodeComputer()

const findSolutions = async (inputs, computer) => {
    let memory = inputs.map(v => +v)
    memory[1] = 12
    memory[2] = 2

    await computer.compute(memory)

    const solution1 = memory[0]

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            memory = inputs.map(v => v)
            memory[1] = i
            memory[2] = j
            await computer.compute(memory)

            if (memory[0] == 19690720) {
                return {solution1, solution2: 100 * i + j}
            } 
        }
    }    
}

findSolutions(inputs, computer).then(({solution1, solution2}) => {
    console.log('Part One Solution: ' + solution1)
    console.log('Part Two Solution: ' + solution2)

    process.exit()
})