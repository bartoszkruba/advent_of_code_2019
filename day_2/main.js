const fs = require('fs')

const inputs = fs.readFileSync('puzzle_inputs.txt').toString().split(',').map(v => +v)

function find_solution2(inputs) {
    inputs[1] = 12
    inputs[2] = 2

    let i = 0
    while (true) {
        const instruction = inputs[i]

        if (instruction == 99) break

        const pos1 = inputs[i + 1]
        const pos2 = inputs[i + 2]
        const pos3 = inputs[i + 3]

        inputs[pos3] = instruction == 1 ? inputs[pos1] + inputs[pos2] : inputs[pos1] * inputs[pos2]

        i += 4
    }

    return inputs[0]
}

console.log('Part One Solution: ' + find_solution2(inputs.map(v => v)))