const fs = require('fs')

const inputs = fs.readFileSync('puzzle_inputs.txt').toString().split(',').map(v => +v)

function compute(memory) {
    const instructions = {
        99: {
            parameterCount: 0,
            callback: (memory, params) => 'finish'
        },
        1: {
            parameterCount: 3,
            callback: (memory, params) => memory[params[2]] = memory[params[0]] + memory[params[1]]
        },
        2: {
            parameterCount: 3,
            callback: (memory, params) => memory[params[2]] = memory[params[0]] * memory[params[1]]
        }
    }

    let i = 0
    while (true) {
        const {parameterCount, callback} = instructions[memory[i]]

        const result = callback(memory, memory.slice(i + 1, i + 1 + parameterCount))

        if (result == 'finish')
            break

        i += parameterCount + 1
    }

    return memory[0]
}

function find_solution1(inputs) {
    inputs[1] = 12
    inputs[2] = 2

    return compute(inputs)
}

function find_solution2(inputs) {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            inputs[1] = i
            inputs[2] = j

            if (compute(inputs.map(v => v)) == 19690720) return 100 * i + j
        }
    }
}

console.log('Part One Solution: ' + find_solution1(inputs.map(v => v)))
console.log('Part Two Solution: ' + find_solution2(inputs))