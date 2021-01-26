const fs = require('fs')

inputs = fs.readFileSync("puzzle_inputs.txt").toString().split('\n').map(line => +line)

function findSolution1(inputs) {
    return inputs.map(input => parseInt(input / 3) - 2).reduce((a, b) => a + b, 0)
}

function findSolution2(inputs) {
    return inputs.map(input => parseInt(input / 3) - 2).map(fuel => {
        extraFuel = parseInt(fuel / 3) - 2

        while (extraFuel > 0) {
            fuel += extraFuel
            extraFuel = parseInt(extraFuel / 3) - 2
        }

        return fuel
    }).reduce((a, b) => a + b, 0)
}

console.log('Part One Solution: ' + findSolution1(inputs))
console.log('Part Two Solution: ' + findSolution2(inputs))